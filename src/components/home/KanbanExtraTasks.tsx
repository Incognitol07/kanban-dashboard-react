import type { Task } from "../../types/task"
import { Tag, Clock, BarChart3 } from "lucide-react"

interface KanbanExtraTasksProps {
  tasks: Task[]
}

export default function KanbanExtraTasks({ tasks }: KanbanExtraTasksProps) {
  // Group tasks by tag
  const tasksByTag = tasks.reduce(
    (acc, task) => {
      if (task.tags && task.tags.length > 0) {
        task.tags.forEach((tag) => {
          if (!acc[tag]) {
            acc[tag] = []
          }
          acc[tag].push(task)
        })
      }
      return acc
    },
    {} as Record<string, Task[]>,
  )

  // Sort tags by number of tasks (descending)
  const sortedTags = Object.keys(tasksByTag).sort((a, b) => tasksByTag[b].length - tasksByTag[a].length)

  // Get tag color based on tag name
  const getTagColor = (tag: string) => {
    const colors = {
      bug: "bg-red-100 text-red-700 border-red-300",
      feature: "bg-blue-100 text-blue-700 border-blue-300",
      enhancement: "bg-green-100 text-green-700 border-green-300",
      documentation: "bg-purple-100 text-purple-700 border-purple-300",
      design: "bg-pink-100 text-pink-700 border-pink-300",
      research: "bg-amber-100 text-amber-700 border-amber-300",
      testing: "bg-cyan-100 text-cyan-700 border-cyan-300",
      maintenance: "bg-gray-100 text-gray-700 border-gray-300",
    }

    return colors[tag.toLowerCase() as keyof typeof colors] || "bg-slate-100 text-slate-700 border-slate-300"
  }

  return (
    <div className="space-y-8">
      {sortedTags.map((tag) => (
        <div key={tag} className="border rounded-xl p-4 shadow-sm">
          <div className="flex items-center gap-2 mb-4">
            <Tag className="h-5 w-5" />
            <h2 className="text-lg font-semibold">{tag}</h2>
            <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${getTagColor(tag)}`}>
              {tasksByTag[tag].length} Tasks
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {tasksByTag[tag].map((task) => (
              <div key={task.id} className="bg-white border rounded-xl p-4 hover:shadow-md transition-shadow">
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
                <p className="text-sm text-gray-500 mb-3">Project: {task.project}</p>

                <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    <span>{new Date(task.dueDate).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <BarChart3 className="w-4 h-4" />
                    <span>{task.progress}%</span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 mt-2">
                  {task.tags &&
                    task.tags.map((taskTag, index) => (
                      <span key={index} className={`text-xs px-2 py-1 rounded-full border ${getTagColor(taskTag)}`}>
                        {taskTag}
                      </span>
                    ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

