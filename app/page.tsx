"use client"

import { Button } from "@/components/ui/button"
import { Task, createTask, getTasks } from "./(server)/db-actions"
import { useEffect, useState } from "react"
import { Card } from "@/components/ui/card"

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getTasks().then((data) => setTasks(data))
    setLoading(false)
  }, [])

  if (loading) {
    return "Loading..."
  }

  return (
    <>
      <Card className="p-5">
        <h1 className="text-center text-3xl">Planned 🕐</h1>
        {tasks.map((task) => (
          <div>
            {task.title} | {task.description}
          </div>
        ))}
      </Card>
    </>
  )
}
