import type { Task } from "../../types/task"
import { MessageCircle, CheckCircle, Users, Clock } from "lucide-react"

interface KanbanByTotalTasksProps {
  tasks: Task[]
}

export default function KanbanByTotalTasks({ tasks }: KanbanByTotalTasksProps) {
  // Group tasks by project
  const tasksByProject = tasks.reduce(
    (acc, task) => {
      if (!acc[task.project]) {
        acc[task.project] = []
      }
      acc[task.project].push(task)
      return acc
    },
    {} as Record<string, Task[]>,
  )

  // Sort projects by number of tasks (descending)
  const sortedProjects = Object.keys(tasksByProject).sort((a, b) => tasksByProject[b].length - tasksByProject[a].length)

  return (
    <div className="space-y-6">
      {sortedProjects.map((project) => (
        <div key={project} className="bg-white rounded-xl border shadow-sm p-4">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">{project}</h2>
            <div className="flex items-center gap-2 text-sm">
              <span className="bg-primary/10 text-primary px-2 py-1 rounded-full">
                {tasksByProject[project].length} Tasks
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {tasksByProject[project].map((task) => (
              <div key={task.id} className="border rounded-xl p-4 hover:shadow-md transition-shadow">
                <div className="flex justify-between items-start mb-2">
                  <div
                    className={`card-label ${task.priority === "high" ? "label-important" : task.priority === "low" ? "label-not-important" : "label-ok"}`}
                  >
                    {task.priority === "high" ? "Important" : task.priority === "low" ? "Not Important" : "OK"}
                  </div>
                  <span
                    className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                      task.status === "completed"
                        ? "bg-green-100 text-green-800"
                        : task.status === "in-progress"
                          ? "bg-amber-100 text-amber-800"
                          : "bg-blue-100 text-blue-800"
                    }`}
                  >
                    {task.status === "completed"
                      ? "Completed"
                      : task.status === "in-progress"
                        ? "In Progress"
                        : "To Do"}
                  </span>
                </div>

                <h3 className="text-base font-medium text-gray-900 mb-2">{task.title}</h3>

                <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                  <div className="flex items-center gap-1">
                    <Users className="w-4 h-4" />
                    <span>{task.assignees.length}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    <span>{new Date(task.dueDate).toLocaleDateString()}</span>
                  </div>
                </div>

                <div className="flex justify-between items-center">
                  <div className="flex -space-x-2">
                    {task.assignees.slice(0, 3).map((assignee, index) => (
                      <div
                        key={index}
                        className="w-7 h-7 rounded-full bg-slate-200 border-2 border-white flex items-center justify-center text-xs font-medium"
                      >
                        {assignee.substring(0, 2)}
                      </div>
                    ))}
                    {task.assignees.length > 3 && (
                      <div className="w-7 h-7 rounded-full bg-slate-300 border-2 border-white flex items-center justify-center text-xs font-medium">
                        +{task.assignees.length - 3}
                      </div>
                    )}
                  </div>
                  <div className="flex items-center gap-3 text-gray-500 text-sm">
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
      ))}
    </div>
  )
}

