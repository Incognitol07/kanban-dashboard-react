import { useState } from "react";
import { Settings, User, Bell, Moon, Sun, Shield, LinkIcon, Save } from 'lucide-react';
import { Button } from "../components/ui/Button";
import { Input } from "../components/ui/Input";

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("profile");
  
  const tabs = [
    { id: "profile", label: "Profile", icon: User },
    { id: "notifications", label: "Notifications", icon: Bell },
    { id: "security", label: "Security", icon: Shield },
    { id: "integrations", label: "Integrations", icon: LinkIcon },
  ];

  return (
    <div className="p-6">
      <div className="flex items-center gap-2 mb-6">
        <Settings className="h-6 w-6 text-primary" />
        <h1 className="text-2xl font-bold">Settings</h1>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Sidebar */}
        <div className="md:col-span-1">
          <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
            <div className="p-4 border-b border-gray-200 dark:border-gray-700">
              <h2 className="font-medium">Settings</h2>
            </div>
            <nav className="p-2">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center gap-3 px-4 py-2 rounded-lg text-left mb-1 transition-colors ${
                    activeTab === tab.id 
                      ? "bg-primary/10 text-primary" 
                      : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                  }`}
                >
                  <tab.icon className="h-5 w-5" />
                  <span>{tab.label}</span>
                </button>
              ))}
            </nav>
          </div>
        </div>
        
        {/* Content */}
        <div className="md:col-span-3">
          <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
            {activeTab === "profile" && (
              <div>
                <h2 className="text-xl font-semibold mb-6">Profile Settings</h2>
                
                <div className="space-y-6">
                  <div className="flex flex-col md:flex-row gap-6">
                    <div className="flex-1">
                      <label className="block text-sm font-medium mb-2 dark:text-gray-300">
                        Full Name
                      </label>
                      <Input 
                        defaultValue="Adelodun Abraham" 
                        className="w-full dark:bg-gray-700 dark:border-gray-600"
                      />
                    </div>
                    <div className="flex-1">
                      <label className="block text-sm font-medium mb-2 dark:text-gray-300">
                        Email Address
                      </label>
                      <Input 
                        type="email" 
                        defaultValue="adelodun@example.com" 
                        className="w-full dark:bg-gray-700 dark:border-gray-600"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2 dark:text-gray-300">
                      Job Title
                    </label>
                    <Input 
                      defaultValue="Product Manager" 
                      className="w-full dark:bg-gray-700 dark:border-gray-600"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2 dark:text-gray-300">
                      Bio
                    </label>
                    <textarea 
                      rows={4}
                      defaultValue="Product manager with 5+ years of experience in SaaS products. Passionate about user experience and data-driven decisions."
                      placeholder="Enter your bio"
                      className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm dark:bg-gray-700 dark:border-gray-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    />
                  </div>
                  
                  <div className="pt-4">
                    <Button>
                      <Save className="h-4 w-4 mr-2" />
                      Save Changes
                    </Button>
                  </div>
                </div>
              </div>
            )}
            
            {activeTab === "notifications" && (
              <div>
                <h2 className="text-xl font-semibold mb-6">Notification Preferences</h2>
                
                <div className="space-y-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Email Notifications</h3>
                    
                    <div className="space-y-3">
                      {[
                        "Task assignments",
                        "Task status changes",
                        "Comments on your tasks",
                        "Due date reminders",
                        "Weekly summary"
                      ].map((item, index) => (
                        <div key={index} className="flex items-center">
                          <input 
                            type="checkbox" 
                            id={`email-${index}`} 
                            defaultChecked={index < 3}
                            className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary dark:border-gray-600"
                          />
                          <label 
                            htmlFor={`email-${index}`}
                            className="ml-2 text-sm font-medium dark:text-gray-300"
                          >
                            {item}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">In-App Notifications</h3>
                    
                    <div className="space-y-3">
                      {[
                        "Task assignments",
                        "Task status changes",
                        "Comments on your tasks",
                        "Due date reminders",
                        "System announcements"
                      ].map((item, index) => (
                        <div key={index} className="flex items-center">
                          <input 
                            type="checkbox" 
                            id={`inapp-${index}`} 
                            defaultChecked
                            className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary dark:border-gray-600"
                          />
                          <label 
                            htmlFor={`inapp-${index}`}
                            className="ml-2 text-sm font-medium dark:text-gray-300"
                          >
                            {item}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="pt-4">
                    <Button>
                      <Save className="h-4 w-4 mr-2" />
                      Save Preferences
                    </Button>
                  </div>
                </div>
              </div>
            )}
            
            {activeTab === "appearance" && (
              <div>
                <h2 className="text-xl font-semibold mb-6">Appearance Settings</h2>
                
                <div className="space-y-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Theme</h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      
                      <div className="border border-gray-200 rounded-lg p-4 cursor-pointer transition-all hover:border-gray-300 dark:border-gray-700 dark:hover:border-gray-600">
                        <div className="flex justify-between items-center mb-3">
                          <span className="font-medium">System</span>
                          <div className="flex">
                            <Sun className="h-5 w-5 text-amber-500" />
                            <Moon className="h-5 w-5 text-indigo-400 -ml-1" />
                          </div>
                        </div>
                        <div className="h-24 bg-gradient-to-r from-white to-gray-900 border border-gray-200 rounded-md"></div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Density</h3>
                    
                    <div className="flex items-center space-x-4">
                      {["Compact", "Default", "Comfortable"].map((density, index) => (
                        <div key={index} className="flex items-center">
                          <input 
                            type="radio" 
                            id={`density-${index}`} 
                            name="density"
                            defaultChecked={index === 1}
                            className="h-4 w-4 border-gray-300 text-primary focus:ring-primary dark:border-gray-600"
                          />
                          <label 
                            htmlFor={`density-${index}`}
                            className="ml-2 text-sm font-medium dark:text-gray-300"
                          >
                            {density}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="pt-4">
                    <Button>
                      <Save className="h-4 w-4 mr-2" />
                      Save Appearance
                    </Button>
                  </div>
                </div>
              </div>
            )}
            
            {activeTab === "security" && (
              <div>
                <h2 className="text-xl font-semibold mb-6">Security Settings</h2>
                
                <div className="space-y-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Change Password</h3>
                    
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium mb-2 dark:text-gray-300">
                          Current Password
                        </label>
                        <Input 
                          type="password" 
                          placeholder="••••••••" 
                          className="w-full dark:bg-gray-700 dark:border-gray-600"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium mb-2 dark:text-gray-300">
                          New Password
                        </label>
                        <Input 
                          type="password" 
                          placeholder="••••••••" 
                          className="w-full dark:bg-gray-700 dark:border-gray-600"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium mb-2 dark:text-gray-300">
                          Confirm New Password
                        </label>
                        <Input 
                          type="password" 
                          placeholder="••••••••" 
                          className="w-full dark:bg-gray-700 dark:border-gray-600"
                        />
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Two-Factor Authentication</h3>
                    
                    <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg dark:border-gray-700">
                      <div>
                        <p className="font-medium dark:text-gray-300">Two-factor authentication is disabled</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Add an extra layer of security to your account</p>
                      </div>
                      <Button variant="outline">Enable</Button>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Sessions</h3>
                    
                    <div className="border border-gray-200 rounded-lg overflow-hidden dark:border-gray-700">
                      <div className="p-4 bg-gray-50 border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700">
                        <p className="font-medium dark:text-gray-300">Current Session</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Chrome on Windows • IP: 192.168.1.1</p>
                      </div>
                      <div className="p-4">
                        <Button variant="destructive">Sign Out All Other Sessions</Button>
                      </div>
                    </div>
                  </div>
                  
                  <div className="pt-4">
                    <Button>
                      <Save className="h-4 w-4 mr-2" />
                      Save Security Settings
                    </Button>
                  </div>
                </div>
              </div>
            )}
            
            {activeTab === "integrations" && (
              <div>
                <h2 className="text-xl font-semibold mb-6">Integrations</h2>
                
                <div className="space-y-6">
                  {[
                    { 
                      name: "GitHub", 
                      description: "Connect your GitHub account to sync repositories and issues.",
                      connected: true,
                      icon: "https://github.githubassets.com/favicons/favicon.svg"
                    },
                    { 
                      name: "Slack", 
                      description: "Receive notifications and updates in your Slack workspace.",
                      connected: true,
                      icon: "https://a.slack-edge.com/80588/marketing/img/meta/favicon-32.png"
                    },
                    { 
                      name: "Google Drive", 
                      description: "Attach files directly from your Google Drive.",
                      connected: false,
                      icon: "https://ssl.gstatic.com/docs/doclist/images/drive_2022q3_32dp.png"
                    },
                    { 
                      name: "Jira", 
                      description: "Sync tasks with your Jira projects.",
                      connected: false,
                      icon: "https://wac-cdn.atlassian.com/assets/img/favicons/jira/favicon.png"
                    }
                  ].map((integration, index) => (
                    <div key={index} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg dark:border-gray-700">
                      <div className="flex items-center">
                        <img 
                          src={integration.icon || "/placeholder.svg"} 
                          alt={integration.name} 
                          className="w-8 h-8 mr-3"
                        />
                        <div>
                          <p className="font-medium dark:text-gray-300">{integration.name}</p>
                          <p className="text-sm text-gray-500 dark:text-gray-400">{integration.description}</p>
                        </div>
                      </div>
                      <Button variant={integration.connected ? "destructive" : "default"}>
                        {integration.connected ? "Disconnect" : "Connect"}
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
