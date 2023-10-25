import { CheckCheck } from "lucide-react"
import { ThemeToggle } from "../theme/theme-toggle"
import Link from "next/link"

export function Navbar() {
  return (
    <div className="fixed top-0 w-[100%] border-b backdrop-blur-md">
      <nav className="mx-auto flex h-14 max-w-[130ch] items-center px-6">
        <Link href={"/"} className="flex items-center hover:underline">
          <CheckCheck />
          <strong className="ml-2">boardz</strong>
        </Link>
        <div className="ml-auto">
          <ThemeToggle />
        </div>
      </nav>
    </div>
  )
}
