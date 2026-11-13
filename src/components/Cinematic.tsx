"use client";
import {useEffect} from "react";import {usePathname} from "next/navigation";
const mood=(p:string)=>p==="/"?"home":p.startsWith("/services")?"services":p.startsWith("/technologies")?"expertise":p.startsWith("/projects")||p.startsWith("/ai-engineering")?"projects":p.startsWith("/process")?"process":p.startsWith("/contact")?"contact":"about";
export default function Cinematic(){const p=usePathname();
useEffect(()=>{document.body.dataset.mood=mood(p)},[p]);
useEffect(()=>{(async()=>{const THREE=await import("three");const {default:init}=await import("@/lib/cinematic/stage");init(THREE,(s:string)=>document.querySelector(s))})()},[]);
return <canvas id="stage" aria-hidden/>}
