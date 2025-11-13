import React, { useEffect, useState } from 'react'

export default function Dashboard({ onOpen }){
  const [projects, setProjects] = useState([])
  const backend = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'
  const [ownerId, setOwnerId] = useState('demo-user')

  const load = async () => {
    const res = await fetch(`${backend}/projects?owner_id=${ownerId}`)
    const data = await res.json()
    setProjects(data)
  }
  useEffect(()=>{ load() }, [])

  const createProject = async () => {
    const res = await fetch(`${backend}/projects`, {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ owner_id: ownerId, title: 'Untitled', slides: [] })
    })
    const p = await res.json()
    setProjects([p, ...projects])
  }

  const del = async (id) => {
    await fetch(`${backend}/projects/${id}`, { method: 'DELETE' })
    setProjects(projects.filter(p=>p.id!==id))
  }

  return (
    <div className="bg-slate-900/60 border border-white/10 rounded-xl p-4 space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold">Projects</h3>
        <button onClick={createProject} className="btn">New Project</button>
      </div>
      <div className="grid md:grid-cols-3 gap-3">
        {projects.map(p => (
          <div key={p.id} className="rounded-lg border border-white/10 p-3 flex flex-col gap-2">
            <div className="text-lg font-semibold">{p.title}</div>
            <div className="text-xs text-slate-400">{p.slides?.length || 0} slides</div>
            <div className="mt-auto flex gap-2">
              <button onClick={()=>onOpen(p)} className="btn">Open</button>
              <button onClick={()=>del(p.id)} className="btn btn-danger">Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
