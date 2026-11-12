"use client";
import Link from "next/link";import {useRef} from "react";
type P={slug:string;title:string;tag:string;summary:string;problem:string;solution:string;tech:string[];link?:string};
export default function ProjectCard({p,i}:{p:P;i:number}){const r=useRef<HTMLDivElement>(null);
const mv=(e:React.PointerEvent)=>{const el=r.current;if(!el||matchMedia("(prefers-reduced-motion:reduce)").matches)return;const b=el.getBoundingClientRect(),x=(e.clientX-b.left)/b.width-.5,y=(e.clientY-b.top)/b.height-.5;el.style.transform=`perspective(900px) rotateY(${x*6}deg) rotateX(${-y*6}deg) translateZ(0)`};
const lv=()=>{if(r.current)r.current.style.transform=""};
return(<div ref={r} onPointerMove={mv} onPointerLeave={lv} className="border border-[var(--line)] bg-black/40 p-6 backdrop-blur-sm transition duration-300 hover:border-white/50" style={{transformStyle:"preserve-3d"}}>
<p className="eyebrow">Creation {String(i+1).padStart(2,"0")} · {p.tag}</p><h2 className="h2 mt-2">{p.title}</h2>
<dl className="mt-5 grid gap-4 text-sm"><div><dt className="eyebrow">The idea</dt><dd className="mt-1 text-[var(--mute)]">{p.summary}</dd></div><div><dt className="eyebrow">The problem</dt><dd className="mt-1 text-[var(--mute)]">{p.problem}</dd></div><div><dt className="eyebrow">The thinking behind it</dt><dd className="mt-1 text-[var(--mute)]">{p.solution}</dd></div><div><dt className="eyebrow">Built with</dt><dd className="mt-1">{p.tech.join(" · ")}</dd></div></dl>
<div className="mt-6 flex flex-wrap gap-5 text-xs tracking-widest"><Link href={`/projects/${p.slug}`} className="border-b border-white pb-1">THE FULL JOURNEY →</Link>{p.link&&<a href={p.link} target="_blank" rel="noopener noreferrer" className="border-b border-white pb-1">SOURCE ↗</a>}</div></div>)}
