import type {Metadata} from "next";import {Head,Wrap,Cta} from "@/components/ui";import {insightCats} from "@/data/site";
export const metadata:Metadata={title:"Insights",description:"Thoughts behind the technology: AI, software engineering and prompt engineering."};
export default function P(){return(<><Head eyebrow="Insights" title="Thoughts behind the technology." lead="No articles have been published yet. We only publish real written content."/><Wrap><p className="eyebrow mb-4">Planned topics</p>{insightCats.map(c=><div key={c} className="row py-4 text-lg">{c}</div>)}</Wrap><Cta/></>)}
