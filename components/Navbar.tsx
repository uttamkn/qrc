import Link from "next/link"
import { auth } from "@/lib/auth"
import Logout from "./Logout"
import Image from "next/image"
import ThemeToggle from "./ThemeToggle"

export async function Navbar() {
  const session = await auth()

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
              {item.name}
            </Link>
          ))}
          {!session?.user ? (
            <Link href="/sign-in">
              <div className="rounded-sm bg-blue-600 px-4 py-2 text-sm text-white">
                Login
              </div>
            </Link>
          ) : (
            <>
              <div className="flex items-center gap-x-2 text-sm">
                {session?.user?.name}
                {session?.user?.image && (
                  <Image
                    className="rounded-full"
                    width={30}
                    height={30}
                    alt="User Avatar"
                    src={session.user.image}
                  />
                )}
              </div>
              <Logout />
            </>
          )}
        </div>
        <ThemeToggle />
      </div>
    </nav>
  )
}
