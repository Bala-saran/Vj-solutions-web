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
const hw=(y:number)=>.5*(1-.42*ss(-.25,-1.05,y))*(y>.6?Math.sqrt(Math.max(0,1-((y-.6)/.46)**2)):1)+.001;
const dp=(y:number)=>y>.6?.85*Math.sqrt(Math.max(0,1-((y-.6)/.46)**2)):.85-.2*ss(-.3,-1.05,y);
const g2=(x:number,sx:number,y:number,y0:number,sy:number)=>Math.exp(-((x/sx)**2)-((y-y0)/sy)**2);
const front=(x:number,y:number)=>{const ax=Math.abs(x);return dp(y)*Math.sqrt(Math.max(0,1-(x/hw(y))**2))+.26*g2(x,.07,y,-.02,.2)+.06*g2(x,.06,y,.2,.25)+.09*g2(ax-.24,.2,y,.3,.06)-.09*g2(ax-.25,.1,y,.2,.08)+.05*g2(ax-.42,.12,y,0,.12)+.1*g2(x,.14,y,-.8,.09)+.03*g2(x,.12,y,-.38,.04)};
/* structured lattice: cross-section rings joined along and between rings, so the contour and profile read clearly */
const RN=mob?44:66,M=mob?32:48,P:V[]=[],E:[number,number][]=[],big:number[]=[];
for(let i=0;i<RN;i++){const y=-1.04+(i/(RN-1))*2.1,w=hw(y);for(let j=0;j<M;j++){const a=(j+(i%2)*.5)/M*6.2832,sn=Math.sin(a),co=Math.cos(a),x=w*sn,z=co>=0?front(x,y):-(dp(y)+.1)*Math.abs(co);P.push([x+(R()-.5)*.012,y,z+(R()-.5)*.012]);big.push(R()<.1?1:0)}}
for(let i=0;i<RN;i++)for(let j=0;j<M;j++){const a=i*M+j;E.push([a,i*M+(j+1)%M]);if(i<RN-1){E.push([a,(i+1)*M+j]);if(R()<.4)E.push([a,(i+1)*M+(j+1)%M])}}
const NR=6,NM=mob?14:22,nb=P.length;for(let i=0;i<NR;i++)for(let j=0;j<NM;j++){const a=j/NM*6.2832;P.push([.22*Math.sin(a),-.96-i*.11,-.1+.22*Math.cos(a)]);big.push(0);const k=nb+i*NM+j;E.push([k,nb+i*NM+(j+1)%NM]);if(i<NR-1)E.push([k,k+NM])}
const eyeStart=P.length;for(const sg of[-1,1])for(let q=0;q<(mob?24:44);q++){const ex=sg*.25+(R()+R()-1)*.04,ey=.2+(R()+R()-1)*.03;P.push([ex,ey,front(ex,ey)+.02]);big.push(2)}
const N=P.length;
const U={uT:{value:0},uA:{value:.85},uL:{value:1}};
const pos=new Float32Array(N*3),from=new Float32Array(N*3),ar=new Float32Array(N),asz=new Float32Array(N),acy=new Float32Array(N);
P.forEach((p,i)=>{pos.set(p,i*3);const u=R()*2-1,a=R()*6.2832,s=Math.sqrt(1-u*u),q=.5+R()*1.4;from.set([p[0]+q*s*Math.cos(a)*.6,p[1]+q*u*.6,p[2]+q*s*Math.sin(a)*.6],i*3);ar[i]=R();asz[i]=big[i]===2?2.6:big[i]===1?1.9:.9+R()*.5;acy[i]=(big[i]===2||R()<.16)?1:0});
const ng=new T.BufferGeometry();ng.setAttribute("position",new T.BufferAttribute(pos,3));ng.setAttribute("aFrom",new T.BufferAttribute(from,3));ng.setAttribute("aR",new T.BufferAttribute(ar,1));ng.setAttribute("aS",new T.BufferAttribute(asz,1));ng.setAttribute("aC",new T.BufferAttribute(acy,1));
const nm=new T.ShaderMaterial({transparent:true,depthWrite:false,blending:T.AdditiveBlending,uniforms:{uT:U.uT,uA:U.uA,uPR:{value:r.getPixelRatio()},uSz:{value:mob?.05:.04}},
vertexShader:"attribute vec3 aFrom;attribute float aR,aS,aC;uniform float uT,uA,uPR,uSz;varying float vA;varying float vC;void main(){float k=clamp(uA*1.5-aR*.5,0.,1.);k=k*k*(3.-2.*k);vec3 p=mix(aFrom,position,k);float tw=.85+.15*sin(uT*1.4+aR*60.);float pl=pow(max(0.,sin(uT*1.5-position.y*2.6+aR*1.5)),10.);vec4 mv=modelViewMatrix*vec4(p,1.);float dz=clamp(1.5-(-mv.z-5.2)*.55,.3,1.3);vA=(.55+.45*k)*tw*(.8+.9*pl)*dz;vC=aC*(.45+.55*pl);gl_Position=projectionMatrix*mv;gl_PointSize=uSz*uPR*(280./-mv.z)*aS*(.6+.4*k)*(1.+pl*.7);}",
fragmentShader:"varying float vA;varying float vC;void main(){float d=length(gl_PointCoord-.5);if(d>.5)discard;vec3 col=mix(vec3(.95,.97,1.),vec3(.3,.9,1.),vC);gl_FragColor=vec4(col,smoothstep(.5,.05,d)*vA);}"});
const lp=new Float32Array(E.length*6),lph=new Float32Array(E.length*2),le=new Float32Array(E.length*2);
E.forEach(([a,b],i)=>{lp.set(P[a],i*6);lp.set(P[b],i*6+3);const ph=R();lph[i*2]=lph[i*2+1]=ph;le[i*2]=0;le[i*2+1]=1});
const lg=new T.BufferGeometry();lg.setAttribute("position",new T.BufferAttribute(lp,3));lg.setAttribute("aPh",new T.BufferAttribute(lph,1));lg.setAttribute("aE",new T.BufferAttribute(le,1));
const lm=new T.ShaderMaterial({transparent:true,depthWrite:false,blending:T.AdditiveBlending,uniforms:{uT:U.uT,uL:U.uL},
vertexShader:"attribute float aPh,aE;uniform float uT,uL;varying float vP;varying float vD;void main(){float w=sin(aPh*6.28-uT*1.8+position.y*2.6+aE*.8);vP=pow(max(0.,w),10.);vec4 mv=modelViewMatrix*vec4(position,1.);vD=clamp(1.5-(-mv.z-5.2)*.55,.3,1.3);gl_Position=projectionMatrix*mv;}",
fragmentShader:"uniform float uL;varying float vP;varying float vD;void main(){vec3 col=mix(vec3(.66,.74,.84),vec3(.35,.92,1.),vP);gl_FragColor=vec4(col,(.24+.9*vP)*uL*vD);}"});
const root=new T.Scene(),cam=new T.PerspectiveCamera(40,1,.1,50);cam.position.z=6.4;
const hg=new T.Group(),hs=new T.Group();root.add(hg);hg.add(hs);const pts=new T.Points(ng,nm),lines=new T.LineSegments(lg,lm);pts.frustumCulled=lines.frustumCulled=false;hs.add(lines,pts);
let W=1,H=1;const layout=()=>{W=L.clientWidth||innerWidth;H=L.clientHeight||innerHeight;r.setSize(W,H,false);const asp=W/H;cam.aspect=asp;cam.updateProjectionMatrix();const d=asp>1.05;hg.position.set(d?2.62*asp*.46:0,d?0:.95,0);hg.scale.setScalar(d?1.3:Math.min(.85,asp*1.6))};layout();
let mx=0,my=0;const mv=(e:PointerEvent)=>{mx=e.clientX/innerWidth-.5;my=e.clientY/innerHeight-.5};addEventListener("pointermove",mv,{passive:true});addEventListener("resize",layout);
let vis=true;const io=new IntersectionObserver(es=>{vis=es[0].isIntersecting});io.observe(L);
let t=rm?99:0,last=performance.now(),raf=0;
const loop=(n:number)=>{raf=requestAnimationFrame(loop);const dt=Math.min(.05,(n-last)/1e3);last=n;if(!vis)return;if(!rm)t+=dt;
U.uA.value=.85+.15*ss(0,1.6,t);U.uL.value=1;U.uT.value=rm?0:t;
const br=1+(rm?0:Math.sin(t*.9)*.012);hs.scale.setScalar(br);hs.rotation.y=.95+(rm?0:Math.sin(t*.28)*.32)+mx*.3;hs.rotation.x=my*.12;
cam.position.set(mx*.4,-my*.2,6.4+(1-ss(0,4,t))*1.0);cam.lookAt(0,0,0);r.render(root,cam)};raf=requestAnimationFrame(loop);
stop=()=>{cancelAnimationFrame(raf);removeEventListener("pointermove",mv);removeEventListener("resize",layout);io.disconnect();ng.dispose();lg.dispose();nm.dispose();lm.dispose();r.dispose()}})();
return()=>{dead=true;stop()}},[]);
return(<div ref={lay} className="absolute inset-0 overflow-hidden" aria-hidden>
<div className="absolute inset-0" style={{background:"radial-gradient(55% 55% at 68% 45%,rgba(90,200,255,.08),transparent 70%),radial-gradient(100% 80% at 50% 50%,transparent 40%,#000 100%)"}}/>
{ok?<canvas ref={cv} className="absolute inset-0 h-full w-full"/>:<div className="absolute right-[12%] top-[18%] h-72 w-72 rounded-full border border-[var(--line)]"/>}
<div className="grain pointer-events-none absolute inset-0"/></div>)}
