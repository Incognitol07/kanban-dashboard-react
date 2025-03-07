"use client"

import { createContext, useContext, useState, type ReactNode } from "react"
import type { Task } from "./types/task"

// Define the type for our application context
type AppContextType = {
  tasks: Task[]
  setTasks: (tasks: Task[]) => void
  useApi: boolean
  setUseApi: (useApi: boolean) => void
  isLoading: boolean
  setIsLoading: (isLoading: boolean) => void
  darkMode: boolean
  toggleDarkMode: () => void
}

// Create the context with default values
const AppContext = createContext<AppContextType>({
  tasks: [],
  setTasks: () => {},
  useApi: false,
  setUseApi: () => {},
  isLoading: false,
  setIsLoading: () => {},
  darkMode: false,
  toggleDarkMode: () => {},
})

// Custom hook to use the app context
export const useAppContext = () => useContext(AppContext)

// Provider component that wraps the entire application
export function AppProvider({ children }: { children: ReactNode }) {
  const [tasks, setTasks] = useState<Task[]>([])
  const [useApi, setUseApi] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [darkMode, setDarkMode] = useState(false)

  const toggleDarkMode = () => {
    setDarkMode(!darkMode)
    // Toggle the 'dark' class on the document element
    if (!darkMode) {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
    }
  }

  return (
    <AppContext.Provider
      value={{
        tasks,
        setTasks,
        useApi,
        setUseApi,
        isLoading,
        setIsLoading,
        darkMode,
        toggleDarkMode,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

