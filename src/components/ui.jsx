import { useEffect } from 'react'
import { X, CheckCircle2, AlertTriangle, Info, Terminal } from 'lucide-react'
import { useApp } from '../context/AppContext.jsx'

/* ---------------- Status badge ---------------- */
const TONES = {
  success: 'bg-emerald-50 text-emerald-700 ring-emerald-600/20',
  info: 'bg-blue-50 text-blue-700 ring-blue-600/20',
  warning: 'bg-amber-50 text-amber-700 ring-amber-600/20',
  danger: 'bg-rose-50 text-rose-700 ring-rose-600/20',
  neutral: 'bg-slate-100 text-slate-600 ring-slate-500/20',
  purple: 'bg-violet-50 text-violet-700 ring-violet-600/20',
}

const STATUS_TONE = {
  // generic
  Active: 'success', active: 'success', Completed: 'success', completed: 'success', Approved: 'success',
  Released: 'success', Resolved: 'success', accepted: 'success', Paid: 'info', paid: 'info',
  'In Progress': 'info', 'in-progress': 'info', 'Under Review': 'warning', 'In Progress ': 'warning',
  Pending: 'warning', pending: 'warning', 'Pending Release': 'warning', Open: 'danger', open: 'danger',
  Suspended: 'danger', Rejected: 'danger', rejected: 'danger', Refunded: 'neutral', 'Not Started': 'neutral',
  Submitted: 'purple', submitted: 'purple', Low: 'neutral', Medium: 'warning', High: 'danger',
}

export function StatusBadge({ children, tone, className = '' }) {
  const t = tone || STATUS_TONE[children] || 'neutral'
  return (
    <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-semibold ring-1 ring-inset ${TONES[t] || TONES.neutral} ${className}`}>
      {children}
    </span>
  )
}

/* ---------------- Stat card ---------------- */
export function StatCard({ icon: Icon, label, value, delta, tone = 'brand', hint }) {
  const tones = {
    brand: 'bg-brand-50 text-brand-600',
    emerald: 'bg-emerald-50 text-emerald-600',
    amber: 'bg-amber-50 text-amber-600',
    rose: 'bg-rose-50 text-rose-600',
    violet: 'bg-violet-50 text-violet-600',
    sky: 'bg-sky-50 text-sky-600',
  }
  return (
    <div className="card p-5 flex items-start gap-4 hover:shadow-pop transition-shadow">
      <div className={`h-11 w-11 rounded-lg flex items-center justify-center shrink-0 ${tones[tone]}`}>
        {Icon && <Icon size={20} />}
      </div>
      <div className="min-w-0">
        <p className="text-sm text-slate-500">{label}</p>
        <p className="text-2xl font-bold text-slate-900 mt-0.5 tracking-tight">{value}</p>
        {delta && <p className="text-xs text-emerald-600 font-medium mt-1">{delta}</p>}
        {hint && <p className="text-xs text-slate-400 mt-1">{hint}</p>}
      </div>
    </div>
  )
}

/* ---------------- Modal ---------------- */
export function Modal({ open, onClose, title, children, footer, size = 'max-w-2xl' }) {
  useEffect(() => {
    if (!open) return
    const onKey = (e) => e.key === 'Escape' && onClose?.()
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [open, onClose])

  if (!open) return null
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-slate-900/50 backdrop-blur-[2px]" onClick={onClose} />
      <div className={`relative bg-white rounded-2xl shadow-pop w-full ${size} max-h-[88vh] flex flex-col animate-fade-in`}>
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200">
          <h3 className="text-lg font-semibold text-slate-900">{title}</h3>
          <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-500" aria-label="Close">
            <X size={18} />
          </button>
        </div>
        <div className="px-6 py-5 overflow-y-auto scrollbar-thin">{children}</div>
        {footer && <div className="px-6 py-4 border-t border-slate-200 flex justify-end gap-3">{footer}</div>}
      </div>
    </div>
  )
}

/* ---------------- Tabs ---------------- */
export function Tabs({ tabs, active, onChange }) {
  return (
    <div className="flex gap-1 border-b border-slate-200 overflow-x-auto scrollbar-thin">
      {tabs.map((t) => (
        <button
          key={t.id}
          onClick={() => onChange(t.id)}
          className={`px-4 py-2.5 text-sm font-medium border-b-2 -mb-px whitespace-nowrap transition-colors ${
            active === t.id
              ? 'border-brand-600 text-brand-700'
              : 'border-transparent text-slate-500 hover:text-slate-800 hover:border-slate-300'
          }`}
        >
          {t.label}
          {t.count !== undefined && (
            <span className="ml-2 text-xs bg-slate-100 text-slate-600 rounded-full px-1.5 py-0.5">{t.count}</span>
          )}
        </button>
      ))}
    </div>
  )
}

/* ---------------- Empty state ---------------- */
export function EmptyState({ icon: Icon, title, subtitle, action }) {
  return (
    <div className="text-center py-14 px-6">
      <div className="mx-auto h-12 w-12 rounded-xl bg-slate-100 flex items-center justify-center text-slate-400">
        {Icon ? <Icon size={22} /> : <Info size={22} />}
      </div>
      <h3 className="mt-4 text-sm font-semibold text-slate-900">{title}</h3>
      {subtitle && <p className="mt-1 text-sm text-slate-500">{subtitle}</p>}
      {action && <div className="mt-5 flex justify-center">{action}</div>}
    </div>
  )
}

/* ---------------- Spinner ---------------- */
export function Spinner({ size = 16, className = '' }) {
  return (
    <span
      className={`inline-block animate-spin rounded-full border-2 border-current border-t-transparent ${className}`}
      style={{ width: size, height: size }}
      aria-label="Loading"
    />
  )
}

/* ---------------- Avatar ---------------- */
export function Avatar({ initials, color = 'bg-brand-600', size = 'h-10 w-10', text = 'text-sm' }) {
  return (
    <span className={`${size} ${color} ${text} rounded-full inline-flex items-center justify-center text-white font-semibold shrink-0`}>
      {initials}
    </span>
  )
}

/* ---------------- Progress steps ---------------- */
export function ProgressSteps({ steps, current, done }) {
  return (
    <ol className="space-y-3">
      {steps.map((s, i) => {
        const isDone = done ? done.includes(s) : i < current
        const isCurrent = !done && i === current
        return (
          <li key={s} className="flex items-start gap-3">
            <span
              className={`mt-0.5 h-6 w-6 shrink-0 rounded-full text-xs font-bold flex items-center justify-center ring-1 ring-inset ${
                isDone
                  ? 'bg-emerald-50 text-emerald-700 ring-emerald-600/30'
                  : isCurrent
                    ? 'bg-brand-600 text-white ring-brand-600'
                    : 'bg-slate-100 text-slate-400 ring-slate-200'
              }`}
            >
              {isDone ? '✓' : i + 1}
            </span>
            <span className={`text-sm ${isDone ? 'text-slate-800 font-medium' : isCurrent ? 'text-brand-700 font-semibold' : 'text-slate-400'}`}>
              {s}
              {isCurrent && <span className="ml-2 text-xs text-brand-500 animate-pulse">running…</span>}
            </span>
          </li>
        )
      })}
    </ol>
  )
}

/* ---------------- Progress bar ---------------- */
export function ProgressBar({ value, tone = 'bg-brand-600', height = 'h-2' }) {
  return (
    <div className={`w-full ${height} bg-slate-100 rounded-full overflow-hidden`}>
      <div className={`${height} ${tone} rounded-full transition-all duration-700`} style={{ width: `${Math.min(100, Math.max(0, value))}%` }} />
    </div>
  )
}

/* ---------------- Code block ---------------- */
export function CodeBlock({ code, filename, tone = 'slate' }) {
  const header = tone === 'green' ? 'bg-emerald-950/60 text-emerald-300' : tone === 'red' ? 'bg-rose-950/60 text-rose-300' : 'bg-slate-800 text-slate-300'
  return (
    <div className="rounded-xl overflow-hidden border border-slate-800 bg-slate-900">
      <div className={`px-4 py-2 text-xs font-mono flex items-center justify-between ${header}`}>
        <span>{filename || 'snippet.js'}</span>
        <span className="opacity-60">{code.trim().split('\n').length} lines</span>
      </div>
      <pre className="p-4 overflow-x-auto text-[13px] leading-relaxed text-slate-100 font-mono scrollbar-thin">
        <code>{code}</code>
      </pre>
    </div>
  )
}

/* ---------------- Field ---------------- */
export function Field({ label, hint, children, required }) {
  return (
    <div>
      <label className="label">
        {label} {required && <span className="text-rose-500">*</span>}
      </label>
      {children}
      {hint && <p className="text-xs text-slate-400 mt-1">{hint}</p>}
    </div>
  )
}

/* ---------------- Section header ---------------- */
export function SectionHeader({ title, subtitle, actions }) {
  return (
    <div className="flex flex-wrap items-start justify-between gap-4 mb-6">
      <div>
        <h1 className="page-title">{title}</h1>
        {subtitle && <p className="page-sub">{subtitle}</p>}
      </div>
      {actions && <div className="flex items-center gap-3 flex-wrap">{actions}</div>}
    </div>
  )
}

/* ---------------- Toasts ---------------- */
const TOAST_STYLE = {
  success: { icon: CheckCircle2, cls: 'border-emerald-200 text-emerald-800', ico: 'text-emerald-500' },
  error: { icon: AlertTriangle, cls: 'border-rose-200 text-rose-800', ico: 'text-rose-500' },
  info: { icon: Info, cls: 'border-blue-200 text-blue-800', ico: 'text-blue-500' },
}

export function ToastHost() {
  const { toasts } = useApp()
  return (
    <div className="fixed bottom-5 right-5 z-[60] flex flex-col gap-2 items-end">
      {toasts.map((t) => {
        const s = TOAST_STYLE[t.type] || TOAST_STYLE.info
        const Icon = s.icon
        return (
          <div key={t.id} className={`animate-fade-in flex items-center gap-2.5 bg-white border ${s.cls} shadow-pop rounded-xl px-4 py-3 text-sm font-medium max-w-sm`}>
            <Icon size={17} className={s.ico} />
            {t.message}
          </div>
        )
      })}
    </div>
  )
}

export { Terminal }
