declare global {
  namespace NodeJS {
    interface ProcessEnv {
      MQTT_URL_CONNECTION: string
      MQTT_PORT_CONNECTION: number
      MQTT_USERNAME: string
      MQTT_PASSWORD: string
      TURSO_DATABASE_URL: string
      TURSO_AUTH_TOKEN: string
    }
  }
}

// If this file has no import/export statements (i.e. is a script)
// convert it into a module by adding an empty export statement.
export {}
