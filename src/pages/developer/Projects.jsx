import { useState } from 'react'
import { FolderKanban, MessageSquare, Paperclip, CheckCircle2, CircleDollarSign, Send, Flag, Clock } from 'lucide-react'
import { useApp } from '../../context/AppContext.jsx'
import { SectionHeader, StatusBadge, ProgressBar, EmptyState, Tabs, Avatar, Field, Modal, Spinner, StatCard } from '../../components/ui.jsx'

export default function Projects() {
  const { projects, advanceProject, toast, auth } = useApp()
  const mine = projects.filter((p) => p.developerId === 'dev-1')
  const [selected, setSelected] = useState(mine[0]?.id || null)
  const [tab, setTab] = useState('overview')
  const [msg, setMsg] = useState('')
  const [thread, setThread] = useState([
    { from: 'client', text: 'Hi! Could you share a preview of the dashboard once the chart layer is wired up?', time: '10:02' },
    { from: 'dev', text: 'Sure — I will push a staging build by tomorrow morning with the first three widgets.', time: '10:14' },
  ])
  const [issueOpen, setIssueOpen] = useState(false)
  const [issueText, setIssueText] = useState('')

  const project = projects.find((p) => p.id === selected) || mine[0]

  const send = (e) => {
    e.preventDefault()
    if (!msg.trim()) return
    setThread((t) => [...t, { from: 'dev', text: msg.trim(), time: new Date().toTimeString().slice(0, 5) }])
    setMsg('')
  }

  if (mine.length === 0) {
    return (
      <div>
        <SectionHeader title="Projects" subtitle="Workspaces from accepted bids appear here." />
        <div className="card">
          <EmptyState
            icon={FolderKanban}
            title="No active projects yet"
            subtitle="Win a bid in the marketplace to open your first workspace."
            action={null}
          />
        </div>
      </div>
    )
  }

  return (
    <div>
      <SectionHeader title="Projects" subtitle="Workspaces created from your accepted bids." />

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Project list */}
        <div className="space-y-3">
          {mine.map((p) => (
            <button
              key={p.id}
              onClick={() => { setSelected(p.id); setTab('overview') }}
              className={`w-full text-left card p-4 transition-all ${selected === p.id ? 'border-brand-400 ring-2 ring-brand-100' : 'hover:border-slate-300'}`}
            >
              <div className="flex items-center justify-between gap-2">
                <p className="text-sm font-semibold text-slate-900 truncate">{p.title}</p>
                <StatusBadge>{p.status}</StatusBadge>
              </div>
              <p className="text-xs text-slate-500 mt-1">{p.client} · ${p.budget.toLocaleString()}</p>
              <div className="mt-2.5">
                <ProgressBar value={p.progress || 0} tone="bg-brand-600" height="h-1.5" />
              </div>
            </button>
          ))}
        </div>

        {/* Workspace */}
        <div className="lg:col-span-2 space-y-6">
          <div className="card p-5">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <h2 className="text-lg font-bold text-slate-900">{project.title}</h2>
                <p className="text-sm text-slate-500 mt-0.5">{project.description}</p>
              </div>
              <StatusBadge tone={project.status === 'submitted' ? 'warning' : project.status === 'approved' ? 'success' : 'purple'}>{project.status}</StatusBadge>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-4 text-sm">
              <div className="rounded-lg bg-slate-50 p-3"><p className="text-xs text-slate-500">Client</p><p className="font-semibold text-slate-900 mt-0.5">{project.client}</p></div>
              <div className="rounded-lg bg-slate-50 p-3"><p className="text-xs text-slate-500">Developer</p><p className="font-semibold text-slate-900 mt-0.5">{project.developer || auth.user.name}</p></div>
              <div className="rounded-lg bg-slate-50 p-3"><p className="text-xs text-slate-500">Budget</p><p className="font-semibold text-slate-900 mt-0.5">${project.budget.toLocaleString()}</p></div>
              <div className="rounded-lg bg-slate-50 p-3"><p className="text-xs text-slate-500">Deadline</p><p className="font-semibold text-slate-900 mt-0.5 flex items-center gap-1"><Clock size={12} /> {project.delivery}</p></div>
            </div>

            <div className="mt-4">
              <div className="flex justify-between text-sm mb-1.5">
                <span className="text-slate-600 font-medium">Progress</span>
                <span className="font-semibold text-slate-900">{project.progress || 0}%</span>
              </div>
              <ProgressBar value={project.progress || 0} />
            </div>

            <div className="flex flex-wrap gap-2 mt-5">
              <button className="btn-primary btn-sm" onClick={() => advanceProject(project.id, 'submit')} disabled={project.status === 'submitted'}>
                <CheckCircle2 size={14} /> Mark Work Submitted
              </button>
              <button className="btn-secondary btn-sm" onClick={() => setIssueOpen(true)}><Flag size={14} /> Raise Issue</button>
            </div>
          </div>

          <Tabs
            tabs={[{ id: 'overview', label: 'Milestones' }, { id: 'messages', label: 'Messages', count: thread.length }, { id: 'files', label: 'Files', count: 3 }]}
            active={tab}
            onChange={setTab}
          />

          {tab === 'overview' && (
            <div className="card p-5 animate-fade-in">
              <h3 className="section-title mb-4">Milestones</h3>
              <div className="space-y-3">
                {(project.milestones || []).map((m, i) => (
                  <div key={m.name} className="flex items-center gap-3 p-3 rounded-lg border border-slate-200">
                    <span className={`h-7 w-7 rounded-full text-xs font-bold flex items-center justify-center ${m.done ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-400'}`}>
                      {m.done ? '✓' : i + 1}
                    </span>
                    <span className={`text-sm font-medium ${m.done ? 'text-slate-500 line-through' : 'text-slate-800'}`}>{m.name}</span>
                    <span className="ml-auto"><StatusBadge tone={m.done ? 'success' : 'neutral'}>{m.done ? 'Done' : 'Pending'}</StatusBadge></span>
                  </div>
                ))}
                {(project.milestones || []).length === 0 && <EmptyState icon={FolderKanban} title="No milestones yet" subtitle="Milestones are created when the client accepts your bid." />}
              </div>
            </div>
          )}

          {tab === 'messages' && (
            <div className="card flex flex-col h-[420px] animate-fade-in">
              <div className="px-5 py-3 border-b border-slate-200 flex items-center gap-3">
                <Avatar initials={(project.client || 'C').split(' ').map((s) => s[0]).join('')} color="bg-violet-600" size="h-8 w-8" text="text-xs" />
                <div>
                  <p className="text-sm font-semibold text-slate-900">{project.client}</p>
                  <p className="text-xs text-slate-500">Client · {project.company}</p>
                </div>
              </div>
              <div className="flex-1 overflow-y-auto scrollbar-thin p-5 space-y-3">
                {thread.map((m, i) => (
                  <div key={i} className={`flex ${m.from === 'dev' ? 'justify-end' : ''}`}>
                    <div className={`max-w-[75%] rounded-2xl px-4 py-2.5 text-sm ${m.from === 'dev' ? 'bg-brand-600 text-white rounded-tr-sm' : 'bg-slate-100 text-slate-800 rounded-tl-sm'}`}>
                      {m.text}
                      <span className={`block text-[10px] mt-1 ${m.from === 'dev' ? 'text-brand-200' : 'text-slate-400'}`}>{m.time}</span>
                    </div>
                  </div>
                ))}
              </div>
              <form onSubmit={send} className="p-4 border-t border-slate-200 flex gap-2">
                <input className="input" placeholder="Write a message…" value={msg} onChange={(e) => setMsg(e.target.value)} />
                <button className="btn-primary px-3"><Send size={15} /></button>
              </form>
            </div>
          )}

          {tab === 'files' && (
            <div className="card p-5 animate-fade-in">
              <h3 className="section-title mb-4">Shared files</h3>
              <div className="space-y-2">
                {[
                  { name: 'requirements-v2.pdf', size: '1.2 MB', by: 'Client' },
                  { name: 'dashboard-wireframe.fig', size: '4.8 MB', by: 'Client' },
                  { name: 'milestone-1-build.zip', size: '12.4 MB', by: 'You' },
                ].map((f) => (
                  <div key={f.name} className="flex items-center gap-3 p-3 rounded-lg border border-slate-200">
                    <Paperclip size={16} className="text-slate-400" />
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium text-slate-800 truncate">{f.name}</p>
                      <p className="text-xs text-slate-500">{f.size} · uploaded by {f.by}</p>
                    </div>
                    <button className="btn-secondary btn-sm" onClick={() => toast('Download started (mock)')}>Download</button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Raise issue modal */}
      <Modal
        open={issueOpen}
        onClose={() => setIssueOpen(false)}
        title="Raise an issue"
        footer={
          <>
            <button className="btn-secondary" onClick={() => setIssueOpen(false)}>Cancel</button>
            <button
              className="btn-primary"
              onClick={() => { setIssueOpen(false); setIssueText(''); advanceProject(project.id, 'issue') }}
              disabled={!issueText.trim()}
            >
              <Flag size={15} /> Submit issue
            </button>
          </>
        }
      >
        <Field label="Describe the issue" hint="The client and admin will be notified immediately.">
          <textarea className="input min-h-[120px]" value={issueText} onChange={(e) => setIssueText(e.target.value)} placeholder="e.g. The API credentials provided do not grant access to the staging environment…" />
        </Field>
      </Modal>
    </div>
  )
}
