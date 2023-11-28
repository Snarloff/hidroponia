## Desenvolvimento de uma horta hidropônica automatizada e webmonitorada

Este repositório contém o código-fonte do projeto de Hidroponia IoT, desenvolvido para integrar tecnologias modernas no cultivo hidropônico. Abaixo, você encontrará informações sobre a estrutura do projeto, as tecnologias utilizadas e as instruções para configurar e executar o sistema.

**Estrutura do Projeto:**

- `/api`: Contém o código-fonte da API desenvolvida em Node.js, utilizando Prisma como ORM para interação com o banco de dados SQLite da empresa Turso.

- `/esp32`: Inclui o código para o microcontrolador ESP32, implementado em Wiring para controlar as lâmpadas de cultivo e a bomba de ar.

- `/website`: Contém o código do site desenvolvido em Next.js, utilizando Tailwind CSS para estilos, ShadcnUI para componentes de interface e Charts.js para exibição de gráficos.

**Instruções de Configuração:**

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

**Acesso Remoto:**

- O acesso remoto ao sistema pode ser feito por meio do aplicativo "IoT MQTT Panel". Configure as opções de conexão para interagir com o ESP32.

**Contribuições:**

Contribuições são bem-vindas! Sinta-se à vontade para abrir issues para sugestões ou problemas encontrados, e pull requests para melhorias no código.

**Licença:**

Este projeto está sob a licença [MIT](LICENSE).
