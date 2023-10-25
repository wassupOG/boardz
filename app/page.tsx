"use client"

import { DesktopBoards } from "@/components/custom/desktop-boards"
import { MobileBoards } from "@/components/custom/mobile-boards"
import { useEffect, useState } from "react"
import { Task, getTasks } from "./db-actions"

export type TaskType = "planned" | "progress" | "done"

export type Tasks = {
  id: number
  title: string
  description: string
  type: TaskType
}

export const tasks: Tasks[] = [
  {
    id: 1,
    title: "First task",
    description: "Description of the first task",
    type: "planned",
  },
  {
    id: 2,
    title: "Second task",
    description: "Description of the second task",
    type: "progress",
  },
  {
    id: 3,
    title: "Third task's title is longer",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellat dolorem dolor fuga necessitatibus distinctio in consequuntur tenetur aspernatur obcaecati. Minima rem molestias et! Expedita, neque aut asperiores cumque incidunt deleniti!",
    type: "done",
  },
]

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
        <DesktopBoards tasks={tasks as Task[]} />
        <MobileBoards tasks={tasks as Task[]} />
      </>
    )
  }
}
