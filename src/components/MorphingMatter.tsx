"use client";
import {useEffect,useRef,useState} from "react";

/*
 MORPHING MATTER — hero sculpture for Bala’s Craft.
 One liquid-chrome body whose shape is displaced in the vertex shader (domain-warped simplex noise, finite-difference
 normals so the reflections stay smooth), three CPU-built ribbons that flow around it, and a light particle shell.
 Scroll drives a continuous "stage" value 0 → 2:  0 liquid form · 1 flowing ribbons · 2 sculpted structure.
 Everything is created in one effect and released in its cleanup.
*/

const NOISE=`
vec3 mmM(vec3 x){return x-floor(x*(1./289.))*289.;}
vec4 mmM4(vec4 x){return x-floor(x*(1./289.))*289.;}
vec4 mmP(vec4 x){return mmM4(((x*34.)+10.)*x);}
float mmN(vec3 v){
const vec2 C=vec2(1./6.,1./3.);const vec4 D=vec4(0.,.5,1.,2.);
vec3 i=floor(v+dot(v,C.yyy));vec3 x0=v-i+dot(i,C.xxx);
vec3 g=step(x0.yzx,x0.xyz);vec3 l=1.-g;vec3 i1=min(g.xyz,l.zxy);vec3 i2=max(g.xyz,l.zxy);
vec3 x1=x0-i1+C.xxx;vec3 x2=x0-i2+C.yyy;vec3 x3=x0-D.yyy;
i=mmM(i);
vec4 p=mmP(mmP(mmP(i.z+vec4(0.,i1.z,i2.z,1.))+i.y+vec4(0.,i1.y,i2.y,1.))+i.x+vec4(0.,i1.x,i2.x,1.));
float n_=.142857142857;vec3 ns=n_*D.wyz-D.xzx;
vec4 j=p-49.*floor(p*ns.z*ns.z);
vec4 x_=floor(j*ns.z);vec4 y_=floor(j-7.*x_);
vec4 x=x_*ns.x+ns.yyyy;vec4 y=y_*ns.x+ns.yyyy;vec4 h=1.-abs(x)-abs(y);
vec4 b0=vec4(x.xy,y.xy);vec4 b1=vec4(x.zw,y.zw);
vec4 s0=floor(b0)*2.+1.;vec4 s1=floor(b1)*2.+1.;vec4 sh=-step(h,vec4(0.));
vec4 a0=b0.xzyw+s0.xzyw*sh.xxyy;vec4 a1=b1.xzyw+s1.xzyw*sh.zzww;
vec3 p0=vec3(a0.xy,h.x);vec3 p1=vec3(a0.zw,h.y);vec3 p2=vec3(a1.xy,h.z);vec3 p3=vec3(a1.zw,h.w);
vec4 nr=1.79284291400159-.85373472095314*vec4(dot(p0,p0),dot(p1,p1),dot(p2,p2),dot(p3,p3));
p0*=nr.x;p1*=nr.y;p2*=nr.z;p3*=nr.w;
vec4 m=max(.5-vec4(dot(x0,x0),dot(x1,x1),dot(x2,x2),dot(x3,x3)),0.);m=m*m;
return 105.*dot(m*m,vec4(dot(p0,x0),dot(p1,x1),dot(p2,x2),dot(p3,x3)));}
`;

const MORPH=`
uniform float uT;uniform float uStage;
vec3 mmDisp(vec3 n){
float t=uT;
float k=smoothstep(0.,1.,uStage);
float s0=1.-k;float s2=smoothstep(1.,2.,uStage);float s1=k*(1.-s2);
vec3 q=n*.95+vec3(0.,t*.10,t*.07);
float w=mmN(q+mmN(q*.7+t*.05)*.5);
float r0=1.+.27*w+.035*mmN(n*1.9+t*.16);
float pw=smoothstep(.97,.82,abs(n.y));
float f=.5+.5*sin(atan(n.x+1e-4,n.z)*3.+n.y*3.4+w*2.2+t*.5);
float r1=1.+(.32*f*f-.08)*pw+.10*w;
float rg1=1.-sqrt(pow(mmN(n*1.35+vec3(t*.04,0.,t*.06)),2.)+.03);
float rg2=1.-sqrt(pow(mmN(n*2.5-t*.05),2.)+.03);
float r2=.88+.36*rg1*rg1+.10*rg2*rg2;
float r=r0*s0+r1*s1+r2*s2;
vec3 p=n*r*(1.+.045*sin(t*.8));
p.y*=1.+.26*s1+.10*s2;
float a=p.y*(.5+1.1*s1+.7*s2)+t*.12;
float c=cos(a),sn=sin(a);
p.xz=mat2(c,-sn,sn,c)*p.xz;
return p;}
vec3 mmFull(vec3 pos,out vec3 nrm){
vec3 n=normalize(pos);
vec3 a=abs(n.y)<.95?vec3(0.,1.,0.):vec3(1.,0.,0.);
vec3 t1=normalize(cross(a,n));vec3 t2=cross(n,t1);float e=.012;
vec3 p0=mmDisp(n);vec3 p1=mmDisp(normalize(n+t1*e));vec3 p2=mmDisp(normalize(n+t2*e));
nrm=normalize(cross(p1-p0,p2-p0));return p0;}
`;

const STAGES=["01 · Liquid form","02 · Flowing ribbons","03 · Sculpted structure"];
const clamp=(x:number,a:number,b:number)=>Math.min(b,Math.max(a,x));

export default function MorphingMatter(){
const cv=useRef<HTMLCanvasElement>(null),lay=useRef<HTMLDivElement>(null);
const[ready,setReady]=useState(false),[gl,setGl]=useState(true),[stage,setStage]=useState(0);
useEffect(()=>{let stop=()=>{};let dead=false;
(async()=>{
const T=await import("three");
if(dead||!cv.current||!lay.current)return;
const c=cv.current,L=lay.current,sec=L.closest("section")||L;
const mob=innerWidth<1024,rm=matchMedia("(prefers-reduced-motion:reduce)").matches;
let r:InstanceType<typeof T.WebGLRenderer>;
try{r=new T.WebGLRenderer({canvas:c,alpha:true,antialias:!mob,powerPreference:"high-performance"})}catch{setGl(false);return}
let pr=Math.min(devicePixelRatio||1,mob?1.5:1.75);r.setPixelRatio(pr);
r.toneMapping=T.ACESFilmicToneMapping;r.toneMappingExposure=1.05;

/* studio environment: dark room, big overhead softbox, cool and warm strips, rim panels */
const pm=new T.PMREMGenerator(r),es=new T.Scene(),envMeshes:InstanceType<typeof T.Mesh>[]=[];
const panel=(w:number,h:number,d:number,x:number,y:number,z:number,cr:number,cg:number,cb:number)=>{const m=new T.Mesh(new T.BoxGeometry(w,h,d),new T.MeshBasicMaterial({color:new T.Color().setRGB(cr,cg,cb)}));m.position.set(x,y,z);es.add(m);envMeshes.push(m)};
const room=new T.Mesh(new T.BoxGeometry(40,40,40),new T.MeshBasicMaterial({color:0x030304,side:T.BackSide}));es.add(room);envMeshes.push(room);
panel(14,1,8,0,9,1,9,9,9.5);panel(1,10,9,-10,1,1,1.6,2.6,4.2);panel(1,10,9,10,0,0,3.4,2.5,1.7);panel(10,7,1,0,1,-11,.5,.52,.6);
panel(3,12,1,-6,0,9,2.2,2.2,2.4);panel(3,12,1,6,0,9,1.2,1.2,1.4);panel(20,.6,20,0,-9,0,.08,.085,.1);
const rt=pm.fromScene(es,.035);

const sc=new T.Scene();sc.environment=rt.texture;
const cam=new T.PerspectiveCamera(38,1,.1,60);cam.position.set(0,0,6.7);
const key=new T.DirectionalLight(0xffffff,1.1);key.position.set(3,4,5);sc.add(key);

const U={uT:{value:0},uStage:{value:0}};
const bodyMat=new T.MeshStandardMaterial({color:0xe9edf3,metalness:1,roughness:.1,envMapIntensity:1.3});
bodyMat.onBeforeCompile=(x:{uniforms:Record<string,{value:unknown}>;vertexShader:string})=>{x.uniforms.uT=U.uT;x.uniforms.uStage=U.uStage;
x.vertexShader=NOISE+MORPH+x.vertexShader
.replace("#include <beginnormal_vertex>","#include <beginnormal_vertex>\nvec3 mmNrm;vec3 mmPos=mmFull(position,mmNrm);objectNormal=mmNrm;")
.replace("#include <begin_vertex>","#include <begin_vertex>\ntransformed=mmPos;")};
const bodyGeo=new T.IcosahedronGeometry(1,mob?24:48);
const body=new T.Mesh(bodyGeo,bodyMat);body.frustumCulled=false;
const root=new T.Group(),art=new T.Group();root.add(art);art.add(body);sc.add(root);

/* ribbons: closed strips rebuilt on the CPU every frame (a few hundred vertices) */
const RB=mob?2:3,SEG=mob?180:300;
const rMat=new T.MeshStandardMaterial({color:0xdfe4ec,metalness:1,roughness:.16,envMapIntensity:1.25,side:T.DoubleSide});
type Rib={m:InstanceType<typeof T.Mesh>;g:InstanceType<typeof T.BufferGeometry>;pos:Float32Array;ph:number;lob:number;mm:number;rad:number;tw:number};
const ribs:Rib[]=[];
for(let b=0;b<RB;b++){
const pos=new Float32Array(SEG*2*3),idx:number[]=[];
for(let i=0;i<SEG;i++){const a=i*2,bb=i*2+1,c2=((i+1)%SEG)*2,d=c2+1;idx.push(a,bb,c2,bb,d,c2)}
const g=new T.BufferGeometry();g.setAttribute("position",new T.BufferAttribute(pos,3));g.setIndex(idx);
const m=new T.Mesh(g,rMat);m.frustumCulled=false;art.add(m);
ribs.push({m,g,pos,ph:b*2.1+.4,lob:2+b,mm:2+(b%2),rad:1.22+b*.13,tw:1.5+b*.7})}
const cp=new T.Vector3(),cn=new T.Vector3(),tg=new T.Vector3(),rd=new T.Vector3(),sd=new T.Vector3(),s2=new T.Vector3(),pts:InstanceType<typeof T.Vector3>[]=[];
for(let i=0;i<SEG+1;i++)pts.push(new T.Vector3());
const buildRib=(R:Rib,t:number,wgt:number,rs:number)=>{
for(let i=0;i<SEG;i++){const th=i/SEG*6.2832,rr=R.rad*rs*(1+.2*Math.sin(R.lob*th+R.ph+t*.35)),y=.5*Math.sin(R.mm*th+R.ph*1.7+t*.27)*rs;pts[i].set(Math.cos(th)*rr,y,Math.sin(th)*rr)}
pts[SEG].copy(pts[0]);
for(let i=0;i<SEG;i++){cp.copy(pts[i]);cn.copy(pts[i+1]).sub(pts[(i+SEG-1)%SEG]);tg.copy(cn).normalize();rd.copy(cp).normalize();
sd.crossVectors(tg,rd).normalize();const th=i/SEG*6.2832,ta=th*R.tw+t*.45+R.ph,co=Math.cos(ta),si=Math.sin(ta);
s2.crossVectors(tg,sd);sd.multiplyScalar(co).addScaledVector(s2,si);
const hw=.014+.12*wgt*(.55+.45*Math.sin(th*2+t*.6+R.ph));
R.pos[i*6]=cp.x+sd.x*hw;R.pos[i*6+1]=cp.y+sd.y*hw;R.pos[i*6+2]=cp.z+sd.z*hw;
R.pos[i*6+3]=cp.x-sd.x*hw;R.pos[i*6+4]=cp.y-sd.y*hw;R.pos[i*6+5]=cp.z-sd.z*hw}
(R.g.attributes.position as InstanceType<typeof T.BufferAttribute>).needsUpdate=true;R.g.computeVertexNormals()};

/* particles */
const PN=mob?160:420,pp=new Float32Array(PN*3),pa=new Float32Array(PN);
let sd0=7;const rnd=()=>{sd0=(sd0*1664525+1013904223)>>>0;return sd0/4294967296};
for(let i=0;i<PN;i++){const u=rnd()*2-1,a=rnd()*6.2832,s=Math.sqrt(1-u*u),q=1.9+rnd()*2.6;pp.set([q*s*Math.cos(a),q*u*.8,q*s*Math.sin(a)],i*3);pa[i]=rnd()}
const pg=new T.BufferGeometry();pg.setAttribute("position",new T.BufferAttribute(pp,3));pg.setAttribute("aR",new T.BufferAttribute(pa,1));
const PU={uT:U.uT,uPR:{value:pr}};
const pmt=new T.ShaderMaterial({transparent:true,depthWrite:false,blending:T.AdditiveBlending,uniforms:PU,
vertexShader:"attribute float aR;uniform float uT,uPR;varying float vA;void main(){vec3 p=position;p+=vec3(sin(uT*.13+aR*40.),cos(uT*.11+aR*31.),sin(uT*.09+aR*23.))*.22;vec4 mv=modelViewMatrix*vec4(p,1.);float tw=.55+.45*sin(uT*.8+aR*50.);vA=tw*(.25+.55*aR);gl_PointSize=uPR*(1.2+2.6*aR)*(7./-mv.z);gl_Position=projectionMatrix*mv;}",
fragmentShader:"varying float vA;void main(){float d=length(gl_PointCoord-.5);if(d>.5)discard;gl_FragColor=vec4(vec3(.86,.9,1.),smoothstep(.5,.0,d)*vA*.8);}"});
const parts=new T.Points(pg,pmt);parts.frustumCulled=false;root.add(parts);

/* layout: sculpture sits right on desktop, upper-centre on mobile; never under the text column */
let W=1,H=1,hh=2.2,hwid=2.2;
const layout=()=>{W=L.clientWidth||innerWidth;H=L.clientHeight||innerHeight;r.setSize(W,H,false);const asp=W/H;cam.aspect=asp;cam.updateProjectionMatrix();
hh=Math.tan(cam.fov*Math.PI/360)*cam.position.z;hwid=hh*asp;const d=W>=1024;
const s=d?Math.min(hh*.86,hwid*.56)/1.9:Math.min(hwid*.98,hh*.4)/1.9;
root.scale.setScalar(s);root.position.set(d?hwid*.4:0,d?0:hh*.4,0)};
layout();

let mx=0,my=0;const mv=(e:PointerEvent)=>{mx=e.clientX/innerWidth-.5;my=e.clientY/innerHeight-.5};
const target=()=>{const q=sec.getBoundingClientRect(),tr=q.height-innerHeight;return tr>0?clamp(-q.top/tr,0,1)*2:0};
let tgt=target(),st=tgt,vis=true,t=rm?7.3:0,last=performance.now(),raf=0,sh=-1,frames=0,acc=0,first=true;
const lost=(e:Event)=>{e.preventDefault();setGl(false)};c.addEventListener("webglcontextlost",lost);
const draw=(dt:number)=>{
st=rm?tgt:st+(tgt-st)*(1-Math.exp(-dt*3.2));U.uStage.value=st;U.uT.value=t;
const k=clamp(st,0,2),s1=Math.sin(Math.min(k,1)*Math.PI/2),wr=k<=1?.25+.75*s1:1-.4*(k-1),rs=1+.14*Math.min(k,1)-.1*Math.max(0,k-1);
for(let i=0;i<ribs.length;i++){const R=ribs[i];buildRib(R,t,wr*(i===0?1:.85),rs);R.m.rotation.set(.5+i*.7+Math.sin(t*.07+i)*.2,t*(.05+i*.02)*(i%2?-1:1),i*1.1+.3)}
art.rotation.y=t*.1+k*.9+mx*.35;art.rotation.x=.12+my*.2;body.rotation.x=1.1;
cam.position.set(mx*.5,-my*.3,6.7-.4*k/2);cam.lookAt(0,0,0);
const lv=Math.round(k);if(lv!==sh){sh=lv;setStage(lv)}
c.dataset.stage=k.toFixed(2);r.render(sc,cam);
if(first){first=false;setReady(true)}};
const loop=(n:number)=>{raf=requestAnimationFrame(loop);const dt=Math.min(.05,(n-last)/1e3);last=n;if(!vis||document.hidden)return;t+=dt;draw(dt);
frames++;acc+=dt;if(frames===90){if(acc/90>.034&&pr>1){pr=1;r.setPixelRatio(1);PU.uPR.value=1;layout()}}};
const onScroll=()=>{tgt=target();if(rm&&vis)draw(0)};
const onResize=()=>{layout();tgt=target();if(rm)draw(0)};
addEventListener("pointermove",mv,{passive:true});addEventListener("scroll",onScroll,{passive:true});addEventListener("resize",onResize);
const io=new IntersectionObserver(es=>{vis=es[0].isIntersecting;last=performance.now()});io.observe(sec);
draw(0);                       /* first frame is drawn synchronously: the sculpture is on screen as soon as three has loaded */
if(!rm)raf=requestAnimationFrame(loop);
stop=()=>{cancelAnimationFrame(raf);io.disconnect();c.removeEventListener("webglcontextlost",lost);removeEventListener("pointermove",mv);removeEventListener("scroll",onScroll);removeEventListener("resize",onResize);
bodyGeo.dispose();bodyMat.dispose();rMat.dispose();ribs.forEach(x=>x.g.dispose());pg.dispose();pmt.dispose();rt.dispose();pm.dispose();envMeshes.forEach(m=>{m.geometry.dispose();(m.material as InstanceType<typeof T.Material>).dispose()});r.dispose()};
})();
return()=>{dead=true;stop()}},[]);
return(<div ref={lay} className="absolute inset-0 overflow-hidden" aria-hidden>
<div className="absolute inset-0" style={{background:"radial-gradient(52% 60% at 70% 48%,rgba(120,150,200,.10),transparent 70%),radial-gradient(110% 90% at 50% 50%,transparent 45%,#000 100%)"}}/>
<div data-ready={ready?"1":"0"} data-gl={gl?"on":"off"} className="mm-poster pointer-events-none absolute left-1/2 top-[30%] aspect-square w-[40vw] max-w-[260px] -translate-x-1/2 -translate-y-1/2 rounded-full lg:left-[70%] lg:top-1/2 lg:w-[min(30vw,52vh)] lg:max-w-none"/>
{!gl&&<><div className="absolute left-1/2 top-[30%] aspect-[2.6/1] w-[78vw] max-w-[420px] -translate-x-1/2 -translate-y-1/2 -rotate-[18deg] rounded-[50%] border border-white/15 lg:left-[70%] lg:top-1/2 lg:w-[min(44vw,78vh)] lg:max-w-none"/><div className="absolute left-1/2 top-[30%] aspect-[2.6/1] w-[66vw] max-w-[360px] -translate-x-1/2 -translate-y-1/2 rotate-[24deg] rounded-[50%] border border-white/10 lg:left-[70%] lg:top-1/2 lg:w-[min(38vw,66vh)] lg:max-w-none"/></>}
{gl&&<canvas ref={cv} data-ready={ready?"1":"0"} className="mm-canvas absolute inset-0 h-full w-full"/>}
<div className="grain pointer-events-none absolute inset-0"/>
<div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-black to-transparent"/>
<div className="pointer-events-none absolute bottom-8 right-5 hidden items-center gap-3 text-[10px] tracking-[.22em] text-[var(--mute)] sm:flex">
<span className="uppercase">{STAGES[stage]}</span><span className="flex gap-1.5">{STAGES.map((_,i)=><i key={i} className={`block h-px w-6 transition-colors duration-500 ${i===stage?"bg-white":"bg-white/25"}`}/>)}</span></div>
</div>)}
