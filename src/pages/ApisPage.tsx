import { useState } from 'react';
import { CuboidIcon as Cube, Plus, Search, Copy, Eye, EyeOff, RefreshCw, MoreVertical, Clock, ArrowUpDown, Filter } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';

// Sample API key data
const apiKeys = [
  {
    id: "api_1a2b3c4d5e",
    name: "Production API Key",
    key: "pk_live_51JKl2mHGnT7JkLmN3oPqRsT5uVwXyZ",
    created: "2023-10-15T10:30:00Z",
    lastUsed: "2023-12-15T08:45:00Z",
    status: "Active",
    environment: "Production",
    permissions: ["read", "write", "delete"]
  },
  {
    id: "api_6f7g8h9i0j",
    name: "Development API Key",
    key: "pk_test_51JKl2mHGnT7JkLmN3oPqRsT5uVwXyZ",
    created: "2023-11-05T14:20:00Z",
    lastUsed: "2023-12-14T16:30:00Z",
    status: "Active",
    environment: "Development",
    permissions: ["read", "write"]
  },
  {
    id: "api_1k2l3m4n5o",
    name: "Analytics Read-Only Key",
    key: "pk_analytics_51JKl2mHGnT7JkLmN3oPqRsT5uVwXyZ",
    created: "2023-09-20T09:15:00Z",
    lastUsed: "2023-12-10T11:25:00Z",
    status: "Active",
    environment: "Production",
    permissions: ["read"]
  },
  {
    id: "api_6p7q8r9s0t",
    name: "Legacy API Key",
    key: "pk_legacy_51JKl2mHGnT7JkLmN3oPqRsT5uVwXyZ",
    created: "2023-05-10T08:00:00Z",
    lastUsed: "2023-11-30T14:10:00Z",
    status: "Inactive",
    environment: "Production",
    permissions: ["read", "write", "delete"]
  },
  {
    id: "api_1u2v3w4x5y",
    name: "Testing API Key",
    key: "pk_test_51JKl2mHGnT7JkLmN3oPqRsT5uVwXyZ",
    created: "2023-12-01T16:45:00Z",
    lastUsed: "2023-12-15T09:30:00Z",
    status: "Active",
    environment: "Testing",
    permissions: ["read", "write"]
  }
];

// Environment color mapping
const environmentColors: Record<string, string> = {
  "Production": "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300",
  "Development": "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300",
  "Testing": "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300"
};

// Status color mapping
const statusColors: Record<string, string> = {
  "Active": "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300",
  "Inactive": "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300"
};

export default function ApisPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  const [visibleKeys, setVisibleKeys] = useState<Record<string, boolean>>({});
  
  // Toggle key visibility
  const toggleKeyVisibility = (id: string) => {
    setVisibleKeys(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };
  
  // Copy key to clipboard
  const copyToClipboard = (key: string) => {
    navigator.clipboard.writeText(key);
    // You could add a toast notification here
    alert("API key copied to clipboard");
  };
  
  // Filter API keys based on active tab and search query
  const filteredKeys = apiKeys.filter(apiKey => {
    if (activeTab === "all") return true;
    if (activeTab === "active") return apiKey.status === "Active";
    if (activeTab === "inactive") return apiKey.status === "Inactive";
    return true;
  }).filter(apiKey => 
    apiKey.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    apiKey.environment.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Cube className="h-6 w-6 text-primary" />
          <h1 className="text-2xl font-bold">API Keys</h1>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Create API Key
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="col-span-1 md:col-span-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <Input 
              placeholder="Search API keys..." 
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
          All Keys ({apiKeys.length})
        </button>
        <button 
          className={`tab-button ${activeTab === 'active' ? 'active' : ''}`}
          onClick={() => setActiveTab('active')}
        >
          Active ({apiKeys.filter(k => k.status === "Active").length})
        </button>
        <button 
          className={`tab-button ${activeTab === 'inactive' ? 'active' : ''}`}
          onClick={() => setActiveTab('inactive')}
        >
          Inactive ({apiKeys.filter(k => k.status === "Inactive").length})
        </button>
      </div>
      
      <div className="bg-white dark:bg-gray-800 rounded-xl border dark:border-gray-700 overflow-hidden">
        <div className="grid grid-cols-12 gap-4 p-4 border-b dark:border-gray-700 bg-gray-50 dark:bg-gray-900 font-medium text-sm">
          <div className="col-span-3">Name</div>
          <div className="col-span-4">API Key</div>
          <div className="col-span-1">Environment</div>
          <div className="col-span-1">Status</div>
          <div className="col-span-2">Last Used</div>
          <div className="col-span-1"></div>
        </div>
        
        {filteredKeys.length > 0 ? (
          <div className="divide-y dark:divide-gray-700">
            {filteredKeys.map(apiKey => (
              <div key={apiKey.id} className="grid grid-cols-12 gap-4 p-4 items-center hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                <div className="col-span-3">
                  <h3 className="font-medium dark:text-white">{apiKey.name}</h3>
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    Created {new Date(apiKey.created).toLocaleDateString()}
                  </div>
                </div>
                <div className="col-span-4">
                  <div className="flex items-center gap-2">
                    <code className="bg-gray-100 dark:bg-gray-700 px-3 py-1 rounded text-sm font-mono flex-1 overflow-hidden text-ellipsis">
                      {visibleKeys[apiKey.id] ? apiKey.key : apiKey.key.substring(0, 10) + "•••••••••••••••••••"}
                    </code>
                    <button 
                      onClick={() => toggleKeyVisibility(apiKey.id)}
                      className="p-1 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700"
                      title={visibleKeys[apiKey.id] ? "Hide API Key" : "Show API Key"}
                    >
                      {visibleKeys[apiKey.id] ? 
                        <EyeOff className="w-4 h-4 text-gray-500 dark:text-gray-400" /> : 
                        <Eye className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                      }
                    </button>
                    <button 
                      onClick={() => copyToClipboard(apiKey.key)}
                      className="p-1 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700"
                      title="Copy API Key"
                    >
                      <Copy className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                    </button>
                  </div>
                </div>
                <div className="col-span-1">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${environmentColors[apiKey.environment]}`}>
                    {apiKey.environment}
                  </span>
                </div>
                <div className="col-span-1">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusColors[apiKey.status]}`}>
                    {apiKey.status}
                  </span>
                </div>
                <div className="col-span-2 flex items-center gap-1 text-gray-600 dark:text-gray-300 text-sm">
                  <Clock className="w-4 h-4" />
                  {new Date(apiKey.lastUsed).toLocaleString()}
                </div>
                <div className="col-span-1 text-right flex gap-1 justify-end">
                  <button 
                    className="p-1 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700"
                    title="Regenerate API Key"
                  >
                    <RefreshCw className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                  </button>
                  <button className="p-1 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700">
                    <MoreVertical className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-8 text-center text-gray-500 dark:text-gray-400">
            <Cube className="w-12 h-12 mx-auto mb-4 text-gray-300 dark:text-gray-600" />
            <h3 className="text-lg font-medium mb-1 dark:text-gray-300">No API keys found</h3>
            <p>Try adjusting your search or filter to find what you're looking for.</p>
          </div>
        )}
      </div>
    </div>
  );
}
