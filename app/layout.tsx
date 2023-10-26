import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme/theme-provider"
import { Navbar } from "@/components/custom/navbar"
import { TasksContextProvider } from "./context"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "boardz",
  applicationName: "boardz",
  description: "Task tracker for improving your productivity",
  metadataBase: new URL("https://boardz.vercel.app/"),
  icons: {
    icon: "/favicon/favicon-32x32.png",
    shortcut: "/favicon/favicon.ico",
    apple: "/favicon/apple-touch-icon.png",
  },
  openGraph: {
    title: "boardz",
    description: "Simple task tracker for improving your productivity.",
    siteName: "boardz",
    type: "website",
    images: {
      url: "https://boardz.vercel.app/og/og_main.png",
      width: 1200,
      height: 630,
    },
  },
  twitter: {
    title: "boardz",
    description: "Simple task tracker for improving your productivity.",
    images: "https://boardz.vercel.app/og/og_main.png",
  },
  manifest: "/favicon/site.webmanifest",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <TasksContextProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <Navbar />
            <main className="main-container">{children}</main>
          </ThemeProvider>
        </TasksContextProvider>
      </body>
    </html>
  )
}
