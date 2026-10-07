import { Link } from 'react-router-dom'
import { Gavel, Clock, DollarSign, ExternalLink, Inbox } from 'lucide-react'
import { useApp } from '../../context/AppContext.jsx'
import { SectionHeader, StatusBadge, EmptyState } from '../../components/ui.jsx'

export default function MyBids() {
  const { bids, projects } = useApp()
  const myBids = bids.filter((b) => b.developerId === 'dev-1')

  const pending = myBids.filter((b) => b.status === 'pending')
  const accepted = myBids.filter((b) => b.status === 'accepted')
  const rejected = myBids.filter((b) => b.status === 'rejected')

  const group = (title, list, tone) => (
    <div className="card p-5">
      <div className="flex items-center justify-between mb-4">
        <h2 className="section-title">{title}</h2>
        <StatusBadge tone={tone}>{list.length}</StatusBadge>
      </div>
      {list.length === 0 ? (
        <EmptyState icon={Inbox} title="Nothing here yet" subtitle="Bids you submit will appear in this column." />
      ) : (
        <div className="space-y-3">
          {list.map((b) => {
            const project = projects.find((p) => p.id === b.projectId)
            return (
              <div key={b.id} className="rounded-xl border border-slate-200 p-4 hover:border-brand-300 transition-colors">
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-slate-900 truncate">{project?.title || 'Project'}</p>
                    <p className="text-xs text-slate-500 mt-0.5">{project?.client} · submitted {b.createdAt}</p>
                  </div>
                  <StatusBadge tone={b.status === 'accepted' ? 'success' : b.status === 'rejected' ? 'danger' : 'warning'}>{b.status}</StatusBadge>
                </div>
                <div className="flex flex-wrap items-center gap-4 mt-3 text-sm">
                  <span className="flex items-center gap-1.5 text-slate-700"><DollarSign size={14} className="text-slate-400" /> <strong>${b.price.toLocaleString()}</strong></span>
                  <span className="flex items-center gap-1.5 text-slate-600"><Clock size={14} className="text-slate-400" /> {b.delivery}</span>
                </div>
                <p className="text-sm text-slate-600 mt-2 line-clamp-2">{b.proposal}</p>
                {b.status === 'accepted' && (
                  <Link to="/developer/projects" className="btn-primary btn-sm mt-3 inline-flex"><ExternalLink size={13} /> Open workspace</Link>
                )}
              </div>
            )
          })}
        </div>
      )}
    </div>
  )

  return (
    <div>
      <SectionHeader title="My Bids" subtitle="Track every proposal you have submitted across the marketplace." />
      <div className="grid lg:grid-cols-3 gap-6">
        {group('Pending review', pending, 'warning')}
        {group('Accepted', accepted, 'success')}
        {group('Rejected', rejected, 'danger')}
      </div>
      <div className="mt-6 card p-4 flex items-center gap-3 text-sm text-slate-600">
        <Gavel size={16} className="text-brand-600" />
        Average acceptance rate: <strong>42%</strong> — proposals with a concrete timeline are accepted 2× more often.
      </div>
    </div>
  )
}
