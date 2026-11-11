"use client";
import {useEffect,useRef} from "react";
export default function Background3D(){const ref=useRef<HTMLCanvasElement>(null);
useEffect(()=>{let stop=()=>{};let dead=false;
(async()=>{const T=await import("three");if(dead||!ref.current)return;const cv=ref.current;let r:InstanceType<typeof T.WebGLRenderer>;
try{r=new T.WebGLRenderer({canvas:cv,alpha:true})}catch{return}
const mob=innerWidth<860,rm=matchMedia("(prefers-reduced-motion:reduce)").matches;r.setPixelRatio(Math.min(devicePixelRatio,mob?1.25:1.75));
const s=new T.Scene(),c=new T.PerspectiveCamera(45,1,.1,60);c.position.z=7;const g=new T.Group();s.add(g);
const N=mob?450:1100,p=new Float32Array(N*3);for(let i=0;i<N;i++){p[i*3]=(Math.random()-.5)*18;p[i*3+1]=(Math.random()-.5)*10;p[i*3+2]=-1-Math.random()*9}
const pg=new T.BufferGeometry();pg.setAttribute("position",new T.BufferAttribute(p,3));const pm=new T.PointsMaterial({size:.03,color:0x999999,transparent:true,opacity:.35,depthWrite:false});g.add(new T.Points(pg,pm));
const M=mob?24:48,np:number[][]=[];for(let i=0;i<M;i++)np.push([(Math.random()-.5)*14,(Math.random()-.5)*7,-2-Math.random()*5]);
const lp:number[]=[];for(let i=0;i<M;i++)for(let j=i+1;j<M;j++)if(Math.hypot(np[i][0]-np[j][0],np[i][1]-np[j][1],np[i][2]-np[j][2])<3)lp.push(...np[i],...np[j]);
const lg=new T.BufferGeometry();lg.setAttribute("position",new T.Float32BufferAttribute(lp,3));const lm=new T.LineBasicMaterial({color:0xffffff,transparent:true,opacity:.07,depthWrite:false});g.add(new T.LineSegments(lg,lm));
const wg=new T.WireframeGeometry(new T.IcosahedronGeometry(2.6,2)),wm=new T.LineBasicMaterial({color:0xffffff,transparent:true,opacity:.07,depthWrite:false}),w=new T.LineSegments(wg,wm);w.position.set(mob?0:-4.5,.5,-5);g.add(w);
let mx=0;const mv=(e:PointerEvent)=>{mx=e.clientX/innerWidth-.5};addEventListener("pointermove",mv,{passive:true});
const rs=()=>{r.setSize(innerWidth,innerHeight,false);c.aspect=innerWidth/innerHeight;c.updateProjectionMatrix()};rs();addEventListener("resize",rs);
let t=0,last=performance.now(),raf=0;const loop=(n:number)=>{raf=requestAnimationFrame(loop);const dt=Math.min(.05,(n-last)/1e3);last=n;if(!rm)t+=dt;
w.rotation.y=-t*.05;w.rotation.x=t*.03;g.rotation.y=-t*.01+mx*.04;g.position.z=Math.min(3,scrollY*.0004);r.render(s,c)};raf=requestAnimationFrame(loop);
stop=()=>{cancelAnimationFrame(raf);removeEventListener("pointermove",mv);removeEventListener("resize",rs);[pg,lg,wg].forEach(x=>x.dispose());[pm,lm,wm].forEach(x=>x.dispose());r.dispose()}})();
return()=>{dead=true;stop()}},[]);
return<canvas ref={ref} aria-hidden className="pointer-events-none fixed inset-0 z-0 h-full w-full"/>}
