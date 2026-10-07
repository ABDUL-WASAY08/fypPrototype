import { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  Github, Star, GitFork, RefreshCw, ScanSearch, Eye, Briefcase, Check,
  Sparkles, Star as StarIcon, MapPin, Mail, Globe, Linkedin, Send, ArrowRight,
} from 'lucide-react'
import { ragSteps } from '../data/mockData.js'
import { StatusBadge, Avatar, Spinner } from './ui.jsx'

/* ============ RAG pipeline visualization ============ */
export function RagFlow({ compact = false }) {
  const [active, setActive] = useState(0)

  return (
    <div className="card p-5">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="section-title flex items-center gap-2">
            <Sparkles size={16} className="text-brand-600" /> How RAG works in TOM
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">Retrieval-augmented generation pipeline — hover a step to explore.</p>
        </div>
        <button className="btn-secondary btn-sm" onClick={() => setActive((a) => (a + 1) % ragSteps.length)}>
          Trace next step <ArrowRight size={13} />
        </button>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
        {ragSteps.map((s, i) => (
          <button
            key={s.key}
            onMouseEnter={() => setActive(i)}
            onFocus={() => setActive(i)}
            onClick={() => setActive(i)}
            className={`text-left rounded-lg border p-3 transition-all ${
              i === active
                ? 'border-brand-500 bg-brand-50 shadow-sm ring-2 ring-brand-100'
                : i < active
                  ? 'border-emerald-200 bg-emerald-50/50'
                  : 'border-slate-200 bg-white hover:border-slate-300'
            }`}
          >
            <div className="flex items-center gap-2">
              <span
                className={`h-6 w-6 rounded-full text-[10px] font-bold flex items-center justify-center ${
                  i < active ? 'bg-emerald-500 text-white' : i === active ? 'bg-brand-600 text-white' : 'bg-slate-200 text-slate-500'
                }`}
              >
                {i + 1}
              </span>
              <span className={`text-xs font-semibold ${i === active ? 'text-brand-700' : 'text-slate-700'}`}>{s.label}</span>
            </div>
            <p className="text-[11px] text-slate-500 mt-1.5 pl-8">{s.hint}</p>
          </button>
        ))}
      </div>

      {!compact && (
        <div className="mt-4 rounded-lg bg-slate-900 text-slate-200 px-4 py-3 text-xs font-mono flex items-center gap-3">
          <span className="text-emerald-400">●</span>
          <span>
            {ragSteps[active].label} <span className="text-slate-500">→</span> {ragSteps[active].hint}
          </span>
        </div>
      )}
    </div>
  )
}

/* ============ Repository card ============ */
export function RepositoryCard({ repo, onAnalyze, onSync, analyzing, onView, onTogglePortfolio }) {
  return (
    <div className="card p-5 flex flex-col hover:shadow-pop transition-shadow">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3 min-w-0">
          <div className="h-10 w-10 rounded-lg bg-slate-900 text-white flex items-center justify-center shrink-0">
            <Github size={18} />
          </div>
          <div className="min-w-0">
            <h3 className="font-semibold text-slate-900 truncate">{repo.name}</h3>
            <div className="flex items-center gap-2 text-xs text-slate-500 mt-0.5">
              <span className={`h-2 w-2 rounded-full ${repo.languageColor}`} />
              {repo.language}
              <span>•</span>
              {repo.updated}
            </div>
          </div>
        </div>
        <StatusBadge tone={repo.analyzed ? 'success' : 'neutral'}>{repo.analyzed ? 'Analyzed' : 'Not analyzed'}</StatusBadge>
      </div>

      <p className="text-sm text-slate-600 mt-3 line-clamp-2 flex-1">{repo.description}</p>

      <div className="flex items-center gap-4 mt-3 text-xs text-slate-500">
        <span className="flex items-center gap-1"><Star size={13} className="text-amber-400" /> {repo.stars}</span>
        <span className="flex items-center gap-1"><GitFork size={13} /> {repo.forks}</span>
        <span>{repo.lines.toLocaleString()} lines</span>
        {repo.portfolio && <StatusBadge tone="purple">Portfolio</StatusBadge>}
      </div>

      <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-slate-100">
        <button className="btn-primary btn-sm" onClick={() => onAnalyze(repo)} disabled={analyzing}>
          {analyzing ? <><Spinner size={12} /> Analyzing…</> : <><ScanSearch size={13} /> Analyze</>}
        </button>
        <button className="btn-secondary btn-sm" onClick={() => onView(repo)}><Eye size={13} /> View</button>
        <button className="btn-secondary btn-sm" onClick={() => onSync(repo)}><RefreshCw size={13} /> Sync</button>
        <button className="btn-ghost btn-sm ml-auto" onClick={() => onTogglePortfolio?.(repo)}>
          <Briefcase size={13} /> {repo.portfolio ? 'In portfolio' : 'Select for Portfolio'}
        </button>
      </div>
    </div>
  )
}

/* ============ Developer card ============ */
export function DeveloperCard({ dev, onViewPortfolio, onContact, onInvite, children }) {
  return (
    <div className="card p-5 flex flex-col hover:shadow-pop transition-shadow">
      <div className="flex items-start gap-3">
        <Avatar initials={dev.avatar} color={dev.color} size="h-12 w-12" />
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2 flex-wrap">
            <h3 className="font-semibold text-slate-900">{dev.name}</h3>
            {dev.aiBadge && (
              <span className="inline-flex items-center gap-1 text-[10px] font-bold bg-brand-50 text-brand-700 ring-1 ring-brand-200 rounded-full px-2 py-0.5">
                <Sparkles size={10} /> AI Code Assistance
              </span>
            )}
          </div>
          <p className="text-sm text-slate-500">{dev.title} · {dev.experience}</p>
          <div className="flex items-center gap-3 mt-1 text-xs text-slate-500">
            <span className="flex items-center gap-1 text-amber-600 font-semibold"><StarIcon size={12} className="fill-amber-400 text-amber-400" /> {dev.rating}</span>
            <span>{dev.completedProjects} projects</span>
            <span className="hidden sm:flex items-center gap-1"><MapPin size={11} /> {dev.location}</span>
          </div>
        </div>
      </div>

      <div className="flex flex-wrap gap-1.5 mt-3">
        {dev.skills.map((s) => (
          <span key={s} className="text-[11px] font-medium bg-slate-100 text-slate-600 rounded px-2 py-0.5">{s}</span>
        ))}
      </div>

      <p className="text-sm text-slate-600 mt-3 line-clamp-2 flex-1">{dev.bio}</p>

      <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-slate-100">
        <Link to={`/portfolio/${dev.slug}`} className="btn-primary btn-sm" onClick={onViewPortfolio}><Eye size={13} /> View Portfolio</Link>
        <button className="btn-secondary btn-sm" onClick={() => onContact?.(dev)}><Mail size={13} /> Contact</button>
        <button className="btn-ghost btn-sm" onClick={() => onInvite?.(dev)}><Send size={13} /> Invite to Project</button>
      </div>
      {children}
    </div>
  )
}

/* ============ Project card ============ */
export function ProjectCard({ project, bidCount, onClick, action }) {
  const statusTone = { open: 'info', 'in-progress': 'purple', submitted: 'warning', completed: 'success', approved: 'success' }
  return (
    <button onClick={onClick} className="card p-5 text-left w-full hover:shadow-pop transition-shadow group">
      <div className="flex items-start justify-between gap-3">
        <StatusBadge tone={statusTone[project.status] || 'neutral'}>
          {project.status === 'in-progress' ? 'In Progress' : project.status.charAt(0).toUpperCase() + project.status.slice(1)}
        </StatusBadge>
        <span className="text-lg font-bold text-brand-700">${project.budget.toLocaleString()}</span>
      </div>
      <h3 className="font-semibold text-slate-900 mt-3 group-hover:text-brand-700 transition-colors">{project.title}</h3>
      <p className="text-sm text-slate-600 mt-1 line-clamp-2">{project.description}</p>
      <div className="flex flex-wrap gap-1.5 mt-3">
        {project.skills.slice(0, 4).map((s) => (
          <span key={s} className="text-[11px] font-medium bg-slate-100 text-slate-600 rounded px-2 py-0.5">{s}</span>
        ))}
      </div>
      <div className="flex items-center justify-between mt-4 pt-3 border-t border-slate-100 text-xs text-slate-500">
        <span>{project.client} · {project.company}</span>
        <span>{bidCount ?? 0} bids · {project.delivery}</span>
      </div>
      {action}
    </button>
  )
}

/* ============ Notification item ============ */
const NOTE_ICON = {
  success: 'bg-emerald-50 text-emerald-600',
  info: 'bg-blue-50 text-blue-600',
  payment: 'bg-amber-50 text-amber-600',
  warning: 'bg-rose-50 text-rose-600',
  ai: 'bg-violet-50 text-violet-600',
}
const NOTE_DOT = { success: 'bg-emerald-500', info: 'bg-blue-500', payment: 'bg-amber-500', warning: 'bg-rose-500', ai: 'bg-violet-500' }

export function NotificationItem({ item, onRead }) {
  return (
    <button
      onClick={() => onRead(item.id)}
      className={`w-full text-left flex gap-3 p-4 rounded-xl border transition-colors ${
        item.read ? 'bg-white border-slate-200' : 'bg-brand-50/40 border-brand-200'
      } hover:border-brand-300`}
    >
      <span className={`mt-1 h-2.5 w-2.5 rounded-full shrink-0 ${item.read ? 'bg-slate-300' : NOTE_DOT[item.type] || 'bg-brand-500'}`} />
      <span className={`h-9 w-9 rounded-lg flex items-center justify-center shrink-0 ${NOTE_ICON[item.type] || NOTE_ICON.info}`}>
        {item.type === 'payment' ? <Check size={16} /> : <Sparkles size={16} />}
      </span>
      <span className="min-w-0 flex-1">
        <span className="flex items-center justify-between gap-3">
          <span className={`text-sm ${item.read ? 'text-slate-700' : 'font-semibold text-slate-900'}`}>{item.title}</span>
          <span className="text-[11px] text-slate-400 whitespace-nowrap">{item.time}</span>
        </span>
        <span className="block text-sm text-slate-500 mt-0.5">{item.detail}</span>
        {item.live && <span className="inline-block mt-1.5 text-[10px] font-bold text-emerald-600 bg-emerald-50 rounded px-1.5 py-0.5">LIVE</span>}
      </span>
    </button>
  )
}
