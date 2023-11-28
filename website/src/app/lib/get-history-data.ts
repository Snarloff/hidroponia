import { HistoryData } from '@tcc/interfaces/history-interface'

export async function getHistoryData(date: string) {
  try {
    const response = await fetch(`/api/data?date=${date}`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_NEEDED_TOKEN_ACCESS_BEARER}`,
      },
    })

    if (!response.ok) {
      return { error: 'Erro ao buscar dados no banco de dados 😢', data: null }
    }

    const data: HistoryData = await response.json()
    return { error: null, data }
  } catch (error: any) {
    return { error, data: null }
  }
}
