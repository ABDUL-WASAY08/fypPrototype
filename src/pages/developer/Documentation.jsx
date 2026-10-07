import { useState } from 'react'
import { BookOpen, Sparkles, Download, FileCheck2, Loader2, Printer } from 'lucide-react'
import { useApp } from '../../context/AppContext.jsx'
import { aiService } from '../../services/aiService.js'
import { SectionHeader, StatusBadge, Spinner, Tabs, ProgressSteps } from '../../components/ui.jsx'

const GEN_STEPS = ['Reading repository metadata', 'Mapping project structure', 'Deriving functional requirements', 'Deriving non-functional requirements', 'Composing document']

export default function Documentation() {
  const { toast } = useApp()
  const [doc, setDoc] = useState(null)
  const [loading, setLoading] = useState(false)
  const [step, setStep] = useState(-1)
  const [tab, setTab] = useState('abstract')

  const generate = async () => {
    setLoading(true)
    setDoc(null)
    for (let i = 0; i < GEN_STEPS.length; i++) {
      setStep(i)
      await new Promise((r) => setTimeout(r, 450))
    }
    const data = await aiService.generateDocumentation()
    setDoc(data)
    setStep(GEN_STEPS.length)
    setLoading(false)
    setTab('abstract')
    toast('Project documentation generated successfully')
  }

  const downloadDoc = () => {
    if (!doc) return
    const text = [
      '# Project Documentation — TOM Platform', '',
      '## Abstract', doc.abstract, '',
      '## Technology Overview', ...doc.technologyOverview.map((t) => `- ${t.name}: ${t.role}`), '',
      '## Repository Structure', '```', doc.repositoryStructure, '```', '',
      '## Complete Project Workflow', ...doc.workflow.map((w, i) => `${i + 1}. ${w}`), '',
      '## Functional Requirements', ...doc.functionalRequirements, '',
      '## Non-Functional Requirements', ...doc.nonFunctionalRequirements,
    ].join('\n')
    const blob = new Blob([text], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'TOM-Project-Documentation.docx'
    a.click()
    URL.revokeObjectURL(url)
    toast('Documentation generated successfully.')
  }

  const tabs = [
    { id: 'abstract', label: 'Abstract' },
    { id: 'tech', label: 'Technology Overview' },
    { id: 'structure', label: 'Repository Structure' },
    { id: 'workflow', label: 'Complete Project Workflow' },
    { id: 'fr', label: 'Functional Requirements', count: doc?.functionalRequirements.length },
    { id: 'nfr', label: 'Non-Functional Requirements', count: doc?.nonFunctionalRequirements.length },
  ]

  return (
    <div>
      <SectionHeader
        title="Project Documentation"
        subtitle="Generate a complete project document: abstract, technology, workflow and requirements."
        actions={
          <>
            {doc && <StatusBadge tone="success">Document ready</StatusBadge>}
            <button className="btn-secondary" onClick={() => window.print()} disabled={!doc}><Printer size={15} /> Print</button>
            <button className="btn-primary" onClick={generate} disabled={loading}>
              {loading ? <Loader2 size={15} className="animate-spin" /> : <Sparkles size={15} />}
              {loading ? 'Generating…' : 'Generate Project Documentation'}
            </button>
          </>
        }
      />

      {loading && (
        <div className="grid lg:grid-cols-2 gap-6">
          <div className="card p-6">
            <div className="flex items-center gap-2 text-sm font-semibold text-slate-700 mb-4"><Loader2 size={15} className="animate-spin text-brand-600" /> Building document…</div>
            <ProgressSteps steps={GEN_STEPS} current={step} />
          </div>
          <div className="card p-6 space-y-3">
            {[80, 60, 90, 70, 50, 85, 65].map((w, i) => <div key={i} className="skeleton h-4" style={{ width: `${w}%` }} />)}
          </div>
        </div>
      )}

      {!doc && !loading && (
        <div className="card p-14 text-center">
          <div className="mx-auto h-14 w-14 rounded-2xl bg-violet-50 text-violet-600 flex items-center justify-center"><BookOpen size={26} /></div>
          <h3 className="mt-4 font-semibold text-slate-900">No document generated yet</h3>
          <p className="text-sm text-slate-500 mt-1 max-w-md mx-auto">
            TOM will inspect your repository and produce an FYP-ready document covering abstract, technology stack,
            workflow, functional and non-functional requirements.
          </p>
          <button className="btn-primary mt-5" onClick={generate}><Sparkles size={15} /> Generate Project Documentation</button>
        </div>
      )}

      {doc && !loading && (
        <>
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <Tabs tabs={tabs} active={tab} onChange={setTab} />
            <button className="btn-primary btn-sm ml-auto" onClick={downloadDoc}><Download size={14} /> Download DOCX</button>
          </div>

          <div className="card p-6 sm:p-8 max-w-4xl animate-fade-in">
            <div className="flex items-center justify-between pb-4 border-b border-slate-200 mb-5">
              <div>
                <p className="text-xs uppercase tracking-wide text-slate-400 font-semibold">Generated document</p>
                <h2 className="text-xl font-bold text-slate-900 mt-0.5">TOM — Project Documentation</h2>
              </div>
              <FileCheck2 size={22} className="text-emerald-500" />
            </div>

            {tab === 'abstract' && (
              <div>
                <h3 className="section-title">Abstract</h3>
                <p className="mt-3 text-sm text-slate-700 leading-relaxed">{doc.abstract}</p>
              </div>
            )}

            {tab === 'tech' && (
              <div>
                <h3 className="section-title">Technology Overview</h3>
                <div className="mt-4 space-y-3">
                  {doc.technologyOverview.map((t) => (
                    <div key={t.name} className="flex gap-4 p-3 rounded-lg border border-slate-200">
                      <span className="h-8 w-8 rounded-lg bg-brand-50 text-brand-700 text-xs font-bold flex items-center justify-center shrink-0">{t.name[0]}</span>
                      <div>
                        <p className="text-sm font-semibold text-slate-900">{t.name}</p>
                        <p className="text-sm text-slate-600">{t.role}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {tab === 'structure' && (
              <div>
                <h3 className="section-title">Repository Structure</h3>
                <pre className="mt-3 bg-slate-900 text-slate-100 rounded-lg p-4 text-[12.5px] font-mono overflow-x-auto">{doc.repositoryStructure}</pre>
              </div>
            )}

            {tab === 'workflow' && (
              <div>
                <h3 className="section-title">Complete Project Workflow</h3>
                <ol className="mt-4 space-y-3">
                  {doc.workflow.map((w, i) => (
                    <li key={w} className="flex gap-3 text-sm text-slate-700">
                      <span className="h-6 w-6 shrink-0 rounded-full bg-brand-600 text-white text-[11px] font-bold flex items-center justify-center">{i + 1}</span>
                      <span className="pt-0.5">{w}</span>
                    </li>
                  ))}
                </ol>
              </div>
            )}

            {tab === 'fr' && (
              <div>
                <h3 className="section-title">Functional Requirements</h3>
                <ul className="mt-3 space-y-2">
                  {doc.functionalRequirements.map((r) => (
                    <li key={r} className="text-sm text-slate-700 border-l-2 border-emerald-400 pl-3 py-1">{r}</li>
                  ))}
                </ul>
              </div>
            )}

            {tab === 'nfr' && (
              <div>
                <h3 className="section-title">Non-Functional Requirements</h3>
                <ul className="mt-3 space-y-2">
                  {doc.nonFunctionalRequirements.map((r) => (
                    <li key={r} className="text-sm text-slate-700 border-l-2 border-brand-400 pl-3 py-1">{r}</li>
                  ))}
                </ul>
              </div>
            )}

            <div className="mt-8 pt-4 border-t border-slate-200 flex items-center justify-between text-xs text-slate-400">
              <span>Generated by TOM · {new Date().toLocaleDateString()}</span>
              <span>Page 1 of 1 (preview)</span>
            </div>
          </div>
        </>
      )}
    </div>
  )
}
