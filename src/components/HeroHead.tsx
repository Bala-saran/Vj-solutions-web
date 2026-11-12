"use client";
import {useEffect,useRef,useState} from "react";
type V=[number,number,number];
export default function HeroHead(){
const cv=useRef<HTMLCanvasElement>(null),lay=useRef<HTMLDivElement>(null),[ok,setOk]=useState(true);
useEffect(()=>{let stop=()=>{};let dead=false;
(async()=>{const T=await import("three");if(dead||!cv.current||!lay.current)return;const c=cv.current,L=lay.current;
let r:InstanceType<typeof T.WebGLRenderer>;try{r=new T.WebGLRenderer({canvas:c,alpha:true,antialias:false,powerPreference:"high-performance"})}catch{setOk(false);return}
const mob=innerWidth<860,rm=matchMedia("(prefers-reduced-motion:reduce)").matches;r.setPixelRatio(Math.min(devicePixelRatio,mob?1.5:2));
let sd=11;const R=()=>{sd=(sd*1664525+1013904223)>>>0;return sd/4294967296};
const ss=(a:number,b:number,x:number)=>{const t=Math.min(1,Math.max(0,(x-a)/(b-a)));return t*t*(3-2*t)};
const hw=(y:number)=>.5*(1-.42*ss(-.25,-1.05,y))*(y>.75?Math.sqrt(Math.max(0,1-((y-.75)/.3)**2)):1)+.001;
const dp=(y:number)=>y>.75?.85*Math.sqrt(Math.max(0,1-((y-.75)/.3)**2)):.85-.2*ss(-.3,-1.05,y);
const g2=(x:number,sx:number,y:number,y0:number,sy:number)=>Math.exp(-((x/sx)**2)-((y-y0)/sy)**2);
const front=(x:number,y:number)=>{const ax=Math.abs(x);return dp(y)*Math.sqrt(Math.max(0,1-(x/hw(y))**2))+.26*g2(x,.07,y,-.02,.2)+.06*g2(x,.06,y,.2,.25)+.09*g2(ax-.24,.2,y,.3,.06)-.09*g2(ax-.25,.1,y,.2,.08)+.05*g2(ax-.42,.12,y,0,.12)+.1*g2(x,.14,y,-.8,.09)+.03*g2(x,.12,y,-.38,.04)};
/* nodes: sampled around the head cross-sections so the rim, jaw and skull are as dense as the face */
const N=mob?1500:3300,P:V[]=[];
while(P.length<N){let y=R()<.4?-.9+R()*1.35:-1.1+R()*2.2;const a=R()*6.2832,s=Math.sin(a),co=Math.cos(a);if(y<-1.02)y=-1.02-R()*.55;
if(y<-1.02){P.push([.25*s,y,-.12+.25*co]);continue}
const w=hw(y),x=w*s;let z=co>=0?front(x,y):-(dp(y)+.1)*Math.abs(co);let px=x,py=y;if(R()<.2){px*=.8;z*=.8;py*=.98}P.push([px,py,z])}
/* edges: each node linked to its nearest neighbours */
const E:[number,number][]=[],seen=new Set<number>(),RAD=mob?.17:.12;
for(let i=0;i<N;i++){const d:[number,number][]=[];for(let j=0;j<N;j++){if(j===i)continue;const dx=P[i][0]-P[j][0],dy=P[i][1]-P[j][1],dz=P[i][2]-P[j][2],q=dx*dx+dy*dy+dz*dz;if(q<RAD*RAD)d.push([j,q])}
d.sort((a,b)=>a[1]-b[1]);for(const[j]of d.slice(0,3)){const k=i<j?i*N+j:j*N+i;if(!seen.has(k)){seen.add(k);E.push([i,j])}}}
const U={uT:{value:0},uA:{value:0},uL:{value:.55}};
const pos=new Float32Array(N*3),from=new Float32Array(N*3),ar=new Float32Array(N),asz=new Float32Array(N),acy=new Float32Array(N);
P.forEach((p,i)=>{pos.set(p,i*3);const u=R()*2-1,a=R()*6.2832,s=Math.sqrt(1-u*u),q=2.5+R()*3;from.set([q*s*Math.cos(a),q*u,q*s*Math.sin(a)],i*3);ar[i]=R();asz[i]=.5+R()*R()*2.2;acy[i]=R()<.14?1:0});
const ng=new T.BufferGeometry();ng.setAttribute("position",new T.BufferAttribute(pos,3));ng.setAttribute("aFrom",new T.BufferAttribute(from,3));ng.setAttribute("aR",new T.BufferAttribute(ar,1));ng.setAttribute("aS",new T.BufferAttribute(asz,1));ng.setAttribute("aC",new T.BufferAttribute(acy,1));
const nm=new T.ShaderMaterial({transparent:true,depthWrite:false,blending:T.AdditiveBlending,uniforms:{uT:U.uT,uA:U.uA,uPR:{value:r.getPixelRatio()},uSz:{value:mob?.034:.026}},
vertexShader:"attribute vec3 aFrom;attribute float aR,aS,aC;uniform float uT,uA,uPR,uSz;varying float vA;varying float vC;void main(){float k=clamp(uA*1.5-aR*.5,0.,1.);k=k*k*(3.-2.*k);vec3 p=mix(aFrom,position,k);p+=vec3(sin(uT*.7+aR*40.),cos(uT*.6+aR*31.),sin(uT*.5+aR*17.))*.008;float tw=.7+.3*sin(uT*1.6+aR*60.);float pl=pow(max(0.,sin(uT*1.2-position.y*3.+aR*2.)),12.);vA=(.35+.65*k)*tw*(.6+.8*pl);vC=aC*(.4+.6*pl);vec4 mv=modelViewMatrix*vec4(p,1.);gl_Position=projectionMatrix*mv;gl_PointSize=uSz*uPR*(280./-mv.z)*aS*(.5+.6*k)*(1.+pl*.6);}",
fragmentShader:"varying float vA;varying float vC;void main(){float d=length(gl_PointCoord-.5);if(d>.5)discard;vec3 col=mix(vec3(.9,.94,1.),vec3(.35,.88,1.),vC);gl_FragColor=vec4(col,smoothstep(.5,.0,d)*vA);}"});
const lp=new Float32Array(E.length*6),lph=new Float32Array(E.length*2),le=new Float32Array(E.length*2);
E.forEach(([a,b],i)=>{lp.set(P[a],i*6);lp.set(P[b],i*6+3);const ph=R();lph[i*2]=lph[i*2+1]=ph;le[i*2]=0;le[i*2+1]=1});
const lg=new T.BufferGeometry();lg.setAttribute("position",new T.BufferAttribute(lp,3));lg.setAttribute("aPh",new T.BufferAttribute(lph,1));lg.setAttribute("aE",new T.BufferAttribute(le,1));
const lm=new T.ShaderMaterial({transparent:true,depthWrite:false,blending:T.AdditiveBlending,uniforms:{uT:U.uT,uL:U.uL},
vertexShader:"attribute float aPh,aE;uniform float uT,uL;varying float vP;void main(){float w=sin(aPh*6.28-uT*1.5+position.y*3.2+aE*.8);vP=pow(max(0.,w),14.);gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);}",
fragmentShader:"uniform float uL;varying float vP;void main(){vec3 col=mix(vec3(.62,.68,.74),vec3(.3,.9,1.),vP);gl_FragColor=vec4(col,(.13+.85*vP)*uL);}"});
const root=new T.Scene(),cam=new T.PerspectiveCamera(40,1,.1,50);cam.position.z=6.4;
const hg=new T.Group(),hs=new T.Group();root.add(hg);hg.add(hs);const pts=new T.Points(ng,nm),lines=new T.LineSegments(lg,lm);pts.frustumCulled=lines.frustumCulled=false;hs.add(lines,pts);
let W=1,H=1;const layout=()=>{W=L.clientWidth||innerWidth;H=L.clientHeight||innerHeight;r.setSize(W,H,false);const asp=W/H;cam.aspect=asp;cam.updateProjectionMatrix();const d=asp>1.05;hg.position.set(d?2.62*asp*.34:0,d?-.05:.85,0);hg.scale.setScalar(d?1.5:Math.min(.95,asp*1.6))};layout();
let mx=0,my=0;const mv=(e:PointerEvent)=>{mx=e.clientX/innerWidth-.5;my=e.clientY/innerHeight-.5};addEventListener("pointermove",mv,{passive:true});addEventListener("resize",layout);
let vis=true;const io=new IntersectionObserver(es=>{vis=es[0].isIntersecting});io.observe(L);
let t=rm?99:0,last=performance.now(),raf=0;
const loop=(n:number)=>{raf=requestAnimationFrame(loop);const dt=Math.min(.05,(n-last)/1e3);last=n;if(!vis)return;if(!rm)t+=dt;
U.uA.value=ss(.2,3.6,t);U.uL.value=.55+.45*ss(.5,3,t);U.uT.value=rm?0:t;
const br=1+(rm?0:Math.sin(t*.9)*.012);hs.scale.setScalar(br);hs.rotation.y=1.0+(rm?0:Math.sin(t*.28)*.32)+mx*.3;hs.rotation.x=my*.12;
cam.position.set(mx*.4,-my*.2,6.4+(1-ss(0,4,t))*1.0);cam.lookAt(0,0,0);r.render(root,cam)};raf=requestAnimationFrame(loop);
stop=()=>{cancelAnimationFrame(raf);removeEventListener("pointermove",mv);removeEventListener("resize",layout);io.disconnect();ng.dispose();lg.dispose();nm.dispose();lm.dispose();r.dispose()}})();
return()=>{dead=true;stop()}},[]);
return(<div ref={lay} className="absolute inset-0 overflow-hidden" aria-hidden>
<div className="absolute inset-0" style={{background:"radial-gradient(55% 55% at 68% 45%,rgba(90,200,255,.08),transparent 70%),radial-gradient(100% 80% at 50% 50%,transparent 40%,#000 100%)"}}/>
{ok?<canvas ref={cv} className="absolute inset-0 h-full w-full"/>:<div className="absolute right-[12%] top-[18%] h-72 w-72 rounded-full border border-[var(--line)]"/>}
<div className="grain pointer-events-none absolute inset-0"/></div>)}
