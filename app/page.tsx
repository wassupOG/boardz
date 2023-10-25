"use client"

import { DesktopBoards } from "@/components/custom/desktop-boards"
import { MobileBoards } from "@/components/custom/mobile-boards"
import { useEffect, useState } from "react"
import { getTasks } from "./db-actions"
import { useTasksContext } from "./context"

export type TaskType = "planned" | "progress" | "done"

export default function Home() {
  const { tasks, setTasks } = useTasksContext()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getTasks().then((data) => setTasks(data))
    setLoading(false)
  }, [])

  if (loading) {
    return "Loading"
  } else {
    return (
      <>
        <DesktopBoards tasks={tasks} />
        <MobileBoards tasks={tasks} />
      </>
    )
  }
}
