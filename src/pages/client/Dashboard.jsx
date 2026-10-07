import { Link } from 'react-router-dom'
import {
  Briefcase, FolderOpen, Gavel, CheckCircle2, Wallet, PlusCircle, Users, ArrowUpRight,
  CreditCard, TrendingUp,
} from 'lucide-react'
import { useApp } from '../../context/AppContext.jsx'
import { StatCard, SectionHeader, StatusBadge, ProgressBar, Avatar, EmptyState, ProgressBar as PB } from '../../components/ui.jsx'
import { NotificationItem } from '../../components/domain.jsx'

export default function ClientDashboard() {
  const { projects, bids, payments, notifications, markRead, markAllRead } = useApp()

  const active = projects.filter((p) => ['in-progress', 'submitted'].includes(p.status))
  const open = projects.filter((p) => p.status === 'open')
  const completed = projects.filter((p) => ['completed', 'approved'].includes(p.status))
  const pendingBids = bids.filter((b) => b.status === 'pending')
  const totalSpent = payments.filter((p) => p.status !== 'Refunded').reduce((s, p) => s + p.amount, 0)

  return (
    <div>
      <SectionHeader
        title="Client Dashboard"
        subtitle="Manage your projects, bids and payments in one place."
        actions={<Link to="/client/create-project" className="btn-primary"><PlusCircle size={15} /> Create Project</Link>}
      />

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
        <StatCard icon={Briefcase} label="Active Projects" value={active.length} tone="brand" />
        <StatCard icon={FolderOpen} label="Open Projects" value={open.length} tone="violet" />
        <StatCard icon={Gavel} label="Pending Bids" value={pendingBids.length} tone="amber" delta="+2 today" />
        <StatCard icon={CheckCircle2} label="Completed Projects" value={completed.length} tone="emerald" />
        <StatCard icon={Wallet} label="Total Spent" value={`$${totalSpent.toLocaleString()}`} tone="sky" hint="across all projects" />
      </div>

      <div className="grid lg:grid-cols-3 gap-6 mt-6">
        <div className="lg:col-span-2 space-y-6">
          {/* Projects overview */}
          <div className="card p-5">
            <div className="flex items-center justify-between mb-4">
              <h2 className="section-title">Your projects</h2>
              <Link to="/client/projects" className="text-sm font-semibold text-brand-700 inline-flex items-center gap-1">View all <ArrowUpRight size={14} /></Link>
            </div>
            <div className="space-y-3">
              {projects.slice(0, 4).map((p) => (
                <Link key={p.id} to="/client/projects" className="flex items-center gap-4 p-3.5 rounded-xl border border-slate-200 hover:border-brand-300 transition-colors">
                  <span className="h-9 w-9 rounded-lg bg-slate-900 text-white flex items-center justify-center text-[10px] font-bold shrink-0">{p.title.slice(0, 2).toUpperCase()}</span>
                  <span className="min-w-0 flex-1">
                    <span className="block text-sm font-semibold text-slate-900 truncate">{p.title}</span>
                    <span className="block text-xs text-slate-500 mt-0.5">{p.developer ? `Assigned to ${p.developer}` : `${bids.filter((b) => b.projectId === p.id).length} bids received`}</span>
                  </span>
                  <span className="hidden sm:block w-32">
                    <PB value={p.progress || 0} tone="bg-brand-600" height="h-1.5" />
                  </span>
                  <StatusBadge>{p.status}</StatusBadge>
                  <span className="text-sm font-bold text-brand-700 w-20 text-right">${p.budget.toLocaleString()}</span>
                </Link>
              ))}
            </div>
          </div>

          {/* Recent bids */}
          <div className="card p-5">
            <div className="flex items-center justify-between mb-4">
              <h2 className="section-title flex items-center gap-2"><Gavel size={17} className="text-amber-500" /> Recent bids</h2>
              <Link to="/client/bids" className="text-sm font-semibold text-brand-700 inline-flex items-center gap-1">Manage <ArrowUpRight size={14} /></Link>
            </div>
            <div className="space-y-3">
              {pendingBids.slice(0, 4).map((b) => {
                const project = projects.find((p) => p.id === b.projectId)
                return (
                  <div key={b.id} className="flex items-center gap-3 p-3 rounded-xl border border-slate-200">
                    <Avatar initials={b.developer.split(' ').map((s) => s[0]).join('')} color="bg-brand-600" size="h-9 w-9" text="text-xs" />
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-semibold text-slate-900">{b.developer}</p>
                      <p className="text-xs text-slate-500 truncate">{project?.title} · {b.delivery}</p>
                    </div>
                    <span className="text-sm font-bold text-slate-900">${b.price.toLocaleString()}</span>
                    <StatusBadge tone="warning">pending</StatusBadge>
                  </div>
                )
              })}
              {pendingBids.length === 0 && <EmptyState icon={Gavel} title="No pending bids" subtitle="Bids on your projects will appear here." />}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="card p-5">
            <div className="flex items-center justify-between mb-3">
              <h2 className="section-title">Notifications</h2>
              <button onClick={markAllRead} className="text-xs font-semibold text-slate-500 hover:text-brand-700">Mark all read</button>
            </div>
            <div className="space-y-2">
              {notifications.slice(0, 4).map((n) => <NotificationItem key={n.id} item={n} onRead={markRead} />)}
            </div>
            <Link to="/client/notifications" className="btn-secondary btn-sm w-full mt-3">Open notification center</Link>
          </div>

          <div className="card p-5">
            <h2 className="section-title flex items-center gap-2"><CreditCard size={17} className="text-brand-600" /> Payment summary</h2>
            <div className="mt-4 space-y-3">
              {payments.slice(0, 4).map((p) => (
                <div key={p.id} className="flex items-center justify-between text-sm border-b border-slate-100 pb-2.5">
                  <div className="min-w-0">
                    <p className="font-medium text-slate-800 truncate">{p.project}</p>
                    <p className="text-xs text-slate-500">{p.date}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-slate-900">${p.amount.toLocaleString()}</p>
                    <StatusBadge className="mt-0.5">{p.status}</StatusBadge>
                  </div>
                </div>
              ))}
            </div>
            <Link to="/client/payments" className="btn-secondary btn-sm w-full mt-4"><Wallet size={14} /> Open payments</Link>
          </div>

          <div className="card p-5 bg-slate-900 border-slate-800 text-white">
            <h2 className="font-semibold flex items-center gap-2"><TrendingUp size={16} className="text-emerald-400" /> Hiring tip</h2>
            <p className="text-sm text-slate-400 mt-2 leading-relaxed">
              Projects with a written requirement list receive 3× more qualified bids. Add deliverables before publishing.
            </p>
            <Link to="/client/create-project" className="btn-primary btn-sm w-full mt-4"><Users size={14} /> Post a project</Link>
          </div>
        </div>
      </div>
    </div>
  )
}
