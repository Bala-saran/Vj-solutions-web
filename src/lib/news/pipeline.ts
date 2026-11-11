import {XMLParser} from "fast-xml-parser";import {createHash} from "crypto";import {SOURCES,type Source} from "./sources";
export type Article={id:string;title:string;summary:string;url:string;source:string;category:string;published:string};
export type Store={updated:string|null;articles:Article[];sources:Record<string,{ok:boolean;count:number;error?:string;at:string}>};
const P=new XMLParser({ignoreAttributes:false,attributeNamePrefix:"@_"});
const ENT:Record<string,string>={"&lt;":"<","&gt;":">","&quot;":'"',"&#39;":"'","&amp;":"&","&nbsp;":" "};
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const tx=(v:any):string=>v==null?"":typeof v==="object"?tx(v["#text"]??v["@_href"]??""):String(v);
export const strip=(s:string)=>s.replace(/<[^>]*>/g," ").replace(/&(lt|gt|quot|#39|amp|nbsp);/g,m=>ENT[m]).replace(/\s+/g," ").trim();
export const safeUrl=(u:string)=>{try{const x=new URL(u.trim());return x.protocol==="https:"?x.href:null}catch{return null}};
export const norm=(s:string)=>s.toLowerCase().replace(/[^a-z0-9]+/g," ").trim();
const RULES:[string,RegExp][]=[["Cybersecurity",/\b(vulnerab|cve-|ransomware|malware|exploit|phishing|zero-day|breach|cyber)/i],["Robotics and Automation",/\b(robot|humanoid|drone|autonomous vehicle|automation)/i],["AI Research",/\b(arxiv|we propose|benchmark|paper|preprint)/i],["Machine Learning",/\b(machine learning|neural network|fine-tun|training data|pytorch|tensorflow)/i],["Data Science",/\b(data science|data pipeline|analytics|dataset|data warehouse)/i],["Mobile Technology",/\b(android|ios|iphone|mobile app|kotlin|swift)/i],["Cloud Computing",/\b(kubernetes|serverless|cloud|aws|azure|docker|container)/i],["Developer Tools",/\b(github|copilot|ide|compiler|sdk|developer tool|open source)/i]];
export const classify=(text:string,def:string)=>{for(const[c,r]of RULES)if(r.test(text))return c;return def};
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const arr=(v:any):any[]=>v==null?[]:Array.isArray(v)?v:[v];
export function parseFeed(xml:string,src:Pick<Source,"name"|"category">,now=Date.now()):Article[]{
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const j:any=P.parse(xml);const items=arr(j?.rss?.channel?.item??j?.feed?.entry??j?.["rdf:RDF"]?.item);const out:Article[]=[];
for(const it of items){const title=strip(tx(it.title));
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const lk=it.link&&typeof it.link==="object"&&Array.isArray(it.link)?(it.link.find((l:any)=>l["@_rel"]==="alternate")??it.link[0]):it.link;
const url=safeUrl(tx(lk)||tx(it.guid));const d=new Date(tx(it.pubDate??it.published??it.updated??it["dc:date"]));
if(!title||!url||isNaN(+d)||+d>now+864e5)continue;
const sm=strip(tx(it.description??it.summary??it["content:encoded"]??it.content)).slice(0,300);
out.push({id:createHash("sha1").update(url).digest("hex").slice(0,12),title:title.slice(0,200),summary:sm,url,source:src.name,category:classify(title+" "+sm,src.category),published:d.toISOString()})}
return out}
export function merge(prev:Article[],fresh:Article[],maxAgeDays=90,maxItems=400,now=Date.now()){const seenId=new Set<string>(),seenT=new Set<string>(),out:Article[]=[];
for(const a of [...fresh,...prev]){const t=norm(a.title);if(seenId.has(a.id)||seenT.has(t))continue;if(now-+new Date(a.published)>maxAgeDays*864e5)continue;seenId.add(a.id);seenT.add(t);out.push(a)}
return out.sort((a,b)=>+new Date(b.published)-+new Date(a.published)).slice(0,maxItems)}
export async function refresh(prev:Store,fetcher:typeof fetch=fetch,opts:{maxAgeDays?:number;maxItems?:number;sources?:Source[]}={}):Promise<Store>{
const srcs=opts.sources??SOURCES,sources={...prev.sources},fresh:Article[]=[];let okAny=false;
await Promise.all(srcs.map(async s=>{const at=new Date().toISOString();try{const ac=new AbortController(),to=setTimeout(()=>ac.abort(),10000);
const r=await fetcher(s.url,{signal:ac.signal,headers:{"User-Agent":"VJSolutionsNewsBot/1.0 (+https://vjsolutions.example)",Accept:"application/rss+xml, application/atom+xml, application/xml, text/xml"}});clearTimeout(to);
if(!r.ok)throw new Error("HTTP "+r.status);const items=parseFeed(await r.text(),s);fresh.push(...items);okAny=true;sources[s.id]={ok:true,count:items.length,at}}
catch(e){sources[s.id]={...(prev.sources[s.id]??{count:0}),ok:false,error:String((e as Error).message||e),at}}}));
return{updated:okAny?new Date().toISOString():prev.updated,articles:merge(prev.articles,fresh,opts.maxAgeDays,opts.maxItems),sources}}
