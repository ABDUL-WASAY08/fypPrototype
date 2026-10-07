import { Link } from 'react-router-dom'
import { Users, Code2, Building2, FolderKanban, CreditCard, MessageSquareWarning, Bug, Activity, ArrowUpRight, ShieldCheck, TrendingUp } from 'lucide-react'
import { useApp } from '../../context/AppContext.jsx'
import { StatCard, SectionHeader, StatusBadge, ProgressBar, Avatar, EmptyState } from '../../components/ui.jsx'
import { NotificationItem } from '../../components/domain.jsx'

export default function AdminDashboard() {
  const { users, projects, payments, complaints, bugs, notifications, markRead, activity } = useApp()

  const developers = users.filter((u) => u.role === 'Developer').length
  const clients = users.filter((u) => u.role === 'Client').length
  const activeProjects = projects.filter((p) => ['in-progress', 'submitted'].includes(p.status)).length
  const pendingPayments = payments.filter((p) => p.status === 'Pending Release')
  const openComplaints = complaints.filter((c) => c.status !== 'Resolved')
  const openBugs = bugs.filter((b) => b.status !== 'Resolved')

  return (
    <div>
      <SectionHeader
        title="Admin Dashboard"
        subtitle="Platform-wide oversight of users, projects, payments and disputes."
        actions={<Link to="/admin/payments" className="btn-primary"><CreditCard size={15} /> Review payments</Link>}
      />

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard icon={Users} label="Total Users" value={users.length} tone="brand" delta="+3 this week" />
        <StatCard icon={Code2} label="Developers" value={developers} tone="violet" />
        <StatCard icon={Building2} label="Clients" value={clients} tone="sky" />
        <StatCard icon={FolderKanban} label="Active Projects" value={activeProjects} tone="emerald" />
        <StatCard icon={CreditCard} label="Pending Payments" value={pendingPayments.length} tone="amber" hint={`$${pendingPayments.reduce((s, p) => s + p.amount, 0).toLocaleString()} awaiting release`} />
        <StatCard icon={MessageSquareWarning} label="Open Complaints" value={openComplaints.length} tone="rose" />
        <StatCard icon={Bug} label="Reported Bugs" value={openBugs.length} tone="rose" hint={`${bugs.length} total reports`} />
        <StatCard icon={Activity} label="System Events" value={activity.length} tone="brand" hint="last 7 days" />
      </div>

      <div className="grid lg:grid-cols-3 gap-6 mt-6">
        <div className="lg:col-span-2 space-y-6">
          {/* Pending payments */}
          <div className="card p-5">
            <div className="flex items-center justify-between mb-4">
              <h2 className="section-title flex items-center gap-2"><ShieldCheck size={17} className="text-amber-500" /> Payments pending release</h2>
              <Link to="/admin/payments" className="text-sm font-semibold text-brand-700 inline-flex items-center gap-1">Open payments <ArrowUpRight size={14} /></Link>
            </div>
            {pendingPayments.length === 0 ? (
              <EmptyState icon={CreditCard} title="No pending payments" subtitle="All escrowed payments have been released." />
            ) : (
              <div className="space-y-3">
                {pendingPayments.map((p) => (
                  <div key={p.id} className="flex flex-wrap items-center gap-4 p-3.5 rounded-xl border border-amber-200 bg-amber-50/50">
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-semibold text-slate-900">{p.project}</p>
                      <p className="text-xs text-slate-500">{p.client} → {p.developer} · {p.date}</p>
                    </div>
                    <span className="text-lg font-bold text-slate-900">${p.amount.toLocaleString()}</span>
                    <StatusBadge tone="warning">Pending Release</StatusBadge>
                    <Link to="/admin/payments" className="btn-primary btn-sm">Release</Link>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Recent activity */}
          <div className="card p-5">
            <div className="flex items-center justify-between mb-4">
              <h2 className="section-title flex items-center gap-2"><Activity size={17} className="text-brand-600" /> Recent system activity</h2>
              <Link to="/admin/activity" className="text-sm font-semibold text-brand-700 inline-flex items-center gap-1">View all <ArrowUpRight size={14} /></Link>
            </div>
            <div className="space-y-2.5">
              {activity.slice(0, 5).map((a) => (
                <div key={a.id} className="flex items-center gap-3 text-sm border-b border-slate-100 pb-2.5 last:border-0">
                  <span className="h-7 w-7 rounded-lg bg-slate-100 text-slate-500 flex items-center justify-center shrink-0"><Activity size={13} /></span>
                  <div className="min-w-0 flex-1">
                    <p className="text-slate-800 font-medium truncate">{a.event}</p>
                    <p className="text-xs text-slate-500">{a.target} · by {a.actor}</p>
                  </div>
                  <span className="text-xs text-slate-400 whitespace-nowrap">{a.time}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Quick links */}
          <div className="grid sm:grid-cols-3 gap-4">
            {[
              { to: '/admin/users', icon: Users, label: 'Manage users', desc: `${users.length} accounts` },
              { to: '/admin/complaints', icon: MessageSquareWarning, label: 'Complaints', desc: `${openComplaints.length} open` },
              { to: '/admin/bugs', icon: Bug, label: 'Bug reports', desc: `${openBugs.length} unresolved` },
            ].map((q) => (
              <Link key={q.to} to={q.to} className="card p-4 hover:border-brand-300 transition-colors">
                <q.icon size={18} className="text-brand-600" />
                <p className="mt-2 text-sm font-semibold text-slate-800">{q.label}</p>
                <p className="text-xs text-slate-500">{q.desc}</p>
              </Link>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <div className="card p-5">
            <div className="flex items-center justify-between mb-3">
              <h2 className="section-title">Admin notifications</h2>
            </div>
            <div className="space-y-2">
              {notifications.slice(0, 3).map((n) => <NotificationItem key={n.id} item={n} onRead={markRead} />)}
            </div>
            <Link to="/admin/activity" className="btn-secondary btn-sm w-full mt-3">Open system activity</Link>
          </div>

          <div className="card p-5">
            <h2 className="section-title flex items-center gap-2"><TrendingUp size={16} className="text-emerald-500" /> Platform health</h2>
            <div className="mt-4 space-y-4">
              {[
                ['API uptime', 99],
                ['Queue health', 94],
                ['RAG index freshness', 88],
                ['Support SLA', 76],
              ].map(([l, v]) => (
                <div key={l}>
                  <div className="flex justify-between text-sm mb-1"><span className="text-slate-600">{l}</span><span className="font-semibold">{v}%</span></div>
                  <ProgressBar value={v} tone={v >= 90 ? 'bg-emerald-500' : v >= 80 ? 'bg-amber-500' : 'bg-rose-500'} height="h-1.5" />
                </div>
              ))}
            </div>
          </div>

          <div className="card p-5">
            <h2 className="section-title mb-3">Top developers</h2>
            <div className="space-y-3">
              {[
                { n: 'Usman Tariq', r: 4.9, p: 41 },
                { n: 'Ali Khan', r: 4.9, p: 34 },
                { n: 'Sara Ahmed', r: 4.8, p: 21 },
              ].map((d) => (
                <div key={d.n} className="flex items-center gap-3">
                  <Avatar initials={d.n.split(' ').map((s) => s[0]).join('')} color="bg-slate-800" size="h-8 w-8" text="text-[11px]" />
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium text-slate-800 truncate">{d.n}</p>
                    <p className="text-xs text-slate-500">{d.p} projects</p>
                  </div>
                  <span className="text-xs font-semibold text-amber-600">★ {d.r}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
