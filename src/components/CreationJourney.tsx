"use client";
import {useState} from "react";
const ST:[string,string,string,number][]=[
["Idea","Every build starts as a loose thought: something that could work better, or something I’m curious about. I write it down plainly before touching any tool.","idea: a tool that explains what it is doing, in plain words",0],
["Understanding","I turn the idea into a real problem: who it is for, what goes in, what must come out, and what could go wrong. Vague problems produce vague software.","inputs → ? · outputs → ? · limits → ? · risks → ?",.4],
["Prompting","Good prompting is not typing random instructions. It is structured: a role, the context, one clear objective, constraints, the input data, the expected output shape and how the answer will be checked.","ROLE · CONTEXT · OBJECTIVE · CONSTRAINTS · INPUT · OUTPUT · VALIDATION",1],
["Logic","The model’s answer is only a draft. I reason through the logic myself: the steps, the edge cases, where AI should help and where plain code is better.","if input is empty → ask again\nelse → run the steps → check the result",2],
["Development","Then it gets built in small, working pieces, so every piece can be run and understood before the next one is added.","build → run → read → refine",2.6],
["Testing","Anything that looks right is tested: normal cases, odd cases and failures. AI output is never trusted blindly; it is validated against clear criteria.","expected ✓ edge case ✓ failure case ✓ validated ✓",3],
["Real-world solution","The result is something that works outside my own screen: clear to use, maintainable, and ready to grow without breaking.","idea → understanding → prompt → logic → build → test → solution",4]];
export default function CreationJourney(){const[i,setI]=useState(0);
const pick=(n:number)=>{setI(n);dispatchEvent(new CustomEvent("scene-stage",{detail:ST[n][3]}))};
return(<div><div className="flex flex-wrap items-center gap-y-3" role="tablist" aria-label="From idea to solution">{ST.map((s,n)=>(<div key={s[0]} className="flex items-center"><button role="tab" aria-selected={n===i} onClick={()=>pick(n)} onFocus={()=>pick(n)} className={`border px-3 py-2 text-xs uppercase tracking-widest transition ${n===i?"border-white bg-white text-black":n<i?"border-[var(--line)] text-white":"border-[var(--line)] text-[var(--mute)] hover:text-white"}`}>{n+1} {s[0]}</button>{n<ST.length-1&&<span aria-hidden className={`mx-1 h-px w-4 transition ${n<i?"bg-white":"bg-[var(--line)]"}`}/>}</div>))}</div>
<div className="row mt-8 pt-6"><h3 className="text-2xl font-semibold">{ST[i][0]}</h3><p className="mt-3 max-w-xl text-lg text-[var(--mute)]">{ST[i][1]}</p><pre className="mt-5 max-w-xl overflow-x-auto whitespace-pre-wrap border border-[var(--line)] p-4 text-sm text-[#7fd8ff]">{ST[i][2]}</pre></div></div>)}
