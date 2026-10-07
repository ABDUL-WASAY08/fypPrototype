import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { FolderGit2, Search, PlusCircle, CheckCircle2, FileCode2, Star } from 'lucide-react'
import { useApp } from '../../context/AppContext.jsx'
import { RepositoryCard } from '../../components/domain.jsx'
import { Modal, ProgressSteps, SectionHeader, StatusBadge, EmptyState, Spinner, Tabs, ProgressBar, CodeBlock } from '../../components/ui.jsx'
import { ANALYSIS_STEPS } from '../../services/githubService.js'

export default function Repositories() {
  const { repos, analyzeRepo, syncRepo, togglePortfolio, toast } = useApp()
  const navigate = useNavigate()
  const [query, setQuery] = useState('')
  const [filter, setFilter] = useState('all')
  const [analyzingId, setAnalyzingId] = useState(null)
  const [step, setStep] = useState(-1)
  const [viewRepo, setViewRepo] = useState(null)
  const [syncingId, setSyncingId] = useState(null)

  const filtered = repos.filter((r) => {
    const matchesQuery = r.name.toLowerCase().includes(query.toLowerCase()) || r.description.toLowerCase().includes(query.toLowerCase())
    const matchesFilter = filter === 'all' || (filter === 'analyzed' && r.analyzed) || (filter === 'new' && !r.analyzed) || (filter === 'portfolio' && r.portfolio)
    return matchesQuery && matchesFilter
  })

  const runAnalysis = async (repo) => {
    setAnalyzingId(repo.id)
    setStep(0)
    await analyzeRepo(repo.id, (s, i) => setStep(i))
    setStep(ANALYSIS_STEPS.length)
    setTimeout(() => {
      setAnalyzingId(null)
      setStep(-1)
      navigate('/developer/analysis', { state: { repoId: repo.id } })
    }, 900)
  }

  const runSync = async (repo) => {
    setSyncingId(repo.id)
    await syncRepo(repo.id)
    setSyncingId(null)
  }

  const analyzing = repos.find((r) => r.id === analyzingId)

  return (
    <div>
      <SectionHeader
        title="GitHub Repositories"
        subtitle="Connect, synchronize and analyze your repositories. All GitHub calls are mocked."
        actions={
          <button className="btn-primary" onClick={() => toast('GitHub account already connected', 'info')}>
            <PlusCircle size={15} /> Connect repository
          </button>
        }
      />

      {/* Toolbar */}
      <div className="card p-4 flex flex-wrap items-center gap-3 mb-6">
        <div className="relative flex-1 min-w-[220px]">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input className="input pl-9" placeholder="Search repositories…" value={query} onChange={(e) => setQuery(e.target.value)} />
        </div>
        <Tabs
          active={filter}
          onChange={setFilter}
          tabs={[
            { id: 'all', label: 'All', count: repos.length },
            { id: 'analyzed', label: 'Analyzed', count: repos.filter((r) => r.analyzed).length },
            { id: 'new', label: 'Not analyzed', count: repos.filter((r) => !r.analyzed).length },
            { id: 'portfolio', label: 'Portfolio', count: repos.filter((r) => r.portfolio).length },
          ]}
        />
      </div>

      {filtered.length === 0 ? (
        <div className="card">
          <EmptyState icon={FolderGit2} title="No repositories found" subtitle="Try a different search or filter." />
        </div>
      ) : (
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-5">
          {filtered.map((repo) => (
            <RepositoryCard
              key={repo.id}
              repo={repo}
              analyzing={analyzingId === repo.id}
              onAnalyze={runAnalysis}
              onSync={runSync}
              onView={setViewRepo}
              onTogglePortfolio={togglePortfolio}
            />
          ))}
        </div>
      )}

      <div className="mt-6 flex items-center gap-2 text-xs text-slate-400">
        {syncingId && <><Spinner size={12} /> Synchronizing…</>}
        <span>8 repositories connected · last sync 5 hours ago</span>
      </div>

      {/* Analysis progress modal */}
      <Modal
        open={!!analyzing}
        onClose={() => {}}
        title={`Analyzing ${analyzing?.name || ''}`}
        size="max-w-lg"
        footer={
          <div className="w-full flex items-center justify-between text-sm">
            <span className="text-slate-500">{step >= ANALYSIS_STEPS.length ? 'Pipeline finished' : 'Pipeline running…'}</span>
            <StatusBadge tone={step >= ANALYSIS_STEPS.length ? 'success' : 'info'}>
              {step >= ANALYSIS_STEPS.length ? 'Complete' : `${Math.round((step / ANALYSIS_STEPS.length) * 100)}%`}
            </StatusBadge>
          </div>
        }
      >
        <div className="flex items-center gap-3 mb-5 p-3 rounded-lg bg-slate-50 border border-slate-200">
          <div className="h-9 w-9 rounded-lg bg-slate-900 text-white flex items-center justify-center"><FileCode2 size={16} /></div>
          <div>
            <p className="text-sm font-semibold text-slate-900">{analyzing?.name}</p>
            <p className="text-xs text-slate-500">{analyzing?.language} · {analyzing?.files} files · {analyzing?.lines.toLocaleString()} lines</p>
          </div>
          <span className="ml-auto flex items-center gap-1 text-xs text-amber-600 font-semibold"><Star size={12} className="fill-amber-400" /> {analyzing?.stars}</span>
        </div>
        <ProgressSteps steps={ANALYSIS_STEPS} current={step} />
        <div className="mt-5">
          <ProgressBar value={(Math.min(step + 1, ANALYSIS_STEPS.length) / ANALYSIS_STEPS.length) * 100} />
        </div>
        {step >= ANALYSIS_STEPS.length && (
          <div className="mt-4 flex items-center gap-2 text-sm text-emerald-700 bg-emerald-50 border border-emerald-200 rounded-lg px-3 py-2.5">
            <CheckCircle2 size={16} /> Analysis complete — opening results…
          </div>
        )}
      </Modal>

      {/* Repo detail modal */}
      <Modal open={!!viewRepo} onClose={() => setViewRepo(null)} title={viewRepo?.name}>
        {viewRepo && (
          <div className="space-y-5">
            <p className="text-sm text-slate-600">{viewRepo.description}</p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {[
                ['Language', viewRepo.language],
                ['Size', viewRepo.size],
                ['Files', viewRepo.files],
                ['Lines', viewRepo.lines.toLocaleString()],
              ].map(([k, v]) => (
                <div key={k} className="rounded-lg border border-slate-200 p-3">
                  <p className="text-xs text-slate-500">{k}</p>
                  <p className="text-sm font-semibold text-slate-900 mt-0.5">{v}</p>
                </div>
              ))}
            </div>
            {viewRepo.analyzed ? (
              <div className="space-y-3">
                {[
                  ['Code Quality', viewRepo.quality],
                  ['Security', viewRepo.security],
                  ['Maintainability', viewRepo.maintainability],
                ].map(([k, v]) => (
                  <div key={k}>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-slate-600">{k}</span>
                      <span className="font-semibold text-slate-900">{v}%</span>
                    </div>
                    <ProgressBar value={v} tone={v >= 85 ? 'bg-emerald-500' : v >= 75 ? 'bg-amber-500' : 'bg-rose-500'} />
                  </div>
                ))}
              </div>
            ) : (
              <EmptyState icon={FileCode2} title="Not analyzed yet" subtitle="Run an analysis to see quality scores." />
            )}
            <CodeBlock
              filename={`${viewRepo.name}/index.js`}
              code={`// ${viewRepo.name}\n// ${viewRepo.description}\n\nexport function bootstrap() {\n  console.log('TOM repository module loaded');\n}`}
            />
          </div>
        )}
      </Modal>
    </div>
  )
}
