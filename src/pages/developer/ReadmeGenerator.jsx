import { useState } from 'react'
import { FileText, Sparkles, Copy, Download, RefreshCw, Check, Eye, Code2 } from 'lucide-react'
import { useApp } from '../../context/AppContext.jsx'
import { aiService } from '../../services/aiService.js'
import { SectionHeader, StatusBadge, Spinner, Tabs } from '../../components/ui.jsx'

/* Minimal markdown renderer (headings, fences, tables, lists, inline styles) */
function renderMarkdown(md) {
  const lines = md.split('\n')
  const out = []
  let i = 0
  let key = 0
  const inline = (t) =>
    t
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/`([^`]+)`/g, '<code class="bg-slate-100 text-rose-600 px-1 rounded text-[12px]">$1</code>')
      .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')

  while (i < lines.length) {
    const line = lines[i]

    if (line.startsWith('```')) {
      const buf = []
      i++
      while (i < lines.length && !lines[i].startsWith('```')) buf.push(lines[i++])
      i++
      out.push(
        <pre key={key++} className="bg-slate-900 text-slate-100 rounded-lg p-4 overflow-x-auto text-[12.5px] font-mono my-3">
          {buf.join('\n')}
        </pre>
      )
      continue
    }

    if (line.startsWith('| ') && lines[i + 1]?.startsWith('| ---')) {
      const headers = line.split('|').slice(1, -1).map((c) => c.trim())
      i += 2
      const rows = []
      while (i < lines.length && lines[i].startsWith('|')) rows.push(lines[i++].split('|').slice(1, -1).map((c) => c.trim()))
      out.push(
        <div key={key++} className="overflow-x-auto my-3 border border-slate-200 rounded-lg">
          <table className="w-full text-sm">
            <thead className="bg-slate-50">
              <tr>{headers.map((h) => <th key={h} className="text-left px-3 py-2 font-semibold text-slate-700 border-b border-slate-200">{h}</th>)}</tr>
            </thead>
            <tbody>
              {rows.map((r, ri) => (
                <tr key={ri} className="odd:bg-white even:bg-slate-50/60">
                  {r.map((c, ci) => <td key={ci} className="px-3 py-2 border-b border-slate-100 text-slate-600">{inline(c)}</td>)}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )
      continue
    }

    if (line.startsWith('# ')) out.push(<h1 key={key++} className="text-3xl font-bold text-slate-900 mt-1 mb-3">{inline(line.slice(2))}</h1>)
    else if (line.startsWith('## ')) out.push(<h2 key={key++} className="text-xl font-bold text-slate-900 mt-7 mb-3 pb-2 border-b border-slate-200">{inline(line.slice(3))}</h2>)
    else if (line.startsWith('### ')) out.push(<h3 key={key++} className="text-lg font-semibold text-slate-800 mt-5 mb-2">{inline(line.slice(4))}</h3>)
    else if (line.startsWith('> ')) out.push(<blockquote key={key++} className="border-l-4 border-brand-400 bg-brand-50/60 pl-4 py-2 text-slate-700 italic my-3 rounded-r">{inline(line.slice(2))}</blockquote>)
    else if (/^[-*] /.test(line)) {
      const items = []
      while (i < lines.length && /^[-*] /.test(lines[i])) items.push(lines[i++].slice(2))
      out.push(<ul key={key++} className="list-disc pl-5 my-2 space-y-1 text-slate-700 text-sm">{items.map((it, k) => <li key={k}>{inline(it)}</li>)}</ul>)
      continue
    } else if (/^\d+\. /.test(line)) {
      const items = []
      while (i < lines.length && /^\d+\. /.test(lines[i])) items.push(lines[i++].replace(/^\d+\. /, ''))
      out.push(<ol key={key++} className="list-decimal pl-5 my-2 space-y-1 text-slate-700 text-sm">{items.map((it, k) => <li key={k}>{inline(it)}</li>)}</ol>)
      continue
    } else if (line.trim()) out.push(<p key={key++} className="my-2 text-slate-700 text-sm leading-relaxed">{inline(line)}</p>)
    i++
  }
  return out
}

export default function ReadmeGenerator() {
  const { repos, toast } = useApp()
  const [repoName, setRepoName] = useState('TOM-Backend')
  const [content, setContent] = useState('')
  const [loading, setLoading] = useState(false)
  const [tab, setTab] = useState('preview')
  const [copied, setCopied] = useState(false)

  const generate = async () => {
    setLoading(true)
    setContent('')
    try {
      const md = await aiService.generateReadme(repoName)
      setContent(md)
      toast('README generated successfully')
    } catch {
      toast('Select a repository first', 'error')
    }
    setLoading(false)
  }

  const copy = () => {
    navigator.clipboard?.writeText(content).catch(() => {})
    setCopied(true)
    toast('README copied to clipboard')
    setTimeout(() => setCopied(false), 2000)
  }

  const download = () => {
    const blob = new Blob([content], { type: 'text/markdown' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'README.md'
    a.click()
    URL.revokeObjectURL(url)
    toast('README.md downloaded')
  }

  return (
    <div>
      <SectionHeader
        title="README Generator"
        subtitle="Generate a structured, formatted README from your repository structure."
        actions={
          <>
            <select className="input w-auto" value={repoName} onChange={(e) => setRepoName(e.target.value)}>
              {repos.map((r) => <option key={r.id}>{r.name}</option>)}
            </select>
            <button className="btn-primary" onClick={generate} disabled={loading}>
              {loading ? <Spinner size={15} /> : <Sparkles size={15} />} {loading ? 'Generating…' : 'Generate README'}
            </button>
          </>
        }
      />

      {!content && !loading && (
        <div className="card p-14 text-center">
          <div className="mx-auto h-14 w-14 rounded-2xl bg-brand-50 text-brand-600 flex items-center justify-center"><FileText size={26} /></div>
          <h3 className="mt-4 font-semibold text-slate-900">No README generated yet</h3>
          <p className="text-sm text-slate-500 mt-1">Select a repository and click <strong>Generate README</strong> to build a full Markdown document.</p>
          <button className="btn-primary mt-5" onClick={generate}><Sparkles size={15} /> Generate README</button>
        </div>
      )}

      {loading && (
        <div className="card p-10">
          <div className="flex items-center gap-3 text-sm text-slate-600 mb-6"><Spinner size={16} /> Analyzing repository structure and writing documentation…</div>
          <div className="space-y-3">
            {[90, 70, 80, 55, 75, 65].map((w, i) => <div key={i} className="skeleton h-4" style={{ width: `${w}%` }} />)}
          </div>
        </div>
      )}

      {content && (
        <>
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <Tabs tabs={[{ id: 'preview', label: 'Rendered preview' }, { id: 'raw', label: 'Markdown source' }]} active={tab} onChange={setTab} />
            <div className="ml-auto flex gap-2">
              <StatusBadge tone="success">Generated · {repoName}</StatusBadge>
              <button className="btn-secondary btn-sm" onClick={generate} disabled={loading}><RefreshCw size={13} /> Regenerate</button>
              <button className="btn-secondary btn-sm" onClick={copy}>{copied ? <Check size={13} className="text-emerald-500" /> : <Copy size={13} />} Copy</button>
              <button className="btn-secondary btn-sm" onClick={download}><Download size={13} /> Download README</button>
            </div>
          </div>

          <div className="card overflow-hidden">
            <div className="px-5 py-3 bg-slate-50 border-b border-slate-200 flex items-center gap-2 text-sm font-semibold text-slate-700">
              {tab === 'preview' ? <Eye size={15} /> : <Code2 size={15} />} {repoName}/README.md
            </div>
            {tab === 'preview' ? (
              <div className="p-6 sm:p-8 prose-sm max-w-none">{renderMarkdown(content)}</div>
            ) : (
              <pre className="p-6 text-[12.5px] font-mono text-slate-700 overflow-x-auto whitespace-pre-wrap scrollbar-thin">{content}</pre>
            )}
          </div>
        </>
      )}
    </div>
  )
}
