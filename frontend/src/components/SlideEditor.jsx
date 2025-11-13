import React from 'react'

export default function SlideEditor({ slides, setSlides, theme }){
  const addSlide = () => setSlides([...(slides||[]), { text: 'New Slide', duration: 3, transition: 'fade', bg: theme?.bg || '#111827', color: theme?.color || '#fff' }])
  const updateSlide = (idx, patch) => setSlides(slides.map((s,i)=> i===idx? { ...s, ...patch } : s))
  const removeSlide = (idx) => setSlides(slides.filter((_,i)=> i!==idx))

  return (
    <div className="bg-slate-900/60 border border-white/10 rounded-xl p-4 space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold">Slides</h3>
        <button onClick={addSlide} className="btn">Add Slide</button>
      </div>
      <div className="grid gap-4">
        {(slides||[]).map((s, idx) => (
          <div key={idx} className="rounded-lg border border-white/10 p-3 grid md:grid-cols-2 gap-3">
            <div className="space-y-2">
              <input value={s.text} onChange={e=>updateSlide(idx,{text:e.target.value})} className="input" />
              <div className="grid grid-cols-3 gap-2">
                <input type="number" min={1} value={s.duration} onChange={e=>updateSlide(idx,{duration:Number(e.target.value)})} className="input" placeholder="Duration (s)" />
                <select value={s.transition} onChange={e=>updateSlide(idx,{transition:e.target.value})} className="input">
                  <option>fade</option>
                  <option>slide</option>
                  <option>zoom</option>
                </select>
                <input value={s.bg} onChange={e=>updateSlide(idx,{bg:e.target.value})} className="input" placeholder="#000000" />
              </div>
              <input value={s.color} onChange={e=>updateSlide(idx,{color:e.target.value})} className="input" placeholder="#ffffff" />
              <button onClick={()=>removeSlide(idx)} className="btn btn-danger">Delete</button>
            </div>
            <div className="rounded-lg aspect-[9/16] border border-white/10 overflow-hidden" style={{ background:s.bg }}>
              <div className="w-full h-full flex items-center justify-center p-4" style={{ color:s.color }}>
                <span className="text-3xl font-bold text-center">{s.text}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
