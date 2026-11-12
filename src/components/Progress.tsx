"use client";
import {useEffect,useRef} from "react";
export default function Progress(){const r=useRef<HTMLDivElement>(null);
useEffect(()=>{const f=()=>{const d=document.documentElement,m=d.scrollHeight-innerHeight;if(r.current)r.current.style.transform=`scaleX(${m>0?Math.min(1,scrollY/m):0})`};f();addEventListener("scroll",f,{passive:true});addEventListener("resize",f);return()=>{removeEventListener("scroll",f);removeEventListener("resize",f)}},[]);
return<div aria-hidden className="fixed inset-x-0 top-0 z-40 h-0.5 bg-transparent"><div ref={r} className="h-full origin-left bg-white" style={{transform:"scaleX(0)"}}/></div>}
