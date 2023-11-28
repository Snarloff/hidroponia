'use client'

import { PaginationButtons } from '@tcc/components/home/PaginationButtons'
import { ErrorResponse, NotResults, SkeletonLoading } from '@tcc/components/home/StatusResponses'
import { ScrollArea, Skeleton } from '@tcc/components/ui'
import { useData } from '@tcc/providers/DataProvider'

import { DebounceInput } from 'react-debounce-input'

import dayjs from 'dayjs'

export function ShowMessages() {
  const { isLoading, isError, response, date, setDate } = useData()

  return (
    <div>
      <ScrollArea className="my-4 rounded-lg border border-backgroundGray p-5 shadow-zinc-800">
        {isLoading ? (
          <Skeleton className="mb-4 h-4 w-40" />
        ) : (
          <div className="my-4 flex w-full flex-col items-center justify-between md:flex-row">
            <h2 className="mb-4 text-xl font-medium text-white">{dayjs(date).format('DD/MM/YYYY')}</h2>
            <DebounceInput
              minLength={2}
              debounceTimeout={300}
              value={date}
              onChange={(e) => {
                setDate(e.target.value)
              }}
              placeholder="Pesquisar por data específica..."
              className="flex h-10 w-full max-w-md rounded-md border border-backgroundGray bg-zinc-800 px-3 py-2 text-sm text-white ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              type="datetime-local"
            />
          </div>
        )}
        <div className="flex flex-col gap-4">
          {isLoading && <SkeletonLoading />}
          {isError && <ErrorResponse />}
          {response?.data?.results?.length === 0 && <NotResults />}

          {response?.data?.results.map((result, index) => (
            <div key={index} className="cursor-pointer rounded-lg bg-zinc-800 p-8 hover:opacity-90">
              <div className="flex flex-col gap-0">
                <div className="flex w-full flex-col justify-between gap-2 md:flex-row">
                  <div className="flex flex-col items-start">
                    <h1 className="text-xl text-white">
                      Sensor de pH: <span>{result.ph}</span>
                    </h1>
                    <h1 className="text-xl text-white">
                      Sensor de condutividade: <span>{result.tds}</span>
                    </h1>
                  </div>
                  <h1 className="text-base font-medium text-muted-foreground">
                    Medido em: {dayjs(result.measuredIn).format('DD/MM/YYYY [às] HH:mm:ss')}
                  </h1>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="my-9">
          <PaginationButtons />
        </div>
      </ScrollArea>
    </div>
  )
}
