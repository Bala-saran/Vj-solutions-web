"use client";
import {useState} from "react";import {contact,services} from "@/data/site";
export default function ContactForm(){const[err,setErr]=useState<Record<string,string>>({});const[msg,setMsg]=useState("");
async function submit(e:React.FormEvent<HTMLFormElement>){e.preventDefault();const f=new FormData(e.currentTarget);const d=Object.fromEntries(f) as Record<string,string>;const x:Record<string,string>={};
if((d.name||"").trim().length<2)x.name="Enter your name.";if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(d.email||""))x.email="Enter a valid email.";if((d.message||"").trim().length<20)x.message="Describe your project (20+ characters).";
setErr(x);setMsg("");if(Object.keys(x).length||d.website)return;
const ep=process.env.NEXT_PUBLIC_FORM_ENDPOINT;
if(ep){try{const r=await fetch(ep,{method:"POST",headers:{"Content-Type":"application/json",Accept:"application/json"},body:JSON.stringify(d)});setMsg(r.ok?"Thank you. Your inquiry was sent.":"The inquiry could not be sent. Please email us directly.");if(r.ok)e.currentTarget.reset()}catch{setMsg("The inquiry could not be sent. Please email us directly.")}return}
location.href=`mailto:${contact.email}?subject=${encodeURIComponent("Project inquiry — "+d.service)}&body=${encodeURIComponent(`Name: ${d.name}\nEmail: ${d.email}\nTopic: ${d.topic||"-"}\nBudget: ${d.budget||"-"}\n\n${d.message}`)}`;setMsg("No form endpoint is configured, so your email app was opened with the inquiry prefilled. Nothing has been sent until you send that email.")}
const i="w-full border-b border-[var(--line)] bg-transparent py-3 text-base outline-none focus:border-white";
return(<form onSubmit={submit} noValidate className="grid gap-5">
{[["name","Name","text"],["email","Your email","email"],["topic","What is it about? (optional)","text"]].map(([n,l,t])=>(<label key={n} className="grid gap-1 text-xs tracking-wider text-[var(--mute)]">{l.toUpperCase()}<input name={n} type={t} className={i}/><span className="text-white/70">{err[n]}</span></label>))}
<label className="grid gap-1 text-xs tracking-wider text-[var(--mute)]">SERVICE REQUIRED<select name="service" className={i}>{services.map(s=><option key={s.slug} className="bg-black">{s.title}</option>)}</select></label>
<label className="grid gap-1 text-xs tracking-wider text-[var(--mute)]">BUDGET (OPTIONAL)<input name="budget" className={i}/></label>
<label className="grid gap-1 text-xs tracking-wider text-[var(--mute)]">PROJECT DESCRIPTION<textarea name="message" rows={5} className={i}/><span className="text-white/70">{err.message}</span></label>
<input name="website" tabIndex={-1} autoComplete="off" className="absolute -left-[9999px]" aria-hidden/>
<button className="btn p w-fit">SEND INQUIRY</button>{msg&&<p role="status" className="border border-[var(--line)] p-3 text-sm">{msg}</p>}</form>)}
