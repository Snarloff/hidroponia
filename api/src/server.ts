import 'dotenv/config'

import http from 'node:http'
import chalk from 'chalk'
import * as mqtt from 'mqtt'

import { prisma } from './database'

const client = mqtt.connect(process.env.MQTT_URL_CONNECTION, {
  username: '',
  password: '',
  clientId: `backend_${Math.random().toString(16).substring(2, 8)}`,
  reconnectPeriod: 1000,
  keepalive: 10,
})

http
  .createServer((req, res) => {
    res.write('Pinged Service!')
    res.end()
  })
  .listen(3000)

client.on('connect', async () => {
  console.log(chalk.bgBlue.white.bold(' Iniciando conexão com o broker MQTT '))
  console.log(chalk.green.bold('✔ Servidor está conectado '))
  console.log(chalk.green.bold('✔ Desenvolvimento por ') + chalk.magenta.bold('Snarloff'))

  client.subscribe('hidroponia/data')
})

client.on('message', async (topic, message) => {
  if (topic === 'hidroponia/data') {
    console.log(chalk.bgBlue.white.bold(' Recebendo dados do sensor '))

    const tds = message.toString().split(':')[0]
    const ph = message.toString().split(':')[1]

    console.log(chalk.green.bold('✔ TDS: ') + chalk.magenta.bold(tds))
    console.log(chalk.green.bold('✔ PH: ') + chalk.magenta.bold(ph))

    await prisma.sensorsData.create({
      data: {
        tds,
        ph,
      },
    })

    console.log(chalk.bgBlue.white.bold(' Dados salvos no banco de dados '))
  }
})

client.on('close', () => {
  console.log(chalk.bgYellow.white.bold(' Conexão do broker MQTT terminada '))
})

client.on('disconnect', () => {
  console.log(chalk.bgYellow.white.bold(' O broker MQTT foi desconectado '))
})

client.on('error', (error) => {
  console.log(chalk.bgRed.white.bold(' Erro na conexão com o broker MQTT '))
  console.log(chalk.red.bold(error))
})
