import { Routes, Route } from "react-router-dom"
import Layout from "./components/Layout"
import HomePage from "./pages/HomePage"
import TasksPage from "./pages/TasksPage"
import UsersPage from "./pages/UsersPage"
import ApisPage from "./pages/ApisPage"
import SettingsPage from "./pages/SettingsPage"
import HelpPage from "./pages/HelpPage"

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="tasks" element={<TasksPage />} />
        <Route path="users" element={<UsersPage />} />
        <Route path="apis" element={<ApisPage />} />
        <Route path="settings" element={<SettingsPage />} />
        <Route path="help" element={<HelpPage />} />
      </Route>
    </Routes>
  )
}

export default App

