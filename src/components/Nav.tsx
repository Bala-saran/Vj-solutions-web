"use client";
import Link from "next/link";
import {useState} from "react";
import {nav,services} from "@/data/site";
export default function Nav(){const[o,setO]=useState(false);
return(<header className="fixed inset-x-0 top-0 z-50 border-b border-[var(--line)] bg-black/80 backdrop-blur">
<div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5">
<Link href="/" className="text-sm font-bold tracking-[.18em]">VJ SOLUTIONS</Link>
<nav aria-label="Primary" className="hidden items-center gap-6 lg:flex">
{nav.map(([n,h])=>n==="Services"?(<div key={h} className="group relative"><Link href={h} className="text-xs tracking-wider text-[var(--mute)] hover:text-white">{n}</Link>
<div className="invisible absolute left-0 top-full w-72 border border-[var(--line)] bg-black p-3 opacity-0 transition group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100">{services.map(s=>(<Link key={s.slug} href={`/services/${s.slug}`} className="block px-2 py-1.5 text-xs text-[var(--mute)] hover:text-white">{s.title}</Link>))}</div></div>):(<Link key={h} href={h} className="text-xs tracking-wider text-[var(--mute)] hover:text-white">{n}</Link>))}
<Link href="/contact" className="btn p !py-2">START A PROJECT</Link></nav>
<button className="h-10 w-10 border border-[var(--line)] lg:hidden" aria-label="Toggle menu" aria-expanded={o} onClick={()=>setO(!o)}>{o?"✕":"☰"}</button></div>
<div className={`fixed inset-x-0 top-16 bottom-0 overflow-y-auto bg-black px-5 transition duration-300 lg:hidden ${o?"translate-y-0 opacity-100":"pointer-events-none -translate-y-3 opacity-0"}`}>
{nav.map(([n,h])=>(<Link key={h} href={h} onClick={()=>setO(false)} className="row block py-4 text-2xl">{n}</Link>))}
<Link href="/contact" onClick={()=>setO(false)} className="btn p mt-6">START A PROJECT</Link></div></header>)}
