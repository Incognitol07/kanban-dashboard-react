import { Settings } from "lucide-react"

export default function SettingsPage() {
  return (
    <div className="p-6">
      <div className="flex items-center gap-2 mb-6">
        <Settings className="h-6 w-6 text-primary" />
        <h1 className="text-2xl font-bold">Settings</h1>
      </div>

      <div className="bg-white border rounded-xl p-8 text-center">
        <h2 className="text-xl font-semibold mb-4">Application Settings</h2>
        <p className="text-gray-500 mb-6">
          This page will contain application settings including preferences, notifications, integrations, and account
          settings.
        </p>
        <div className="p-12 border border-dashed rounded-lg bg-slate-50 flex items-center justify-center">
          <p className="text-gray-400">Settings interface will be implemented here</p>
        </div>
      </div>
    </div>
  )
}

