import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme/theme-provider"
import { TanstackProvider } from "./tanstack-provider"
import { Navbar } from "@/components/custom/navbar"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "boardz",
  description: "Task tracker for improving your productivity",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <TanstackProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <Navbar />
            <main className="main-container">{children}</main>
          </ThemeProvider>
        </TanstackProvider>
      </body>
    </html>
  )
}
