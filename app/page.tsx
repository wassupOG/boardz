"use client"

import { TaskBoard } from "@/components/custom/task-board"
import { TaskCard } from "@/components/custom/task-card"
import { Button } from "@/components/ui/button"
import { useState } from "react"

type TaskType = "planned" | "progress" | "done"
type DisplayedType = "🕜 Planned" | "⏳ In Progress" | "✅ Done"

type Tasks = {
  id: number
  title: string
  description: string
  type: TaskType
}

const tasks: Tasks[] = [
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

type BoardState = {
  DBvalue: TaskType
  displayedValue: DisplayedType
}

const buttons: BoardState[] = [
  {
    displayedValue: "🕜 Planned",
    DBvalue: "planned",
  },
  {
    displayedValue: "⏳ In Progress",
    DBvalue: "progress",
  },
  {
    displayedValue: "✅ Done",
    DBvalue: "done",
  },
]

export default function Home() {
  const [board, setBoard] = useState<BoardState>({
    DBvalue: "planned",
    displayedValue: "🕜 Planned",
  })
  return (
    <>
      <div className="hidden gap-4  md:grid md:grid-cols-2 lg:grid-cols-3">
        <TaskBoard boardType="🕜 Planned">
          {tasks.map(({ description, title, id, type }) => {
            if (type === "planned") {
              return (
                <TaskCard key={id} title={title} description={description} />
              )
            }
          })}
        </TaskBoard>
        <TaskBoard boardType="⏳ In Progress">
          {tasks.map(({ description, title, id, type }) => {
            if (type === "progress") {
              return (
                <TaskCard key={id} title={title} description={description} />
              )
            }
          })}
        </TaskBoard>
        <TaskBoard boardType="✅ Done">
          {tasks.map(({ description, title, id, type }) => {
            if (type === "done") {
              return (
                <TaskCard key={id} title={title} description={description} />
              )
            }
          })}
        </TaskBoard>
      </div>
      <div className="block md:hidden">
        <div className="my-10 flex justify-center gap-3">
          {buttons.map((button) => (
            <Button
              key={button.DBvalue}
              className={
                board.DBvalue === button.DBvalue ? "bg-highlighted" : ""
              }
              value={button.DBvalue}
              variant={"ghost"}
              onClick={() =>
                setBoard({
                  DBvalue: button.DBvalue,
                  displayedValue: button.displayedValue,
                })
              }
            >
              {button.displayedValue}
            </Button>
          ))}
        </div>
        <TaskBoard boardType={board.displayedValue}>
          {tasks.map(({ description, title, id, type }) => {
            if (type === board.DBvalue) {
              return (
                <TaskCard key={id} title={title} description={description} />
              )
            }
          })}
        </TaskBoard>
      </div>
    </>
  )
}
