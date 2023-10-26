import { createTask } from "@/app/db-actions"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { ChangeEvent, FormEvent, useState } from "react"
import { useTasksContext } from "@/app/context"
import { Task } from "@/app/types"

type FormType = {
  title: string
  description: string
}

export function AddTask() {
  const [form, setForm] = useState<FormType>({
    title: "",
    description: "",
  })
  const { setTasks } = useTasksContext()

  function handleForm(e: ChangeEvent<HTMLInputElement>, type: string) {
    setForm({ ...form, [type]: e.target.value })
  }

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const created: Task = {
      id: crypto.randomUUID(),
      title: form.title,
      description: form.description,
      status: "planned",
      date: new Date(),
    }
    setTasks((prev) => [
      {
        id: created.id,
        title: created.title,
        description: created.description,
        status: created.status,
        date: created.date,
      },
      ...prev,
    ])
    createTask({
      id: created.id,
      title: created.title,
      description: created.description,
      status: created.status,
      date: created.date,
    })
    setForm({ title: "", description: "" })
  }

  return (
    <>
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <Input
          name="title"
          value={form.title}
          required
          placeholder="Task title..."
          onChange={(e) => handleForm(e, e.target.name)}
        />
        <div className="flex items-center gap-3">
          <Input
            name="description"
            value={form.description}
            required
            placeholder="Task description..."
            onChange={(e) => handleForm(e, e.target.name)}
          />
          <Button variant={"outline"}>Add</Button>
        </div>
      </form>
      <hr />
    </>
  )
}
