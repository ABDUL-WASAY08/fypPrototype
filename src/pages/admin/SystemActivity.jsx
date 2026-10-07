import { Activity, Search, RefreshCw, Download } from 'lucide-react'
import { useState } from 'react'
import { useApp } from '../../context/AppContext.jsx'
import { SectionHeader, StatusBadge, EmptyState, StatCard, Tabs } from '../../components/ui.jsx'

export default function SystemActivity() {
  const { activity, toast } = useApp()
  const [query, setQuery] = useState('')
  const [tab, setTab] = useState('all')

  const filtered = activity.filter((a) => {
    const matchQ = a.event.toLowerCase().includes(query.toLowerCase()) || a.target.toLowerCase().includes(query.toLowerCase())
    const matchTab = tab === 'all' || (tab === 'payments' && a.event.toLowerCase().includes('payment')) || (tab === 'repos' && a.event.toLowerCase().includes('repositor')) || (tab === 'users' && (a.event.toLowerCase().includes('user') || a.event.toLowerCase().includes('suspend')))
    return matchQ && matchTab
  })

  return (
    <div>
      <SectionHeader
        title="System Activity"
        subtitle="Audit trail of every significant platform event."
        actions={
          <>
            <button className="btn-secondary" onClick={() => { toast('Activity log refreshed'); }}><RefreshCw size={15} /> Refresh</button>
            <button className="btn-secondary" onClick={() => toast('Activity log exported (mock)')}><Download size={15} /> Export</button>
          </>
        }
      />

      <div className="grid sm:grid-cols-4 gap-4 mb-6">
        <StatCard icon={Activity} label="Events recorded" value={activity.length} tone="brand" />
        <StatCard icon={Activity} label="Payments events" value={activity.filter((a) => a.event.toLowerCase().includes('payment')).length} tone="emerald" />
        <StatCard icon={Activity} label="Repository events" value={activity.filter((a) => a.event.toLowerCase().includes('repositor')).length} tone="violet" />
        <StatCard icon={Activity} label="Admin actions" value={activity.filter((a) => a.actor.includes('Hamza') || a.actor.includes('Ayesha')).length} tone="amber" />
      </div>

      <div className="card p-4 flex flex-wrap items-center gap-3 mb-5">
        <div className="relative flex-1 min-w-[220px]">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input className="input pl-9" placeholder="Search activity…" value={query} onChange={(e) => setQuery(e.target.value)} />
        </div>
        <Tabs
          active={tab}
          onChange={setTab}
          tabs={[
            { id: 'all', label: 'All', count: activity.length },
            { id: 'payments', label: 'Payments' },
            { id: 'repos', label: 'Repositories' },
            { id: 'users', label: 'Users' },
          ]}
        />
      </div>

      <div className="card p-5">
        {filtered.length === 0 ? (
          <EmptyState icon={Activity} title="No activity found" subtitle="Adjust your search or filters." />
        ) : (
          <ol className="relative border-l border-slate-200 ml-3 space-y-6">
            {filtered.map((a) => (
              <li key={a.id} className="ml-6">
                <span className="absolute -left-2 mt-1 h-4 w-4 rounded-full bg-brand-100 ring-4 ring-brand-50 border border-brand-300" />
                <div className="flex flex-wrap items-center gap-2">
                  <p className="text-sm font-semibold text-slate-900">{a.event}</p>
                  <StatusBadge tone="info">{a.target}</StatusBadge>
                </div>
                <p className="text-xs text-slate-500 mt-1">by {a.actor} · {a.time}</p>
              </li>
            ))}
          </ol>
        )}
      </div>
    </div>
  )
}
