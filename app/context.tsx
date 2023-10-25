"use client"

import {
  Dispatch,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from "react"
import { ChildrenProps, Task } from "./types"

type TasksContextType = {
  tasks: Task[]
  setTasks: Dispatch<SetStateAction<Task[]>>
}

export const TasksContext = createContext<TasksContextType | null>(null)

export function TasksContextProvider({ children }: ChildrenProps) {
  const [tasks, setTasks] = useState<Task[]>([])

  const contextValue = {
    tasks: tasks,
    setTasks: setTasks,
  }

  return (
    <TasksContext.Provider value={contextValue}>
      {children}
    </TasksContext.Provider>
  )
}

export function useTasksContext() {
  const context = useContext(TasksContext)
  if (!context) {
    throw new Error("useTasksContext must be used within ThemeContextProvider!")
  }
  return context
}
