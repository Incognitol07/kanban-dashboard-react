export interface Task {
    id: string
    title: string
    description: string
    status: "todo" | "in-progress" | "completed"
    priority: "low" | "medium" | "high"
    progress: number
    project: string
    assignees: string[]
    comments: number
    completedItems: number
    createdAt: string
    updatedAt: string
    completedAt?: string
    dueDate: string
    tags?: string[]
  }
  
  