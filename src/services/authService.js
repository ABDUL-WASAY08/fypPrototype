// Mock auth service — swap for Firebase / OAuth later.
import { developers, clients } from '../data/mockData.js'

const fakeDelay = (ms = 700) => new Promise((r) => setTimeout(r, ms))

export const authService = {
  async signIn(role, provider = 'email') {
    await fakeDelay(650)
    if (role === 'developer') {
      return {
        role: 'developer',
        provider,
        user: { ...developers[0], initials: developers[0].avatar },
      }
    }
    if (role === 'client') {
      return {
        role: 'client',
        provider,
        user: { ...clients[0], name: clients[0].name, initials: clients[0].avatar },
      }
    }
    return {
      role: 'admin',
      provider,
      user: { id: 'admin-1', name: 'Hamza Iqbal', email: 'hamza@tom.dev', initials: 'HI', color: 'bg-slate-900', title: 'Platform Administrator' },
    }
  },
  async signInAs(role, userId) {
    await fakeDelay(350)
    if (role === 'developer') {
      const dev = developers.find((d) => d.id === userId) || developers[0]
      return { role, user: { ...dev, initials: dev.avatar } }
    }
    if (role === 'client') {
      const cli = clients.find((c) => c.id === userId) || clients[0]
      return { role, user: { ...cli, initials: cli.avatar } }
    }
    return { role: 'admin', user: { id: 'admin-1', name: 'Hamza Iqbal', email: 'hamza@tom.dev', initials: 'HI', color: 'bg-slate-900', title: 'Platform Administrator' } }
  },
  signOut() {
    return Promise.resolve()
  },
}
