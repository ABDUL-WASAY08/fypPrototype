import { useState } from 'react'
import { Wand2, Copy, Check, ArrowLeftRight, Sparkles, GitCompareArrows, Loader2 } from 'lucide-react'
import { useApp } from '../../context/AppContext.jsx'
import { codeImprovement } from '../../data/mockData.js'
import { SectionHeader, StatusBadge, CodeBlock, Tabs, Spinner } from '../../components/ui.jsx'

const CATEGORY_TONE = {
  Performance: 'text-emerald-700 bg-emerald-50 ring-emerald-200',
  Readability: 'text-blue-700 bg-blue-50 ring-blue-200',
  Maintainability: 'text-violet-700 bg-violet-50 ring-violet-200',
  Security: 'text-rose-700 bg-rose-50 ring-rose-200',
  'Best Practices': 'text-amber-700 bg-amber-50 ring-amber-200',
}

export default function CodeImprovement() {
  const { toast } = useApp()
  const [tab, setTab] = useState('compare')
  const [copied, setCopied] = useState(false)
  const [applied, setApplied] = useState(false)
  const [running, setRunning] = useState(false)

  const copy = () => {
    navigator.clipboard?.writeText(codeImprovement.improved).catch(() => {})
    setCopied(true)
    toast('Improved code copied to clipboard')
    setTimeout(() => setCopied(false), 2000)
  }

  const apply = async () => {
    setRunning(true)
    await new Promise((r) => setTimeout(r, 900))
    setRunning(false)
    setApplied(true)
    toast('Improvement applied to working tree')
  }

  return (
    <div>
      <SectionHeader
        title="AI Code Improvement"
        subtitle="Side-by-side comparison of the original snippet and the AI-suggested rewrite."
        actions={
          <>
            <button className="btn-secondary" onClick={copy}>{copied ? <Check size={15} className="text-emerald-500" /> : <Copy size={15} />} Copy Code</button>
            <button className="btn-primary" onClick={apply} disabled={running || applied}>
              {running ? <Spinner size={15} /> : <Check size={15} />} {running ? 'Applying…' : applied ? 'Applied' : 'Apply Improvement'}
            </button>
          </>
        }
      />

      {/* Issue summary */}
      <div className="card p-5 mb-6 flex flex-wrap items-center gap-4">
        <span className="h-11 w-11 rounded-xl bg-violet-50 text-violet-600 flex items-center justify-center"><Wand2 size={20} /></span>
        <div className="min-w-0 flex-1">
          <h2 className="font-semibold text-slate-900">{codeImprovement.title}</h2>
          <p className="text-xs text-slate-500 font-mono mt-0.5">{codeImprovement.file}:{codeImprovement.line}</p>
        </div>
        <div className="flex gap-2 flex-wrap">
          {codeImprovement.categories.map((c) => (
            <span key={c.name} className={`text-[11px] font-semibold rounded-full px-2.5 py-1 ring-1 ring-inset ${CATEGORY_TONE[c.name]}`}>
              {c.name} · {c.score}
            </span>
          ))}
        </div>
        <StatusBadge tone={applied ? 'success' : 'warning'}>{applied ? 'Applied' : 'Suggestion ready'}</StatusBadge>
      </div>

      <Tabs
        tabs={[{ id: 'compare', label: 'Compare Changes' }, { id: 'categories', label: 'Improvement Categories' }, { id: 'explanation', label: 'Explanation' }]}
        active={tab}
        onChange={setTab}
      />

      {tab === 'compare' && (
        <div className="mt-6 grid lg:grid-cols-2 gap-6 animate-fade-in">
          <div>
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-semibold text-slate-700 flex items-center gap-2"><span className="h-2.5 w-2.5 rounded-full bg-rose-500" /> Original Code</h3>
              <span className="text-xs text-slate-400">Before</span>
            </div>
            <CodeBlock tone="red" filename={`${codeImprovement.file} (original)`} code={codeImprovement.original} />
          </div>
          <div>
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-semibold text-slate-700 flex items-center gap-2"><span className="h-2.5 w-2.5 rounded-full bg-emerald-500" /> AI Improved Code</h3>
              <span className="text-xs text-slate-400">After</span>
            </div>
            <CodeBlock tone="green" filename={`${codeImprovement.file} (improved)`} code={codeImprovement.improved} />
          </div>

          <div className="lg:col-span-2 card p-5 bg-slate-900 border-slate-800 text-slate-200">
            <p className="text-xs font-semibold uppercase tracking-wide text-brand-400 flex items-center gap-2"><Sparkles size={13} /> Why this change</p>
            <p className="mt-2 text-sm leading-relaxed text-slate-300">{codeImprovement.explanation}</p>
            <div className="mt-4 flex flex-wrap gap-4 text-xs text-slate-400">
              <span className="flex items-center gap-1.5"><ArrowLeftRight size={13} /> 2 lines → 1 line</span>
              <span className="flex items-center gap-1.5"><GitCompareArrows size={13} /> No behaviour change</span>
              <span className="flex items-center gap-1.5"><Check size={13} /> All tests still pass (simulated)</span>
            </div>
          </div>
        </div>
      )}

      {tab === 'categories' && (
        <div className="mt-6 grid sm:grid-cols-2 lg:grid-cols-3 gap-5 animate-fade-in">
          {codeImprovement.categories.map((c) => (
            <div key={c.name} className="card p-5 hover:shadow-pop transition-shadow">
              <div className="flex items-center justify-between">
                <span className={`text-[11px] font-semibold rounded-full px-2.5 py-1 ring-1 ring-inset ${CATEGORY_TONE[c.name]}`}>{c.name}</span>
                <StatusBadge tone={c.score === 'Neutral' ? 'neutral' : 'success'}>{c.score}</StatusBadge>
              </div>
              <p className="text-sm text-slate-600 mt-3 leading-relaxed">{c.note}</p>
            </div>
          ))}
        </div>
      )}

      {tab === 'explanation' && (
        <div className="mt-6 card p-6 animate-fade-in max-w-3xl">
          <h3 className="section-title flex items-center gap-2"><Sparkles size={17} className="text-violet-500" /> Detailed rationale</h3>
          <p className="mt-3 text-sm text-slate-700 leading-relaxed">{codeImprovement.explanation}</p>
          <div className="mt-5 rounded-xl border border-slate-200 p-4">
            <p className="text-xs font-semibold uppercase text-slate-400 mb-2">Model output metadata</p>
            <div className="grid sm:grid-cols-3 gap-3 text-sm">
              <div><p className="text-slate-500 text-xs">Model</p><p className="font-semibold">tom-code-opt-v2</p></div>
              <div><p className="text-slate-500 text-xs">Confidence</p><p className="font-semibold">96%</p></div>
              <div><p className="text-slate-500 text-xs">Retrieved chunks</p><p className="font-semibold">3</p></div>
            </div>
          </div>
          <div className="mt-4 flex gap-3">
            <button className="btn-secondary" onClick={() => toast('Feedback recorded — thanks!', 'info')}><Check size={15} /> Looks good</button>
            <button className="btn-ghost" onClick={() => toast('Feedback recorded — suggestion skipped', 'info')}>Skip suggestion</button>
          </div>
        </div>
      )}
    </div>
  )
}
