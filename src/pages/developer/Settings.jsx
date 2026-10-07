import { useState } from 'react'
import { User, ShieldCheck, Bell, Trash2, Save, AlertTriangle } from 'lucide-react'
import { useApp } from '../../context/AppContext.jsx'
import { SectionHeader, Field, Modal, StatusBadge, Spinner } from '../../components/ui.jsx'

export default function Settings() {
  const { profile, setProfile, auth, signOut, toast } = useApp()
  const [form, setForm] = useState(profile)
  const [saving, setSaving] = useState(false)
  const [confirm, setConfirm] = useState(false)
  const [confirmText, setConfirmText] = useState('')

  const save = async () => {
    setSaving(true)
    await new Promise((r) => setTimeout(r, 700))
    setProfile(form)
    setSaving(false)
    toast('Settings saved')
  }

  return (
    <div>
      <SectionHeader title="Settings" subtitle="Manage your profile and account." />

      <div className="grid lg:grid-cols-3 gap-6 max-w-5xl">
        <div className="lg:col-span-2 space-y-6">
          <div className="card p-6">
            <h2 className="section-title flex items-center gap-2"><User size={17} className="text-brand-600" /> Profile</h2>
            <div className="mt-5 space-y-4">
              <Field label="Name">
                <input className="input" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
              </Field>
              <Field label="Email">
                <input className="input" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
              </Field>
              <Field label="Bio" hint="Short description shown on your portfolio.">
                <textarea className="input min-h-[110px]" value={form.bio} onChange={(e) => setForm({ ...form, bio: e.target.value })} />
              </Field>
              <div className="flex justify-end">
                <button className="btn-primary" onClick={save} disabled={saving}>
                  {saving ? <Spinner size={15} /> : <Save size={15} />} {saving ? 'Saving…' : 'Save changes'}
                </button>
              </div>
            </div>
          </div>

          <div className="card p-6 border-rose-200">
            <h2 className="section-title flex items-center gap-2 text-rose-700"><Trash2 size={17} /> Delete Account</h2>
            <p className="text-sm text-slate-600 mt-2">
              Permanently remove your account, repositories, portfolios and bidding history. This cannot be undone.
            </p>
            <button className="btn-danger mt-4" onClick={() => setConfirm(true)}><AlertTriangle size={15} /> Delete Account</button>
          </div>
        </div>

        <div className="space-y-6">
          <div className="card p-6">
            <h2 className="section-title flex items-center gap-2"><ShieldCheck size={17} className="text-emerald-600" /> Account</h2>
            <div className="mt-4 space-y-3 text-sm">
              <div className="flex justify-between border-b border-slate-100 pb-2"><span className="text-slate-500">Role</span><StatusBadge tone="info">{auth.role}</StatusBadge></div>
              <div className="flex justify-between border-b border-slate-100 pb-2"><span className="text-slate-500">Plan</span><span className="font-semibold">Pro (demo)</span></div>
              <div className="flex justify-between border-b border-slate-100 pb-2"><span className="text-slate-500">2FA</span><span className="font-semibold text-emerald-600">Enabled</span></div>
              <div className="flex justify-between"><span className="text-slate-500">Member since</span><span className="font-semibold">Mar 2024</span></div>
            </div>
          </div>

          <div className="card p-6">
            <h2 className="section-title flex items-center gap-2"><Bell size={17} className="text-amber-500" /> Notifications</h2>
            <div className="mt-4 space-y-3">
              {['Bid status changes', 'Project updates', 'Payment events', 'Repository sync'].map((t) => (
                <label key={t} className="flex items-center justify-between text-sm text-slate-700">
                  {t}
                  <input type="checkbox" defaultChecked className="h-4 w-4 rounded border-slate-300 text-brand-600 focus:ring-brand-500" />
                </label>
              ))}
            </div>
          </div>
        </div>
      </div>

      <Modal
        open={confirm}
        onClose={() => setConfirm(false)}
        title="Delete your account"
        size="max-w-md"
        footer={
          <>
            <button className="btn-secondary" onClick={() => setConfirm(false)}>Cancel</button>
            <button
              className="btn-danger"
              disabled={confirmText !== 'DELETE'}
              onClick={() => { setConfirm(false); setConfirmText(''); signOut(); toast('Account deletion simulated', 'info') }}
            >
              Delete permanently
            </button>
          </>
        }
      >
        <p className="text-sm text-slate-600">
          This action is simulated in the prototype. Type <strong>DELETE</strong> to confirm.
        </p>
        <input className="input mt-4" placeholder="Type DELETE" value={confirmText} onChange={(e) => setConfirmText(e.target.value)} />
      </Modal>
    </div>
  )
}
