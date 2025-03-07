import type { Task } from "../../types/task"
import { CheckCircle, Calendar, User, Clock } from "lucide-react"

interface KanbanTasksCompletedProps {
  tasks: Task[]
}

export default function KanbanTasksCompleted({ tasks }: KanbanTasksCompletedProps) {
  // Filter completed tasks
  const completedTasks = tasks.filter((task) => task.status === "completed")

  // Group by completion date (this week, last week, earlier)
  const today = new Date()
  const oneWeekAgo = new Date(today)
  oneWeekAgo.setDate(oneWeekAgo.getDate() - 7)
  const twoWeeksAgo = new Date(today)
  twoWeeksAgo.setDate(twoWeeksAgo.getDate() - 14)

  const thisWeekTasks = completedTasks.filter((task) => {
    const completedDate = new Date(task.completedAt || task.updatedAt)
    return completedDate >= oneWeekAgo
  })

  const lastWeekTasks = completedTasks.filter((task) => {
    const completedDate = new Date(task.completedAt || task.updatedAt)
    return completedDate >= twoWeeksAgo && completedDate < oneWeekAgo
  })

  const earlierTasks = completedTasks.filter((task) => {
    const completedDate = new Date(task.completedAt || task.updatedAt)
    return completedDate < twoWeeksAgo
  })

  // Calculate completion statistics
  const totalTasks = tasks.length
  const completionRate = totalTasks > 0 ? Math.round((completedTasks.length / totalTasks) * 100) : 0

  // Group by assignee
  const tasksByAssignee: Record<string, number> = {}
  completedTasks.forEach((task) => {
    task.assignees.forEach((assignee) => {
      if (!tasksByAssignee[assignee]) {
        tasksByAssignee[assignee] = 0
      }
      tasksByAssignee[assignee]++
    })
  })

  // Sort assignees by number of completed tasks
  const sortedAssignees = Object.keys(tasksByAssignee).sort((a, b) => tasksByAssignee[b] - tasksByAssignee[a])

  return (
    <div className="space-y-6">
      {/* Completion Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white border rounded-xl p-4 shadow-sm">
          <h3 className="text-sm font-medium text-gray-500 mb-2">Total Completed</h3>
          <div className="flex items-center gap-2">
            <CheckCircle className="h-5 w-5 text-green-500" />
            <span className="text-2xl font-bold">{completedTasks.length}</span>
            <span className="text-sm text-gray-500">tasks</span>
          </div>
        </div>

        <div className="bg-white border rounded-xl p-4 shadow-sm">
          <h3 className="text-sm font-medium text-gray-500 mb-2">Completion Rate</h3>
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 rounded-full bg-primary flex items-center justify-center text-white text-xs">%</div>
            <span className="text-2xl font-bold">{completionRate}%</span>
            <span className="text-sm text-gray-500">of all tasks</span>
          </div>
        </div>

        <div className="bg-white border rounded-xl p-4 shadow-sm">
          <h3 className="text-sm font-medium text-gray-500 mb-2">Top Performer</h3>
          <div className="flex items-center gap-2">
            <User className="h-5 w-5 text-primary" />
            <span className="text-lg font-bold">{sortedAssignees.length > 0 ? sortedAssignees[0] : "N/A"}</span>
            {sortedAssignees.length > 0 && (
              <span className="text-sm text-gray-500">({tasksByAssignee[sortedAssignees[0]]} tasks)</span>
            )}
          </div>
        </div>
      </div>

      {/* This Week */}
      {thisWeekTasks.length > 0 && (
        <div className="bg-white border rounded-xl p-4 shadow-sm">
          <div className="flex items-center gap-2 mb-4">
            <Calendar className="h-5 w-5 text-primary" />
            <h2 className="text-lg font-semibold">Completed This Week ({thisWeekTasks.length})</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {thisWeekTasks.map((task) => (
              <div key={task.id} className="border rounded-xl p-4 bg-green-50">
                <div className="flex justify-between items-start mb-2">
                  <div className="card-label label-ok">Completed</div>
                  <span className="text-green-600 text-sm font-medium flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    {new Date(task.completedAt || task.updatedAt).toLocaleDateString()}
                  </span>
                </div>
                <h3 className="text-base font-medium text-gray-900 mb-2">{task.title}</h3>
                <p className="text-sm text-gray-500 mb-3">Project: {task.project}</p>
                <div className="progress-bar">
                  <div className="progress-fill bg-green-500" style={{ width: "100%" }}></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Last Week */}
      {lastWeekTasks.length > 0 && (
        <div className="bg-white border rounded-xl p-4 shadow-sm">
          <div className="flex items-center gap-2 mb-4">
            <Calendar className="h-5 w-5 text-blue-500" />
            <h2 className="text-lg font-semibold">Completed Last Week ({lastWeekTasks.length})</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {lastWeekTasks.map((task) => (
              <div key={task.id} className="border rounded-xl p-4 bg-blue-50">
                <div className="flex justify-between items-start mb-2">
                  <div className="card-label label-ok">Completed</div>
                  <span className="text-blue-600 text-sm font-medium flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    {new Date(task.completedAt || task.updatedAt).toLocaleDateString()}
                  </span>
                </div>
                <h3 className="text-base font-medium text-gray-900 mb-2">{task.title}</h3>
                <p className="text-sm text-gray-500 mb-3">Project: {task.project}</p>
                <div className="progress-bar">
                  <div className="progress-fill bg-blue-500" style={{ width: "100%" }}></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Earlier */}
      {earlierTasks.length > 0 && (
        <div className="bg-white border rounded-xl p-4 shadow-sm">
          <div className="flex items-center gap-2 mb-4">
            <Calendar className="h-5 w-5 text-gray-500" />
            <h2 className="text-lg font-semibold">Completed Earlier ({earlierTasks.length})</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {earlierTasks.slice(0, 6).map((task) => (
              <div key={task.id} className="border rounded-xl p-4 bg-gray-50">
                <div className="flex justify-between items-start mb-2">
                  <div className="card-label label-ok">Completed</div>
                  <span className="text-gray-600 text-sm font-medium flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    {new Date(task.completedAt || task.updatedAt).toLocaleDateString()}
                  </span>
                </div>
                <h3 className="text-base font-medium text-gray-900 mb-2">{task.title}</h3>
                <p className="text-sm text-gray-500 mb-3">Project: {task.project}</p>
                <div className="progress-bar">
                  <div className="progress-fill bg-gray-500" style={{ width: "100%" }}></div>
                </div>
              </div>
            ))}
          </div>

          {earlierTasks.length > 6 && (
            <div className="flex justify-center mt-4">
              <button className="text-primary hover:text-primary/80 text-sm font-medium">
                View {earlierTasks.length - 6} more tasks
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

