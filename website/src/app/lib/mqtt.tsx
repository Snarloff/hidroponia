/* eslint-disable react-hooks/exhaustive-deps */
'use client'

import { useEffect, useRef } from 'react'
import type { MqttClient } from 'mqtt'
import * as mqtt from 'mqtt'

interface MQTTHookProps {
  topics: { topic: string; handler: (payload: any) => void }[]
  onConnect?: () => void
  onError?: (error: Error) => void
}

export const useMQTT = ({ topics, onConnect, onError }: MQTTHookProps) => {
  const clientRef = useRef<MqttClient | null>(null)

  useEffect(() => {
    if (typeof window === 'undefined') return
    if (clientRef.current) return

    clientRef.current = mqtt.connect(process.env.NEXT_PUBLIC_MQTT_URI, {
      username: process.env.NEXT_PUBLIC_MQTT_USERNAME,
      password: process.env.NEXT_PUBLIC_MQTT_PASSWORD,
      clientId: `web_${Math.random().toString(16).substring(2, 8)}}`,
      reconnectPeriod: 1000,
      keepalive: 10,
    })

    const client = clientRef.current

    topics.forEach((topic) => {
      client.subscribe(topic.topic)
    })

    client.on('message', (topic, rawPayload: any, packet) => {
      const th = topics.find((t) => t.topic === topic)
      let payload

      try {
        payload = JSON.parse(rawPayload)
      } catch {
        payload = rawPayload
      }

      if (th) th.handler({ topic, payload, packet, datetime: new Date() })
    })

    client.on('connect', () => {
      onConnect ? onConnect() : console.log('Connected with successfully! 🎉')
      client.publish('hidroponia/checklights', '1')
      client.publish('hidroponia/checkbombair', '1')
    })

    client.on('error', (err) => {
      onError ? onError(err) : console.error(err)
    })
  }, [clientRef.current])

  return { client: clientRef.current }
}
