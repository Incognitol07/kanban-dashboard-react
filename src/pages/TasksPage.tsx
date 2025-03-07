import { useState } from 'react';
import { ListChecks, Plus, Search, Filter, Calendar, CheckCircle, ArrowUpDown, MoreHorizontal } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';

// Sample task data
const tasks = [
  {
    id: 1,
    title: "Redesign dashboard UI",
    status: "In Progress",
    priority: "High",
    dueDate: "2023-12-20",
    assignee: "John Doe",
    tags: ["Design", "UI/UX"],
    completion: 65
  },
  {
    id: 2,
    title: "Implement authentication flow",
    status: "To Do",
    priority: "High",
    dueDate: "2023-12-22",
    assignee: "Sarah Lee",
    tags: ["Backend", "Security"],
    completion: 0
  },
  {
    id: 3,
    title: "Create API documentation",
    status: "Completed",
    priority: "Medium",
    dueDate: "2023-12-15",
    assignee: "Mike Johnson",
    tags: ["Documentation"],
    completion: 100
  },
  {
    id: 4,
    title: "Fix responsive layout issues",
    status: "In Progress",
    priority: "Medium",
    dueDate: "2023-12-18",
    assignee: "Emily Chen",
    tags: ["Frontend", "Bug"],
    completion: 40
  },
  {
    id: 5,
    title: "Optimize database queries",
    status: "To Do",
    priority: "High",
    dueDate: "2023-12-23",
    assignee: "Alex Rodriguez",
    tags: ["Backend", "Performance"],
    completion: 0
  },
  {
    id: 6,
    title: "Set up CI/CD pipeline",
    status: "Completed",
    priority: "High",
    dueDate: "2023-12-10",
    assignee: "John Doe",
    tags: ["DevOps"],
    completion: 100
  },
  {
    id: 7,
    title: "Implement dark mode",
    status: "In Progress",
    priority: "Low",
    dueDate: "2023-12-25",
    assignee: "Sarah Lee",
    tags: ["Frontend", "Feature"],
    completion: 75
  }
];

// Status color mapping
const statusColors: Record<string, string> = {
  "To Do": "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300",
  "In Progress": "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300",
  "Completed": "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300"
};

// Priority color mapping
const priorityColors: Record<string, string> = {
  "High": "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300",
  "Medium": "bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300",
  "Low": "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300"
};

export default function TasksPage() {
  const [activeTab, setActiveTab] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  
  // Filter tasks based on active tab
  const filteredTasks = tasks.filter(task => {
    if (activeTab === "all") return true;
    if (activeTab === "todo") return task.status === "To Do";
    if (activeTab === "inprogress") return task.status === "In Progress";
    if (activeTab === "completed") return task.status === "Completed";
    return true;
  }).filter(task => 
    task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    task.assignee.toLowerCase().includes(searchQuery.toLowerCase()) ||
    task.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <ListChecks className="h-6 w-6 text-primary" />
          <h1 className="text-2xl font-bold">Tasks</h1>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Add Task
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="col-span-1 md:col-span-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <Input 
              placeholder="Search tasks..." 
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="w-full">
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </Button>
          <Button variant="outline">
            <ArrowUpDown className="h-4 w-4" />
          </Button>
        </div>
      </div>
      
      <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
        <button 
          className={`tab-button ${activeTab === 'all' ? 'active' : ''}`}
          onClick={() => setActiveTab('all')}
        >
          All Tasks ({tasks.length})
        </button>
        <button 
          className={`tab-button ${activeTab === 'todo' ? 'active' : ''}`}
          onClick={() => setActiveTab('todo')}
        >
          To Do ({tasks.filter(t => t.status === "To Do").length})
        </button>
        <button 
          className={`tab-button ${activeTab === 'inprogress' ? 'active' : ''}`}
          onClick={() => setActiveTab('inprogress')}
        >
          In Progress ({tasks.filter(t => t.status === "In Progress").length})
        </button>
        <button 
          className={`tab-button ${activeTab === 'completed' ? 'active' : ''}`}
          onClick={() => setActiveTab('completed')}
        >
          Completed ({tasks.filter(t => t.status === "Completed").length})
        </button>
      </div>
      
      <div className="bg-white dark:bg-gray-800 rounded-xl border dark:border-gray-700 overflow-hidden">
        <div className="grid grid-cols-12 gap-4 p-4 border-b dark:border-gray-700 bg-gray-50 dark:bg-gray-900 font-medium text-sm">
          <div className="col-span-5">Task</div>
          <div className="col-span-2">Status</div>
          <div className="col-span-1">Priority</div>
          <div className="col-span-2">Due Date</div>
          <div className="col-span-1">Assignee</div>
          <div className="col-span-1"></div>
        </div>
        
        {filteredTasks.length > 0 ? (
          <div className="divide-y dark:divide-gray-700">
            {filteredTasks.map(task => (
              <div key={task.id} className="grid grid-cols-12 gap-4 p-4 items-center hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                <div className="col-span-5">
                  <div className="flex items-center gap-3">
                    <div className={`w-5 h-5 rounded-full flex items-center justify-center ${
                      task.status === "Completed" 
                        ? "bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400" 
                        : "border-2 border-gray-300 dark:border-gray-600"
                    }`}>
                      {task.status === "Completed" && <CheckCircle className="w-4 h-4" />}
                    </div>
                    <div>
                      <h3 className="font-medium dark:text-white">{task.title}</h3>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {task.tags.map((tag, idx) => (
                          <span key={idx} className="text-xs px-2 py-0.5 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded-full">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-span-2">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusColors[task.status]}`}>
                    {task.status}
                  </span>
                </div>
                <div className="col-span-1">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${priorityColors[task.priority]}`}>
                    {task.priority}
                  </span>
                </div>
                <div className="col-span-2 flex items-center gap-2 text-gray-600 dark:text-gray-300">
                  <Calendar className="w-4 h-4" />
                  <span>{new Date(task.dueDate).toLocaleDateString()}</span>
                </div>
                <div className="col-span-1">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xs font-medium">
                      {task.assignee.split(' ').map(n => n[0]).join('')}
                    </div>
                  </div>
                </div>
                <div className="col-span-1 text-right">
                  <button className="p-1 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700">
                    <MoreHorizontal className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-8 text-center text-gray-500 dark:text-gray-400">
            <ListChecks className="w-12 h-12 mx-auto mb-4 text-gray-300 dark:text-gray-600" />
            <h3 className="text-lg font-medium mb-1 dark:text-gray-300">No tasks found</h3>
            <p>Try adjusting your search or filter to find what you're looking for.</p>
          </div>
        )}
      </div>
    </div>
  );
}
