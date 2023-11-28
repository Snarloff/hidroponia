import { prisma } from '@tcc/lib/database'

process.env.TZ = 'America/Sao_Paulo'

export async function GET(request: Request) {
  const header = request.headers.get('Authorization')

  if (!header || header !== `Bearer ${process.env.NEXT_PUBLIC_API_NEEDED_TOKEN_ACCESS_BEARER}`) {
    return new Response(JSON.stringify({ error: 'Missing authorization header' }), { status: 400 })
  }

  const dateParam = new URL(request.url).searchParams.get('date')
  const specificDate = dateParam ? new Date(dateParam) : new Date()

  const startOfDay = new Date(specificDate)
  startOfDay.setHours(0, 0, 0, 0)

  const endOfDay = new Date(specificDate)
  endOfDay.setHours(23, 59, 59, 999)

  const results = await prisma.sensorsData.findMany({
    where: {
      measuredIn: {
        gte: startOfDay,
        lt: endOfDay,
      },
    },
    orderBy: {
      measuredIn: 'desc',
    },
  })

  return new Response(JSON.stringify({ results }), { status: 200 })
}
