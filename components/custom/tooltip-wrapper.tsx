import {
  TooltipProvider,
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@radix-ui/react-tooltip"

type TooltipProps = {
  content: string
  children: React.ReactNode
}

export function TooltipWrapper({ content, children }: TooltipProps) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>{children}</TooltipTrigger>
        <TooltipContent>
          <span className="mb-1 rounded-lg bg-input px-2 py-1 text-sm ">
            {content}
          </span>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
