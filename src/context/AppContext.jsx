import { createContext, useCallback, useContext, useMemo, useState } from 'react'
import {
  repositories as seedRepos,
  initialProjects,
  initialBids,
  initialPayments,
  initialComplaints,
  initialBugs,
  initialNotifications,
  adminUsers,
  systemActivity,
} from '../data/mockData.js'
import { githubService } from '../services/githubService.js'
import { paymentService } from '../services/paymentService.js'

const AppContext = createContext(null)

let toastSeq = 0
let noteSeq = 100

export function AppProvider({ children, initialAuth = null }) {
  // ---------- auth ----------
  const [auth, setAuth] = useState(initialAuth) // { role, user }

  // ---------- domain state ----------
  const [repos, setRepos] = useState(seedRepos)
  const [projects, setProjects] = useState(initialProjects)
  const [bids, setBids] = useState(initialBids)
  const [payments, setPayments] = useState(initialPayments)
  const [complaints, setComplaints] = useState(initialComplaints)
  const [bugs, setBugs] = useState(initialBugs)
  const [users, setUsers] = useState(adminUsers)
  const [notifications, setNotifications] = useState(initialNotifications)
  const [activity, setActivity] = useState(systemActivity)
  const [toasts, setToasts] = useState([])
  const [profile, setProfile] = useState({
    name: 'Ali Khan',
    bio: 'Full-stack engineer building AI-assisted developer tooling. React, Node.js, MongoDB and RAG pipelines.',
    email: 'ali.khan@tom.dev',
  })

  // ---------- helpers ----------
  const toast = useCallback((message, type = 'success') => {
    const id = ++toastSeq
    setToasts((t) => [...t, { id, message, type }])
    setTimeout(() => setToasts((t) => t.filter((x) => x.id !== id)), 3200)
  }, [])

  const notify = useCallback((role, title, detail, type = 'info') => {
    const id = 'ntf-' + ++noteSeq
    setNotifications((n) => [
      { id, role, title, detail, time: 'just now', read: false, type, live: true },
      ...n,
    ])
  }, [])

  const logActivity = useCallback((event, target, actor = 'System') => {
    setActivity((a) => [
      { id: 'act-' + Math.random().toString(36).slice(2, 7), event, target, actor, time: new Date().toISOString().slice(0, 16).replace('T', ' ') },
      ...a,
    ])
  }, [])

  // ---------- auth actions ----------
  const signIn = useCallback((role, user) => {
    setAuth({ role, user })
  }, [])
  const signOut = useCallback(() => setAuth(null), [])
  const switchRole = useCallback((role, user) => setAuth({ role, user }), [])

  // ---------- repository actions ----------
  const analyzeRepo = useCallback(
    async (repoId, onStep) => {
      const repo = repos.find((r) => r.id === repoId)
      const result = await githubService.analyzeRepository(repo, onStep)
      setRepos((list) => list.map((r) => (r.id === repoId ? { ...r, ...result, analyzed: true } : r)))
      notify('developer', 'Repository analysis complete', `${repo.name} finished indexing — scores are ready.`, 'ai')
      return result
    },
    [repos, notify]
  )

  const syncRepo = useCallback(
    async (repoId) => {
      const repo = repos.find((r) => r.id === repoId)
      const updated = await githubService.syncRepository(repo)
      setRepos((list) => list.map((r) => (r.id === repoId ? { ...r, ...updated } : r)))
      notify('developer', 'Repository synchronization completed.', `${repo.name} synced just now.`, 'info')
      toast(`${repo.name} synchronized`)
      return updated
    },
    [repos, notify, toast]
  )

  const togglePortfolio = useCallback(
    (repoId) => {
      let nowSelected = false
      setRepos((list) =>
        list.map((r) => {
          if (r.id !== repoId) return r
          nowSelected = !r.portfolio
          return { ...r, portfolio: nowSelected }
        })
      )
      toast(nowSelected ? 'Repository added to portfolio' : 'Repository removed from portfolio')
    },
    [toast]
  )

  // ---------- project / bid actions ----------
  const addProject = useCallback(
    async (payload) => {
      const project = await (await import('../services/projectService.js')).projectService.createProject(payload)
      setProjects((p) => [project, ...p])
      notify('developer', 'New project matches your skills.', `${project.title} was published to the marketplace.`, 'info')
      toast('Project published successfully')
      return project
    },
    [notify, toast]
  )

  const submitBid = useCallback(
    async (payload) => {
      const { projectService } = await import('../services/projectService.js')
      const bid = await projectService.submitBid(payload)
      setBids((b) => [bid, ...b])
      const project = projects.find((p) => p.id === payload.projectId)
      notify('client', 'New bid received on your project.', `${payload.developer} submitted a $${payload.price.toLocaleString()} proposal for ${project?.title || 'your project'}.`, 'info')
      toast('Bid submitted successfully')
      return bid
    },
    [projects, notify, toast]
  )

  const acceptBid = useCallback(
    async (bidId) => {
      const { projectService } = await import('../services/projectService.js')
      const bid = bids.find((b) => b.id === bidId)
      const accepted = await projectService.acceptBid(bid)
      setBids((list) =>
        list.map((b) => (b.projectId === bid.projectId ? (b.id === bidId ? accepted : b.status === 'pending' ? { ...b, status: 'rejected' } : b) : b))
      )
      setProjects((list) =>
        list.map((p) =>
          p.id === bid.projectId
            ? {
                ...p,
                status: 'in-progress',
                acceptedBidId: bidId,
                developer: bid.developer,
                developerId: bid.developerId,
                progress: 10,
                milestones: p.milestones?.length
                  ? p.milestones
                  : [
                      { name: 'Kickoff & requirements', done: true },
                      { name: 'Core implementation', done: false },
                      { name: 'Review & delivery', done: false },
                    ],
              }
            : p
        )
      )
      notify('developer', 'Your bid was accepted.', `${bid.developer} — your bid on a project was accepted.`, 'success')
      logActivity('Bid accepted', bid.projectId, bid.developer)
      toast('Developer Selected — project workspace created')
      return accepted
    },
    [bids, notify, logActivity, toast]
  )

  const rejectBid = useCallback(
    (bidId) => {
      setBids((list) => list.map((b) => (b.id === bidId ? { ...b, status: 'rejected' } : b)))
      toast('Bid rejected', 'info')
    },
    [toast]
  )

  const updateProject = useCallback((projectId, patch) => {
    setProjects((list) => list.map((p) => (p.id === projectId ? { ...p, ...patch } : p)))
  }, [])

  const advanceProject = useCallback(
    (projectId, action) => {
      const project = projects.find((p) => p.id === projectId)
      if (!project) return
      if (action === 'submit') {
        setProjects((list) => list.map((p) => (p.id === projectId ? { ...p, status: 'submitted', progress: 100 } : p)))
        notify('client', 'Developer submitted the project.', `${project.developer} marked ${project.title} as submitted.`, 'success')
        toast('Work marked as submitted')
      } else if (action === 'approve') {
        setProjects((list) => list.map((p) => (p.id === projectId ? { ...p, status: 'approved' } : p)))
        setPayments((list) => list.map((pay) => (pay.project === project.title ? { ...pay, status: 'Pending Release' } : pay)))
        notify('admin', 'Payment pending release.', `${project.title} — approved by client, awaiting admin verification.`, 'payment')
        toast('Project approved — payment pending release')
      } else if (action === 'issue') {
        notify('admin', 'Issue raised on active project.', `${project.title}: client raised an issue.`, 'warning')
        toast('Issue raised — admin notified', 'info')
      } else if (action === 'start') {
        setProjects((list) => list.map((p) => (p.id === projectId ? { ...p, status: 'in-progress', progress: Math.max(p.progress || 0, 25) } : p)))
        toast('Project started')
      }
    },
    [projects, notify, toast]
  )

  // ---------- payments ----------
  const checkout = useCallback(
    async ({ projectTitle, amount, method }) => {
      const result = await paymentService.checkout({ amount, method })
      setPayments((list) => [
        { id: result.id, project: projectTitle, client: 'Nadia Hussain', developer: 'Ali Khan', amount, status: 'Paid', date: result.date },
        ...list,
      ])
      setProjects((list) => list.map((p) => (p.title === projectTitle ? { ...p, status: p.status === 'open' ? 'in-progress' : p.status, funded: true } : p)))
      notify('developer', 'Escrow funded.', `${projectTitle} — $${amount.toLocaleString()} locked in escrow.`, 'payment')
      logActivity('Escrow funded', projectTitle, 'Client')
      toast('Payment Successful — project is now active')
      return result
    },
    [notify, logActivity, toast]
  )

  const releasePayment = useCallback(
    async (paymentId) => {
      await paymentService.release(paymentId)
      let released
      setPayments((list) =>
        list.map((p) => {
          if (p.id === paymentId) {
            released = { ...p, status: 'Released' }
            return released
          }
          return p
        })
      )
      notify('developer', 'Payment has been released.', `${released?.project || 'Project'} — $${(released?.amount || 0).toLocaleString()} paid out.`, 'payment')
      logActivity('Payment released', released?.project || paymentId, 'Hamza Iqbal')
      toast('Payment Released')
    },
    [notify, logActivity, toast]
  )

  // ---------- admin ----------
  const toggleUserStatus = useCallback(
    (userId) => {
      setUsers((list) =>
        list.map((u) => (u.id === userId ? { ...u, status: u.status === 'Active' ? 'Suspended' : 'Active' } : u))
      )
      toast('User status updated', 'info')
    },
    [toast]
  )

  const updateComplaint = useCallback(
    (id, status) => {
      setComplaints((list) => list.map((c) => (c.id === id ? { ...c, status } : c)))
      toast(`Complaint ${id} → ${status}`)
    },
    [toast]
  )

  const updateBug = useCallback(
    (id, status) => {
      setBugs((list) => list.map((b) => (b.id === id ? { ...b, status } : b)))
      toast(`Bug ${id} → ${status}`)
    },
    [toast]
  )

  // ---------- notifications ----------
  const markRead = useCallback((id) => setNotifications((list) => list.map((n) => (n.id === id ? { ...n, read: true } : n))), [])
  const markAllRead = useCallback(() => setNotifications((list) => list.map((n) => ({ ...n, read: true }))), [])

  const roleNotifications = useMemo(
    () => notifications.filter((n) => n.role === (auth?.role || 'developer')),
    [notifications, auth]
  )
  const unreadCount = roleNotifications.filter((n) => !n.read).length

  const value = {
    auth,
    signIn,
    signOut,
    switchRole,
    profile,
    setProfile,
    repos,
    analyzeRepo,
    syncRepo,
    togglePortfolio,
    projects,
    addProject,
    updateProject,
    bids,
    submitBid,
    acceptBid,
    rejectBid,
    advanceProject,
    payments,
    checkout,
    releasePayment,
    complaints,
    updateComplaint,
    bugs,
    updateBug,
    users,
    toggleUserStatus,
    notifications: roleNotifications,
    unreadCount,
    markRead,
    markAllRead,
    activity,
    logActivity,
    toasts,
    toast,
  }

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}

export function useApp() {
  const ctx = useContext(AppContext)
  if (!ctx) throw new Error('useApp must be used inside AppProvider')
  return ctx
}
