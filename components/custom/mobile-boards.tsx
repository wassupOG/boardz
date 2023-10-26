"use client"

import { TaskType } from "@/app/page"
import { useState } from "react"
import { Button } from "../ui/button"
import { TaskBoard } from "./task-board"
import { TaskCard } from "./task-card"
import { Task } from "@/app/types"
import { AddTask } from "./add-task"

type BoardState = {
  DBvalue: TaskType
  displayedValue: "🕜 Planned" | "⏳ In Progress" | "✅ Done"
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

export type BoardsProps = {
  tasks: Task[]
}

export function MobileBoards({ tasks }: BoardsProps) {
  const [board, setBoard] = useState<BoardState>({
    DBvalue: "planned",
    displayedValue: "🕜 Planned",
  })

  return (
    <div className="block md:hidden">
      <div className="my-10 flex justify-center gap-2">
        {buttons.map((button) => (
          <Button
            key={button.DBvalue}
            className={board.DBvalue === button.DBvalue ? "bg-highlighted" : ""}
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
        {tasks.map(({ description, title, id, status }) => {
          if (status === board.DBvalue) {
            return (
              <TaskCard
                key={id}
                id={id}
                title={title}
                description={description}
                status={status}
              />
            )
          }
          if (board.DBvalue === "planned") {
            return <AddTask key={"add task"} />
          }
        })}
      </TaskBoard>
    </div>
  )
}
