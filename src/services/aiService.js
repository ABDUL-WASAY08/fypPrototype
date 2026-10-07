// Mock AI service — RAG responses, README and documentation generation.
import { chatAnswers, suggestedQuestions, readmeContent, documentationContent } from '../data/mockData.js'

const fakeDelay = (ms) => new Promise((r) => setTimeout(r, ms))

export const aiService = {
  getSuggestedQuestions() {
    return suggestedQuestions
  },
  async ask(question) {
    await fakeDelay(1100)
    const q = question.toLowerCase()
    const hit = chatAnswers.find((a) => a.match.some((m) => q.includes(m)))
    if (hit) {
      return { answer: hit.answer, chunks: hit.chunks, sources: hit.sources, latency: '1.1s' }
    }
    return {
      answer: `I searched the indexed repository for context related to "${question}".\n\nBased on the retrieved chunks, this behaviour lives in the service layer: src/services holds the business logic, routes in src/routes only validate input and delegate, and middleware applies authentication before any handler runs.\n\nFor a more precise answer, try asking about authentication, API routes, the database connection, registration or payments.`,
      chunks: 3,
      sources: ['src/app.js', 'src/services/index.js', 'src/middleware/requireAuth.js'],
      latency: '0.9s',
    }
  },
  async generateReadme(repoName) {
    await fakeDelay(1400)
    if (!repoName) throw new Error('No repository selected')
    return readmeContent.replace('# TOM Backend', `# ${repoName}`)
  },
  async generateDocumentation() {
    await fakeDelay(1800)
    return documentationContent
  },
}
