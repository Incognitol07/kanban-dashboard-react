"use client"

import { useState, useEffect } from "react"
import { Search, Share, Plus, PlusCircle } from "lucide-react"
import { Button } from "../components/ui/Button"
import KanbanByStatus from "../components/home/KanbanByStatus"
import KanbanByTotalTasks from "../components/home/KanbanByTotalTasks"
import KanbanTasksDue from "../components/home/KanbanTasksDue"
import KanbanExtraTasks from "../components/home/KanbanExtraTasks"
import KanbanTasksCompleted from "../components/home/KanbanTasksCompleted"
import { fetchData } from "../lib/data"
import { useAppContext } from "../providers"

const tabs = [
  { id: "status", label: "By Status" },
  { id: "total", label: "By Total Tasks", count: 12 },
  { id: "due", label: "Tasks Due" },
  { id: "extra", label: "Extra Tasks" },
  { id: "completed", label: "Tasks Completed" },
]

const sortOptions = ["Newest", "Oldest", "Alphabetical"]

export default function HomePage() {
  const [activeTab, setActiveTab] = useState("status")
  const [sortBy, setSortBy] = useState("Newest")
  const [showSortMenu, setShowSortMenu] = useState(false)

  const { tasks, setTasks, useApi, setUseApi, isLoading, setIsLoading } = useAppContext()

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true)
      try {
        const data = await fetchData(useApi)
        setTasks(data)
      } catch (error) {
        console.error("Error loading data:", error)
      } finally {
        setIsLoading(false)
      }
    }

    loadData()
  }, [useApi, setTasks, setIsLoading])

  const sortedTasks = [...tasks].sort((a, b) => {
    if (sortBy === "Newest") {
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    } else if (sortBy === "Oldest") {
      return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
    } else {
      return a.title.localeCompare(b.title)
    }
  })

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Kanban Dashboard🃏</h1>
        <div className="flex items-center gap-3">
          <Button variant="outline" size="icon">
            <Search className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon">
            <Share className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon">
            <Plus className="h-4 w-4" />
          </Button>
          <Button>
            <PlusCircle className="h-4 w-4 mr-2" />
            Add New
          </Button>
        </div>
      </div>

      <div className="flex justify-between items-center border-b pb-2 mb-4">
        <div className="flex gap-6">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              className={`relative pb-2 ${
                activeTab === tab.id
                  ? "text-primary font-semibold border-b-2 border-primary"
                  : "text-gray-600 hover:text-primary dark:text-gray-300 dark:hover:text-primary"
              }`}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.label}
              {tab.count && (
                <span className="ml-1.5 inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-primary border border-primary dark:bg-indigo-900">
                  {tab.count}
                </span>
              )}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-600 dark:text-gray-300">Sort By</span>
          <div className="relative">
            <button
              className="flex items-center gap-1 px-3 py-1.5 text-sm border rounded-full dark:border-gray-700 dark:bg-gray-800"
              onClick={() => setShowSortMenu(!showSortMenu)}
            >
              {sortBy}
              <svg
                className={`w-4 h-4 transition-transform ${showSortMenu ? "rotate-180" : ""}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {showSortMenu && (
              <div className="absolute right-0 mt-1 w-40 bg-white border rounded-md shadow-lg z-10 dark:bg-gray-800 dark:border-gray-700">
                {sortOptions.map((option) => (
                  <button
                    key={option}
                    className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700"
                    onClick={() => {
                      setSortBy(option)
                      setShowSortMenu(false)
                    }}
                  >
                    {option}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="mb-4 flex items-center">
        <label className="flex items-center cursor-pointer">
          <input type="checkbox" checked={useApi} onChange={() => setUseApi(!useApi)} className="mr-2" />
          <span className="text-sm dark:text-gray-300">Use API instead of local data</span>
        </label>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
      ) : (
        <>
          {activeTab === "status" && <KanbanByStatus tasks={sortedTasks} />}
          {activeTab === "total" && <KanbanByTotalTasks tasks={sortedTasks} />}
          {activeTab === "due" && <KanbanTasksDue tasks={sortedTasks} />}
          {activeTab === "extra" && <KanbanExtraTasks tasks={sortedTasks} />}
          {activeTab === "completed" && <KanbanTasksCompleted tasks={sortedTasks} />}
        </>
      )}
    </div>
  )
}

