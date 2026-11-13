"use client";
import {useEffect,useRef,useState} from "react";

/* Monochrome cinematic ocean sunrise.
   Every pixel is written as vec3(v) so the output can only ever be a shade between #000 and #fff. */

const COMMON=`
uniform float uT;uniform vec3 uSun;uniform float uFade;
float hash(vec2 p){p=fract(p*vec2(123.34,456.21));p+=dot(p,p+45.32);return fract(p.x*p.y);}
float vn(vec2 p){vec2 i=floor(p),f=fract(p);f=f*f*(3.-2.*f);
 return mix(mix(hash(i),hash(i+vec2(1,0)),f.x),mix(hash(i+vec2(0,1)),hash(i+vec2(1,1)),f.x),f.y);}
float fbm(vec2 p){float a=.5,s=0.;for(int i=0;i<3;i++){s+=a*vn(p);p=p*2.03+17.1;a*=.5;}return s;}
/* sky radiance without the sun disc: black overhead, blazing white around the sun and horizon */
float skyBase(vec3 d){
 float h=max(d.y,0.);float cs=max(dot(d,uSun),0.);
 float band=pow(1.-h,11.);
 float az=.16+.84*pow(cs,5.);
 float v=band*az*1.25;
 v+=pow(cs,18.)*.32+pow(cs,140.)*.55+pow(cs,700.)*.9;
 return v*smoothstep(-.12,.06,uSun.y+.12);
}
float finish(float v){v=1.-exp(-v*1.35);v=v*v*(3.-2.*v);return clamp(v,0.,1.);}
`;

const SKY_V=`varying vec3 vP;void main(){vP=(modelMatrix*vec4(position,1.)).xyz;gl_Position=projectionMatrix*viewMatrix*vec4(vP,1.);}`;
const SKY_F=`${COMMON}varying vec3 vP;
void main(){vec3 d=normalize(vP-cameraPosition);
 float v=skyBase(d);
 float cs=dot(d,uSun);
 float disc=smoothstep(.99962,.99966,cs)*smoothstep(-.002,.006,d.y);
 v+=disc*9.;
 gl_FragColor=vec4(vec3(finish(v)*uFade),1.);}`;

const WAVE_V=`${COMMON}
uniform vec4 uW[7];
varying vec3 vW;varying vec3 vN;varying float vJ;varying float vH;
void main(){
 vec2 u=position.xy;
 float s=u.y*.5+.5;
 vec2 p=vec2(u.x*abs(u.x)*260.,20.-s*s*340.);
 vec3 d=vec3(0.);vec3 n=vec3(0.,1.,0.);float jxx=1.,jzz=1.,jxz=0.;
 for(int i=0;i<7;i++){
  vec2 dir=normalize(uW[i].xy);float k=6.2832/uW[i].z;float c=sqrt(9.81/k)*.85;float Q=uW[i].w;
  float f=k*dot(dir,p)-c*uT;float sn=sin(f),cn=cos(f);float a=Q/k;
  d.xz+=dir*a*cn;d.y+=a*sn;
  n.xz-=dir*Q*cn;n.y-=Q*sn;
  jxx-=dir.x*dir.x*Q*sn;jzz-=dir.y*dir.y*Q*sn;jxz-=dir.x*dir.y*Q*sn;
 }
 vec3 w=vec3(p.x+d.x,d.y,p.y+d.z);
 vW=w;vN=normalize(n);vJ=jxx*jzz-jxz*jxz;vH=d.y;
 gl_Position=projectionMatrix*viewMatrix*vec4(w,1.);}`;

const WAVE_F=`${COMMON}
varying vec3 vW;varying vec3 vN;varying float vJ;varying float vH;
void main(){
 vec3 toC=cameraPosition-vW;float dist=length(toC);vec3 V=toC/dist;
 vec2 q=vW.xz;
 /* fine ripples, faded with distance to avoid shimmer */
 float fade=exp(-dist*.014);
 vec2 sc=vec2(uT*.35,uT*.18);
 float e=.12;vec2 q1=q*1.6+sc;
 float n0=fbm(q1);vec2 g=vec2(fbm(q1+vec2(e,0.))-n0,fbm(q1+vec2(0.,e))-n0)/e;
 vec2 q2=q*4.1-sc*1.7;
 float m0=fbm(q2);vec2 g2=vec2(fbm(q2+vec2(e,0.))-m0,fbm(q2+vec2(0.,e))-m0)/e;
 vec3 N=normalize(vN+vec3(-(g.x*.22+g2.x*.1),0.,-(g.y*.22+g2.y*.1))*fade);
 vec3 R=reflect(-V,N);R.y=abs(R.y);
 float F=.025+.975*pow(1.-max(dot(N,V),0.),5.);
 float nearK=mix(.5,1.,1.-exp(-dist*.02));
 float v=skyBase(R)*F*nearK;
 /* sun glitter: sharp mirror reflections plus a broader sheen along the sun path */
 float sp=max(dot(R,normalize(uSun)),0.);
 float vis=smoothstep(-.02,.05,uSun.y);
 v+=(pow(sp,1200.)*60.+pow(sp,260.)*5.+pow(sp,40.)*.55)*vis*(.35+.65*F)*fade*1.2+pow(sp,40.)*.2*vis;
 /* wave-face light catching the sun */
 vec3 H=normalize(normalize(uSun)+V);v+=pow(max(dot(N,H),0.),90.)*.5*vis*fade;
 /* foam: where the surface compresses (low Jacobian) and on tall crests, broken up by noise */
 float fm=smoothstep(.62,.12,vJ)+smoothstep(.55,1.1,vH)*.5;
 float tex=fbm(q*2.4+vec2(uT*.25,-uT*.1))*.65+fbm(q*9.+uT*.4)*.5;
 float foam=smoothstep(.55,.9,fm*(.55+tex*1.1));
 foam*=exp(-dist*.011);
 float lit=.65+.35*smoothstep(-.2,.9,N.y);
 v=mix(v,max(v,1.05*lit),foam);
 /* haze toward the bright horizon */
 float fog=1.-exp(-pow(dist*.0058,1.45));
 float hz=skyBase(normalize(vec3(-V.x,.0,-V.z)));
 v=mix(v,hz,fog);
 gl_FragColor=vec4(vec3(finish(v)*uFade),1.);}`;

export default function OceanSunrise(){
const cv=useRef<HTMLCanvasElement>(null),box=useRef<HTMLDivElement>(null),[ok,setOk]=useState(true);
useEffect(()=>{let stop=()=>{};let dead=false;
(async()=>{const T=await import("three");if(dead||!cv.current||!box.current)return;const c=cv.current,L=box.current;
let r:InstanceType<typeof T.WebGLRenderer>;
try{r=new T.WebGLRenderer({canvas:c,antialias:true,powerPreference:"high-performance"})}catch{setOk(false);return}
const mob=innerWidth<860,rm=matchMedia("(prefers-reduced-motion:reduce)").matches;
r.setPixelRatio(Math.min(devicePixelRatio,mob?1:1.5));r.setClearColor(0x000000,1);
const sc=new T.Scene(),cam=new T.PerspectiveCamera(50,1,.1,1500);cam.position.set(0,3.1,0);
const sun=new T.Vector3(.2,.1,-1).normalize();
const U={uT:{value:0},uSun:{value:sun},uFade:{value:0}};
/* direction x, direction z, wavelength, steepness */
const W=[[.06,1,46,.08],[-.22,1,27,.12],[.3,1,16,.14],[-.08,1,9.5,.15],[.5,1,6,.13],[-.45,1,3.8,.1],[.15,1,2.4,.07]].map(a=>new T.Vector4(...(a as [number,number,number,number])));
const sky=new T.Mesh(new T.SphereGeometry(1000,48,24),new T.ShaderMaterial({uniforms:U,vertexShader:SKY_V,fragmentShader:SKY_F,side:T.BackSide,depthWrite:false,depthTest:false}));
sky.renderOrder=-1;sky.frustumCulled=false;sc.add(sky);
const seg=mob?170:300;const wg=new T.PlaneGeometry(2,2,seg,seg);
const wm=new T.ShaderMaterial({uniforms:{...U,uW:{value:W}},vertexShader:WAVE_V,fragmentShader:WAVE_F});
const sea=new T.Mesh(wg,wm);sea.frustumCulled=false;sc.add(sea);
const layout=()=>{const w=L.clientWidth||innerWidth,h=L.clientHeight||innerHeight;r.setSize(w,h,false);cam.aspect=w/h;cam.fov=w/h<1?68:50;cam.updateProjectionMatrix()};layout();addEventListener("resize",layout);
let mx=0,my=0,sx=0,sy=0;const mv=(e:PointerEvent)=>{mx=e.clientX/innerWidth-.5;my=e.clientY/innerHeight-.5};addEventListener("pointermove",mv,{passive:true});
let vis=true;const io=new IntersectionObserver(es=>{vis=es[0].isIntersecting});io.observe(L);
let t=rm?30:0,last=performance.now(),raf=0;
const ease=(x:number)=>1-Math.pow(1-Math.min(1,Math.max(0,x)),3);
const loop=(n:number)=>{raf=requestAnimationFrame(loop);const dt=Math.min(.05,(n-last)/1e3);last=n;if(!vis)return;if(!rm)t+=dt;
const el=-.07+.19*ease(t/16)+Math.sin(t*.05)*.004;
sun.set(.2+Math.sin(t*.03)*.02,el,-1).normalize();
U.uT.value=t;U.uFade.value=rm?1:Math.min(1,t/2.4);
sx+=(mx-sx)*.04;sy+=(my-sy)*.04;
cam.position.set(Math.sin(t*.11)*.5,3.1+Math.sin(t*.42)*.14+Math.sin(t*.9)*.05,0);
cam.rotation.set(-.075-sy*.05+Math.sin(t*.37)*.004,-sx*.1,Math.sin(t*.29)*.006,"YXZ");
r.render(sc,cam)};raf=requestAnimationFrame(loop);
stop=()=>{cancelAnimationFrame(raf);removeEventListener("pointermove",mv);removeEventListener("resize",layout);io.disconnect();wg.dispose();wm.dispose();sky.geometry.dispose();(sky.material as InstanceType<typeof T.ShaderMaterial>).dispose();r.dispose()}})();
return()=>{dead=true;stop()}},[]);
return(<div ref={box} className="absolute inset-0 overflow-hidden bg-black" aria-hidden>
{ok?<canvas ref={cv} className="absolute inset-0 h-full w-full"/>:<div className="absolute inset-0" style={{background:"linear-gradient(#000 0%,#000 38%,#fff 48%,#000 70%,#000 100%)"}}/>}
<div className="pointer-events-none absolute inset-0" style={{background:"linear-gradient(to bottom,rgba(0,0,0,.35) 0%,transparent 22%,transparent 62%,rgba(0,0,0,.72) 100%)"}}/>
<div className="pointer-events-none absolute inset-x-0 bottom-0 h-40" style={{background:"linear-gradient(to bottom,transparent,#000)"}}/>
</div>)}
