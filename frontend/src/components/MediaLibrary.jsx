import React, { useEffect, useState } from 'react'

export default function MediaLibrary({ ownerId, projectId }){
  const backend = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'
  const [files, setFiles] = useState([])

  const load = async () => {
    const params = new URLSearchParams()
    if(ownerId) params.set('owner_id', ownerId)
    if(projectId) params.set('project_id', projectId)
    const res = await fetch(`${backend}/media?${params.toString()}`)
    const data = await res.json()
    setFiles(data)
  }
  useEffect(()=>{ load() }, [])

  const upload = async (e) => {
    const f = e.target.files[0]
    if(!f) return
    const form = new FormData()
    form.append('owner_id', ownerId)
    if(projectId) form.append('project_id', projectId)
    form.append('file', f)
    await fetch(`${backend}/media/upload`, { method: 'POST', body: form })
    load()
  }

  return (
    <div className="bg-slate-900/60 border border-white/10 rounded-xl p-4 space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold">Media Library</h3>
        <input type="file" onChange={upload} className="text-sm" />
      </div>
      <div className="grid grid-cols-3 md:grid-cols-6 gap-2">
        {files.map(f => (
          <div key={f.id} className="aspect-square rounded-lg overflow-hidden border border-white/10">
            <img src={f.url.startsWith('http')?f.url:`/${f.url}`} className="w-full h-full object-cover" />
          </div>
        ))}
      </div>
    </div>
  )
}
