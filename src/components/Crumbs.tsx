"use client";
import Link from "next/link";import {usePathname} from "next/navigation";
export default function Crumbs(){const p=usePathname();const seg=p.split("/").filter(Boolean);if(!seg.length)return null;
const lab=(s:string)=>s.replace(/-/g," ").replace(/\b\w/g,c=>c.toUpperCase());
return(<nav aria-label="Breadcrumb" className="mb-6 text-xs text-[var(--mute)]"><Link href="/" className="hover:text-white">Home</Link>{seg.map((s,i)=>{const h="/"+seg.slice(0,i+1).join("/");return<span key={h}> / {i===seg.length-1?<span aria-current="page" className="text-white">{lab(s)}</span>:<Link href={h} className="hover:text-white">{lab(s)}</Link>}</span>})}</nav>)}
