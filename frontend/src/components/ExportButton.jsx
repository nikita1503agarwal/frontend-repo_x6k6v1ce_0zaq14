import React, { useState } from 'react'

export default function ExportButton({ projectId }){
  const [loading, setLoading] = useState(false)
  const backend = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

  const exportAs = async (format) => {
    if(!projectId) return alert('Save project first')
    setLoading(true)
    try {
      const res = await fetch(`${backend}/export`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ project_id: projectId, format })
      })
      if(!res.ok) throw new Error('Export failed')
      const blob = await res.blob()
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = format==='pptx' ? 'storyboard.pptx' : 'slides.zip'
      document.body.appendChild(a)
      a.click()
      a.remove()
      window.URL.revokeObjectURL(url)
    } catch (e){
      alert(e.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex gap-2">
      <button disabled={loading} onClick={()=>exportAs('images')} className="btn">Export Images</button>
      <button disabled={loading} onClick={()=>exportAs('pptx')} className="btn">Export PPTX</button>
      <button disabled className="btn opacity-60" title="Coming soon">Export Video</button>
    </div>
  )
}
