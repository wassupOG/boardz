"use client"

import {
  backToPlanned,
  backToProgress,
  deleteTask,
  finishTask,
  pushToProgress,
} from "@/app/db-actions"
import { Button } from "../ui/button"
import { Card, CardHeader, CardDescription, CardFooter } from "../ui/card"
import { useTasksContext } from "@/app/context"
import { TaskStatus } from "@prisma/client"
import { CheckCheck, ChevronLeft, Trash2 } from "lucide-react"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip"

type TaskCardProps = {
  id: string
  title: string
  description: string
  status: TaskStatus
}

export function TaskCard({ title, description, id, status }: TaskCardProps) {
  const { setTasks } = useTasksContext()
  let button
  if (status === "planned") {
    button = (
      <Button
        onClick={() => {
          setTasks((prev) =>
            prev.map((task) =>
              task.id === id ? { ...task, status: "progress" } : task,
            ),
          )
          pushToProgress(id)
        }}
      >
        Push to Current
      </Button>
    )
  } else if (status === "progress") {
    button = (
      <div className="flex w-full justify-between">
        <Button
          onClick={() => {
            setTasks((prev) =>
              prev.map((task) =>
                task.id === id ? { ...task, status: "planned" } : task,
              ),
            )
            backToPlanned(id)
          }}
          variant={"ghost"}
        >
          <ChevronLeft />
        </Button>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                onClick={() => {
                  setTasks((prev) =>
                    prev.map((task) =>
                      task.id === id ? { ...task, status: "done" } : task,
                    ),
                  )
                  finishTask(id)
                }}
              >
                <CheckCheck />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Mark as done</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    )
  } else {
    button = (
      <div className="flex w-full justify-between">
        <Button
          onClick={() => {
            setTasks((prev) =>
              prev.map((task) =>
                task.id === id ? { ...task, status: "progress" } : task,
              ),
            )
            backToProgress(id)
          }}
          variant={"ghost"}
        >
          <ChevronLeft />
        </Button>
        <Button
          onClick={() => {
            setTasks((prev) => prev.filter((task) => task.id !== id))
            deleteTask(id)
          }}
          variant={"destructive"}
        >
          <Trash2 />
        </Button>
      </div>
    )
  }
  return (
    <Card className="text-elevated-foreground bg-elevated">
      <CardHeader>
        <div className="text-xl">{title}</div>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardFooter className="flex justify-center">{button}</CardFooter>
    </Card>
  )
}
