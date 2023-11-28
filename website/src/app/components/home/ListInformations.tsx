'use client'

import { ControllersButton } from '@tcc/components/home/ControllersButton'
import { ShowCharts } from '@tcc/components/home/ShowCharts'
import { ShowMessages } from '@tcc/components/home/ShowMessages'
import { useToast } from '@tcc/components/ui'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@tcc/components/ui/tabs'

import { useMQTT } from '@tcc/lib/mqtt'
import { queryClient } from '@tcc/lib/react-query'
import { DataProvider } from '@tcc/providers/DataProvider'

import { useState } from 'react'

export function ListInformations() {
  const [lightsState, setLightsState] = useState('' as string) // ['0', '1']
  const [bombairState, setBombairState] = useState('' as string) // ['0', '1']

  const { toast } = useToast()
  const { client } = useMQTT({
    topics: [
      {
        topic: 'hidroponia/data',
        handler: async ({ payload }) => {
          if (!payload) return

          const tds = payload.toString().split(':')[0]
          const ph = payload.toString().split(':')[1]

          toast({
            title: 'Recebemos mais informações dos sensores 🎉',
            description: `pH: ${ph} - TDS: ${tds}`,
          })

          await queryClient.refetchQueries(['historyData'], { active: true })
        },
      },
      {
        topic: 'hidroponia/growlightsAlert',
        handler: ({ _, payload }) => {
          setLightsState(payload.toString())
        },
      },
      {
        topic: 'hidroponia/bombairAlert',
        handler: ({ _, payload }) => {
          setBombairState(payload.toString())
        },
      },
      {
        topic: 'hidroponia/growlights', // O controle 1 altera o estado no ESP32 (no aplicativo não)
        handler: () => {
          // comentário
        },
      },
      {
        topic: 'hidroponia/growlights2', // O controle 2 altera o estado no aplicativo (não manipula o ESP32)
        handler: () => {
          // comentário
        },
      },
      {
        topic: 'hidroponia/bombair', // O controle 1 altera o estado no ESP32 (no aplicativo não)
        handler: () => {
          // comentário
        },
      },
      {
        topic: 'hidroponia/bombair2', // O controle 2 altera o estado no aplicativo (não manipula o ESP32)
        handler: () => {
          // comentário
        },
      },
    ],
    onConnect: () => {
      toast({
        title: 'Conectado ao protocolo MQTT 🎉',
      })
    },
    onError: (error) => {
      toast({
        title: 'Erro ao conectar ao protocolo MQTT 😢',
        description: error.message,
        variant: 'destructive',
      })
    },
  })

  return (
    <DataProvider>
      <section className="container mx-auto my-12">
        <ControllersButton client={client} lightsState={lightsState} bombairState={bombairState} />

        <Tabs defaultValue="data" className="w-full">
          <TabsList>
            <TabsTrigger value="data" className="font-medium">
              Dados em tempo real
            </TabsTrigger>
            <TabsTrigger value="charts" className="font-medium">
              Gráficos
            </TabsTrigger>
          </TabsList>
          <TabsContent value="data" className="my-4">
            <ShowMessages />
          </TabsContent>
          <TabsContent value="charts">
            <ShowCharts />
          </TabsContent>
        </Tabs>
      </section>
    </DataProvider>
  )
}
