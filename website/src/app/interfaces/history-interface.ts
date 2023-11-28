export interface HistoryData {
  error: any
  results: {
    id: string
    ph: string
    tds: string
    measuredIn: string
  }[]
}

export interface DataContextProps {
  response: {
    data: HistoryData
  }
  isLoading: boolean
  isError: boolean
  data: any
  date: string
  setData: (x: any) => void
  setDate: (x: string) => void
}
