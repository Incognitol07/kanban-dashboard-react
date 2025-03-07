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
}

// Create the context with default values
const AppContext = createContext<AppContextType>({
  tasks: [],
  setTasks: () => {},
  useApi: false,
  setUseApi: () => {},
  isLoading: false,
  setIsLoading: () => {},
})

// Custom hook to use the app context
export const useAppContext = () => useContext(AppContext)

// Provider component that wraps the entire application
export function AppProvider({ children }: { children: ReactNode }) {
  const [tasks, setTasks] = useState<Task[]>([])
  const [useApi, setUseApi] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  return (
    <AppContext.Provider
      value={{
        tasks,
        setTasks,
        useApi,
        setUseApi,
        isLoading,
        setIsLoading,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

