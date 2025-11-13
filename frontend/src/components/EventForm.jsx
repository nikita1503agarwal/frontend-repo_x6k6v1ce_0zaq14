import React, { useState } from 'react'

export default function EventForm({ onSubmit }){
  const [form, setForm] = useState({ title: '', date: '', location: '', platform: 'Instagram', mood: 'Vibrant' })
  const handle = (e) => setForm({ ...form, [e.target.name]: e.target.value })
  return (
    <div className="bg-slate-900/60 border border-white/10 rounded-xl p-4 space-y-3">
      <h3 className="font-semibold">Event Info</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <input name="title" placeholder="Title" value={form.title} onChange={handle} className="input" />
        <input name="date" type="date" value={form.date} onChange={handle} className="input" />
        <input name="location" placeholder="Location" value={form.location} onChange={handle} className="input" />
        <select name="platform" value={form.platform} onChange={handle} className="input">
          <option>Instagram</option>
          <option>TikTok</option>
          <option>LinkedIn</option>
          <option>Facebook</option>
          <option>X</option>
        </select>
        <select name="mood" value={form.mood} onChange={handle} className="input">
          <option>Vibrant</option>
          <option>Minimal</option>
          <option>Elegant</option>
          <option>Playful</option>
        </select>
      </div>
      <button onClick={() => onSubmit(form)} className="btn">Save Event</button>
    </div>
  )
}
