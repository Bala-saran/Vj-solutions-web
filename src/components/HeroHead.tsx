"use client";
import {useEffect,useRef,useState} from "react";
type V=[number,number,number];
const NAMES=["GPT","LLM","RAG","GEMINI","AI AGENTS","PYTHON","MACHINE LEARNING","VECTOR DATABASE","NEURAL NETWORK","DEEP LEARNING"];
const CODE="def answer(question):\n    ctx = retriever.search(question, k=4)\n    prompt = build(role, ctx, question)\n    out = llm.generate(prompt)\n    return validate(out, schema)\n\nclass Agent:\n    def step(self, goal):\n        call = self.model.plan(goal)\n        return self.tools[call.name](**call.args)\n\n";
export default function HeroHead(){
const cv=useRef<HTMLCanvasElement>(null),lay=useRef<HTMLDivElement>(null),[ok,setOk]=useState(true);
useEffect(()=>{let stop=()=>{};let dead=false;
(async()=>{const T=await import("three");if(dead||!cv.current||!lay.current)return;const c=cv.current,L=lay.current;
let r:InstanceType<typeof T.WebGLRenderer>;try{r=new T.WebGLRenderer({canvas:c,alpha:true,antialias:false,powerPreference:"high-performance"})}catch{setOk(false);return}
const mob=innerWidth<860,rm=matchMedia("(prefers-reduced-motion:reduce)").matches;r.setPixelRatio(Math.min(devicePixelRatio,mob?1.5:2));
let sd=7;const R=()=>{sd=(sd*1664525+1013904223)>>>0;return sd/4294967296};
const ss=(a:number,b:number,x:number)=>{const t=Math.min(1,Math.max(0,(x-a)/(b-a)));return t*t*(3-2*t)};
const hw=(y:number)=>.58*(1-.42*ss(-.25,-1.05,y))*(y>.75?Math.sqrt(Math.max(0,1-((y-.75)/.3)**2)):1)+.001;
const dp=(y:number)=>y>.75?.72*Math.sqrt(Math.max(0,1-((y-.75)/.3)**2)):.72-.1*ss(-.3,-1.05,y);
const g2=(x:number,sx:number,y:number,y0:number,sy:number)=>Math.exp(-((x/sx)**2)-((y-y0)/sy)**2);
const front=(x:number,y:number)=>{const ax=Math.abs(x);return dp(y)*Math.sqrt(Math.max(0,1-(x/hw(y))**2))+.14*g2(x,.07,y,-.02,.22)+.06*g2(x,.06,y,.2,.25)+.05*g2(ax-.26,.22,y,.28,.05)-.09*g2(ax-.25,.1,y,.2,.08)+.05*g2(ax-.42,.12,y,0,.12)+.06*g2(x,.16,y,-.78,.1)+.03*g2(x,.12,y,-.38,.04)};
/* head point cloud: front face surface, rear skull, neck, two dense eye clusters */
const HP:number[]=[],HB:number[]=[],NH=mob?3800:8500;
for(let i=0;i<NH;i++){const y=R()<.45?-.9+R()*1.3:-1.05+R()*2.1,w=hw(y),x=(R()*2-1)*w;if(R()<.62){HP.push(x,y,front(x,y));HB.push(1)}else if(R()<.7){HP.push(x,y,-(dp(y)+.1)*Math.sqrt(Math.max(0,1-(x/w)**2)));HB.push(1)}}
for(let i=0;i<NH*.05;i++){const a=R()*6.2832,y=-1-R()*.6;HP.push(.26*Math.sin(a),y,-.12+.26*Math.cos(a));HB.push(1)}
const gs=()=>(R()+R()+R()-1.5);
const EYES:V[]=[];for(const s of[-1,1]){let ex=s*.26,ey=.2;EYES.push([ex,ey,front(ex,ey)+.03]);for(let i=0;i<(mob?110:260);i++){ex=s*.26+gs()*.035;ey=.2+gs()*.025;HP.push(ex,ey,front(ex,ey)+.02+R()*.03);HB.push(3)}}
/* brain point cloud with gyri-like relief and a central fissure */
const BP:number[]=[],NB=mob?1400:3000;
for(let i=0;i<NB;i++){const u=R()*2-1,a=R()*6.2832,s=Math.sqrt(1-u*u),dx=s*Math.cos(a),dz=s*Math.sin(a),th=Math.atan2(dz,dx);let rr=1+.07*Math.sin(7*th)*Math.sin(6*Math.acos(u))+.045*Math.sin(11*th+3*u);rr*=1-.28*Math.exp(-((dx/.12)**2))*Math.max(0,u);BP.push(dx*.9*rr,u*.62*rr,dz*.8*rr)}
const U={uT:{value:0},uE:{value:0},uS:{value:-9}};
const ptsMat=(asm:{value:number})=>new T.ShaderMaterial({transparent:true,depthWrite:false,blending:T.AdditiveBlending,uniforms:{uT:U.uT,uE:U.uE,uS:U.uS,uPR:{value:r.getPixelRatio()},uSz:{value:mob?.045:.032},uAsm:asm},
vertexShader:"attribute vec3 aFrom;attribute float aR,aB;uniform float uT,uE,uS,uPR,uSz,uAsm;varying float vA;void main(){float k=clamp(uAsm*1.5-aR*.5,0.,1.);k=k*k*(3.-2.*k);vec3 p=mix(aFrom,position,k);p+=vec3(sin(uT+aR*40.),cos(uT*.8+aR*31.),sin(uT*.6+aR*17.))*.012*(.4+(1.-k)*3.);float sc=exp(-pow((position.y-uS)*7.,2.));float eye=aB>1.5?1.:0.;vA=(.28+.72*k)*(1.+sc*1.2)*mix(1.,uE,eye);vec4 mv=modelViewMatrix*vec4(p,1.);gl_Position=projectionMatrix*mv;gl_PointSize=uSz*uPR*(260./-mv.z)*(.5+.7*k)*(1.+sc*.8)*mix(1.,1.+uE*1.8,eye);}",
fragmentShader:"varying float vA;void main(){float d=length(gl_PointCoord-.5);if(d>.5)discard;gl_FragColor=vec4(vec3(.92),smoothstep(.5,.05,d)*vA*.85);}"});
const mkPts=(P:number[],B:number[],asm:{value:number})=>{const n=P.length/3,f=new Float32Array(n*3),ar=new Float32Array(n);for(let i=0;i<n;i++){const u=R()*2-1,a=R()*6.2832,s=Math.sqrt(1-u*u),q=3+R()*3;f[i*3]=q*s*Math.cos(a);f[i*3+1]=q*u;f[i*3+2]=q*s*Math.sin(a);ar[i]=R()}
const g=new T.BufferGeometry();g.setAttribute("position",new T.Float32BufferAttribute(P,3));g.setAttribute("aFrom",new T.BufferAttribute(f,3));g.setAttribute("aR",new T.BufferAttribute(ar,1));g.setAttribute("aB",new T.Float32BufferAttribute(B,1));const m=ptsMat(asm),p=new T.Points(g,m);p.frustumCulled=false;return p};
const A={value:0},Bm={value:0},LH={value:.15},LB={value:0};
const lineMat=(l:{value:number})=>new T.ShaderMaterial({transparent:true,depthWrite:false,blending:T.AdditiveBlending,uniforms:{uT:U.uT,uL:l},vertexShader:"attribute float aPh,aE;uniform float uT,uL;varying float vA;void main(){float pl=pow(max(0.,sin(uT*1.6-aPh*6.28-aE*1.5)),8.);vA=(.1+.55*pl)*uL;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);}",fragmentShader:"varying float vA;void main(){gl_FragColor=vec4(vec3(.9),vA*.6);}"});
const nodesOf=(P:number[],n:number,skipEyes:boolean,B?:number[]):V[]=>{const o:V[]=[];const cnt=P.length/3;while(o.length<n){const i=(R()*cnt)|0;if(skipEyes&&B&&B[i]>1.5)continue;o.push([P[i*3],P[i*3+1],P[i*3+2]])}return o};
const mkLines=(N:V[],k:number,maxD:number,L:{value:number})=>{const pos:number[]=[],ph:number[]=[],e:number[]=[];N.forEach((a,i)=>{const d=N.map((b,j)=>[j,Math.hypot(a[0]-b[0],a[1]-b[1],a[2]-b[2])] as [number,number]).filter(x=>x[0]!==i&&x[1]<maxD).sort((x,y)=>x[1]-y[1]).slice(0,k);for(const[j]of d){const b=N[j],p=R();pos.push(...a,...b);ph.push(p,p);e.push(0,1)}});
const g=new T.BufferGeometry();g.setAttribute("position",new T.Float32BufferAttribute(pos,3));g.setAttribute("aPh",new T.Float32BufferAttribute(ph,1));g.setAttribute("aE",new T.Float32BufferAttribute(e,1));const s=new T.LineSegments(g,lineMat(L));s.frustumCulled=false;return s};
const root=new T.Scene(),cam=new T.PerspectiveCamera(40,1,.1,50);cam.position.z=6.4;
const hg=new T.Group(),hs=new T.Group(),bg=new T.Group();root.add(hg,bg);hg.add(hs);
const headPts=mkPts(HP,HB,A),brainPts=mkPts(BP,new Array(BP.length/3).fill(1),Bm);hs.add(headPts);bg.add(brainPts);
const hn=nodesOf(HP,mob?240:560,true,HB),bn=nodesOf(BP,mob?110:240,false);hs.add(mkLines(hn,3,.34,LH));bg.add(mkLines(bn,3,.42,LB));
/* eye rays */
const RP:number[]=[],RD:number[]=[],RE:number[]=[],RH:number[]=[],RL:number[]=[];for(const e of[EYES[0],EYES[1]]){const s=Math.sign(e[0]);for(let i=0;i<(mob?16:34);i++){let dx=(R()-.5)*.9+s*.3,dy=(R()-.5)*.6,dz=R()+.3;const n=Math.hypot(dx,dy,dz);dx/=n;dy/=n;dz/=n;const ph=R(),ln=.25+R()*.55;for(const q of[0,1]){RP.push(...e);RD.push(dx,dy,dz);RE.push(q);RH.push(ph);RL.push(ln)}}}
const rg=new T.BufferGeometry();rg.setAttribute("position",new T.Float32BufferAttribute(RP,3));rg.setAttribute("aDir",new T.Float32BufferAttribute(RD,3));rg.setAttribute("aE",new T.Float32BufferAttribute(RE,1));rg.setAttribute("aPh",new T.Float32BufferAttribute(RH,1));rg.setAttribute("aLen",new T.Float32BufferAttribute(RL,1));
const rayMat=new T.ShaderMaterial({transparent:true,depthWrite:false,blending:T.AdditiveBlending,uniforms:{uT:U.uT,uE:U.uE},vertexShader:"attribute vec3 aDir;attribute float aE,aPh,aLen;uniform float uT,uE;varying float vA;void main(){float f=fract(uT*.7+aPh);vec3 p=position+aDir*aLen*aE*(.3+.7*f);vA=(1.-aE)*uE*(1.-f)*.9;gl_Position=projectionMatrix*modelViewMatrix*vec4(p,1.);}",fragmentShader:"varying float vA;void main(){gl_FragColor=vec4(vec3(1.),vA);}"});
const rays=new T.LineSegments(rg,rayMat);rays.frustumCulled=false;hs.add(rays);
/* mechanical rings with tick marks, and a scanning ring */
const ringMat=new T.LineBasicMaterial({color:0xffffff,transparent:true,opacity:0,depthWrite:false}),rings:InstanceType<typeof T.LineSegments>[]=[];
[1.55,1.8,2.05].forEach((rad,i)=>{const p:number[]=[];for(let a=0;a<360;a+=3){const a0=a*Math.PI/180,a1=(a+3)*Math.PI/180;p.push(rad*Math.cos(a0),0,rad*Math.sin(a0),rad*Math.cos(a1),0,rad*Math.sin(a1));if(a%15===0){const q=rad+(a%45===0?.1:.05);p.push(rad*Math.cos(a0),0,rad*Math.sin(a0),q*Math.cos(a0),0,q*Math.sin(a0))}}
const g=new T.BufferGeometry();g.setAttribute("position",new T.Float32BufferAttribute(p,3));const l=new T.LineSegments(g,ringMat);l.rotation.x=[.35,1.1,-.6][i];l.rotation.z=[.2,-.3,.5][i];hg.add(l);rings.push(l)});
const sp:number[]=[];for(let a=0;a<96;a++){const a0=a/96*6.2832;sp.push(Math.cos(a0),0,Math.sin(a0))}
const sg=new T.BufferGeometry();sg.setAttribute("position",new T.Float32BufferAttribute(sp,3));const scanMat=new T.LineBasicMaterial({color:0xffffff,transparent:true,opacity:0,depthWrite:false}),scan=new T.LineLoop(sg,scanMat);hs.add(scan);
/* particles flowing between brain and head along curves */
const NF=mob?70:170,fp=new Float32Array(NF*3),fa=Array.from({length:NF},()=>[(R()*bn.length)|0,(R()*hn.length)|0,R()]);
const fg=new T.BufferGeometry();fg.setAttribute("position",new T.BufferAttribute(fp,3));const fm=new T.PointsMaterial({size:.035,color:0xffffff,transparent:true,opacity:0,blending:T.AdditiveBlending,depthWrite:false}),flow=new T.Points(fg,fm);flow.frustumCulled=false;root.add(flow);
/* AI technology labels travelling along curved paths from brain nodes */
const labels=NAMES.slice(0,mob?6:10).map((n,i)=>{const e=document.createElement("span");e.textContent=n;e.className="absolute left-0 top-0 whitespace-nowrap text-[10px] tracking-[.22em] text-white will-change-transform";e.style.opacity="0";L.appendChild(e);return{e,i,bi:(i*23+5)%bn.length}});
const v0=new T.Vector3(),v1=new T.Vector3(),v2=new T.Vector3(),v3=new T.Vector3();
let hx=0,asp=1,W=1,H=1;
const layout=()=>{W=L.clientWidth||innerWidth;H=L.clientHeight||innerHeight;r.setSize(W,H,false);asp=W/H;cam.aspect=asp;cam.updateProjectionMatrix();const hwid=2.62*asp,d=asp>1;hx=d?hwid*.18:0;hg.position.set(hx,d?.15:.6,0);hg.scale.setScalar(d?1.15:Math.min(.7,asp*1.1));bg.position.set(d?hx+2.05:.55,d?.35:2.05,-.2);bg.scale.setScalar(d?1:.5)};layout();
let mx=0;const mv=(e:PointerEvent)=>{mx=e.clientX/innerWidth-.5};addEventListener("pointermove",mv,{passive:true});addEventListener("resize",layout);
let vis=true;const io=new IntersectionObserver(es=>{vis=es[0].isIntersecting});io.observe(L);
let t=rm?99:0,last=performance.now(),raf=0;
const loop=(n:number)=>{raf=requestAnimationFrame(loop);const dt=Math.min(.05,(n-last)/1e3);last=n;if(!vis)return;if(!rm)t+=dt;
LH.value=.15+.85*ss(.2,1.8,t);A.value=ss(.8,4.2,t);U.uE.value=ss(3.2,4.4,t);Bm.value=ss(3.6,5.2,t);LB.value=ss(3.4,5,t);U.uT.value=rm?0:t;
const lo=ss(5,6.5,t);ringMat.opacity=.28*lo;fm.opacity=.8*ss(4.6,5.6,t);scan.visible=t>5.5;scanMat.opacity=.5*ss(5.5,6.5,t);
const sy=-1+((t*.35)%1)*2.1;U.uS.value=t>5.5?sy:-9;scan.position.y=sy;scan.scale.set(hw(sy)*1.15,1,(dp(sy)+.05)*1.15);
hs.rotation.y=.55+(rm?0:Math.sin(t*.25)*.2)+mx*.25;hs.rotation.x=.02;bg.rotation.y=-t*.18;rings.forEach((q,i)=>{q.rotation.y=(i%2?1:-1)*t*(.12+i*.05)});
cam.position.set(mx*.3,0,6.4+(1-ss(0,5,t))*1.2);cam.lookAt(0,0,0);root.updateMatrixWorld(true);
for(let i=0;i<NF;i++){const f=fa[i],tt=(t*.22+f[2])%1;v0.set(...bn[f[0]]);bg.localToWorld(v0);v1.set(...hn[f[1]]);hs.localToWorld(v1);v2.copy(v0).add(v1).multiplyScalar(.5);v2.y+=.9;v2.z+=.4;const a=1-tt;fp[i*3]=a*a*v0.x+2*a*tt*v2.x+tt*tt*v1.x;fp[i*3+1]=a*a*v0.y+2*a*tt*v2.y+tt*tt*v1.y;fp[i*3+2]=a*a*v0.z+2*a*tt*v2.z+tt*tt*v1.z}
fg.attributes.position.needsUpdate=true;
const lon=ss(4.8,5.8,t);for(const l of labels){const tt=(t*.07+l.i*.1)%1;v0.set(...bn[l.bi]);bg.localToWorld(v0);v3.set(hx+1.3+(l.i%4)*.45,1.7-(l.i%5)*.75,-.4);v2.copy(v0).add(v3).multiplyScalar(.5);v2.y+=.8;const a=1-tt;v1.set(a*a*v0.x+2*a*tt*v2.x+tt*tt*v3.x,a*a*v0.y+2*a*tt*v2.y+tt*tt*v3.y,a*a*v0.z+2*a*tt*v2.z+tt*tt*v3.z).project(cam);
l.e.style.transform=`translate(${(v1.x+1)/2*W}px,${(1-v1.y)/2*H}px)`;l.e.style.opacity=String(Math.sin(Math.PI*tt)*lon*.9)}
r.render(root,cam)};raf=requestAnimationFrame(loop);
stop=()=>{cancelAnimationFrame(raf);removeEventListener("pointermove",mv);removeEventListener("resize",layout);io.disconnect();labels.forEach(l=>l.e.remove());root.traverse((o:InstanceType<typeof T.Object3D>)=>{const m=o as InstanceType<typeof T.Mesh>;m.geometry?.dispose();const mt=m.material as InstanceType<typeof T.Material>|undefined;mt?.dispose?.()});r.dispose()}})();
return()=>{dead=true;stop()}},[]);
return(<div ref={lay} className="absolute inset-0 overflow-hidden" aria-hidden>
<div className="absolute inset-0" style={{background:"radial-gradient(60% 50% at 62% 40%,rgba(255,255,255,.07),transparent 70%),radial-gradient(100% 80% at 50% 50%,transparent 40%,#000 100%)"}}/>
{ok?<canvas ref={cv} className="absolute inset-0 h-full w-full"/>:<div className="absolute right-[12%] top-[18%] h-72 w-72 rounded-full border border-[var(--line)]"/>}
<pre className="code-col absolute left-3 top-0 hidden h-full w-56 overflow-hidden text-[10px] leading-4 text-white/30 xl:block"><span className="block">{CODE.repeat(8)}</span></pre>
<div className="grain pointer-events-none absolute inset-0"/></div>)}
