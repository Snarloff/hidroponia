#include <PubSubClient.h>
#include <WiFi.h>
#include <WiFiClientSecure.h>
#include <GravityTDS.h>
#include <EEPROM.h>
 
#define WIFI_SSID ""
#define WIFI_PASS ""
#define RELE_1 13
#define RELE_2 12
#define TdsSensorPin 35
#define PhSensorPin 34
#define EEPROM_SIZE 512
 
const char *mqttServer = "";
const char *mqttUser = "";
const char *mqttPass = "";
 
const char *rootCa =
  "CERTIFICADO HTTP - ESP CLIENT";
 
const int port = 8883;
char clientId[50];
 
float temperature = 25;
float tdsValue = 0;
float EC;
 
const int potPin = 34;
float ph;
float Value = 0;
 
unsigned long previousMillis = 0;
const unsigned long interval =  3600000; // 1 hora em milissegundos
 
GravityTDS gravityTds;
WiFiClientSecure espClient;
PubSubClient client(espClient);
 
void setup() {
  Serial.begin(115200);
  EEPROM.begin(EEPROM_SIZE);
 
  gravityTds.setPin(TdsSensorPin);
  gravityTds.setAref(3.3);
  gravityTds.setAdcRange(4096);
  gravityTds.begin();
 
  WiFi.mode(WIFI_STA);
  WiFi.begin(WIFI_SSID, WIFI_PASS);
 
  client.setServer(mqttServer, port);
  client.setCallback(callback);
 
  espClient.setCACert(rootCa);
  espClient.setCertificate(rootCa);
 
  pinMode(RELE_1, OUTPUT);
  pinMode(RELE_2, OUTPUT);
  pinMode(2, OUTPUT);
  pinMode(34, INPUT);
 
  digitalWrite(2, HIGH);
}
 
void loop() {
 
  unsigned long currentMillis = millis();
 
  if (!client.connected()) {
    mqttReconnect();
  }
 
  client.loop();
 
  if (currentMillis - previousMillis >= interval) {
    previousMillis = currentMillis;
 
    if (client.connected()) {
      gravityTds.setTemperature(temperature);
      gravityTds.update();
      tdsValue = gravityTds.getTdsValue();
      Serial.print(tdsValue, 0);
      Serial.println("ppm");
 
      Value = analogRead(potPin);
 
      float voltage = Value * (3.3 / 4095.0);
      ph = (3.3 * voltage) + 0.7;

      String dataToSend = String(tdsValue) + ":" + String(ph, 2);
      client.publish("hidroponia/data", dataToSend.c_str());
    }
  }
}
 
void mqttReconnect() {
  while (!client.connected()) {
    Serial.print("Attempting MQTT connection...");
    long r = random(1000);
    sprintf(clientId, "clientId-%ld", r);
 
    if (client.connect(clientId, mqttUser, mqttPass)) {
      Serial.print(clientId);
      Serial.println(" connected");
      client.subscribe("hidroponia/data");
      client.subscribe("hidroponia/growlights");
      client.subscribe("hidroponia/checklights");
      client.subscribe("hidroponia/growlightsAlert");
      client.subscribe("hidroponia/bombair");
      client.subscribe("hidroponia/bombairAlert");
      client.subscribe("hidroponia/checkbombair");
    } else {
      Serial.print("failed, rc=");
      Serial.print(client.state());
      Serial.println(" try again in 5 seconds");
      delay(5000);
    }
  }
}
 
void callback(char *topic, byte *message, unsigned int length) {
  Serial.print("Mensagem recebida no topico: ");
  Serial.print(topic);
  Serial.print(". Messagem: ");
  String stMessage;
 
  for (int i = 0; i < length; i++) {
    Serial.print((char)message[i]);
    stMessage += (char)message[i];
  }
 
  Serial.println();
 
  if (String(topic) == "hidroponia/checklights") {
    String state = String(digitalRead(RELE_1));
    client.publish("hidroponia/growlightsAlert", state.c_str());
  }
 
  if (String(topic) == "hidroponia/checkbombair") {
    String state = String(digitalRead(RELE_2));
    client.publish("hidroponia/bombairAlert", state.c_str());
  }
 
  if (String(topic) == "hidroponia/bombair") {
    Serial.print("Saida alterada para ");
    if (stMessage == "on") {
      digitalWrite(RELE_2, HIGH);
      String state = String(digitalRead(RELE_2));
      client.publish("hidroponia/bombairAlert", state.c_str());
    }
 
    if (stMessage == "off") {
      digitalWrite(RELE_2, LOW);
      String state = String(digitalRead(RELE_2));
      client.publish("hidroponia/bombairAlert", state.c_str());
    }
  }
 
  if (String(topic) == "hidroponia/growlights") {
    Serial.print("Saida alterada para ");
    if (stMessage == "on") {
      digitalWrite(RELE_1, HIGH);
      String state = String(digitalRead(RELE_1));
      client.publish("hidroponia/growlightsAlert", state.c_str());
    }
 
    if (stMessage == "off") {
      digitalWrite(RELE_1, LOW);
      String state = String(digitalRead(RELE_1));
      client.publish("hidroponia/growlightsAlert", state.c_str());
    }
  }
}
