import { useState } from 'react';
import { Users, Search, Mail, MoreVertical, UserPlus, UserCog, Download } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';

// Sample user data
const users = [
  {
    id: 1,
    name: "John Doe",
    email: "john.doe@example.com",
    role: "Administrator",
    status: "Active",
    phone: "+1 (555) 123-4567",
    department: "Engineering",
    lastActive: "2023-12-15T14:30:00Z"
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane.smith@example.com",
    role: "Manager",
    status: "Active",
    phone: "+1 (555) 987-6543",
    department: "Design",
    lastActive: "2023-12-15T10:15:00Z"
  },
  {
    id: 3,
    name: "Robert Johnson",
    email: "robert.johnson@example.com",
    role: "Developer",
    status: "Inactive",
    phone: "+1 (555) 234-5678",
    department: "Engineering",
    lastActive: "2023-12-10T09:45:00Z"
  },
  {
    id: 4,
    name: "Emily Davis",
    email: "emily.davis@example.com",
    role: "Designer",
    status: "Active",
    phone: "+1 (555) 876-5432",
    department: "Design",
    lastActive: "2023-12-14T16:20:00Z"
  },
  {
    id: 5,
    name: "Michael Wilson",
    email: "michael.wilson@example.com",
    role: "Developer",
    status: "Active",
    phone: "+1 (555) 345-6789",
    department: "Engineering",
    lastActive: "2023-12-15T11:05:00Z"
  },
  {
    id: 6,
    name: "Sarah Brown",
    email: "sarah.brown@example.com",
    role: "Manager",
    status: "Active",
    phone: "+1 (555) 765-4321",
    department: "Marketing",
    lastActive: "2023-12-14T13:40:00Z"
  },
  {
    id: 7,
    name: "David Miller",
    email: "david.miller@example.com",
    role: "Developer",
    status: "Inactive",
    phone: "+1 (555) 456-7890",
    department: "Engineering",
    lastActive: "2023-12-08T15:30:00Z"
  }
];

// Role color mapping
const roleColors: Record<string, string> = {
  "Administrator": "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300",
  "Manager": "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300",
  "Developer": "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300",
  "Designer": "bg-pink-100 text-pink-800 dark:bg-pink-900/30 dark:text-pink-300"
};

// Status color mapping
const statusColors: Record<string, string> = {
  "Active": "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300",
  "Inactive": "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300"
};

export default function UsersPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  
  // Filter users based on active tab and search query
  const filteredUsers = users.filter(user => {
    if (activeTab === "all") return true;
    if (activeTab === "active") return user.status === "Active";
    if (activeTab === "inactive") return user.status === "Inactive";
    return true;
  }).filter(user => 
    user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.department.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Users className="h-6 w-6 text-primary" />
          <h1 className="text-2xl font-bold">Users</h1>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Button>
            <UserPlus className="h-4 w-4 mr-2" />
            Add User
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="col-span-1 md:col-span-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <Input 
              placeholder="Search users by name, email, role..." 
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="w-full">
            <UserCog className="h-4 w-4 mr-2" />
            Manage Roles
          </Button>
        </div>
      </div>
      
      <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
        <button 
          className={`tab-button ${activeTab === 'all' ? 'active' : ''}`}
          onClick={() => setActiveTab('all')}
        >
          All Users ({users.length})
        </button>
        <button 
          className={`tab-button ${activeTab === 'active' ? 'active' : ''}`}
          onClick={() => setActiveTab('active')}
        >
          Active ({users.filter(u => u.status === "Active").length})
        </button>
        <button 
          className={`tab-button ${activeTab === 'inactive' ? 'active' : ''}`}
          onClick={() => setActiveTab('inactive')}
        >
          Inactive ({users.filter(u => u.status === "Inactive").length})
        </button>
      </div>
      
      <div className="bg-white dark:bg-gray-800 rounded-xl border dark:border-gray-700 overflow-hidden">
        <div className="grid grid-cols-12 gap-4 p-4 border-b dark:border-gray-700 bg-gray-50 dark:bg-gray-900 font-medium text-sm">
          <div className="col-span-3">User</div>
          <div className="col-span-2">Role</div>
          <div className="col-span-2">Department</div>
          <div className="col-span-2">Status</div>
          <div className="col-span-2">Last Active</div>
          <div className="col-span-1"></div>
        </div>
        
        {filteredUsers.length > 0 ? (
          <div className="divide-y dark:divide-gray-700">
            {filteredUsers.map(user => (
              <div key={user.id} className="grid grid-cols-12 gap-4 p-4 items-center hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                <div className="col-span-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center font-medium">
                      {user.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                      <h3 className="font-medium dark:text-white">{user.name}</h3>
                      <div className="text-sm text-gray-500 dark:text-gray-400 flex items-center gap-1">
                        <Mail className="w-3 h-3" />
                        {user.email}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-span-2">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${roleColors[user.role]}`}>
                    {user.role}
                  </span>
                </div>
                <div className="col-span-2 text-gray-600 dark:text-gray-300">
                  {user.department}
                </div>
                <div className="col-span-2">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusColors[user.status]}`}>
                    {user.status}
                  </span>
                </div>
                <div className="col-span-2 text-gray-600 dark:text-gray-300 text-sm">
                  {new Date(user.lastActive).toLocaleString()}
                </div>
                <div className="col-span-1 text-right">
                  <button className="p-1 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700">
                    <MoreVertical className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-8 text-center text-gray-500 dark:text-gray-400">
            <Users className="w-12 h-12 mx-auto mb-4 text-gray-300 dark:text-gray-600" />
            <h3 className="text-lg font-medium mb-1 dark:text-gray-300">No users found</h3>
            <p>Try adjusting your search or filter to find what you're looking for.</p>
          </div>
        )}
      </div>
    </div>
  );
}
