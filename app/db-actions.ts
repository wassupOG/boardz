"use server"

import prisma from "@/db"
import { Task } from "./types"

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

export async function pushToProgress(id: string) {
  await prisma.task.update({
    where: {
      id: id,
    },
    data: {
      status: "progress",
    },
  })
}

export async function finishTask(id: string) {
  await prisma.task.update({
    where: {
      id: id,
    },
    data: {
      status: "done",
    },
  })
}

export async function backToProgress(id: string) {
  await prisma.task.update({
    where: {
      id: id,
    },
    data: {
      status: "progress",
    },
  })
}

export async function backToPlanned(id: string) {
  await prisma.task.update({
    where: {
      id: id,
    },
    data: {
      status: "planned",
    },
  })
}

export async function getTasks() {
  const data = await prisma.task.findMany()
  return data as Task[]
}
