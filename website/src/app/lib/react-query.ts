import { QueryClient } from 'react-query'

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: true,
      retryDelay: 1000,
      refetchOnReconnect: true,
      cacheTime: 60000,
    },
  },
})
