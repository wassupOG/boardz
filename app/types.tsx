import { TaskStatus } from "@prisma/client"

export type ChildrenProps = {
  children: React.ReactNode
}

export type EditTaskProperty = "description" | "title"

export type Task = {
  id: string
  title: string
  description: string
  status: TaskStatus
  date: Date
}
