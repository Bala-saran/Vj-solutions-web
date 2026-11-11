import type {Metadata} from "next";import {notFound} from "next/navigation";import {Head,Wrap,Cta} from "@/components/ui";import {services,sceneFor} from "@/data/site";
type P={params:Promise<{slug:string}>};
export const generateStaticParams=()=>services.map(s=>({slug:s.slug}));
export async function generateMetadata({params}:P):Promise<Metadata>{const {slug}=await params;const s=services.find(x=>x.slug===slug);return s?{title:s.title,description:s.summary}:{}}
export default async function Page({params}:P){const {slug}=await params;const s=services.find(x=>x.slug===slug);if(!s)notFound();
const R=(t:string,c:React.ReactNode)=>(<div className="row grid gap-3 py-7 md:grid-cols-[1fr_2fr]"><h2 className="text-sm tracking-widest text-[var(--mute)]">{t}</h2><div>{c}</div></div>);
return(<><Head eyebrow="Service" title={s.title} lead={s.summary}/><Wrap data-scene={sceneFor[s.slug]}>{R("PROBLEMS IT SOLVES",<ul className="grid gap-2">{s.problems.map(x=><li key={x}>{x}</li>)}</ul>)}{R("OUR APPROACH",<p>{s.approach}</p>)}{R("TECHNOLOGIES",<p>{s.tech.join(" · ")}</p>)}{R("USE CASES",<ul className="grid gap-2">{s.uses.map(x=><li key={x}>{x}</li>)}</ul>)}</Wrap><Cta/></>)}
