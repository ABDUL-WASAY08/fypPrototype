import { useState } from 'react'
import { NavLink, useNavigate, Link } from 'react-router-dom'
import {
  LayoutDashboard, FolderGit2, Bot, ScanSearch, Wand2, FileText, BookOpen, Briefcase,
  Store, Gavel, FolderKanban, Bell, Settings, Users, CreditCard, MessageSquareWarning,
  Bug, Activity, ChevronDown, LogOut, Search, PlusCircle, CircleDollarSign, Menu, X,
  ArrowLeftRight, Github,
} from 'lucide-react'
import { useApp } from '../../context/AppContext.jsx'
import { Avatar } from '../ui.jsx'

const NAV = {
  developer: [
    { to: '/developer', label: 'Dashboard', icon: LayoutDashboard, end: true },
    { to: '/developer/repositories', label: 'Repositories', icon: FolderGit2 },
    { to: '/developer/assistant', label: 'AI Assistant', icon: Bot },
    { to: '/developer/analysis', label: 'Code Analysis', icon: ScanSearch },
    { to: '/developer/improvement', label: 'Code Improvement', icon: Wand2 },
    { to: '/developer/readme', label: 'README Generator', icon: FileText },
    { to: '/developer/documentation', label: 'Documentation', icon: BookOpen },
    { to: '/developer/portfolio', label: 'Portfolio', icon: Briefcase },
    { to: '/developer/marketplace', label: 'Marketplace', icon: Store },
    { to: '/developer/bids', label: 'My Bids', icon: Gavel },
    { to: '/developer/projects', label: 'Projects', icon: FolderKanban },
    { to: '/developer/notifications', label: 'Notifications', icon: Bell },
    { to: '/developer/settings', label: 'Settings', icon: Settings },
  ],
  client: [
    { to: '/client', label: 'Dashboard', icon: LayoutDashboard, end: true },
    { to: '/client/projects', label: 'My Projects', icon: FolderKanban },
    { to: '/client/create-project', label: 'Create Project', icon: PlusCircle },
    { to: '/client/developers', label: 'Developers', icon: Users },
    { to: '/client/bids', label: 'Bids', icon: Gavel },
    { to: '/client/active', label: 'Active Projects', icon: Briefcase },
    { to: '/client/payments', label: 'Payments', icon: CreditCard },
    { to: '/client/notifications', label: 'Notifications', icon: Bell },
    { to: '/client/settings', label: 'Settings', icon: Settings },
  ],
  admin: [
    { to: '/admin', label: 'Dashboard', icon: LayoutDashboard, end: true },
    { to: '/admin/users', label: 'Users', icon: Users },
    { to: '/admin/projects', label: 'Projects', icon: FolderKanban },
    { to: '/admin/payments', label: 'Payments', icon: CreditCard },
    { to: '/admin/complaints', label: 'Complaints', icon: MessageSquareWarning },
    { to: '/admin/bugs', label: 'Bug Reports', icon: Bug },
    { to: '/admin/activity', label: 'System Activity', icon: Activity },
  ],
}

const PORTAL_LABEL = { developer: 'Developer Portal', client: 'Client Portal', admin: 'Admin Portal' }

export default function DashboardLayout({ children }) {
  const { auth, signOut, switchRole, unreadCount } = useApp()
  const navigate = useNavigate()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  if (!auth) return null
  const role = auth.role
  const items = NAV[role]
  const notifPath = role === 'admin' ? '/admin/activity' : `/${role}/notifications`

  const handleSwitch = (r) => {
    setMenuOpen(false)
    if (r === role) return
    if (r === 'developer') switchRole('developer', { id: 'dev-1', name: 'Ali Khan', initials: 'AK', color: 'bg-indigo-600', title: 'Software Engineer', email: 'ali.khan@tom.dev' })
    if (r === 'client') switchRole('client', { id: 'cli-1', name: 'Nadia Hussain', initials: 'NH', color: 'bg-violet-600', title: 'Bright Labs', email: 'nadia@brightlabs.co' })
    if (r === 'admin') switchRole('admin', { id: 'admin-1', name: 'Hamza Iqbal', initials: 'HI', color: 'bg-slate-900', title: 'Platform Administrator', email: 'hamza@tom.dev' })
    navigate(r === 'developer' ? '/developer' : r === 'client' ? '/client' : '/admin')
  }

  const logout = () => {
    signOut()
    navigate('/')
  }

  const sidebar = (
    <div className="flex flex-col h-full">
      <div className="h-16 px-5 flex items-center gap-2.5 border-b border-slate-800">
        <span className="h-8 w-8 rounded-lg bg-brand-600 text-white flex items-center justify-center font-bold text-sm">T</span>
        <div className="leading-tight">
          <p className="text-white font-bold text-sm tracking-wide">TOM</p>
          <p className="text-[11px] text-slate-400">{PORTAL_LABEL[role]}</p>
        </div>
        <button className="ml-auto lg:hidden text-slate-400" onClick={() => setMobileOpen(false)}>
          <X size={18} />
        </button>
      </div>

      <nav className="flex-1 overflow-y-auto scrollbar-thin px-3 py-4 space-y-0.5">
        {items.map((it) => (
          <NavLink
            key={it.to}
            to={it.to}
            end={it.end}
            onClick={() => setMobileOpen(false)}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                isActive ? 'bg-brand-600 text-white shadow-sm' : 'text-slate-300 hover:bg-slate-800 hover:text-white'
              }`
            }
          >
            <it.icon size={17} />
            <span className="flex-1">{it.label}</span>
            {it.label === 'Notifications' && unreadCount > 0 && (
              <span className="text-[10px] font-bold bg-rose-500 text-white rounded-full px-1.5 py-0.5 min-w-[18px] text-center">
                {unreadCount}
              </span>
            )}
          </NavLink>
        ))}
      </nav>

      <div className="p-3 border-t border-slate-800">
        <Link
          to="/portfolio/ali-khan"
          className="flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm text-slate-300 hover:bg-slate-800 transition-colors"
        >
          <Github size={16} />
          Public Portfolio
        </Link>
        <div className="flex items-center gap-3 px-3 py-3 mt-1 rounded-lg bg-slate-800/60">
          <Avatar initials={auth.user.initials} color={auth.user.color || 'bg-brand-600'} size="h-9 w-9" text="text-xs" />
          <div className="min-w-0 flex-1">
            <p className="text-sm text-white font-medium truncate">{auth.user.name}</p>
            <p className="text-[11px] text-slate-400 truncate">{auth.user.email}</p>
          </div>
          <button onClick={logout} title="Sign out" className="text-slate-400 hover:text-rose-400 transition-colors">
            <LogOut size={16} />
          </button>
        </div>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Sidebar (desktop) */}
      <aside className="hidden lg:flex fixed inset-y-0 left-0 w-64 bg-slate-900 z-30">{sidebar}</aside>

      {/* Sidebar (mobile) */}
      {mobileOpen && (
        <div className="lg:hidden fixed inset-0 z-40">
          <div className="absolute inset-0 bg-slate-900/50" onClick={() => setMobileOpen(false)} />
          <aside className="absolute inset-y-0 left-0 w-64 bg-slate-900 animate-fade-in">{sidebar}</aside>
        </div>
      )}

      <div className="lg:pl-64">
        {/* Topbar */}
        <header className="sticky top-0 z-20 h-16 bg-white/90 backdrop-blur border-b border-slate-200 flex items-center gap-3 px-4 sm:px-6">
          <button className="lg:hidden p-2 rounded-lg hover:bg-slate-100 text-slate-600" onClick={() => setMobileOpen(true)}>
            <Menu size={18} />
          </button>

          <div className="relative hidden sm:block flex-1 max-w-md">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input className="input pl-9 py-2" placeholder="Search projects, repos, developers…" />
          </div>

          <div className="flex items-center gap-2 ml-auto">
            <button onClick={() => navigate(role === 'developer' ? '/developer/marketplace' : role === 'client' ? '/client/create-project' : '/admin/payments')} className="btn-primary btn-sm hidden sm:inline-flex">
              {role === 'developer' ? <><Store size={14} /> Browse Work</> : role === 'client' ? <><PlusCircle size={14} /> New Project</> : <><CircleDollarSign size={14} /> Payments</>}
            </button>

            <button
              onClick={() => navigate(notifPath)}
              className="relative p-2 rounded-lg hover:bg-slate-100 text-slate-600"
              title="Notifications"
            >
              <Bell size={18} />
              {unreadCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 text-[10px] font-bold bg-rose-500 text-white rounded-full min-w-[16px] h-4 px-0.5 flex items-center justify-center">
                  {unreadCount}
                </span>
              )}
            </button>

            {/* Role switcher (demo aid) */}
            <div className="relative">
              <button
                onClick={() => setMenuOpen((o) => !o)}
                className="flex items-center gap-2 pl-1.5 pr-2.5 py-1.5 rounded-lg border border-slate-200 hover:bg-slate-50 text-sm font-medium text-slate-700"
              >
                <Avatar initials={auth.user.initials} color={auth.user.color || 'bg-brand-600'} size="h-7 w-7" text="text-[10px]" />
                <span className="hidden md:inline">{auth.user.name.split(' ')[0]}</span>
                <ChevronDown size={14} className="text-slate-400" />
              </button>
              {menuOpen && (
                <>
                  <div className="fixed inset-0 z-30" onClick={() => setMenuOpen(false)} />
                  <div className="absolute right-0 mt-2 w-60 bg-white rounded-xl border border-slate-200 shadow-pop p-2 z-40 animate-fade-in">
                    <p className="px-2 py-1.5 text-[11px] font-semibold uppercase tracking-wide text-slate-400">Switch portal (demo)</p>
                    {[['developer', 'Developer'], ['client', 'Client'], ['admin', 'Admin']].map(([r, label]) => (
                      <button
                        key={r}
                        onClick={() => handleSwitch(r)}
                        className={`w-full text-left px-3 py-2 rounded-lg text-sm flex items-center justify-between ${
                          role === r ? 'bg-brand-50 text-brand-700 font-semibold' : 'text-slate-700 hover:bg-slate-50'
                        }`}
                      >
                        <span className="flex items-center gap-2">
                          <ArrowLeftRight size={14} /> {label} Portal
                        </span>
                        {role === r && <span className="text-[10px] uppercase">current</span>}
                      </button>
                    ))}
                    <div className="border-t border-slate-100 my-1" />
                    <button onClick={logout} className="w-full text-left px-3 py-2 rounded-lg text-sm text-rose-600 hover:bg-rose-50 flex items-center gap-2">
                      <LogOut size={14} /> Sign out
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </header>

        <main className="p-4 sm:p-6 lg:p-8 max-w-[1400px]">{children}</main>
      </div>
    </div>
  )
}
