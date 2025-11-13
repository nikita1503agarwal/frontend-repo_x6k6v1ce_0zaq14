import React, { useEffect, useRef, useState } from 'react'

export default function SlidePreview({ slides }){
  const [index, setIndex] = useState(0)
  const timer = useRef(null)

  useEffect(()=>{
    if(!slides || slides.length===0) return
    timer.current && clearTimeout(timer.current)
    const d = (slides[index]?.duration || 3) * 1000
    timer.current = setTimeout(()=> setIndex((index+1)%slides.length), d)
    return ()=> clearTimeout(timer.current)
  }, [index, slides])

  if(!slides || slides.length===0) return <div className="text-sm text-slate-400">Add slides to preview</div>

  const s = slides[index]
  return (
    <div className="rounded-xl border border-white/10 overflow-hidden">
      <div className="aspect-[9/16] flex items-center justify-center p-6 transition-all" style={{ background:s.bg, color:s.color }}>
        <span className="text-3xl font-bold text-center">{s.text}</span>
      </div>
      <div className="px-3 py-2 text-xs text-slate-400">Slide {index+1} / {slides.length} — {s.transition} • {s.duration}s</div>
    </div>
  )
}
