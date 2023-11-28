# Desenvolvimento de uma horta hidropônica automatizada e webmonitorada

![image](https://github.com/Snarloff/hidroponia/assets/46792575/0e1ce225-c94e-4941-a8bd-ea7c7f8d1abb)

Este repositório contém o código-fonte do projeto de Hidroponia IoT, desenvolvido para integrar tecnologias modernas no cultivo hidropônico. Abaixo, você encontrará informações sobre a estrutura do projeto, as tecnologias utilizadas e as instruções para configurar e executar o sistema.

## **Estrutura do Projeto:**

- `/api`: Contém o código-fonte da API desenvolvida em Node.js, utilizando Prisma como ORM para interação com o banco de dados SQLite da empresa Turso.

- `/esp32`: Inclui o código para o microcontrolador ESP32, implementado em Wiring para controlar as lâmpadas de cultivo e a bomba de ar.

- `/website`: Contém o código do site desenvolvido em Next.js, utilizando Tailwind CSS para estilos, ShadcnUI para componentes de interface e Charts.js para exibição de gráficos.

## **Instruções de Configuração:**

1. **API (Node.js com Prisma):**
   - Navegue até o diretório `/api`.
   - Execute `npm install` para instalar as dependências.
   - Configure as variáveis de ambiente no arquivo `.env`.
   - Execute `npm run dev` para iniciar o servidor da API.

2. **ESP32 (Wiring):**
   - Abra o código do ESP32 no diretório `/esp32` usando a plataforma de desenvolvimento Arduino.
   - Carregue o código no microcontrolador.

3. **Site (Next.js com Tailwind CSS, ShadcnUI e Charts.js):**
   - Navegue até o diretório `/website`.
   - Execute `npm install` para instalar as dependências.
   - Configure as variáveis de ambiente no arquivo `.env`.
   - Execute `npm run dev` para iniciar o servidor local.

### Váriaveis de ambiente

#### API

* MQTT_URL_CONNECTION = HiveMQ URL SSL
* MQTT_PORT_CONNECTION = Porta
* MQTT_USERNAME = Usuário
* MQTT_PASSWORD = Senha
* TURSO_DATABASE_URL = URL de conexão do Turso DB
* TURSO_AUTH_TOKEN = Autenticação do Turso DB

#### WEBSITE

* NEXT_PUBLIC_MQTT_URI = HiveMQ URL WSS (Websocket)
* NEXT_PUBLIC_MQTT_USERNAME = Usuário
* NEXT_PUBLIC_MQTT_PASSWORD = Senha
* API_NEEDED_TOKEN_ACCESS_BEARER = Security Code Authorization API
* TURSO_DATABASE_URL = URL de conexão do Turso DB
* TURSO_AUTH_TOKEN = Autenticação do Turso DB

## **Acesso Remoto:**

- O acesso remoto ao sistema pode ser feito por meio do aplicativo "IoT MQTT Panel". Configure as opções de conexão para interagir com o ESP32.
- Download do aplicativo [**IoT MQTT Panel**](https://play.google.com/store/apps/details?id=snr.lab.iotmqttpanel.prod&hl=pt_BR&gl=US) 

## **Inspiração do Projeto:**

Pode-se afirmar que a hidroponia não é um assunto muito difundido nos dias de hoje, em parte devido à sua falta de notoriedade entre as pessoas e à percepção de que não é uma prática tão acessível e simples de ser realizada. No entanto, essa percepção de dificuldade pode ser mitigada pela busca de meios que facilitem a automação da hidroponia, permitindo seu monitoramento à distância. Isso envolveria o acompanhamento do crescimento das plantas e a obtenção de informações cruciais sobre o estado atual da plantação. Imagine um sistema que possibilite o monitoramento e controle remoto da hidroponia. 

Esse sistema seria capaz de fornecer informações em tempo real sobre o crescimento das plantas, bem como detalhes essenciais sobre as condições da plantação e condutividade da água. Além disso, permitiria o controle de aspectos externos, como iluminação e o funcionamento da bomba de água, mesmo à distância. Isso tornaria a gestão da hidroponia menos desafiadora, embora ainda houvesse obstáculos, como a necessidade de intervenção manual para o plantio e a reposição das plantas. Essa automação também beneficiaria pessoas com agendas apertadas, que não têm tempo para monitorar diariamente sua plantação, pois elas poderiam receber notificações em tempo real sobre o status da plantação, mesmo quando estiverem ausentes. 

Em resumo, embora a hidroponia possa não ser amplamente reconhecida ou praticada atualmente, a implementação de tecnologia e automação pode torná-la mais acessível e eficiente para um público mais amplo.

## **Diagrama:**

![image](https://github.com/Snarloff/hidroponia/assets/46792575/73b8e133-01f1-4a17-84b2-36837a3acf64)

## **Imagem do Gráfico da Plataforma:**

![image](https://github.com/Snarloff/hidroponia/assets/46792575/91ca72b8-6d80-42b7-9bf3-d61792591d8a)

## **Contribuições:**

Contribuições são bem-vindas! Sinta-se à vontade para abrir issues para sugestões ou problemas encontrados, e pull requests para melhorias no código.

## **Licença:**

Este projeto está sob a licença [Apache License 2.0](LICENSE).
