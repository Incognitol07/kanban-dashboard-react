import type { Task } from "../../types/task"
import { MessageCircle, CheckCircle } from "lucide-react"

interface KanbanByStatusProps {
  tasks: Task[]
}

export default function KanbanByStatus({ tasks }: KanbanByStatusProps) {
  const todoTasks = tasks.filter((task) => task.status === "todo")
  const inProgressTasks = tasks.filter((task) => task.status === "in-progress")
  const completedTasks = tasks.filter((task) => task.status === "completed")

  return (
    <div className="board-container">
      {/* To Do Column */}
      <div className="board-column h-fit">
        <div className="board-column-header">
          <h2>
            <span className="status-dot todo"></span>To Do ({todoTasks.length})
          </h2>
        </div>
        {todoTasks.map((task) => (
          <div key={task.id} className="board-card">
            <div
              className={`card-label ${task.priority === "high" ? "label-important" : task.priority === "low" ? "label-not-important" : "label-ok"}`}
            >
              {task.priority === "high" ? "Important" : task.priority === "low" ? "Not Important" : "OK"}
            </div>
            <h3 className="text-base font-medium text-gray-900 dark:text-gray-100 mb-2">{task.title}</h3>
            <p className="card-subtitle dark:text-gray-300">
              Progress <strong>{task.progress}%</strong>
            </p>
            <div className="progress-bar">
              <div className="progress-fill" style={{ width: `${task.progress}%` }}></div>
            </div>
            <div className="flex justify-between items-center">
              <div className="flex -space-x-2">
                {task.assignees.map((assignee, index) => (
                  <div
                    key={index}
                    className="w-8 h-8 rounded-full bg-slate-200 dark:bg-slate-700 border-2 border-white dark:border-gray-800 flex items-center justify-center text-xs font-medium"
                  >
                    {assignee.substring(0, 2)}
                  </div>
                ))}
              </div>
              <div className="flex items-center gap-3 text-gray-500 dark:text-gray-400 text-sm">
                <div className="flex items-center gap-1">
                  <MessageCircle className="w-4 h-4" />
                  <span>{task.comments}</span>
                </div>
                <div className="flex items-center gap-1">
                  <CheckCircle className="w-4 h-4" />
                  <span>{task.completedItems}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* In Progress Column */}
      <div className="board-column h-fit">
        <div className="board-column-header">
          <h2>
            <span className="status-dot in-progress"></span>In Progress ({inProgressTasks.length})
          </h2>
        </div>
        {inProgressTasks.map((task) => (
          <div key={task.id} className="board-card">
            <div
              className={`card-label ${task.priority === "high" ? "label-important" : task.priority === "low" ? "label-not-important" : "label-ok"}`}
            >
              {task.priority === "high" ? "Important" : task.priority === "low" ? "Not Important" : "OK"}
            </div>
            <h3 className="text-base font-medium text-gray-900 dark:text-gray-100 mb-2">{task.title}</h3>
            <p className="card-subtitle dark:text-gray-300">
              Progress <strong>{task.progress}%</strong>
            </p>
            <div className="progress-bar">
              <div className="progress-fill" style={{ width: `${task.progress}%` }}></div>
            </div>
            <div className="flex justify-between items-center">
              <div className="flex -space-x-2">
                {task.assignees.map((assignee, index) => (
                  <div
                    key={index}
                    className="w-8 h-8 rounded-full bg-slate-200 dark:bg-slate-700 border-2 border-white dark:border-gray-800 flex items-center justify-center text-xs font-medium"
                  >
                    {assignee.substring(0, 2)}
                  </div>
                ))}
              </div>
              <div className="flex items-center gap-3 text-gray-500 dark:text-gray-400 text-sm">
                <div className="flex items-center gap-1">
                  <MessageCircle className="w-4 h-4" />
                  <span>{task.comments}</span>
                </div>
                <div className="flex items-center gap-1">
                  <CheckCircle className="w-4 h-4" />
                  <span>{task.completedItems}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Completed Column */}
      <div className="board-column h-fit">
        <div className="board-column-header">
          <h2>
            <span className="status-dot completed"></span>Completed ({completedTasks.length})
          </h2>
        </div>
        {completedTasks.map((task) => (
          <div key={task.id} className="board-card">
            <div
              className={`card-label ${task.priority === "high" ? "label-high-priority" : task.priority === "low" ? "label-not-important" : "label-ok"}`}
            >
              {task.priority === "high" ? "High Priority" : task.priority === "low" ? "Not Important" : "OK"}
            </div>
            <h3 className="text-base font-medium text-gray-900 dark:text-gray-100 mb-2">{task.title}</h3>
            <p className="card-subtitle dark:text-gray-300">Done</p>
            <div className="progress-bar">
              <div className="progress-fill" style={{ width: "100%" }}></div>
            </div>
            <div className="flex justify-between items-center">
              <div className="flex -space-x-2">
                {task.assignees.map((assignee, index) => (
                  <div
                    key={index}
                    className="w-8 h-8 rounded-full bg-slate-200 dark:bg-slate-700 border-2 border-white dark:border-gray-800 flex items-center justify-center text-xs font-medium"
                  >
                    {assignee.substring(0, 2)}
                  </div>
                ))}
              </div>
              <div className="flex items-center gap-3 text-gray-500 dark:text-gray-400 text-sm">
                <div className="flex items-center gap-1">
                  <MessageCircle className="w-4 h-4" />
                  <span>{task.comments}</span>
                </div>
                <div className="flex items-center gap-1">
                  <CheckCircle className="w-4 h-4" />
                  <span>{task.completedItems}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

