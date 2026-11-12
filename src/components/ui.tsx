import Link from "next/link";import Crumbs from "./Crumbs";import type {ReactNode} from "react";
export const Wrap=({children,className="",...r}:{children:ReactNode;className?:string;[k:string]:unknown})=><div {...r} className={`mx-auto max-w-6xl px-5 ${className}`}>{children}</div>;
export const Head=({eyebrow,title,lead}:{eyebrow:string;title:string;lead?:string})=>(<Wrap className="pt-36 pb-12"><Crumbs/><p className="eyebrow mb-5">{eyebrow}</p><h1 className="h1 max-w-4xl uppercase">{title}</h1>{lead&&<p className="mt-6 max-w-2xl text-lg text-[var(--mute)]">{lead}</p>}</Wrap>);
export const Cta=()=>(<Wrap className="row mt-24 pt-16"><h2 className="h2 max-w-2xl uppercase">Got an idea worth building?</h2><Link href="/contact" className="btn p mt-8">LET’S TALK</Link></Wrap>);
