import { useState } from 'react'
import { FolderKanban, Search, Eye, DollarSign, Users, Clock } from 'lucide-react'
import { useApp } from '../../context/AppContext.jsx'
import { SectionHeader, StatusBadge, EmptyState, Tabs, Modal, ProgressBar, StatCard } from '../../components/ui.jsx'

export default function AdminProjects() {
  const { projects, bids } = useApp()
  const [tab, setTab] = useState('all')
  const [query, setQuery] = useState('')
  const [view, setView] = useState(null)

  const filtered = projects.filter((p) => {
    const matchTab = tab === 'all' || p.status === tab
    const matchQ = p.title.toLowerCase().includes(query.toLowerCase()) || (p.developer || '').toLowerCase().includes(query.toLowerCase())
    return matchTab && matchQ
  })

  return (
    <div>
      <SectionHeader title="Projects" subtitle="All projects published and delivered on the platform." />

      <div className="grid sm:grid-cols-4 gap-4 mb-6">
        <StatCard icon={FolderKanban} label="Total projects" value={projects.length} tone="brand" />
        <StatCard icon={Clock} label="Open" value={projects.filter((p) => p.status === 'open').length} tone="amber" />
        <StatCard icon={Users} label="In progress" value={projects.filter((p) => p.status === 'in-progress').length} tone="violet" />
        <StatCard icon={DollarSign} label="Total value" value={`$${projects.reduce((s, p) => s + p.budget, 0).toLocaleString()}`} tone="emerald" />
      </div>

      <div className="card p-4 flex flex-wrap items-center gap-3 mb-5">
        <div className="relative flex-1 min-w-[220px]">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input className="input pl-9" placeholder="Search projects or developers…" value={query} onChange={(e) => setQuery(e.target.value)} />
        </div>
        <Tabs
          active={tab}
          onChange={setTab}
          tabs={[
            { id: 'all', label: 'All', count: projects.length },
            { id: 'open', label: 'Open' },
            { id: 'in-progress', label: 'In Progress' },
            { id: 'submitted', label: 'Submitted' },
            { id: 'completed', label: 'Completed' },
          ]}
        />
      </div>

      <div className="card overflow-hidden">
        {filtered.length === 0 ? (
          <EmptyState icon={FolderKanban} title="No projects found" subtitle="Adjust your search or filters." />
        ) : (
          <div className="overflow-x-auto scrollbar-thin">
            <table className="w-full text-sm">
              <thead className="bg-slate-50">
                <tr className="text-left text-xs uppercase tracking-wide text-slate-400 border-b border-slate-200">
                  <th className="py-3 px-5">Project</th>
                  <th className="py-3 px-4">Client</th>
                  <th className="py-3 px-4">Developer</th>
                  <th className="py-3 px-4">Budget</th>
                  <th className="py-3 px-4">Bids</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((p) => (
                  <tr key={p.id} className="border-b border-slate-100 hover:bg-slate-50/60">
                    <td className="py-3 px-5">
                      <p className="font-medium text-slate-800">{p.title}</p>
                      <p className="text-xs text-slate-500">{p.createdAt}</p>
                    </td>
                    <td className="py-3 px-4 text-slate-600">{p.client}</td>
                    <td className="py-3 px-4 text-slate-600">{p.developer || <span className="text-slate-400">—</span>}</td>
                    <td className="py-3 px-4 font-semibold text-slate-900">${p.budget.toLocaleString()}</td>
                    <td className="py-3 px-4 text-slate-600">{bids.filter((b) => b.projectId === p.id).length}</td>
                    <td className="py-3 px-4"><StatusBadge>{p.status}</StatusBadge></td>
                    <td className="py-3 px-4 text-right">
                      <button className="btn-secondary btn-sm" onClick={() => setView(p)}><Eye size={13} /> View</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <Modal open={!!view} onClose={() => setView(null)} title={view?.title}
        footer={<button className="btn-secondary" onClick={() => setView(null)}>Close</button>}>
        {view && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <StatusBadge>{view.status}</StatusBadge>
              <span className="text-lg font-bold text-brand-700">${view.budget.toLocaleString()}</span>
            </div>
            <p className="text-sm text-slate-600">{view.description}</p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-sm">
              <div className="rounded-lg bg-slate-50 p-3"><p className="text-xs text-slate-500">Client</p><p className="font-semibold">{view.client}</p></div>
              <div className="rounded-lg bg-slate-50 p-3"><p className="text-xs text-slate-500">Developer</p><p className="font-semibold">{view.developer || '—'}</p></div>
              <div className="rounded-lg bg-slate-50 p-3"><p className="text-xs text-slate-500">Delivery</p><p className="font-semibold">{view.delivery}</p></div>
              <div className="rounded-lg bg-slate-50 p-3"><p className="text-xs text-slate-500">Created</p><p className="font-semibold">{view.createdAt}</p></div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1.5"><span className="text-slate-600">Progress</span><span className="font-semibold">{view.progress || 0}%</span></div>
              <ProgressBar value={view.progress || 0} />
            </div>
            <div>
              <p className="label">Skills</p>
              <div className="flex flex-wrap gap-1.5">
                {view.skills.map((s) => <span key={s} className="text-xs bg-slate-100 text-slate-600 rounded px-2 py-1">{s}</span>)}
              </div>
            </div>
          </div>
        )}
      </Modal>
    </div>
  )
}
