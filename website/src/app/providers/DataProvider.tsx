import { useToast } from '@tcc/components/ui'
import { DataContextProps } from '@tcc/interfaces/history-interface'
import { getHistoryData } from '@tcc/lib/get-history-data'

import { createContext, useContext, useState } from 'react'
import { useQuery } from 'react-query'

import dayjs from 'dayjs'

export const DataContext = createContext<DataContextProps>({} as DataContextProps)
export const useData = () => useContext(DataContext)

export function DataProvider({ children }: { children: React.ReactNode }) {
  const { toast } = useToast()
  const [date, setDate] = useState(new Date().toISOString())

  const [data, setData] = useState<any>({
    labels: [],
    datasets: [
      {
        label: 'Sensor TDS',
        data: [],
        backgroundColor: 'rgba(192, 75, 192, 0.2)',
        borderColor: 'rgba(192, 75, 192, 1)',
        borderWidth: 1,
        fill: true,
        barThickness: 20,
      },
      {
        label: 'Sensor de pH',
        data: [],
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderWidth: 1,
        fill: true,
        barThickness: 20,
      },
    ],
  })

  const {
    data: response,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['historyData', date],
    queryFn: () => getHistoryData(date),
    retry: 5,
    retryDelay: 1000,
    refetchInterval: 15000, // 15 segundos
    onError: () => {
      toast({
        title: 'Erro ao buscar dados no banco de dados 😢',
        description: 'Tente novamente mais tarde.',
        variant: 'destructive',
      })
    },
    onSuccess(response) {
      const timeLabels = response.data?.results.map((data) => dayjs(data.measuredIn).format('YYYY/MM/DD HH:mm:ss')) as string[]
      const tdsValues = response.data?.results.map((data) => parseFloat(data.tds))
      const phValues = response.data?.results.map((data) => parseFloat(data.ph))

      setData({
        labels: timeLabels,
        datasets: [
          { ...data.datasets[0], data: tdsValues, stack: 'Stack 0' },
          { ...data.datasets[1], data: phValues, stack: 'Stack 1' },
        ],
      })
    },
  })
  return (
    <DataContext.Provider value={{ response: response as any, isLoading, isError, data, date, setData, setDate }}>
      {children}
    </DataContext.Provider>
  )
}
