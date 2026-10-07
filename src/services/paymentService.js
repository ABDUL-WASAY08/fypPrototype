// Mock payment service — escrow-style workflow, no real gateway.
const fakeDelay = (ms) => new Promise((r) => setTimeout(r, ms))

export const paymentService = {
  async checkout({ amount, method }) {
    await fakeDelay(1300)
    if (!amount || amount <= 0) throw new Error('Invalid amount')
    if (!method) throw new Error('Select a payment method')
    return {
      id: 'pay-' + Math.random().toString(36).slice(2, 8),
      amount,
      method,
      status: 'Paid',
      date: new Date().toISOString().slice(0, 10),
      reference: 'TOM-' + Math.random().toString(36).slice(2, 8).toUpperCase(),
    }
  },
  async release(paymentId) {
    await fakeDelay(900)
    return { paymentId, status: 'Released' }
  },
}
