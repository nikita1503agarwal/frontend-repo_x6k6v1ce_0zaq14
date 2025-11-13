import React, { useEffect, useMemo, useState } from 'react'
import Hero from './components/Hero'
import EventForm from './components/EventForm'
import ThemeSelector from './components/ThemeSelector'
import SlideEditor from './components/SlideEditor'
import SlidePreview from './components/SlidePreview'
import ExportButton from './components/ExportButton'
import Dashboard from './components/Dashboard'
import Auth from './components/Auth'
import SharePermissions from './components/SharePermissions'
import MediaLibrary from './components/MediaLibrary'

const backend = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

export default function App(){
  const [user, setUser] = useState(null)
  const [current, setCurrent] = useState(null)
  const [theme, setTheme] = useState(null)
  const [slides, setSlides] = useState([])

  // Load shared project via token
  useEffect(()=>{
    const params = new URLSearchParams(window.location.search)
    const token = params.get('share')
    if(token){
      fetch(`${backend}/share/${token}`).then(r=>r.json()).then(p=>{
        setCurrent(p)
        setSlides(p.slides || [])
      })
    }
  },[])

  const saveProject = async (form) => {
    if(!current){
      const res = await fetch(`${backend}/projects`, { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({ owner_id: user?.email || 'demo-user', title: form.title, date: form.date, location: form.location, platform: form.platform, mood: form.mood, theme_id: theme?.id, slides }) })
      const p = await res.json()
      setCurrent(p)
    } else {
      const res = await fetch(`${backend}/projects/${current.id}`, { method:'PUT', headers:{'Content-Type':'application/json'}, body: JSON.stringify({ ...current, ...form, theme_id: theme?.id, slides }) })
      const p = await res.json()
      setCurrent(p)
    }
  }

  return (
    <div className="min-h-screen">
      <div className="container mx-auto p-6 space-y-6">
        <Hero />

        {!user ? (
          <Auth onAuthed={setUser} />
        ) : (
          <div className="text-sm text-slate-300">Signed in as {user.email}</div>
        )}

        <Dashboard onOpen={(p)=>{ setCurrent(p); setSlides(p.slides||[]) }} />

        <div className="grid md:grid-cols-3 gap-4">
          <div className="md:col-span-2 space-y-4">
            <EventForm onSubmit={saveProject} />
            <SlideEditor slides={slides} setSlides={setSlides} theme={theme} />
          </div>
          <div className="space-y-4">
            <ThemeSelector value={theme} onChange={setTheme} />
            <SlidePreview slides={slides} />
            <ExportButton projectId={current?.id} />
            <SharePermissions projectId={current?.id} />
          </div>
        </div>

        <MediaLibrary ownerId={user?.email || 'demo-user'} projectId={current?.id} />
      </div>

      <style>{`
        .btn { @apply px-3 py-2 rounded-lg bg-sky-500 hover:bg-sky-400 text-white text-sm transition; }
        .btn-danger { @apply bg-rose-500 hover:bg-rose-400; }
        .input { @apply w-full px-3 py-2 rounded-lg bg-slate-800 border border-white/10 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500; }
      `}</style>
    </div>
  )
}
