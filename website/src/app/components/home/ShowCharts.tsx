import 'chart.js/auto'
import 'chartjs-adapter-date-fns'

import { PaginationButtons } from '@tcc/components/home/PaginationButtons'
import { Card, CardContent, CardFooter } from '@tcc/components/ui/card'
import { useData } from '@tcc/providers/DataProvider'
import { BarElement, CategoryScale, Chart as ChartJS, Legend, LinearScale, Title, Tooltip } from 'chart.js'
import { Line } from 'react-chartjs-2'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

export function ShowCharts() {
  const { data } = useData()

  return (
    <Card className="my-4 border border-backgroundGray bg-transparent">
      <CardContent>
        <div>
          <Line
            data={data}
            options={{
              plugins: {
                title: {
                  display: true,
                  text: 'Gráficos em barra - Sensores de pH e Condutividade da Água (TDS)',
                },
                legend: {
                  display: true,
                  position: 'top',
                },
              },
              responsive: true,
              interaction: {
                mode: 'index' as const,
                intersect: false,
              },
              scales: {
                x: {
                  stacked: true,
                },
                y: {
                  stacked: true,
                },
              },
            }}
          />
        </div>
      </CardContent>
      <CardFooter>
        <PaginationButtons />
      </CardFooter>
    </Card>
  )
}
