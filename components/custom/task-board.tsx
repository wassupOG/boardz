import { Card, CardTitle } from "../ui/card"

type TaskBoardProps = {
  children: React.ReactNode
  boardType: string
}

export function TaskBoard({ children, boardType }: TaskBoardProps) {
  return (
    <Card className="p-5">
      <CardTitle className="text-center text-2xl">{boardType}</CardTitle>
      <div className="mt-8 flex flex-col gap-5">{children}</div>
    </Card>
  )
}
