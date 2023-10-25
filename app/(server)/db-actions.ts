"use server"

import prisma from "@/db"

export type Task = {
  id: number
  title: string
  description: string
}

export async function createTask({ title, description }: Task) {
  await prisma.task.create({ data: { title: title, description: description } })
}

export async function getTasks() {
  const tasks = await prisma.task.findMany()
  return tasks
}
