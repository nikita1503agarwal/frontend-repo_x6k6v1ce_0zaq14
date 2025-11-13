import React from 'react'
import Spline from '@splinetool/react-spline'

export default function Hero(){
  return (
    <section className="relative h-[60vh] w-full overflow-hidden rounded-2xl border border-white/10 bg-slate-900">
      <Spline scene="https://prod.spline.design/ezRAY9QD27kiJcur/scene.splinecode" style={{ width: '100%', height: '100%' }} />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-950/70 via-slate-950/20 to-transparent" />
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight drop-shadow">Event Storyboard</h1>
        <p className="mt-3 text-slate-300 max-w-2xl">Create, preview, and export event-based storyboards for your social media campaigns. Collaborate with your team in real time.</p>
      </div>
    </section>
  )
}
