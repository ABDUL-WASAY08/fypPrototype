import { useState } from 'react'
import { Users, Search, Eye, Ban, CheckCircle2, ShieldCheck, Download } from 'lucide-react'
import { useApp } from '../../context/AppContext.jsx'
import { SectionHeader, StatusBadge, EmptyState, Tabs, Modal, Avatar, StatCard } from '../../components/ui.jsx'

export default function AdminUsers() {
  const { users, toggleUserStatus, toast } = useApp()
  const [tab, setTab] = useState('all')
  const [query, setQuery] = useState('')
  const [view, setView] = useState(null)

  const filtered = users.filter((u) => {
    const matchTab =
      tab === 'all' ||
      (tab === 'active' && u.status === 'Active') ||
      (tab === 'suspended' && u.status === 'Suspended') ||
      (tab === 'developers' && u.role === 'Developer') ||
      (tab === 'clients' && u.role === 'Client') ||
      (tab === 'admins' && u.role === 'Admin')
    const matchQ = u.name.toLowerCase().includes(query.toLowerCase()) || u.email.toLowerCase().includes(query.toLowerCase())
    return matchTab && matchQ
  })

  const roleTone = { Developer: 'info', Client: 'purple', Admin: 'success' }

  return (
    <div>
      <SectionHeader
        title="Users"
        subtitle="Manage every account on the platform."
        actions={<button className="btn-secondary" onClick={() => toast('User list exported (mock)')}><Download size={15} /> Export CSV</button>}
      />

      <div className="grid sm:grid-cols-4 gap-4 mb-6">
        <StatCard icon={Users} label="Total users" value={users.length} tone="brand" />
        <StatCard icon={Users} label="Developers" value={users.filter((u) => u.role === 'Developer').length} tone="violet" />
        <StatCard icon={Users} label="Clients" value={users.filter((u) => u.role === 'Client').length} tone="sky" />
        <StatCard icon={ShieldCheck} label="Suspended" value={users.filter((u) => u.status === 'Suspended').length} tone="rose" />
      </div>

      <div className="card p-4 flex flex-wrap items-center gap-3 mb-5">
        <div className="relative flex-1 min-w-[220px]">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input className="input pl-9" placeholder="Search by name or email…" value={query} onChange={(e) => setQuery(e.target.value)} />
        </div>
        <Tabs
          active={tab}
          onChange={setTab}
          tabs={[
            { id: 'all', label: 'All', count: users.length },
            { id: 'active', label: 'Active', count: users.filter((u) => u.status === 'Active').length },
            { id: 'suspended', label: 'Suspended', count: users.filter((u) => u.status === 'Suspended').length },
            { id: 'developers', label: 'Developers' },
            { id: 'clients', label: 'Clients' },
          ]}
        />
      </div>

      <div className="card overflow-hidden">
        {filtered.length === 0 ? (
          <EmptyState icon={Users} title="No users found" subtitle="Adjust your search or filters." />
        ) : (
          <div className="overflow-x-auto scrollbar-thin">
            <table className="w-full text-sm">
              <thead className="bg-slate-50">
                <tr className="text-left text-xs uppercase tracking-wide text-slate-400 border-b border-slate-200">
                  <th className="py-3 px-5">Name</th>
                  <th className="py-3 px-4">Email</th>
                  <th className="py-3 px-4">Role</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4">Joined</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((u) => (
                  <tr key={u.id} className="border-b border-slate-100 hover:bg-slate-50/60">
                    <td className="py-3 px-5">
                      <div className="flex items-center gap-3">
                        <Avatar initials={u.name.split(' ').map((s) => s[0]).join('')} color={u.role === 'Admin' ? 'bg-slate-900' : u.role === 'Client' ? 'bg-violet-600' : 'bg-brand-600'} size="h-8 w-8" text="text-[11px]" />
                        <span className="font-medium text-slate-800">{u.name}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-slate-600">{u.email}</td>
                    <td className="py-3 px-4"><StatusBadge tone={roleTone[u.role]}>{u.role}</StatusBadge></td>
                    <td className="py-3 px-4"><StatusBadge>{u.status}</StatusBadge></td>
                    <td className="py-3 px-4 text-slate-500">{u.joined}</td>
                    <td className="py-3 px-4">
                      <div className="flex justify-end gap-2">
                        <button className="btn-secondary btn-sm" onClick={() => setView(u)}><Eye size={13} /> View</button>
                        {u.role !== 'Admin' && (
                          <button
                            className={u.status === 'Active' ? 'btn-ghost btn-sm text-rose-600' : 'btn-success btn-sm'}
                            onClick={() => toggleUserStatus(u.id)}
                          >
                            {u.status === 'Active' ? <><Ban size={13} /> Suspend</> : <><CheckCircle2 size={13} /> Activate</>}
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <Modal open={!!view} onClose={() => setView(null)} title="User details" size="max-w-md"
        footer={<button className="btn-secondary" onClick={() => setView(null)}>Close</button>}>
        {view && (
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <Avatar initials={view.name.split(' ').map((s) => s[0]).join('')} color={view.role === 'Admin' ? 'bg-slate-900' : 'bg-brand-600'} size="h-14 w-14" />
              <div>
                <p className="font-semibold text-slate-900">{view.name}</p>
                <p className="text-sm text-slate-500">{view.email}</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div className="rounded-lg bg-slate-50 p-3"><p className="text-xs text-slate-500">User ID</p><p className="font-mono font-semibold">{view.id}</p></div>
              <div className="rounded-lg bg-slate-50 p-3"><p className="text-xs text-slate-500">Role</p><p className="font-semibold">{view.role}</p></div>
              <div className="rounded-lg bg-slate-50 p-3"><p className="text-xs text-slate-500">Status</p><p className="font-semibold">{view.status}</p></div>
              <div className="rounded-lg bg-slate-50 p-3"><p className="text-xs text-slate-500">Joined</p><p className="font-semibold">{view.joined}</p></div>
            </div>
            <div className="rounded-lg border border-slate-200 p-4 text-sm text-slate-600">
              <p className="font-semibold text-slate-900 mb-1">Admin notes</p>
              Account verified via email confirmation. No prior moderation actions.
            </div>
          </div>
        )}
      </Modal>
    </div>
  )
}
