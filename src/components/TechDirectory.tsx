"use client";
import {useMemo,useState} from "react";import Logo from "./Logo";
export default function TechDirectory({cats}:{cats:[string,string[]][]}){const[q,setQ]=useState("");const[c,setC]=useState("All");
const items=useMemo(()=>cats.filter(([n])=>c==="All"||n===c).flatMap(([n,t])=>t.map(x=>[x,n] as const)).filter(([x])=>x.toLowerCase().includes(q.toLowerCase())),[cats,q,c]);
return(<div className="mb-14"><p className="eyebrow mb-3">Technology directory</p><input value={q} onChange={e=>setQ(e.target.value)} placeholder="Search technologies" aria-label="Search technologies" className="mb-4 w-full border-b border-[var(--line)] bg-transparent py-3 outline-none focus:border-white"/>
<div className="mb-6 flex flex-wrap gap-2">{["All",...cats.map(x=>x[0])].map(x=><button key={x} onClick={()=>setC(x)} aria-pressed={c===x} className={`border px-2.5 py-1 text-xs ${c===x?"border-white bg-white text-black":"border-[var(--line)] text-[var(--mute)] hover:text-white"}`}>{x}</button>)}</div>
{items.length?<ul className="grid grid-cols-2 gap-4 sm:grid-cols-3">{items.map(([x,n])=><li key={x+n} className="flex items-center gap-3 text-[var(--mute)]"><Logo name={x}/><span className="text-sm">{x}<span className="block text-[10px]">{n}</span></span></li>)}</ul>:<p className="text-[var(--mute)]">No technologies match.</p>}
<p className="mt-8 text-sm text-[var(--mute)]">How the layers connect: Frontend → API (Backend) → Database → Cloud and DevOps, with Security applied across every layer and AI/ML services called from the backend.</p></div>)}
