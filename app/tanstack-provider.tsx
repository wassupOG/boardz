"use client"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"

type QueryProps = {
  children: React.ReactNode
}

export function TanstackProvider({ children }: QueryProps) {
  const queryClient = new QueryClient()
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  )
}
