"use client"

import { getTasks } from "./db-actions"
import { Card } from "@/components/ui/card"
import { useQuery } from "@tanstack/react-query"

export default function Home() {
  const query = useQuery({
    queryKey: ["todos"],
    queryFn: getTasks,
  })

  if (query.isLoading) {
    return <h1 className="text-center text-3xl">Loading...</h1>
  } else if (query.error) {
    return <h1 className="text-center text-3xl text-red-400">Error</h1>
  }

  return (
    <>
      <Card className="p-5">
        <h1 className="text-center text-3xl">Planned 🕐</h1>
        {query.data!.map((task) => (
          <div key={task.id}>
            {task.title} | {task.description}
          </div>
        ))}
      </Card>
    </>
  )
}
