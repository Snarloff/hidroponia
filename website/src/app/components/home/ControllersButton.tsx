'use state'

import { Button, Skeleton } from '@tcc/components/ui'
import type { MqttClient } from 'mqtt'

interface ControllersButtonProps {
  client: MqttClient | null
  lightsState: string | null
  bombairState: string | null
}

export function ControllersButton({ client, lightsState = null, bombairState = null }: ControllersButtonProps) {
  const onEventPressed = (topic: string, power: 'on' | 'off') => {
    client?.publish(`hidroponia/${topic}`, power)
    client?.publish(`hidroponia/${topic}2`, power) // O controle dois 2 altera o estado no aplicativo
  }

  return (
    <div className="mb-12 flex w-full flex-col-reverse justify-between gap-4 md:flex-row md:gap-0">
      <div className="flex w-full flex-row gap-4">
        {!lightsState && !bombairState ? (
          <>
            <Skeleton className="h-10 w-36 px-4 py-2" />
            <Skeleton className="h-10 w-36 px-4 py-2" />
          </>
        ) : (
          <>
            <Button
              variant="outline"
              className="border-backgroundGray font-semibold"
              onClick={() => {
                if (lightsState === '1') {
                  onEventPressed('growlights', 'off')
                } else {
                  onEventPressed('growlights', 'on')
                }
              }}
            >
              {lightsState === '1' ? 'Desligar' : 'Ligar'} lâmpadas de cultivo
            </Button>
            <Button
              variant="outline"
              className="border-backgroundGray font-semibold"
              onClick={() => {
                if (bombairState === '1') {
                  onEventPressed('bombair', 'off')
                } else {
                  onEventPressed('bombair', 'on')
                }
              }}
            >
              {bombairState === '1' ? 'Desligar' : 'Ligar'} bomba de ar
            </Button>
          </>
        )}
      </div>
      <div className="flex w-max flex-row gap-6 text-white">
        {lightsState === '1' ? (
          <div className="flex flex-row items-center gap-2">
            <div className="h-3 w-3 rounded-full bg-green-500" />
            <p className="whitespace-nowrap break-keep">Lâmpadas de Cultivo</p>
          </div>
        ) : (
          <div className="flex flex-row items-center gap-2">
            <div className="h-3 w-3 rounded-full bg-red-500" />
            <p className="whitespace-nowrap break-keep">Lâmpadas de Cultivo</p>
          </div>
        )}

        {bombairState === '1' ? (
          <div className="flex flex-row items-center gap-2">
            <div className="h-3 w-3 rounded-full bg-green-500" />
            <p className="whitespace-nowrap break-keep">Bomba de Ar</p>
          </div>
        ) : (
          <div className="flex flex-row items-center gap-2">
            <div className="h-3 w-3 rounded-full bg-red-500" />
            <p className="whitespace-nowrap break-keep">Bomba de Ar</p>
          </div>
        )}
      </div>
    </div>
  )
}
