import { useState } from 'react'
import { MessageSquareWarning, Search, Eye, CheckCircle2, Clock, ShieldCheck } from 'lucide-react'
import { useApp } from '../../context/AppContext.jsx'
import { SectionHeader, StatusBadge, EmptyState, Tabs, Modal, StatCard, Field, Spinner } from '../../components/ui.jsx'

const STATUSES = ['Open', 'Under Review', 'Resolved']

export default function AdminComplaints() {
  const { complaints, updateComplaint, toast } = useApp()
  const [tab, setTab] = useState('all')
  const [query, setQuery] = useState('')
  const [view, setView] = useState(null)
  const [nextStatus, setNextStatus] = useState('Under Review')
  const [busy, setBusy] = useState(false)

  const filtered = complaints.filter((c) => {
    const matchTab = tab === 'all' || c.status.toLowerCase().replace(' ', '') === tab
    const matchQ = c.project.toLowerCase().includes(query.toLowerCase()) || c.id.toLowerCase().includes(query.toLowerCase())
    return matchTab && matchQ
  })

  const save = async () => {
    setBusy(true)
    await new Promise((r) => setTimeout(r, 600))
    updateComplaint(view.id, nextStatus)
    setBusy(false)
    setView(null)
  }

  return (
    <div>
      <SectionHeader title="Complaints & Disputes" subtitle="Review conflicts between clients and developers and resolve them fairly." />

      <div className="grid sm:grid-cols-4 gap-4 mb-6">
        <StatCard icon={MessageSquareWarning} label="Total complaints" value={complaints.length} tone="brand" />
        <StatCard icon={Clock} label="Open" value={complaints.filter((c) => c.status === 'Open').length} tone="rose" />
        <StatCard icon={ShieldCheck} label="Under Review" value={complaints.filter((c) => c.status === 'Under Review').length} tone="amber" />
        <StatCard icon={CheckCircle2} label="Resolved" value={complaints.filter((c) => c.status === 'Resolved').length} tone="emerald" />
      </div>

      <div className="card p-4 flex flex-wrap items-center gap-3 mb-5">
        <div className="relative flex-1 min-w-[220px]">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input className="input pl-9" placeholder="Search by complaint ID or project…" value={query} onChange={(e) => setQuery(e.target.value)} />
        </div>
        <Tabs
          active={tab}
          onChange={setTab}
          tabs={[
            { id: 'all', label: 'All', count: complaints.length },
            { id: 'open', label: 'Open', count: complaints.filter((c) => c.status === 'Open').length },
            { id: 'underreview', label: 'Under Review', count: complaints.filter((c) => c.status === 'Under Review').length },
            { id: 'resolved', label: 'Resolved', count: complaints.filter((c) => c.status === 'Resolved').length },
          ]}
        />
      </div>

      <div className="card overflow-hidden">
        {filtered.length === 0 ? (
          <EmptyState icon={MessageSquareWarning} title="No complaints found" subtitle="Adjust your search or filters." />
        ) : (
          <div className="overflow-x-auto scrollbar-thin">
            <table className="w-full text-sm">
              <thead className="bg-slate-50">
                <tr className="text-left text-xs uppercase tracking-wide text-slate-400 border-b border-slate-200">
                  <th className="py-3 px-5">Complaint ID</th>
                  <th className="py-3 px-4">Project</th>
                  <th className="py-3 px-4">Reported By</th>
                  <th className="py-3 px-4">Against</th>
                  <th className="py-3 px-4">Reason</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((c) => (
                  <tr key={c.id} className="border-b border-slate-100 hover:bg-slate-50/60">
                    <td className="py-3.5 px-5 font-mono font-semibold text-slate-800">{c.id}</td>
                    <td className="py-3.5 px-4 text-slate-600">{c.project}</td>
                    <td className="py-3.5 px-4 text-slate-600">{c.reportedBy}</td>
                    <td className="py-3.5 px-4 text-slate-600">{c.against}</td>
                    <td className="py-3.5 px-4 text-slate-500 max-w-[260px] truncate">{c.reason}</td>
                    <td className="py-3.5 px-4"><StatusBadge>{c.status}</StatusBadge></td>
                    <td className="py-3.5 px-4 text-right">
                      <button
                        className="btn-secondary btn-sm"
                        onClick={() => { setView(c); setNextStatus(c.status === 'Resolved' ? 'Resolved' : c.status === 'Open' ? 'Under Review' : 'Resolved') }}
                      >
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
        title={view ? `Complaint ${view.id}` : ''}
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
              <StatusBadge>{view.status}</StatusBadge>
              <StatusBadge tone="info">{view.project}</StatusBadge>
              <StatusBadge tone="neutral">{view.date}</StatusBadge>
            </div>
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div className="rounded-lg bg-slate-50 p-3"><p className="text-xs text-slate-500">Reported by</p><p className="font-semibold">{view.reportedBy}</p></div>
              <div className="rounded-lg bg-slate-50 p-3"><p className="text-xs text-slate-500">Against</p><p className="font-semibold">{view.against}</p></div>
            </div>
            <div className="rounded-lg border border-slate-200 p-4">
              <p className="text-xs font-semibold uppercase text-slate-400 mb-1.5">Reason</p>
              <p className="text-sm text-slate-700">{view.reason}</p>
            </div>
            <div className="rounded-lg border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900">
              <p className="font-semibold mb-1">Mediation note</p>
              Both parties have been contacted. Escrow remains locked until this complaint is resolved.
            </div>
            <Field label="Update status">
              <select className="input" value={nextStatus} onChange={(e) => setNextStatus(e.target.value)}>
                {STATUSES.map((s) => <option key={s}>{s}</option>)}
              </select>
            </Field>
          </div>
        )}
      </Modal>
    </div>
  )
}
