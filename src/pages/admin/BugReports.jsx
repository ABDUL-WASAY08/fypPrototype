import { useState } from 'react'
import { Bug, Search, Eye, CheckCircle2, Loader2, Radio } from 'lucide-react'
import { useApp } from '../../context/AppContext.jsx'
import { SectionHeader, StatusBadge, EmptyState, Tabs, Modal, StatCard, Spinner } from '../../components/ui.jsx'

const STATUSES = ['Open', 'In Progress', 'Resolved']

export default function AdminBugReports() {
  const { bugs, updateBug, toast } = useApp()
  const [tab, setTab] = useState('all')
  const [query, setQuery] = useState('')
  const [view, setView] = useState(null)
  const [nextStatus, setNextStatus] = useState('In Progress')
  const [busy, setBusy] = useState(false)

  const filtered = bugs.filter((b) => {
    const matchTab = tab === 'all' || b.status.toLowerCase().replace(' ', '') === tab.replace(' ', '')
    const matchQ = b.bug.toLowerCase().includes(query.toLowerCase()) || b.id.toLowerCase().includes(query.toLowerCase())
    return matchTab && matchQ
  })

  const save = async () => {
    setBusy(true)
    await new Promise((r) => setTimeout(r, 600))
    updateBug(view.id, nextStatus)
    setBusy(false)
    setView(null)
    toast(`Bug ${view.id} updated`)
  }

  return (
    <div>
      <SectionHeader title="Bug Reports" subtitle="Track and triage platform-level issues reported by users." />

      <div className="grid sm:grid-cols-4 gap-4 mb-6">
        <StatCard icon={Bug} label="Total reports" value={bugs.length} tone="brand" />
        <StatCard icon={Radio} label="Open" value={bugs.filter((b) => b.status === 'Open').length} tone="rose" />
        <StatCard icon={Loader2} label="In Progress" value={bugs.filter((b) => b.status === 'In Progress').length} tone="amber" />
        <StatCard icon={CheckCircle2} label="Resolved" value={bugs.filter((b) => b.status === 'Resolved').length} tone="emerald" />
      </div>

      <div className="card p-4 flex flex-wrap items-center gap-3 mb-5">
        <div className="relative flex-1 min-w-[220px]">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input className="input pl-9" placeholder="Search bug reports…" value={query} onChange={(e) => setQuery(e.target.value)} />
        </div>
        <Tabs
          active={tab}
          onChange={setTab}
          tabs={[
            { id: 'all', label: 'All', count: bugs.length },
            { id: 'open', label: 'Open', count: bugs.filter((b) => b.status === 'Open').length },
            { id: 'inprogress', label: 'In Progress', count: bugs.filter((b) => b.status === 'In Progress').length },
            { id: 'resolved', label: 'Resolved', count: bugs.filter((b) => b.status === 'Resolved').length },
          ]}
        />
      </div>

      <div className="card overflow-hidden">
        {filtered.length === 0 ? (
          <EmptyState icon={Bug} title="No bug reports found" subtitle="Adjust your search or filters." />
        ) : (
          <div className="overflow-x-auto scrollbar-thin">
            <table className="w-full text-sm">
              <thead className="bg-slate-50">
                <tr className="text-left text-xs uppercase tracking-wide text-slate-400 border-b border-slate-200">
                  <th className="py-3 px-5">Bug</th>
                  <th className="py-3 px-4">Description</th>
                  <th className="py-3 px-4">Reported By</th>
                  <th className="py-3 px-4">Severity</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4">Date</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((b) => (
                  <tr key={b.id} className="border-b border-slate-100 hover:bg-slate-50/60">
                    <td className="py-3.5 px-5 font-mono font-semibold text-slate-800">{b.id}</td>
                    <td className="py-3.5 px-4 text-slate-600 max-w-[320px]">{b.bug}</td>
                    <td className="py-3.5 px-4 text-slate-600">{b.reportedBy}</td>
                    <td className="py-3.5 px-4"><StatusBadge>{b.severity}</StatusBadge></td>
                    <td className="py-3.5 px-4"><StatusBadge tone={b.status === 'Resolved' ? 'success' : b.status === 'In Progress' ? 'warning' : 'danger'}>{b.status}</StatusBadge></td>
                    <td className="py-3.5 px-4 text-slate-500">{b.date}</td>
                    <td className="py-3.5 px-4 text-right">
                      <button className="btn-secondary btn-sm" onClick={() => { setView(b); setNextStatus(b.status) }}>
                        <Eye size={13} /> View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <Modal
        open={!!view}
        onClose={() => setView(null)}
        title={view ? `Bug ${view.id}` : ''}
        size="max-w-lg"
        footer={
          <>
            <button className="btn-secondary" onClick={() => setView(null)}>Cancel</button>
            <button className="btn-primary" onClick={save} disabled={busy || nextStatus === view?.status}>
              {busy ? <Spinner size={15} /> : <CheckCircle2 size={15} />} {busy ? 'Saving…' : 'Update status'}
            </button>
          </>
        }
      >
        {view && (
          <div className="space-y-4">
            <div className="flex flex-wrap gap-2">
              <StatusBadge tone={view.severity === 'High' ? 'danger' : view.severity === 'Medium' ? 'warning' : 'neutral'}>{view.severity} severity</StatusBadge>
              <StatusBadge>{view.status}</StatusBadge>
              <StatusBadge tone="info">{view.date}</StatusBadge>
            </div>
            <div className="rounded-lg border border-slate-200 p-4">
              <p className="text-xs font-semibold uppercase text-slate-400 mb-1.5">Description</p>
              <p className="text-sm text-slate-700 leading-relaxed">{view.bug}</p>
            </div>
            <div className="rounded-lg bg-slate-50 border border-slate-200 p-4 text-sm">
              <p className="font-semibold text-slate-900 mb-1">Reported by {view.reportedBy}</p>
              <p className="text-slate-600">Filed on {view.date}. Environment: production-eu · Browser: Chrome 129.</p>
            </div>
            <div>
              <label className="label">Change status</label>
              <select className="input" value={nextStatus} onChange={(e) => setNextStatus(e.target.value)}>
                {STATUSES.map((s) => <option key={s}>{s}</option>)}
              </select>
            </div>
          </div>
        )}
      </Modal>
    </div>
  )
}
