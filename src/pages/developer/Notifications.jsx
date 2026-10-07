import { useState } from 'react'
import { Bell, CheckCheck, Filter } from 'lucide-react'
import { useApp } from '../../context/AppContext.jsx'
import { NotificationItem } from '../../components/domain.jsx'
import { SectionHeader, StatusBadge, EmptyState, Tabs } from '../../components/ui.jsx'

export default function Notifications() {
  const { notifications, markRead, markAllRead, unreadCount, auth } = useApp()
  const [tab, setTab] = useState('all')

  const list = tab === 'unread' ? notifications.filter((n) => !n.read) : tab === 'read' ? notifications.filter((n) => n.read) : notifications

  return (
    <div>
      <SectionHeader
        title="Notifications"
        subtitle={`Event feed for your ${auth.role} portal. New events appear in real time as you use the platform.`}
        actions={
          <>
            <StatusBadge tone={unreadCount ? 'danger' : 'neutral'}>{unreadCount} unread</StatusBadge>
            <button className="btn-secondary" onClick={markAllRead}><CheckCheck size={15} /> Mark all read</button>
          </>
        }
      />

      <div className="max-w-3xl">
        <Tabs
          tabs={[
            { id: 'all', label: 'All', count: notifications.length },
            { id: 'unread', label: 'Unread', count: unreadCount },
            { id: 'read', label: 'Read', count: notifications.length - unreadCount },
          ]}
          active={tab}
          onChange={setTab}
        />

        <div className="mt-5 space-y-3">
          {list.length === 0 ? (
            <div className="card">
              <EmptyState icon={Bell} title="No notifications" subtitle="You are all caught up." />
            </div>
          ) : (
            list.map((n) => <NotificationItem key={n.id} item={n} onRead={markRead} />)
          )}
        </div>

        <div className="mt-6 card p-4 flex items-start gap-3 text-sm text-slate-600">
          <Filter size={16} className="text-slate-400 mt-0.5" />
          <p>
            Notifications are simulated locally in this prototype. In production they are published by the event bus
            (bid accepted, work submitted, payment released, sync completed) and delivered over WebSockets.
          </p>
        </div>
      </div>
    </div>
  )
}
