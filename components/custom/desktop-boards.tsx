"use client"

import { AddTask } from "./add-task"
import { BoardsProps } from "./mobile-boards"
import { TaskBoard } from "./task-board"
import { TaskCard } from "./task-card"

export function DesktopBoards({ tasks }: BoardsProps) {
  return (
    <div className="hidden gap-4  md:grid md:grid-cols-2 lg:grid-cols-3">
      <TaskBoard boardType="🕜 Planned">
        <AddTask />
        {tasks.map(({ description, title, id, status }) => {
          if (status === "planned") {
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
        })}
      </TaskBoard>
      <TaskBoard boardType="⏳ In Progress">
        {tasks.map(({ description, title, id, status }) => {
          if (status === "progress") {
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
        })}
      </TaskBoard>
      <TaskBoard boardType="✅ Done">
        {tasks.map(({ description, title, id, status }) => {
          if (status === "done") {
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
        })}
      </TaskBoard>
    </div>
  )
}
