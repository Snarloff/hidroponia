import { Button } from '@tcc/components/ui'
import { useData } from '@tcc/providers/DataProvider'
import dayjs from 'dayjs'
import { ArrowLeftCircle, ArrowRightCircle } from 'lucide-react'

export function PaginationButtons() {
  const { date, setDate } = useData()

  return (
    <div className="flex w-full flex-col justify-between gap-2 sm:flex-row">
      <Button
        size="sm"
        variant="outline"
        onClick={() => {
          setDate(dayjs(date).subtract(1, 'day').toISOString())
          window.scrollTo({
            top: 0,
            behavior: 'smooth',
          })
        }}
      >
        <ArrowLeftCircle className="mr-2" size={18} />
        Dia Anterior
      </Button>
      <Button
        size="sm"
        variant="outline"
        onClick={() => {
          setDate(dayjs(date).add(1, 'day').toISOString())
          window.scrollTo({
            top: 0,
            behavior: 'smooth',
          })
        }}
      >
        Próxima Dia <ArrowRightCircle className="ml-2" size={18} />
      </Button>
    </div>
  )
}
