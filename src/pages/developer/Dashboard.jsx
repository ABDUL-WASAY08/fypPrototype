import { Link } from 'react-router-dom'
import {
  FolderGit2, Bot, Briefcase, Gavel, Eye, ArrowUpRight, Activity as ActivityIcon,
  ScanSearch, FileText, BookOpen, Wand2, Sparkles, CheckCircle2,
} from 'lucide-react'
import { useApp } from '../../context/AppContext.jsx'
import { StatCard, StatusBadge, SectionHeader, ProgressBar, Avatar } from '../../components/ui.jsx'
import { NotificationItem } from '../../components/domain.jsx'

const QUICK = [
  { to: '/developer/repositories', icon: FolderGit2, label: 'Analyze a repository', desc: 'Run quality & security scoring' },
  { to: '/developer/assistant', icon: Bot, label: 'Ask TOM AI', desc: 'RAG chat over your codebase' },
  { to: '/developer/improvement', icon: Wand2, label: 'Improve code', desc: 'Before/after AI rewrite' },
  { to: '/developer/readme', icon: FileText, label: 'Generate README', desc: 'Structured Markdown preview' },
]

export default function Dashboard() {
  const { auth, repos, projects, bids, notifications, markRead, markAllRead } = useApp()

  const analyzed = repos.filter((r) => r.analyzed).length
  const activeProjects = projects.filter((p) => p.developerId === 'dev-1' && ['in-progress', 'submitted'].includes(p.status))
  const pendingBids = bids.filter((b) => b.developerId === 'dev-1' && b.status === 'pending')
  const myBids = bids.filter((b) => b.developerId === 'dev-1')
  const portfolioCount = repos.filter((r) => r.portfolio).length

  const stats = [
    { icon: FolderGit2, label: 'Repositories', value: repos.length, tone: 'brand', hint: `${analyzed} analyzed` },
    { icon: Bot, label: 'AI queries this month', value: '312', tone: 'violet', hint: 'of 500 included' },
    { icon: Briefcase, label: 'Active Projects', value: activeProjects.length, tone: 'emerald', delta: '+1 this week' },
    { icon: Gavel, label: 'Pending Bids', value: pendingBids.length, tone: 'amber', hint: `${myBids.length} total submitted` },
    { icon: Eye, label: 'Portfolio Views', value: '1,248', tone: 'sky', delta: '+12% vs last month' },
  ]

  const activity = [
    { repo: 'TOM-Backend', action: 'Analysis completed', score: 84, time: '5 hours ago', tone: 'success' },
    { repo: 'TOM-Frontend', action: 'Synchronized', score: 88, time: '2 hours ago', tone: 'info' },
    { repo: 'Ecommerce-App', action: 'Analysis completed', score: 76, time: '1 day ago', tone: 'warning' },
    { repo: 'Chat-Application', action: 'Analysis completed', score: 81, time: '3 days ago', tone: 'success' },
    { repo: 'Portfolio-Website', action: 'Added to portfolio', score: 92, time: '6 days ago', tone: 'purple' },
  ]

  return (
    <div>
      <SectionHeader
        title={`Welcome back, ${auth.user.name.split(' ')[0]} 👋`}
        subtitle="Here is what is happening across your repositories, bids and projects."
        actions={
          <Link to="/developer/repositories" className="btn-primary"><ScanSearch size={15} /> Analyze repository</Link>
        }
      />

      {/* Stats */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
        {stats.map((s) => <StatCard key={s.label} {...s} />)}
      </div>

      <div className="grid lg:grid-cols-3 gap-6 mt-6">
        {/* Recent repository activity */}
        <div className="lg:col-span-2 card p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="section-title flex items-center gap-2"><ActivityIcon size={17} className="text-brand-600" /> Recent repository activity</h2>
            <Link to="/developer/repositories" className="text-sm font-semibold text-brand-700 inline-flex items-center gap-1">View all <ArrowUpRight size={14} /></Link>
          </div>
          <div className="space-y-3">
            {activity.map((a, i) => (
              <div key={i} className="flex items-center gap-4 p-3 rounded-lg border border-slate-200 hover:border-brand-300 transition-colors">
                <div className="h-9 w-9 rounded-lg bg-slate-900 text-white flex items-center justify-center shrink-0">
                  <FolderGit2 size={16} />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-semibold text-slate-900">{a.repo}</p>
                  <p className="text-xs text-slate-500">{a.action} · {a.time}</p>
                </div>
                <div className="w-28 hidden sm:block">
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="text-slate-500">Quality</span>
                    <span className="font-semibold text-slate-700">{a.score}%</span>
                  </div>
                  <ProgressBar value={a.score} tone={a.score >= 85 ? 'bg-emerald-500' : a.score >= 75 ? 'bg-amber-500' : 'bg-rose-500'} height="h-1.5" />
                </div>
                <StatusBadge tone={a.tone}>{a.action.split(' ')[0]}</StatusBadge>
              </div>
            ))}
          </div>

          {/* Quick actions */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3 mt-5">
            {QUICK.map((q) => (
              <Link key={q.to} to={q.to} className="rounded-xl border border-slate-200 p-4 hover:border-brand-400 hover:bg-brand-50/40 transition-all group">
                <q.icon size={18} className="text-brand-600" />
                <p className="mt-2 text-sm font-semibold text-slate-800 group-hover:text-brand-700">{q.label}</p>
                <p className="text-xs text-slate-500 mt-0.5">{q.desc}</p>
              </Link>
            ))}
          </div>
        </div>

        {/* Notifications + portfolio */}
        <div className="space-y-6">
          <div className="card p-5">
            <div className="flex items-center justify-between mb-3">
              <h2 className="section-title">Recent notifications</h2>
              <button onClick={markAllRead} className="text-xs font-semibold text-slate-500 hover:text-brand-700">Mark all read</button>
            </div>
            <div className="space-y-2">
              {notifications.slice(0, 4).map((n) => <NotificationItem key={n.id} item={n} onRead={markRead} />)}
            </div>
            <Link to="/developer/notifications" className="btn-secondary btn-sm w-full mt-3">Open notification center</Link>
          </div>

          <div className="card p-5 bg-slate-900 border-slate-800 text-white">
            <div className="flex items-center gap-2">
              <Sparkles size={16} className="text-brand-400" />
              <h2 className="font-semibold">Portfolio health</h2>
            </div>
            <p className="text-sm text-slate-400 mt-2">
              {portfolioCount} of {repos.length} repositories are showcased on your public portfolio.
            </p>
            <div className="mt-3">
              <ProgressBar value={(portfolioCount / repos.length) * 100} tone="bg-brand-500" />
            </div>
            <div className="mt-4 flex items-center justify-between text-sm">
              <span className="text-slate-400">1,248 total views</span>
              <Link to="/portfolio/ali-khan" className="text-brand-300 font-semibold inline-flex items-center gap-1">Preview <ArrowUpRight size={14} /></Link>
            </div>
          </div>

          <div className="card p-5">
            <h2 className="section-title mb-3 flex items-center gap-2"><CheckCircle2 size={16} className="text-emerald-500" /> Checklist</h2>
            <ul className="space-y-2.5 text-sm">
              {[
                { t: 'Connect GitHub account', done: true },
                { t: 'Analyze first repository', done: analyzed > 0 },
                { t: 'Ask a question in AI Assistant', done: true },
                { t: 'Select repositories for portfolio', done: portfolioCount > 0 },
                { t: 'Submit first bid', done: myBids.length > 0 },
              ].map((c) => (
                <li key={c.t} className="flex items-center gap-2.5">
                  <span className={`h-5 w-5 rounded-full text-[10px] font-bold flex items-center justify-center ${c.done ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-400'}`}>
                    {c.done ? '✓' : '–'}
                  </span>
                  <span className={c.done ? 'text-slate-500 line-through' : 'text-slate-700'}>{c.t}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
