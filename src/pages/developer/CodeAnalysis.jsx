import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ShieldCheck, Gauge, Wrench, BookOpen, AlertTriangle, Bug, FileCode2, Wand2, Bot, Eye, CheckCircle2 } from 'lucide-react'
import { useApp } from '../../context/AppContext.jsx'
import { analysisOverview, analysisIssues } from '../../data/mockData.js'
import { SectionHeader, StatusBadge, ProgressBar, Modal, Tabs, EmptyState, StatCard, CodeBlock, Spinner } from '../../components/ui.jsx'

const TABS = [
  { id: 'all', label: 'Potential Problems' },
  { id: 'Security', label: 'Security Issues' },
  { id: 'Code Quality', label: 'Code Quality' },
  { id: 'Performance', label: 'Performance' },
]

export default function CodeAnalysis() {
  const { repos, toast } = useApp()
  const navigate = useNavigate()
  const analyzed = repos.filter((r) => r.analyzed)
  const [repoName, setRepoName] = useState('TOM-Backend')
  const [tab, setTab] = useState('all')
  const [issue, setIssue] = useState(null)
  const [explaining, setExplaining] = useState(false)
  const [explanation, setExplanation] = useState(null)

  const repo = repos.find((r) => r.name === repoName) || analyzed[0]
  const issues = useMemo(() => (tab === 'all' ? analysisIssues : analysisIssues.filter((i) => i.category === tab)), [tab])

  const counts = {
    all: analysisIssues.length,
    Security: analysisIssues.filter((i) => i.category === 'Security').length,
    'Code Quality': analysisIssues.filter((i) => i.category === 'Code Quality').length,
    Performance: analysisIssues.filter((i) => i.category === 'Performance').length,
  }

  const openIssue = (i) => {
    setIssue(i)
    setExplanation(null)
    setExplaining(false)
  }

  const explain = async () => {
    setExplaining(true)
    await new Promise((r) => setTimeout(r, 900))
    setExplanation(
      `${issue.title} was detected in ${issue.file} at line ${issue.line}. The ${issue.category.toLowerCase()} scanner flagged this because the code path deviates from the enforced convention for this repository. ${issue.explanation} Applying the suggested fix resolves the finding and raises the corresponding sub-score.`
    )
    setExplaining(false)
  }

  return (
    <div>
      <SectionHeader
        title="Code Analysis"
        subtitle="Quality, security and maintainability findings for your selected repository."
        actions={
          <>
            <select className="input w-auto" value={repoName} onChange={(e) => setRepoName(e.target.value)}>
              {analyzed.map((r) => <option key={r.id}>{r.name}</option>)}
            </select>
            <button className="btn-secondary" onClick={() => navigate('/developer/repositories')}>Change repository</button>
          </>
        }
      />

      {/* Scores */}
      <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-4">
        <StatCard icon={Gauge} label="Code Quality" value={`${repo?.quality ?? 84}%`} tone="emerald" hint="Above project average" />
        <StatCard icon={ShieldCheck} label="Security" value={`${repo?.security ?? 91}%`} tone="brand" hint="2 findings to review" />
        <StatCard icon={Wrench} label="Maintainability" value={`${repo?.maintainability ?? 79}%`} tone="amber" hint="Duplicate logic detected" />
        <StatCard icon={BookOpen} label="Documentation" value={`${analysisOverview.documentation}%`} tone="violet" hint={analysisOverview.documentationStatus} />
      </div>

      <div className="grid lg:grid-cols-3 gap-6 mt-6">
        {/* Issues */}
        <div className="lg:col-span-2 card p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="section-title flex items-center gap-2"><AlertTriangle size={17} className="text-amber-500" /> Findings</h2>
            <div className="flex gap-2 text-xs">
              <StatusBadge tone="danger">{analysisIssues.filter((i) => i.severity === 'High').length} High</StatusBadge>
              <StatusBadge tone="warning">{analysisIssues.filter((i) => i.severity === 'Medium').length} Medium</StatusBadge>
              <StatusBadge tone="neutral">{analysisIssues.filter((i) => i.severity === 'Low').length} Low</StatusBadge>
            </div>
          </div>

          <Tabs tabs={TABS.map((t) => ({ ...t, count: counts[t.id] }))} active={tab} onChange={setTab} />

          <div className="mt-4 space-y-3">
            {issues.length === 0 && <EmptyState icon={CheckCircle2} title="No findings in this category" subtitle="Great — nothing to fix here." />}
            {issues.map((i) => (
              <button
                key={i.id}
                onClick={() => openIssue(i)}
                className="w-full text-left flex items-center gap-4 p-4 rounded-xl border border-slate-200 hover:border-brand-400 hover:bg-brand-50/30 transition-colors"
              >
                <span className={`h-9 w-9 rounded-lg flex items-center justify-center shrink-0 ${
                  i.severity === 'High' ? 'bg-rose-50 text-rose-600' : i.severity === 'Medium' ? 'bg-amber-50 text-amber-600' : 'bg-slate-100 text-slate-500'
                }`}>
                  <Bug size={16} />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="flex items-center gap-2 flex-wrap">
                    <span className="text-sm font-semibold text-slate-900">{i.title}</span>
                    <StatusBadge>{i.severity}</StatusBadge>
                  </span>
                  <span className="block text-xs text-slate-500 mt-1 font-mono truncate">{i.file}:{i.line} · {i.category}</span>
                </span>
                <span className="text-xs font-semibold text-brand-700 shrink-0 hidden sm:block">View details →</span>
              </button>
            ))}
          </div>
        </div>

        {/* Overview */}
        <div className="space-y-6">
          <div className="card p-5">
            <h3 className="section-title mb-4">Repository overview</h3>
            <div className="space-y-3 text-sm">
              {[
                ['Files analyzed', analysisOverview.filesAnalyzed],
                ['Lines of code', analysisOverview.linesOfCode.toLocaleString()],
                ['Complexity', analysisOverview.complexity],
                ['Coverage', `${repo?.coverage ?? 71}%`],
              ].map(([k, v]) => (
                <div key={k} className="flex items-center justify-between border-b border-slate-100 pb-2">
                  <span className="text-slate-500">{k}</span>
                  <span className="font-semibold text-slate-900">{v}</span>
                </div>
              ))}
            </div>
            <p className="text-xs text-slate-500 mt-3">{analysisOverview.documentationStatus}</p>
          </div>

          <div className="card p-5">
            <h3 className="section-title mb-4">Languages</h3>
            <div className="space-y-3">
              {analysisOverview.languages.map((l) => (
                <div key={l.name}>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-slate-600 flex items-center gap-2"><span className={`h-2.5 w-2.5 rounded-full ${l.color}`} /> {l.name}</span>
                    <span className="font-semibold text-slate-800">{l.pct}%</span>
                  </div>
                  <ProgressBar value={l.pct} tone={l.color} height="h-1.5" />
                </div>
              ))}
            </div>
          </div>

          <div className="card p-5 bg-brand-50 border-brand-200">
            <h3 className="font-semibold text-brand-900 flex items-center gap-2"><Wand2 size={16} /> Next best action</h3>
            <p className="text-sm text-brand-800 mt-1.5">Fix the 2 high-severity findings, then regenerate your README to reflect the hardened API.</p>
            <div className="flex gap-2 mt-3">
              <button className="btn-primary btn-sm" onClick={() => navigate('/developer/improvement')}>Improve code</button>
              <button className="btn-secondary btn-sm" onClick={() => navigate('/developer/readme')}>Generate README</button>
            </div>
          </div>
        </div>
      </div>

      {/* Issue detail modal */}
      <Modal
        open={!!issue}
        onClose={() => setIssue(null)}
        title={issue?.title}
        footer={
          <>
            <button className="btn-secondary" onClick={() => { setIssue(null); navigate('/developer/analysis') }}>
              <Eye size={15} /> View File
            </button>
            <button className="btn-secondary" onClick={explain} disabled={explaining}>
              {explaining ? <Spinner size={14} /> : <Bot size={15} />} Explain Issue
            </button>
            <button className="btn-primary" onClick={() => { setIssue(null); navigate('/developer/improvement') }}>
              <Wand2 size={15} /> Improve Code
            </button>
          </>
        }
      >
        {issue && (
          <div className="space-y-4">
            <div className="flex flex-wrap gap-2">
              <StatusBadge>{issue.severity}</StatusBadge>
              <StatusBadge tone="purple">{issue.category}</StatusBadge>
              <StatusBadge tone="info">{issue.file}:{issue.line}</StatusBadge>
            </div>

            <div className="rounded-lg border border-slate-200 p-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-400 mb-1.5">Explanation</p>
              <p className="text-sm text-slate-700 leading-relaxed">{issue.explanation}</p>
            </div>

            <div className="rounded-lg border border-emerald-200 bg-emerald-50 p-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-emerald-600 mb-1.5 flex items-center gap-1.5"><CheckCircle2 size={12} /> Suggested solution</p>
              <p className="text-sm text-emerald-900 leading-relaxed">{issue.solution}</p>
            </div>

            <CodeBlock
              filename={issue.file}
              tone="red"
              code={`// line ${issue.line}\n${issue.explanation.split('. ')[0]}.\n// TODO: apply suggested fix\n`}
            />

            {explanation && (
              <div className="rounded-lg border border-brand-200 bg-brand-50 p-4 animate-fade-in">
                <p className="text-xs font-semibold uppercase tracking-wide text-brand-600 mb-1.5 flex items-center gap-1.5"><Bot size={12} /> TOM AI explanation</p>
                <p className="text-sm text-brand-900 leading-relaxed whitespace-pre-line">{explanation}</p>
              </div>
            )}
          </div>
        )}
      </Modal>
    </div>
  )
}
