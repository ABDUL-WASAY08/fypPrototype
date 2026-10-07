import { Routes, Route, Navigate, Outlet } from 'react-router-dom'
import { useApp } from './context/AppContext.jsx'
import { ToastHost } from './components/ui.jsx'
import DashboardLayout from './components/layout/DashboardLayout.jsx'

import Landing from './pages/Landing.jsx'
import About from './pages/About.jsx'
import Architecture from './pages/Architecture.jsx'
import DeveloperLogin from './pages/auth/DeveloperLogin.jsx'
import ClientLogin from './pages/auth/ClientLogin.jsx'
import AdminLogin from './pages/auth/AdminLogin.jsx'
import PublicPortfolio from './pages/PublicPortfolio.jsx'
import NotFound from './pages/NotFound.jsx'

import DevDashboard from './pages/developer/Dashboard.jsx'
import Repositories from './pages/developer/Repositories.jsx'
import AiAssistant from './pages/developer/AiAssistant.jsx'
import CodeAnalysis from './pages/developer/CodeAnalysis.jsx'
import CodeImprovement from './pages/developer/CodeImprovement.jsx'
import ReadmeGenerator from './pages/developer/ReadmeGenerator.jsx'
import Documentation from './pages/developer/Documentation.jsx'
import Portfolio from './pages/developer/Portfolio.jsx'
import Marketplace from './pages/developer/Marketplace.jsx'
import MyBids from './pages/developer/MyBids.jsx'
import DevProjects from './pages/developer/Projects.jsx'
import Notifications from './pages/developer/Notifications.jsx'
import Settings from './pages/developer/Settings.jsx'

import ClientDashboard from './pages/client/Dashboard.jsx'
import MyProjects from './pages/client/MyProjects.jsx'
import CreateProject from './pages/client/CreateProject.jsx'
import ClientDevelopers from './pages/client/Developers.jsx'
import ClientBids from './pages/client/Bids.jsx'
import ActiveProjects from './pages/client/ActiveProjects.jsx'
import Payments from './pages/client/Payments.jsx'

import AdminDashboard from './pages/admin/Dashboard.jsx'
import AdminUsers from './pages/admin/Users.jsx'
import AdminProjects from './pages/admin/Projects.jsx'
import AdminPayments from './pages/admin/Payments.jsx'
import AdminComplaints from './pages/admin/Complaints.jsx'
import AdminBugs from './pages/admin/BugReports.jsx'
import AdminActivity from './pages/admin/SystemActivity.jsx'

function Protected({ role }) {
  const { auth } = useApp()
  if (!auth) return <Navigate to={`/login/${role}`} replace />
  if (auth.role !== role) return <Navigate to={`/${auth.role}`} replace />
  return <Outlet />
}

export default function App() {
  return (
    <>
      <Routes>
        {/* Public */}
        <Route path="/" element={<Landing />} />
        <Route path="/about" element={<About />} />
        <Route path="/architecture" element={<Architecture />} />
        <Route path="/login/developer" element={<DeveloperLogin />} />
        <Route path="/login/client" element={<ClientLogin />} />
        <Route path="/login/admin" element={<AdminLogin />} />
        <Route path="/portfolio/:slug" element={<PublicPortfolio />} />

        {/* Developer portal */}
        <Route element={<Protected role="developer" />}>
          <Route path="/developer" element={<DashboardWith><DevDashboard /></DashboardWith>} />
          <Route path="/developer/repositories" element={<DashboardWith><Repositories /></DashboardWith>} />
          <Route path="/developer/assistant" element={<DashboardWith><AiAssistant /></DashboardWith>} />
          <Route path="/developer/analysis" element={<DashboardWith><CodeAnalysis /></DashboardWith>} />
          <Route path="/developer/improvement" element={<DashboardWith><CodeImprovement /></DashboardWith>} />
          <Route path="/developer/readme" element={<DashboardWith><ReadmeGenerator /></DashboardWith>} />
          <Route path="/developer/documentation" element={<DashboardWith><Documentation /></DashboardWith>} />
          <Route path="/developer/portfolio" element={<DashboardWith><Portfolio /></DashboardWith>} />
          <Route path="/developer/marketplace" element={<DashboardWith><Marketplace /></DashboardWith>} />
          <Route path="/developer/bids" element={<DashboardWith><MyBids /></DashboardWith>} />
          <Route path="/developer/projects" element={<DashboardWith><DevProjects /></DashboardWith>} />
          <Route path="/developer/notifications" element={<DashboardWith><Notifications /></DashboardWith>} />
          <Route path="/developer/settings" element={<DashboardWith><Settings /></DashboardWith>} />
        </Route>

        {/* Client portal */}
        <Route element={<Protected role="client" />}>
          <Route path="/client" element={<DashboardWith><ClientDashboard /></DashboardWith>} />
          <Route path="/client/projects" element={<DashboardWith><MyProjects /></DashboardWith>} />
          <Route path="/client/create-project" element={<DashboardWith><CreateProject /></DashboardWith>} />
          <Route path="/client/developers" element={<DashboardWith><ClientDevelopers /></DashboardWith>} />
          <Route path="/client/bids" element={<DashboardWith><ClientBids /></DashboardWith>} />
          <Route path="/client/active" element={<DashboardWith><ActiveProjects /></DashboardWith>} />
          <Route path="/client/payments" element={<DashboardWith><Payments /></DashboardWith>} />
          <Route path="/client/notifications" element={<DashboardWith><Notifications /></DashboardWith>} />
          <Route path="/client/settings" element={<DashboardWith><Settings /></DashboardWith>} />
        </Route>

        {/* Admin portal */}
        <Route element={<Protected role="admin" />}>
          <Route path="/admin" element={<DashboardWith><AdminDashboard /></DashboardWith>} />
          <Route path="/admin/users" element={<DashboardWith><AdminUsers /></DashboardWith>} />
          <Route path="/admin/projects" element={<DashboardWith><AdminProjects /></DashboardWith>} />
          <Route path="/admin/payments" element={<DashboardWith><AdminPayments /></DashboardWith>} />
          <Route path="/admin/complaints" element={<DashboardWith><AdminComplaints /></DashboardWith>} />
          <Route path="/admin/bugs" element={<DashboardWith><AdminBugs /></DashboardWith>} />
          <Route path="/admin/activity" element={<DashboardWith><AdminActivity /></DashboardWith>} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
      <ToastHost />
    </>
  )
}

function DashboardWith({ children }) {
  return <DashboardLayout>{children}</DashboardLayout>
}
