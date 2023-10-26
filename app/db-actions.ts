"use server"

import prisma from "@/db"
import { EditTaskProperty, Task } from "./types"
import { TaskType } from "./page"

export async function getTasks() {
  const data = await prisma.task.findMany({
    orderBy: {
      date: "desc",
    },
  })
  return data as Task[]
}

export async function createTask({
  id,
  title,
  description,
  status,
  date,
}: Task) {
  await prisma.task.create({
    data: {
      id: id,
      title: title,
      description: description,
      status: status,
      date: date,
    },
  })
}

export async function deleteTask(id: string) {
  await prisma.task.delete({ where: { id: id } })
}

export async function changeStatus(id: string, newStatus: TaskType) {
  await prisma.task.update({
    where: {
      id: id,
    },
    data: {
      status: newStatus,
    },
  })
}

export async function editTask(
  id: string,
  newValue: string,
  property: EditTaskProperty,
) {
  await prisma.task.update({
    where: {
      id: id,
    },
    data: {
      [property]: newValue,
    },
  })
}
