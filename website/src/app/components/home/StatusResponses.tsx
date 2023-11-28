import { Skeleton } from '@tcc/components/ui'

export function SkeletonLoading() {
  return (
    <>
      {new Array(8).fill(null).map((_, index) => (
        <Skeleton className="rounded-lg bg-zinc-800 p-14" key={index} />
      ))}
    </>
  )
}

export function ErrorResponse() {
  return (
    <div className="rounded-lg bg-zinc-800 p-8">
      <h1 className="text-2xl text-white">Nenhuma mensagem recebida 🤷‍♀️</h1>
      <p className="text-white">Aguardando mensagens do microcontrolador...</p>
    </div>
  )
}
export function NotResults() {
  return (
    <div className="rounded-lg bg-zinc-800 p-8">
      <h1 className="text-2xl text-white">Nenhuma mensagem recebida 🤷‍♀️</h1>
      <p className="text-white">Aguardando mensagens do microcontrolador...</p>
    </div>
  )
}
