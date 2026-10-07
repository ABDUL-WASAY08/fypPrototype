import { useEffect, useRef, useState } from 'react'
import { Bot, Send, Sparkles, Database, FileCode2, RotateCcw, Trash2, User } from 'lucide-react'
import { useApp } from '../../context/AppContext.jsx'
import { aiService } from '../../services/aiService.js'
import { RagFlow } from '../../components/domain.jsx'
import { SectionHeader, StatusBadge, Spinner, Avatar } from '../../components/ui.jsx'

const GREETING = {
  role: 'assistant',
  text: 'Hello! I am TOM AI, your repository assistant. I have indexed this repository and can answer questions about architecture, authentication, routes, database access and more — always grounded in your actual code.',
  chunks: 0,
  sources: [],
}

export default function AiAssistant() {
  const { repos, auth } = useApp()
  const analyzedRepos = repos.filter((r) => r.analyzed)
  const [repo, setRepo] = useState(analyzedRepos[1]?.name || analyzedRepos[0]?.name || '')
  const [messages, setMessages] = useState([GREETING])
  const [input, setInput] = useState('')
  const [busy, setBusy] = useState(false)
  const [lastContext, setLastContext] = useState(null)
  const endRef = useRef(null)

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, busy])

  const send = async (text) => {
    const question = (text ?? input).trim()
    if (!question || busy) return
    setInput('')
    setMessages((m) => [...m, { role: 'user', text: question }])
    setBusy(true)
    const res = await aiService.ask(question)
    setLastContext({ chunks: res.chunks, sources: res.sources, latency: res.latency, question })
    setMessages((m) => [...m, { role: 'assistant', text: res.answer, chunks: res.chunks, sources: res.sources }])
    setBusy(false)
  }

  const reset = () => {
    setMessages([GREETING])
    setLastContext(null)
  }

  return (
    <div>
      <SectionHeader
        title="TOM AI — Repository Assistant"
        subtitle="Retrieval-augmented chat grounded in your indexed repository."
        actions={
          <>
            <select className="input w-auto" value={repo} onChange={(e) => setRepo(e.target.value)}>
              {analyzedRepos.map((r) => <option key={r.id}>{r.name}</option>)}
            </select>
            <button className="btn-secondary" onClick={reset}><RotateCcw size={15} /> New chat</button>
          </>
        }
      />

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Chat */}
        <div className="lg:col-span-2 card flex flex-col h-[calc(100vh-260px)] min-h-[520px]">
          {/* Header */}
          <div className="px-5 py-3.5 border-b border-slate-200 flex items-center gap-3">
            <span className="h-9 w-9 rounded-lg bg-brand-600 text-white flex items-center justify-center"><Bot size={18} /></span>
            <div>
              <p className="text-sm font-semibold text-slate-900">TOM AI</p>
              <p className="text-xs text-slate-500 flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" /> Indexed: {repo}
              </p>
            </div>
            <div className="ml-auto flex items-center gap-2">
              {lastContext && (
                <span className="hidden sm:inline-flex items-center gap-1.5 text-[11px] font-semibold bg-brand-50 text-brand-700 ring-1 ring-brand-200 rounded-full px-2.5 py-1">
                  <Database size={11} /> {lastContext.chunks} relevant chunks found
                </span>
              )}
              <StatusBadge tone="purple"><Sparkles size={11} /> RAG</StatusBadge>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto scrollbar-thin p-5 space-y-5">
            {messages.map((m, i) => (
              <div key={i} className={`flex gap-3 ${m.role === 'user' ? 'flex-row-reverse' : ''}`}>
                <span className={`h-8 w-8 rounded-lg flex items-center justify-center shrink-0 ${m.role === 'user' ? 'bg-slate-200 text-slate-600' : 'bg-brand-600 text-white'}`}>
                  {m.role === 'user' ? <User size={15} /> : <Bot size={15} />}
                </span>
                <div className={`max-w-[85%] ${m.role === 'user' ? 'text-right' : ''}`}>
                  <div
                    className={`rounded-2xl px-4 py-3 text-sm leading-relaxed whitespace-pre-line ${
                      m.role === 'user' ? 'bg-brand-600 text-white rounded-tr-sm' : 'bg-slate-100 text-slate-800 rounded-tl-sm'
                    }`}
                  >
                    {m.text}
                  </div>

                  {m.role === 'assistant' && m.chunks > 0 && (
                    <div className="mt-2 rounded-xl border border-brand-200 bg-brand-50/60 p-3 text-left">
                      <p className="text-[11px] font-bold text-brand-700 uppercase tracking-wide flex items-center gap-1.5">
                        <Database size={11} /> Repository Context Retrieved
                      </p>
                      <p className="text-xs text-brand-800 mt-1">{m.chunks} relevant chunks found in <strong>{repo}</strong></p>
                      <div className="flex flex-wrap gap-1.5 mt-2">
                        {m.sources.map((s) => (
                          <span key={s} className="inline-flex items-center gap-1 text-[11px] font-mono bg-white border border-brand-200 text-slate-600 rounded px-1.5 py-0.5">
                            <FileCode2 size={10} className="text-brand-500" /> {s}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}

            {busy && (
              <div className="flex gap-3">
                <span className="h-8 w-8 rounded-lg bg-brand-600 text-white flex items-center justify-center shrink-0"><Bot size={15} /></span>
                <div className="rounded-2xl rounded-tl-sm bg-slate-100 px-4 py-3 flex items-center gap-2 text-sm text-slate-500">
                  <Spinner size={13} /> Retrieving context and generating answer…
                </div>
              </div>
            )}
            <div ref={endRef} />
          </div>

          {/* Suggested questions */}
          <div className="px-5 pt-3 pb-1 border-t border-slate-100 flex gap-2 overflow-x-auto scrollbar-thin">
            {aiService.getSuggestedQuestions().slice(0, 4).map((q) => (
              <button
                key={q}
                onClick={() => send(q)}
                disabled={busy}
                className="whitespace-nowrap text-xs font-medium bg-white border border-slate-200 text-slate-600 rounded-full px-3 py-1.5 hover:border-brand-400 hover:text-brand-700 transition-colors disabled:opacity-50"
              >
                {q}
              </button>
            ))}
          </div>

          {/* Input */}
          <div className="p-4">
            <form
              onSubmit={(e) => { e.preventDefault(); send() }}
              className="flex items-center gap-2 bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 focus-within:border-brand-400 focus-within:ring-2 focus-within:ring-brand-100 transition"
            >
              <input
                className="flex-1 bg-transparent text-sm px-1 py-1.5 outline-none placeholder-slate-400"
                placeholder={`Ask anything about ${repo}…`}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                disabled={busy}
              />
              <button type="submit" disabled={busy || !input.trim()} className="btn-primary btn-sm px-3">
                {busy ? <Spinner size={13} /> : <Send size={14} />}
                Send
              </button>
            </form>
            <p className="text-[11px] text-slate-400 mt-2">AI responses are mocked in this prototype and scoped to the selected repository.</p>
          </div>
        </div>

        {/* Side panel */}
        <div className="space-y-6">
          <RagFlow />

          <div className="card p-5">
            <h3 className="section-title flex items-center gap-2"><Trash2 size={15} className="text-slate-400" /> Suggested questions</h3>
            <div className="mt-3 space-y-2">
              {aiService.getSuggestedQuestions().map((q) => (
                <button
                  key={q}
                  onClick={() => send(q)}
                  disabled={busy}
                  className="w-full text-left text-sm text-slate-600 hover:text-brand-700 hover:bg-brand-50 border border-slate-200 hover:border-brand-300 rounded-lg px-3 py-2 transition-colors disabled:opacity-50"
                >
                  {q}
                </button>
              ))}
            </div>
          </div>

          <div className="card p-5">
            <h3 className="section-title">Session stats</h3>
            <div className="mt-3 grid grid-cols-2 gap-3 text-sm">
              <div className="rounded-lg bg-slate-50 p-3">
                <p className="text-slate-500 text-xs">Messages</p>
                <p className="font-bold text-slate-900 text-lg">{messages.length}</p>
              </div>
              <div className="rounded-lg bg-slate-50 p-3">
                <p className="text-slate-500 text-xs">Avg. latency</p>
                <p className="font-bold text-slate-900 text-lg">1.0s</p>
              </div>
              <div className="rounded-lg bg-slate-50 p-3">
                <p className="text-slate-500 text-xs">Indexed chunks</p>
                <p className="font-bold text-slate-900 text-lg">12,844</p>
              </div>
              <div className="rounded-lg bg-slate-50 p-3">
                <p className="text-slate-500 text-xs">Queries today</p>
                <p className="font-bold text-slate-900 text-lg">{messages.filter((m) => m.role === 'user').length}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
