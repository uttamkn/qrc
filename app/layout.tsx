"use client"
import type React from "react"
import { Navbar } from "@/components/Navbar"
import { ThemeProvider, useTheme } from "@/components/ThemeProvider"
import "./globals.css"
import { Inter } from "next/font/google"

const inter = Inter({ subsets: ["latin"] })

function MainContent({ children }: { children: React.ReactNode }) {
  const { theme, toggleTheme } = useTheme()

  return (
    <>
      <Navbar toggleTheme={toggleTheme} isDarkMode={theme === "dark"} />
      <main className="min-h-screen bg-background text-foreground">{children}</main>
    </>
  )
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider>
          <MainContent>{children}</MainContent>
        </ThemeProvider>
      </body>
    </html>
  )
}

