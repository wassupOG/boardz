import { Button } from "../ui/button"
import { Card, CardHeader, CardDescription, CardFooter } from "../ui/card"

type TaskCardProps = {
  title: string
  description: string
}

export function TaskCard({ title, description }: TaskCardProps) {
  return (
    <Card className="text-elevated-foreground bg-elevated">
      <CardHeader>
        <div className="text-xl">{title}</div>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardFooter>
        <Button>Click!</Button>
      </CardFooter>
    </Card>
  )
}
