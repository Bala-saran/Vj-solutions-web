import Link from "next/link";import {contact} from "@/data/site";
export default function Footer(){return(<footer className="row mt-24 py-12 text-sm text-[var(--mute)]"><div className="mx-auto flex max-w-6xl flex-wrap justify-between gap-8 px-5">
<div><p className="font-bold tracking-[.18em] text-white">VJ SOLUTIONS</p><p className="mt-2">AI. Engineering. Innovation.</p></div>
<div className="flex gap-10"><div className="grid gap-2"><Link href="/process">Process</Link><Link href="/insights">Insights</Link><Link href="/contact">Contact</Link></div>
<div className="grid gap-2"><a href={contact.github} target="_blank" rel="noopener">GitHub</a><a href={contact.linkedin} target="_blank" rel="noopener">LinkedIn</a><a href={`https://wa.me/${contact.whatsapp}`} target="_blank" rel="noopener">WhatsApp</a></div></div></div></footer>)}
