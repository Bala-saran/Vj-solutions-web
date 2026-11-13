"use client";
import {useEffect,useRef,useState} from "react";
import type {Built,Kit,Mesh,Object3D} from "./kit";
export default function SceneStage({keys}:{keys:string[]}){
const ref=useRef<HTMLCanvasElement>(null);const[ok,setOk]=useState(true);
useEffect(()=>{let stop=()=>{};let dead=false;
(async()=>{const T=await import("three");const{SCENES}=await import("./scenes");const{mk}=await import("./kit");
if(dead||!ref.current)return;const cv=ref.current;let r:InstanceType<typeof T.WebGLRenderer>;
try{r=new T.WebGLRenderer({canvas:cv,alpha:true,antialias:true})}catch{setOk(false);return}
const mob=innerWidth<1024,rm=matchMedia("(prefers-reduced-motion:reduce)").matches;r.setPixelRatio(Math.min(devicePixelRatio,mob?1.25:2));
const sc=new T.Scene(),cam=new T.PerspectiveCamera(40,1,.1,50);cam.position.z=6.4;
const pg=new T.PMREMGenerator(r),es=new T.Scene();
const pb=(w:number,h:number,d:number,x:number,y:number,z:number,i:number)=>{const m=new T.Mesh(new T.BoxGeometry(w,h,d),new T.MeshBasicMaterial({color:new T.Color(i,i,i)}));m.position.set(x,y,z);es.add(m)};
es.add(new T.Mesh(new T.BoxGeometry(30,30,30),new T.MeshBasicMaterial({color:0x111111,side:T.BackSide})));pb(10,1,6,0,8,0,6);pb(1,8,8,-9,0,0,2.5);pb(1,8,8,9,0,0,2.5);pb(8,6,1,0,0,-9,3);
const rt=pg.fromScene(es,.04);sc.environment=rt.texture;
const kd=new T.DirectionalLight(0xffffff,1.3);kd.position.set(3,4,5);sc.add(kd,new T.AmbientLight(0xffffff,.4));
const E:Record<string,{b:Built;k:Kit;lv:number}>={};
const failed=new Set<string>();const build=(n:string)=>{if(E[n]||!SCENES[n]||failed.has(n))return;let k:Kit,b:Built;try{k=mk(T);b=SCENES[n](T,k,mob)}catch(err){failed.add(n);console.error("scene build failed:",n,err);return}b.g.visible=false;sc.add(b.g);E[n]={b,k,lv:0}};
let mx=0,my=0;const mv=(e:PointerEvent)=>{mx=e.clientX/innerWidth-.5;my=e.clientY/innerHeight-.5};addEventListener("pointermove",mv,{passive:true});
const rs=()=>{const w=cv.clientWidth,h=cv.clientHeight;r.setSize(w,h,false);cam.aspect=w/h;cam.updateProjectionMatrix()};rs();addEventListener("resize",rs);
const vis=new Set<HTMLElement>();const io=new IntersectionObserver(es=>{for(const e of es){if(e.isIntersecting)vis.add(e.target as HTMLElement);else vis.delete(e.target as HTMLElement)}},{rootMargin:"-30% 0px -30% 0px",threshold:[0,.01,.25,.5]});
const watch=()=>document.querySelectorAll<HTMLElement>("[data-i]").forEach(e=>io.observe(e));watch();const mo=new MutationObserver(watch);mo.observe(document.body,{childList:true,subtree:true});
const pick=()=>{let bi=-1,bd=1e9;vis.forEach(e=>{if(!e.isConnected){vis.delete(e);return}const q=e.getBoundingClientRect(),d=Math.abs((q.top+q.bottom)/2-innerHeight/2);if(d<bd){bd=d;bi=+(e.dataset.i||0)}});return bi};
let ov:number|null=null;const sg=(e:Event)=>{ov=(e as CustomEvent<number>).detail};addEventListener("scene-stage",sg);let bi=-1,st=0,t=0,last=performance.now(),raf=0;
const loop=(n:number)=>{raf=requestAnimationFrame(loop);const dt=Math.max(0,Math.min(.05,(n-last)/1e3));last=n;if(!rm)t+=dt;
bi=pick();const key=bi<0?"":keys.length===1?keys[0]:keys[bi]||"";if(key)build(key);
const tg=key==="ai"&&ov!==null&&bi===3?ov:Math.max(0,bi);st=rm?tg:st+(tg-st)*Math.min(1,dt*3);let any=false;
for(const[name,e]of Object.entries(E)){const on=name===key;e.lv+=((on?1:0)-e.lv)*Math.min(1,dt*3.5);if(e.lv<.004&&!on){e.b.g.visible=false;continue}any=true;
const v=1-Math.pow(1-e.lv,3),g=e.b.g;g.visible=true;g.scale.setScalar(.1+.9*v);g.position.z=-(1-v)*9;g.position.x=(1-v)*2.5*((name.length%3)-1);
g.rotation.y=e.b.still?Math.sin(t*.25)*.35+mx*.4:-t*.25+mx*.4;g.rotation.x=my*.25;g.rotation.z=-.05;e.k.set(Math.min(1,e.lv*1.6));try{e.b.upd?.(t,dt,st,Math.min(1,e.lv*1.6))}catch(err){if(!failed.has(name)){failed.add(name);console.error("scene update failed:",name,err)}}}
cv.dataset.scene=key;cv.dataset.level=String(key&&E[key]?+E[key].lv.toFixed(2):0);if(any)r.render(sc,cam)};raf=requestAnimationFrame(loop);
stop=()=>{removeEventListener("scene-stage",sg);cancelAnimationFrame(raf);io.disconnect();mo.disconnect();removeEventListener("pointermove",mv);removeEventListener("resize",rs);
for(const e of Object.values(E)){e.b.g.traverse((o:Object3D)=>{(o as Mesh).geometry?.dispose()});e.k.dispose()}rt.dispose();pg.dispose();r.dispose()}})();
return()=>{dead=true;stop()}},[]);
return ok?<canvas ref={ref} aria-hidden className="pointer-events-none fixed right-0 top-0 z-[5] h-svh w-full opacity-35 lg:w-1/2 lg:opacity-100"/>:<div aria-hidden className="fixed right-[8%] top-[28%] z-[5] hidden h-64 w-64 rounded-full border border-[var(--line)] lg:block"/>}
