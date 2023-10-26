"use client"

import { deleteTask, changeStatus, editTask } from "@/app/db-actions"
import { Button } from "../ui/button"
import { Card, CardHeader, CardDescription, CardFooter } from "../ui/card"
import { useTasksContext } from "@/app/context"
import { CheckCheck, ChevronLeft, Play, Trash2 } from "lucide-react"
import { Input } from "../ui/input"
import { ChangeEvent, FocusEvent, useState } from "react"
import { TooltipWrapper } from "./tooltip-wrapper"
import { EditTaskProperty, Task } from "@/app/types"

export function TaskCard({ title, description, id, status, date }: Task) {
  const [editing, setEditing] = useState({ title: false, description: false })
  const { setTasks } = useTasksContext()

  function getDate(date: Date) {
    const newDate = new Date(date)
    const month = newDate.toLocaleString("default", { month: "short" })
    const day = newDate.getDate()
    return `${month} ${day}`
  }

  function handleChange(
    e: ChangeEvent<HTMLInputElement>,
    id: string,
    property: EditTaskProperty,
  ) {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, [property]: e.target.value } : task,
      ),
    )
  }

  function handleSave(
    e: FocusEvent<HTMLInputElement, Element>,
    id: string,
    property: EditTaskProperty,
  ) {
    editTask(id, e.target.value, property)
    setEditing({ title: false, description: false })
  }

  let buttons
  if (status === "planned") {
    buttons = (
      <div className="flex w-full justify-between">
        <TooltipWrapper content="Delete task">
          <Button
            onClick={() => {
              setTasks((prev) => prev.filter((task) => task.id !== id))
              deleteTask(id)
            }}
            variant={"destructive"}
          >
            <Trash2 />
          </Button>
        </TooltipWrapper>

        <TooltipWrapper content="Push to current tasks">
          <Button
            onClick={() => {
              setTasks((prev) =>
                prev.map((task) =>
                  task.id === id ? { ...task, status: "progress" } : task,
                ),
              )
              changeStatus(id, "progress")
            }}
          >
            <Play />
          </Button>
        </TooltipWrapper>
      </div>
    )
  } else if (status === "progress") {
    buttons = (
      <div className="flex w-full justify-between">
        <TooltipWrapper content="Put back to planned tasks">
          <Button
            onClick={() => {
              setTasks((prev) =>
                prev.map((task) =>
                  task.id === id ? { ...task, status: "planned" } : task,
                ),
              )
              changeStatus(id, "planned")
            }}
            variant={"ghost"}
          >
            <ChevronLeft />
          </Button>
        </TooltipWrapper>

        <TooltipWrapper content="Mark as finished">
          <Button
            onClick={() => {
              setTasks((prev) =>
                prev.map((task) =>
                  task.id === id ? { ...task, status: "done" } : task,
                ),
              )
              changeStatus(id, "done")
            }}
          >
            <CheckCheck />
          </Button>
        </TooltipWrapper>
      </div>
    )
  } else {
    buttons = (
      <div className="flex w-full justify-between">
        <TooltipWrapper content="Put back to current tasks">
          <Button
            onClick={() => {
              setTasks((prev) =>
                prev.map((task) =>
                  task.id === id ? { ...task, status: "progress" } : task,
                ),
              )
              changeStatus(id, "progress")
            }}
            variant={"ghost"}
          >
            <ChevronLeft />
          </Button>
        </TooltipWrapper>

        <TooltipWrapper content="Delete task">
          <Button
            onClick={() => {
              setTasks((prev) => prev.filter((task) => task.id !== id))
              deleteTask(id)
            }}
            variant={"destructive"}
          >
            <Trash2 />
          </Button>
        </TooltipWrapper>
      </div>
    )
  }
  return (
    <Card className="text-elevated-foreground relative bg-elevated pt-5">
      <div className=" absolute right-4 top-4 text-sm text-muted-foreground">
        {getDate(date)}
      </div>
      <CardHeader>
        <div className="text-xl">
          {status === "done" ? (
            <span className="line-through">{title}</span>
          ) : editing.title ? (
            <Input
              autoFocus
              onBlur={(e) => handleSave(e, id, "title")}
              onChange={(e) => handleChange(e, id, "title")}
              value={title}
            />
          ) : (
            <TooltipWrapper content="Click to edit title">
              <div
                onClick={() => setEditing({ ...editing, title: true })}
                className="rounded-md p-1 hover:cursor-text hover:bg-input"
              >
                {title}
              </div>
            </TooltipWrapper>
          )}
        </div>
        <CardDescription>
          {status === "done" ? (
            <span className="line-through">{description}</span>
          ) : editing.description ? (
            <Input
              autoFocus
              onBlur={(e) => handleSave(e, id, "description")}
              onChange={(e) => handleChange(e, id, "description")}
              value={description}
            />
          ) : (
            <TooltipWrapper content="Click to edit description">
              <div
                onClick={() => setEditing({ ...editing, description: true })}
                className="rounded-md p-1 hover:cursor-text hover:bg-input"
              >
                {description}
              </div>
            </TooltipWrapper>
          )}
        </CardDescription>
      </CardHeader>
      <CardFooter className="flex justify-center">{buttons}</CardFooter>
    </Card>
  )
}
