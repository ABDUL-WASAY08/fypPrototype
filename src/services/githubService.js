// Mock GitHub service — no real network calls.
import { repositories, analysisOverview, analysisIssues } from '../data/mockData.js'

export const ANALYSIS_STEPS = [
  'Fetching Repository',
  'Filtering Files',
  'Chunking Code',
  'Generating Embeddings',
  'Indexing Repository',
  'Analysis Complete',
]

export const githubService = {
  listRepositories() {
    return Promise.resolve(repositories)
  },
  async syncRepository(repo) {
    await new Promise((r) => setTimeout(r, 1200))
    return { ...repo, updated: 'just now' }
  },
  // Runs the mock analysis pipeline, invoking onStep after each stage.
  analyzeRepository(repo, onStep) {
    return new Promise((resolve) => {
      let i = 0
      const run = () => {
        if (i >= ANALYSIS_STEPS.length) {
          resolve({ ...repo, analyzed: true, ...analysisOverview })
          return
        }
        const step = ANALYSIS_STEPS[i]
        onStep?.(step, i, ANALYSIS_STEPS.length)
        i += 1
        setTimeout(run, 750)
      }
      run()
    })
  },
  getAnalysisOverview() {
    return Promise.resolve(analysisOverview)
  },
  getIssues() {
    return Promise.resolve(analysisIssues)
  },
}
