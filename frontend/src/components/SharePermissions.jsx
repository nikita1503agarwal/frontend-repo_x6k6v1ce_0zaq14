import React, { useState } from 'react'

export default function SharePermissions({ projectId }){
  const backend = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'
  const [link, setLink] = useState(null)

  const createLink = async (role='viewer') => {
    const form = new FormData()
    form.append('project_id', projectId)
    form.append('role', role)
    const res = await fetch(`${backend}/share`, { method: 'POST', body: form })
    const data = await res.json()
    const url = `${window.location.origin}?share=${data.token}`
    setLink(url)
  }

  return (
    <div className="bg-slate-900/60 border border-white/10 rounded-xl p-4 space-y-2">
      <h3 className="font-semibold">Share</h3>
      <div className="flex gap-2">
        <button disabled={!projectId} onClick={()=>createLink('viewer')} className="btn">Create view link</button>
        <button disabled={!projectId} onClick={()=>createLink('editor')} className="btn">Create edit link</button>
      </div>
      {link && <div className="text-xs text-slate-300">{link}</div>}
    </div>
  )
}
