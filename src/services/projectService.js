// Mock project service — projects, bids and workspace transitions.
const fakeDelay = (ms) => new Promise((r) => setTimeout(r, ms))

export const projectService = {
  async createProject(payload) {
    await fakeDelay(900)
    if (!payload.title?.trim()) throw new Error('Project title is required')
    return {
      ...payload,
      id: 'prj-' + Math.random().toString(36).slice(2, 7),
      status: 'open',
      createdAt: new Date().toISOString().slice(0, 10),
      milestones: [],
    }
  },
  async submitBid(payload) {
    await fakeDelay(800)
    if (!payload.price || payload.price <= 0) throw new Error('Enter a valid proposed price')
    if (!payload.proposal?.trim()) throw new Error('Proposal cannot be empty')
    return {
      ...payload,
      id: 'bid-' + Math.random().toString(36).slice(2, 7),
      status: 'pending',
      createdAt: new Date().toISOString().slice(0, 10),
    }
  },
  async acceptBid(bid) {
    await fakeDelay(700)
    return { ...bid, status: 'accepted' }
  },
}
