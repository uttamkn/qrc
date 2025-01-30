"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion } from "framer-motion"
import { Moon, Sun } from "lucide-react"
import { Button } from "@/components/ui/button"

interface NavbarProps {
  toggleTheme: () => void
  isDarkMode: boolean
}

export function Navbar({ toggleTheme, isDarkMode }: NavbarProps) {
  const pathname = usePathname()

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Queues", path: "/queues" },
    { name: "Recursion", path: "/recursion" },
    { name: "Practice", path: "/practice" },
    { name: "Leaderboard", path: "/leaderboard" },
  ]

  return (
    <nav className="bg-background border-b border-border mb-4">
      <div className="container mx-auto px-4 py-2 flex justify-between items-center">
        <div className="flex space-x-4">
          {navItems.map((item) => (
            <Link key={item.path} href={item.path} className="relative">
              <span
                className={`text-foreground hover:text-primary transition-colors ${
                  pathname === item.path ? "text-primary" : ""
                }`}
              >
                {item.name}
              </span>
              {pathname === item.path && (
                <motion.div
                  className="absolute bottom-0 left-0 w-full h-0.5 bg-primary"
                  layoutId="underline"
                  initial={false}
                />
              )}
            </Link>
          ))}
        </div>
        <Button
          variant="outline"
          size="icon"
          onClick={toggleTheme}
          className="border-primary text-primary hover:bg-primary hover:text-primary-foreground"
        >
          {isDarkMode ? <Sun className="h-[1.2rem] w-[1.2rem]" /> : <Moon className="h-[1.2rem] w-[1.2rem]" />}
        </Button>
      </div>
    </nav>
  )
}

