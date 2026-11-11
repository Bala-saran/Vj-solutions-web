"use client";
import {useEffect,useRef,useState,type ReactNode} from "react";
export default function Reveal({children,delay=0,className=""}:{children:ReactNode;delay?:number;className?:string}){
const r=useRef<HTMLDivElement>(null);const[v,setV]=useState(false);
useEffect(()=>{const el=r.current;if(!el)return;const o=new IntersectionObserver(([e])=>setV(e.isIntersecting),{threshold:.15});o.observe(el);return()=>o.disconnect()},[]);
return<div ref={r} style={{transitionDelay:`${delay}ms`}} className={`transition duration-700 ${v?"translate-y-0 opacity-100":"translate-y-6 opacity-0"} motion-reduce:translate-y-0 motion-reduce:opacity-100 motion-reduce:transition-none ${className}`}>{children}</div>}
