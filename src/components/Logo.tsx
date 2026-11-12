import {LOGOS} from "@/data/logos";
export default function Logo({name}:{name:string}){const d=LOGOS[name];
return d?<svg viewBox="0 0 24 24" aria-hidden className="h-8 w-8 fill-current"><path d={d}/></svg>:<span aria-hidden className="grid h-8 w-8 place-items-center border border-current text-[10px] font-bold">{name.slice(0,3)}</span>}
