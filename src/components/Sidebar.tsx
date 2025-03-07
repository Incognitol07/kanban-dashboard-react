"use client"

import { useState } from "react"
import { Link, useLocation } from "react-router-dom"
import {
  Home,
  ListChecks,
  Users,
  CuboidIcon as Cube,
  CreditCard,
  Settings,
  HelpCircle,
  Search,
  LogOut,
  User2,
} from "lucide-react"
import { Input } from "./ui/Input"

const menuItems = [
  { icon: Home, label: "Home", path: "/", count: 10 },
  { icon: ListChecks, label: "Tasks", path: "/tasks" },
  { icon: Users, label: "Users", path: "/users", count: 2 },
  { icon: Cube, label: "APIs", path: "/apis" },
  { icon: CreditCard, label: "Subscription", path: "/subscription" },
  { icon: Settings, label: "Settings", path: "/settings" },
  { icon: HelpCircle, label: "Help & Support", path: "/help" },
]

export default function Sidebar() {
  const location = useLocation()
  const [searchQuery, setSearchQuery] = useState("")

  return (
    <aside className="w-64 border-r border-slate-200 dark:border-slate-700 h-screen flex flex-col dark:bg-gray-900">
      <div className="flex flex-col h-full p-4">
        <div className="flex flex-col flex-1 gap-6">
          <div className="flex justify-center mb-4">
            <h1 className="text-xl font-bold text-primary">Kanban</h1>
          </div>

          <div className="relative">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search..."
              className="pl-8 h-9 dark:bg-gray-800 dark:border-gray-700"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <nav className="space-y-1">
            {menuItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center justify-between px-4 py-2 rounded-lg transition-colors ${
                  location.pathname === item.path
                    ? "bg-primary/10 text-primary"
                    : "hover:bg-slate-100 dark:hover:bg-gray-800"
                }`}
              >
                <div className="flex items-center gap-3">
                  <item.icon className="h-5 w-5" />
                  <span>{item.label}</span>
                </div>
                {item.count && (
                  <span className="bg-indigo-100 text-primary text-xs font-semibold px-2 py-0.5 rounded-full border border-primary dark:bg-indigo-900 dark:border-indigo-700">
                    {item.count}
                  </span>
                )}
              </Link>
            ))}
          </nav>
        </div>

        <div className="flex items-center justify-between pt-4 mt-4 border-t border-slate-200 dark:border-slate-700">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center">
              <User2 className="h-4 w-4" />
            </div>
            <span className="text-sm font-medium dark:text-gray-300">Adelodun Abraham</span>
          </div>
          <button title="Log out" className="text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-300">
            <LogOut className="h-5 w-5" />
          </button>
        </div>
      </div>
    </aside>
  )
}

