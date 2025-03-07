import type { Task } from "../../types/task"
import { Calendar, Clock, AlertCircle } from "lucide-react"

interface KanbanTasksDueProps {
  tasks: Task[]
}

export default function KanbanTasksDue({ tasks }: KanbanTasksDueProps) {
  // Get current date
  const today = new Date()
  today.setHours(0, 0, 0, 0)

  // Calculate tomorrow's date
  const tomorrow = new Date(today)
  tomorrow.setDate(tomorrow.getDate() + 1)

  // Calculate next week's date
  const nextWeek = new Date(today)
  nextWeek.setDate(nextWeek.getDate() + 7)

  // Filter tasks by due date
  const overdueTasks = tasks.filter((task) => {
    const dueDate = new Date(task.dueDate)
    dueDate.setHours(0, 0, 0, 0)
    return dueDate < today && task.status !== "completed"
  })

  const dueTodayTasks = tasks.filter((task) => {
    const dueDate = new Date(task.dueDate)
    dueDate.setHours(0, 0, 0, 0)
    return dueDate.getTime() === today.getTime() && task.status !== "completed"
  })

  const dueTomorrowTasks = tasks.filter((task) => {
    const dueDate = new Date(task.dueDate)
    dueDate.setHours(0, 0, 0, 0)
    return dueDate.getTime() === tomorrow.getTime() && task.status !== "completed"
  })

  const dueThisWeekTasks = tasks.filter((task) => {
    const dueDate = new Date(task.dueDate)
    dueDate.setHours(0, 0, 0, 0)
    return dueDate > tomorrow && dueDate <= nextWeek && task.status !== "completed"
  })

  return (
    <div className="space-y-8">
      {/* Overdue Tasks */}
      {overdueTasks.length > 0 && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-4">
            <AlertCircle className="text-red-500 h-5 w-5" />
            <h2 className="text-lg font-semibold text-red-700">Overdue Tasks ({overdueTasks.length})</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {overdueTasks.map((task) => (
              <div key={task.id} className="bg-white border border-red-200 rounded-xl p-4 shadow-sm">
                <div className="flex justify-between items-start mb-2">
                  <div className="card-label label-important">Overdue</div>
                  <span className="text-red-600 text-sm font-medium flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    {new Date(task.dueDate).toLocaleDateString()}
                  </span>
                </div>
                <h3 className="text-base font-medium text-gray-900 mb-2">{task.title}</h3>
                <p className="text-sm text-gray-500 mb-3">Project: {task.project}</p>
                <div className="progress-bar">
                  <div className="progress-fill bg-red-500" style={{ width: `${task.progress}%` }}></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Due Today Tasks */}
      {dueTodayTasks.length > 0 && (
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-4">
            <Calendar className="text-amber-500 h-5 w-5" />
            <h2 className="text-lg font-semibold text-amber-700">Due Today ({dueTodayTasks.length})</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {dueTodayTasks.map((task) => (
              <div key={task.id} className="bg-white border border-amber-200 rounded-xl p-4 shadow-sm">
                <div className="flex justify-between items-start mb-2">
                  <div
                    className={`card-label ${task.priority === "high" ? "label-important" : task.priority === "low" ? "label-not-important" : "label-ok"}`}
                  >
                    {task.priority === "high" ? "Important" : task.priority === "low" ? "Not Important" : "OK"}
                  </div>
                  <span className="text-amber-600 text-sm font-medium flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    Today
                  </span>
                </div>
                <h3 className="text-base font-medium text-gray-900 mb-2">{task.title}</h3>
                <p className="text-sm text-gray-500 mb-3">Project: {task.project}</p>
                <div className="progress-bar">
                  <div className="progress-fill" style={{ width: `${task.progress}%` }}></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Due Tomorrow Tasks */}
      {dueTomorrowTasks.length > 0 && (
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-4">
            <Calendar className="text-blue-500 h-5 w-5" />
            <h2 className="text-lg font-semibold text-blue-700">Due Tomorrow ({dueTomorrowTasks.length})</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {dueTomorrowTasks.map((task) => (
              <div key={task.id} className="bg-white border border-blue-200 rounded-xl p-4 shadow-sm">
                <div className="flex justify-between items-start mb-2">
                  <div
                    className={`card-label ${task.priority === "high" ? "label-important" : task.priority === "low" ? "label-not-important" : "label-ok"}`}
                  >
                    {task.priority === "high" ? "Important" : task.priority === "low" ? "Not Important" : "OK"}
                  </div>
                  <span className="text-blue-600 text-sm font-medium flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    Tomorrow
                  </span>
                </div>
                <h3 className="text-base font-medium text-gray-900 mb-2">{task.title}</h3>
                <p className="text-sm text-gray-500 mb-3">Project: {task.project}</p>
                <div className="progress-bar">
                  <div className="progress-fill" style={{ width: `${task.progress}%` }}></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Due This Week Tasks */}
      {dueThisWeekTasks.length > 0 && (
        <div className="bg-green-50 border border-green-200 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-4">
            <Calendar className="text-green-500 h-5 w-5" />
            <h2 className="text-lg font-semibold text-green-700">Due This Week ({dueThisWeekTasks.length})</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {dueThisWeekTasks.map((task) => (
              <div key={task.id} className="bg-white border border-green-200 rounded-xl p-4 shadow-sm">
                <div className="flex justify-between items-start mb-2">
                  <div
                    className={`card-label ${task.priority === "high" ? "label-important" : task.priority === "low" ? "label-not-important" : "label-ok"}`}
                  >
                    {task.priority === "high" ? "Important" : task.priority === "low" ? "Not Important" : "OK"}
                  </div>
                  <span className="text-green-600 text-sm font-medium flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    {new Date(task.dueDate).toLocaleDateString()}
                  </span>
                </div>
                <h3 className="text-base font-medium text-gray-900 mb-2">{task.title}</h3>
                <p className="text-sm text-gray-500 mb-3">Project: {task.project}</p>
                <div className="progress-bar">
                  <div className="progress-fill" style={{ width: `${task.progress}%` }}></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

