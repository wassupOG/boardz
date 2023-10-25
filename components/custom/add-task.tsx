import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { ChangeEvent, FormEvent, useState } from "react"

type FormType = {
  title: string
  description: string
}

export function AddTask() {
  const [form, setForm] = useState<FormType>({
    title: "",
    description: "",
  })

  function handleForm(e: ChangeEvent<HTMLInputElement>, type: string) {
    setForm({ ...form, [type]: e.target.value })
  }

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    console.log(form)
  }

  return (
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
          placeholder="Tasl description..."
          onChange={(e) => handleForm(e, e.target.name)}
        />
        <Button variant={"outline"}>Add</Button>
      </div>
    </form>
  )
}
