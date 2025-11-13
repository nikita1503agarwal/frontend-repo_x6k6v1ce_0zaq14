import React, { useState } from 'react'

export default function Auth({ onAuthed }){
  const [mode, setMode] = useState('login')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const backend = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

  const submit = async () => {
    const path = mode==='login' ? 'login' : 'register'
    const res = await fetch(`${backend}/auth/${path}`, {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    })
    if(!res.ok) return alert('Auth failed')
    const data = await res.json()
    onAuthed({ token: data.access_token, email })
  }

  const google = async () => {
    const form = new FormData()
    form.append('id_token', email || 'demo@google.com')
    const res = await fetch(`${backend}/auth/google`, { method: 'POST', body: form })
    const data = await res.json()
    onAuthed({ token: data.access_token, email: email || 'demo@google.com' })
  }

  return (
    <div className="bg-slate-900/60 border border-white/10 rounded-xl p-4 space-y-3">
      <h3 className="font-semibold">Sign in</h3>
      <input className="input" placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} />
      {mode==='register' || <input className="input" type="password" placeholder="Password" value={password} onChange={e=>setPassword(e.target.value)} />}
      <div className="flex gap-2">
        <button className="btn" onClick={submit}>{mode==='login'?'Login':'Register'}</button>
        <button className="btn" onClick={google}>Continue with Google</button>
        <button className="text-xs text-slate-400" onClick={()=>setMode(mode==='login'?'register':'login')}>Switch to {mode==='login'?'Register':'Login'}</button>
      </div>
    </div>
  )
}
