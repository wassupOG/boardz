"use client"

import { DesktopBoards } from "@/components/custom/desktop-boards"
import { MobileBoards } from "@/components/custom/mobile-boards"
import { useEffect, useState } from "react"
import { Task, getTasks } from "./db-actions"

export type TaskType = "planned" | "progress" | "done"

export default function Home() {
  const [tasks, setTasks] = useState<Task[] | null>(null)

  useEffect(() => {
    getTasks().then((data) => setTasks(data))
  }, [])

  if (!tasks) {
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
