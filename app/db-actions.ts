"use server"

import prisma from "@/db"

export type Task = {
  id: number
  title: string
  description: string
  status: "planned" | "progress" | "done"
}

export async function createTask({ title, description }: Task) {
  await prisma.task.create({ data: { title: title, description: description } })
}

export async function getTasks() {
  const data = await prisma.task.findMany()
  return data as Task[]
}
