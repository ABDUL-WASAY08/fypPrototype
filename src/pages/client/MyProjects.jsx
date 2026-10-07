import { useState } from 'react'
import { Link } from 'react-router-dom'
import { FolderKanban, PlusCircle, Eye, Gavel, Clock, DollarSign, FileText, Users } from 'lucide-react'
import { useApp } from '../../context/AppContext.jsx'
import { ProjectCard } from '../../components/domain.jsx'
import { SectionHeader, StatusBadge, Tabs, Modal, Field, EmptyState, ProgressBar } from '../../components/ui.jsx'

export default function MyProjects() {
  const { projects, bids } = useApp()
  const [tab, setTab] = useState('all')
  const [view, setView] = useState(null)

  const filtered = projects.filter((p) => (tab === 'all' ? true : p.status === tab))
  const projectBids = view ? bids.filter((b) => b.projectId === view.id) : []

  return (
    <div>
      <SectionHeader
        title="My Projects"
        subtitle="Everything you have published on the TOM marketplace."
        actions={<Link to="/client/create-project" className="btn-primary"><PlusCircle size={15} /> Create Project</Link>}
      />

      <div className="mb-5">
        <Tabs
          active={tab}
          onChange={setTab}
          tabs={[
            { id: 'all', label: 'All', count: projects.length },
            { id: 'open', label: 'Open', count: projects.filter((p) => p.status === 'open').length },
            { id: 'in-progress', label: 'In Progress', count: projects.filter((p) => p.status === 'in-progress').length },
            { id: 'submitted', label: 'Submitted', count: projects.filter((p) => p.status === 'submitted').length },
            { id: 'completed', label: 'Completed', count: projects.filter((p) => ['completed', 'approved'].includes(p.status)).length },
          ]}
        />
      </div>

      {filtered.length === 0 ? (
        <div className="card">
          <EmptyState
            icon={FolderKanban}
            title="No projects in this view"
            subtitle="Create a project to start receiving bids."
            action={<Link to="/client/create-project" className="btn-primary btn-sm">Create Project</Link>}
          />
        </div>
      ) : (
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-5">
          {filtered.map((p) => (
            <ProjectCard
              key={p.id}
              project={p}
              bidCount={bids.filter((b) => b.projectId === p.id).length}
              onClick={() => setView(p)}
              action={
                <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-xs text-slate-500 flex items-center gap-1"><Users size={12} /> {bids.filter((b) => b.projectId === p.id).length} bids</span>
                  <span className="text-xs font-semibold text-brand-700 inline-flex items-center gap-1"><Eye size={12} /> View details</span>
                </div>
              }
            />
          ))}
        </div>
      )}

      <Modal open={!!view} onClose={() => setView(null)} title={view?.title}
        footer={
          <>
            <button className="btn-secondary" onClick={() => setView(null)}>Close</button>
            <Link to="/client/bids" className="btn-primary" onClick={() => setView(null)}><Gavel size={15} /> Manage bids</Link>
          </>
        }>
        {view && (
          <div className="space-y-5">
            <div className="flex items-center justify-between">
              <StatusBadge>{view.status}</StatusBadge>
              <span className="text-xl font-bold text-brand-700">${view.budget.toLocaleString()}</span>
            </div>
            <p className="text-sm text-slate-600 leading-relaxed">{view.description}</p>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-sm">
              <div className="rounded-lg bg-slate-50 p-3"><p className="text-xs text-slate-500 flex items-center gap-1"><DollarSign size={11} /> Budget</p><p className="font-semibold mt-0.5">${view.budget.toLocaleString()}</p></div>
              <div className="rounded-lg bg-slate-50 p-3"><p className="text-xs text-slate-500 flex items-center gap-1"><Clock size={11} /> Delivery</p><p className="font-semibold mt-0.5">{view.delivery}</p></div>
              <div className="rounded-lg bg-slate-50 p-3"><p className="text-xs text-slate-500 flex items-center gap-1"><Gavel size={11} /> Bids</p><p className="font-semibold mt-0.5">{projectBids.length}</p></div>
              <div className="rounded-lg bg-slate-50 p-3"><p className="text-xs text-slate-500 flex items-center gap-1"><FileText size={11} /> Created</p><p className="font-semibold mt-0.5">{view.createdAt}</p></div>
            </div>

            <div>
              <p className="label">Required skills</p>
              <div className="flex flex-wrap gap-1.5">
                {view.skills.map((s) => <span key={s} className="text-xs bg-slate-100 text-slate-600 rounded px-2 py-1">{s}</span>)}
              </div>
            </div>

            <div>
              <p className="label">Requirements</p>
              <p className="text-sm text-slate-600">{view.requirements}</p>
            </div>

            <div>
              <p className="label">Deliverables</p>
              <ul className="space-y-1.5">
                {(view.deliverables || []).map((d) => (
                  <li key={d} className="text-sm text-slate-700 flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-brand-500" /> {d}</li>
                ))}
              </ul>
            </div>

            {view.developer && (
              <div className="rounded-xl border border-brand-200 bg-brand-50 p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs uppercase tracking-wide text-brand-600 font-semibold">Assigned developer</p>
                    <p className="text-sm font-semibold text-slate-900 mt-0.5">{view.developer}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-slate-500">Progress</p>
                    <p className="text-sm font-bold text-slate-900">{view.progress || 0}%</p>
                  </div>
                </div>
                <ProgressBar value={view.progress || 0} className="mt-2" />
              </div>
            )}

            <div>
              <p className="label">Bids received</p>
              {projectBids.length === 0 ? (
                <p className="text-sm text-slate-500">No bids yet.</p>
              ) : (
                <div className="space-y-2">
                  {projectBids.map((b) => (
                    <div key={b.id} className="flex items-center gap-3 p-3 rounded-lg border border-slate-200 text-sm">
                      <span className="font-semibold text-slate-800">{b.developer}</span>
                      <span className="text-slate-500">${b.price.toLocaleString()} · {b.delivery}</span>
                      <StatusBadge className="ml-auto">{b.status}</StatusBadge>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </Modal>
    </div>
  )
}
