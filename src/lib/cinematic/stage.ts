// @ts-nocheck
/* eslint-disable */
export default function initStage(THREE:any,$:any){
if(window.__vjStage)return;window.__vjStage=1;
const IC={github:"M12 .5a11.5 11.5 0 0 0-3.6 22.4c.6.1.8-.3.8-.6v-2c-3.2.7-3.9-1.4-3.9-1.4-.5-1.3-1.3-1.7-1.3-1.7-1-.7.1-.7.1-.7 1.200.1 1.800 1.200 1.800 1.200 1 1.800 2.700 1.300 3.400 1 .1-.8.4-1.300.8-1.600-2.600-.3-5.300-1.300-5.300-5.700 0-1.300.5-2.300 1.200-3.100-.1-.3-.5-1.500.1-3.100 0 0 1-.3 3.200 1.200a11 11 0 0 1 5.800 0c2.200-1.500 3.200-1.200 3.200-1.200.6 1.600.2 2.800.1 3.100.8.800 1.200 1.800 1.200 3.100 0 4.400-2.700 5.400-5.300 5.700.4.4.8 1.100.8 2.200v3.300c0 .3.2.7.8.6A11.500 11.500 0 0 0 12 .5z",
linkedin:"M20.4 20.5h-3.600v-5.600c0-1.300 0-3-1.800-3s-2.100 1.400-2.100 2.900v5.700H9.400V9h3.400v1.600c.5-.9 1.600-1.800 3.400-1.800 3.600 0 4.300 2.400 4.300 5.500v6.200zM5.300 7.400a2.100 2.100 0 1 1 0-4.200 2.100 2.100 0 0 1 0 4.200zM7.100 20.500H3.600V9h3.500v11.500z",
instagram:"M12 2.200c3.200 0 3.600 0 4.800.1 3.300.1 4.800 1.700 4.900 4.900.1 1.300.1 1.600.1 4.800s0 3.600-.1 4.800c-.1 3.200-1.700 4.800-4.900 4.900-1.300.1-1.600.1-4.800.1s-3.600 0-4.800-.1c-3.300-.1-4.800-1.700-4.900-4.900C2.200 15.600 2.200 15.200 2.200 12s0-3.600.1-4.800C2.400 3.900 4 2.400 7.200 2.300 8.400 2.200 8.800 2.200 12 2.200zM12 7a5 5 0 1 0 0 10 5 5 0 0 0 0-10zm0 8.200a3.200 3.200 0 1 1 0-6.400 3.200 3.200 0 0 1 0 6.400zm5.200-9.600a1.200 1.200 0 1 0 0 2.400 1.200 1.200 0 0 0 0-2.400z",
mail:"M2 5h20v14H2V5zm2 2v.5l8 5.500 8-5.500V7H4zm16 3-8 5.500L4 10v7h16v-7z",
whatsapp:"M12 2a10 10 0 0 0-8.600 15L2 22l5.200-1.400A10 10 0 1 0 12 2zm5.200 14.200c-.2.600-1.300 1.200-1.800 1.200-.5.100-1 .2-3.300-.7-2.800-1.100-4.600-4-4.700-4.200-.1-.2-1.100-1.500-1.100-2.800s.7-2 1-2.300c.2-.3.500-.3.700-.3h.5c.2 0 .4 0 .6.500l.9 2.100c.1.200.1.400 0 .5l-.4.600c-.1.200-.3.300-.1.600.2.300.8 1.300 1.700 2 1.100 1 2 1.300 2.300 1.400.3.100.4.100.6-.1l.8-1c.2-.2.400-.2.600-.1l2 1c.3.100.5.200.5.300.1.200.1.800-.1 1.300z"};

/* ===== Particle morph engine: one GPU Points system, scroll-progress driven ===== */
(function(){
const cv=$("#stage");let gl;
try{if(!THREE)throw 0;gl=new THREE.WebGLRenderer({canvas:cv,alpha:true,antialias:false,powerPreference:"high-performance"})}catch(e){document.documentElement.classList.add('nogl');cv&&cv.remove();return}
const mob=innerWidth<860,rm=matchMedia("(prefers-reduced-motion:reduce)").matches,N=mob?1400:3600;
let pr=Math.min(devicePixelRatio,mob?1.5:2);gl.setPixelRatio(pr);
const sc=new THREE.Scene(),cam=new THREE.PerspectiveCamera(40,1,.1,50);cam.position.z=6.2;
const grp=new THREE.Group();sc.add(grp);
function rng(s){return()=>{s|=0;s=s+0x6D2B79F5|0;let t=Math.imul(s^s>>>15,1|s);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296}}
const R=rng(7),TAU=6.2832;
const geo=new THREE.BufferGeometry(),aTo=new THREE.BufferAttribute(new Float32Array(N*3),3),aFrom=new THREE.BufferAttribute(new Float32Array(N*3),3),aR=new THREE.BufferAttribute(new Float32Array(N),1);
for(let i=0;i<N;i++)aR.array[i]=R();
geo.setAttribute("position",aTo);geo.setAttribute("aFrom",aFrom);geo.setAttribute("aR",aR);
const mat=new THREE.ShaderMaterial({transparent:true,depthWrite:false,uniforms:{uP:{value:0},uT:{value:0},uSize:{value:mob?.055:.04},uPR:{value:pr},uA:{value:.95},uCol:{value:new THREE.Color(1,1,1)}},
vertexShader:"attribute vec3 aFrom;attribute float aR;uniform float uP,uT,uSize,uPR;varying float vK,vS;void main(){float k=clamp(uP*1.5-aR*.5,0.,1.);k=k*k*(3.-2.*k);vec3 p=mix(aFrom,position,k);float s=1.-k;p+=vec3(sin(uT*.8+aR*40.),cos(uT*.7+aR*31.),sin(uT*.6+aR*17.))*.06*s;vK=k;vS=position.z*.35+.5;vec4 mv=modelViewMatrix*vec4(p,1.);gl_Position=projectionMatrix*mv;gl_PointSize=uSize*uPR*(260./-mv.z)*(.5+.7*k);}",
fragmentShader:"uniform vec3 uCol;uniform float uA;varying float vK,vS;void main(){float d=length(gl_PointCoord-.5);if(d>.5)discard;float a=smoothstep(.5,.2,d)*(.2+.8*vK)*uA;gl_FragColor=vec4(uCol*(.55+.45*clamp(vS,0.,1.)),a);}"});
const pts=new THREE.Points(geo,mat);pts.frustumCulled=false;grp.add(pts);
function setCol(){const l=getComputedStyle(document.documentElement).getPropertyValue("--bg").trim().toLowerCase();const light=l==="#fff"||l==="#ffffff";mat.uniforms.uCol.value.setScalar(light?0:1)}
setCol();addEventListener('themechange',setCol);matchMedia("(prefers-color-scheme:light)").addEventListener("change",setCol);
/* samplers: each returns a function producing one [x,y,z] on a shape */
const sph=(c,r)=>()=>{const u=R()*2-1,a=R()*TAU,s=Math.sqrt(1-u*u);return[c[0]+r*s*Math.cos(a),c[1]+r*u,c[2]+r*s*Math.sin(a)]};
const cyl=(c,r,h)=>()=>{if(R()<r/(r+h)){const a=R()*TAU,q=r*Math.sqrt(R());return[c[0]+q*Math.cos(a),c[1]+(R()<.5?h/2:-h/2),c[2]+q*Math.sin(a)]}const a=R()*TAU;return[c[0]+r*Math.cos(a),c[1]+(R()-.5)*h,c[2]+r*Math.sin(a)]};
const fru=(c,r0,r1,h)=>()=>{const t=R(),a=R()*TAU,r=r0+(r1-r0)*t;return[c[0]+r*Math.cos(a),c[1]-h/2+h*t,c[2]+r*Math.sin(a)]};
const box=(c,w,h,d)=>()=>{const A=[h*d,w*d,w*h],T=A[0]+A[1]+A[2];let x=R()*T,i=x<A[0]?0:x<A[0]+A[1]?1:2,s=R()<.5?.5:-.5,p=[(R()-.5)*w,(R()-.5)*h,(R()-.5)*d];p[i]=[w,h,d][i]*s;return[c[0]+p[0],c[1]+p[1],c[2]+p[2]]};
const tor=(c,Rr,r,arc,flat)=>()=>{const u=R()*TAU*(arc||1),v=R()*TAU,q=Rr+r*Math.cos(v),x=q*Math.cos(u),y=q*Math.sin(u),z=r*Math.sin(v);return flat?[c[0]+x,c[1]+z,c[2]+y]:[c[0]+x,c[1]+y,c[2]+z]};
const ln=(a,b,j,zr)=>()=>{const t=R(),e=j||.02;return[a[0]+(b[0]-a[0])*t+(R()-.5)*e,a[1]+(b[1]-a[1])*t+(R()-.5)*e,a[2]+(b[2]-a[2])*t+(R()-.5)*(zr||e)]};
const lnk=(P,Q,w)=>[w||1,ln(P,Q)];
const nodesLines=(pts,r,edges)=>[...pts.map(p=>[1.4,sph(p,r)]),...edges.map(e=>[.5,ln(pts[e[0]],pts[e[1]],.02)])];
const layers=(cs,xs,gap)=>{const P=[],idx=[];cs.forEach((c,l)=>{idx[l]=[];for(let i=0;i<c;i++){P.push([xs[l],(i-(c-1)/2)*gap,0]);idx[l].push(P.length-1)}});const E=[];for(let l=0;l<cs.length-1;l++)idx[l].forEach(a=>idx[l+1].forEach(b=>E.push([a,b])));return nodesLines(P,.11,E)};
const logo=k=>{const c=document.createElement("canvas");c.width=c.height=160;const x=c.getContext("2d");x.scale(160/24,160/24);x.fill(new Path2D(IC[k]),"evenodd");const d=x.getImageData(0,0,160,160).data,P=[];for(let i=3;i<d.length;i+=4)if(d[i]>128)P.push(((i-3)/4));return[[1,()=>{const p=P[(R()*P.length)|0],px=p%160+R(),py=((p/160)|0)+R();return[(px/160-.5)*3.1,-(py/160-.5)*3.1,(R()-.5)*.3]}]]};
const wfe=(g)=>{const a=new THREE.WireframeGeometry(g).attributes.position.array,L=[];for(let i=0;i<a.length;i+=6)L.push([[a[i],a[i+1],a[i+2]],[a[i+3],a[i+4],a[i+5]]]);return L.map(l=>[1,ln(l[0],l[1],.025)])};
const SC={
neural:()=>layers([3,5,5,3],[-1.5,-.5,.5,1.5],.5),
ml:()=>{const o=[];for(let i=0;i<5;i++)o.push([3,box([0,0,-1.2+i*.6],1.7,1.3,.05)]);for(const x of[-.8,0,.8])for(const y of[-.6,0,.6])o.push([.8,ln([x,y,-1.2],[x,y,1.2],.03)]);return o},
think:()=>{const K=t=>{const r=Math.cos(3*t)+2;return[r*Math.cos(2*t)*.45,r*Math.sin(2*t)*.45,-Math.sin(3*t)*.45]};const o=[[7,()=>{const p=K(R()*TAU);return[p[0]+(R()-.5)*.05,p[1]+(R()-.5)*.05,p[2]+(R()-.5)*.05]}],[1.5,tor([0,0,0],1.6,.015,1,0)]];for(let i=0;i<14;i++)o.push([.5,sph(K(i/14*TAU),.1)]);return o},
shield:()=>[[9,()=>{for(;;){const x=R()*2-1,y=R()*2.4-1.3,w=y>0?1:Math.sqrt(Math.max(0,1-(y/1.3)**2));if(Math.abs(x)<=w){const z=(R()<.5?1:-1)*(.1+.22*(1-x*x));return[x*.95,y,z]}}}],[1.5,ln([-.5,0,.36],[-.1,-.45,.36])],[1.5,ln([-.1,-.45,.36],[.55,.5,.36])]],
basket:()=>{const o=[[6,fru([0,-.3,0],.75,1.15,.9)],[1.5,tor([0,.15,0],1.15,.03,1,1)],[2,tor([0,.15,0],1.0,.035,.5,0)]];for(let i=0;i<8;i++){const a=i/8*TAU;o.push([.7,ln([.75*Math.cos(a),-.75,.75*Math.sin(a)],[1.15*Math.cos(a),.15,1.15*Math.sin(a)],.03)])}return o},
android:()=>[[4,()=>{for(;;){const p=sph([0,.35,0],.75)();if(p[1]>=.35)return p}}],[5,cyl([0,-.4,0],.7,1.1)],[1.6,cyl([-1,-.35,0],.17,.8)],[1.6,cyl([1,-.35,0],.17,.8)],[1.2,cyl([-.3,-1.3,0],.18,.55)],[1.2,cyl([.3,-1.3,0],.18,.55)],[.5,ln([-.35,1,0],[-.55,1.4,0])],[.5,ln([.35,1,0],[.55,1.4,0])]],
arch:()=>{const P=[[0,0,0],[0,1.2,.2]];for(let i=0;i<6;i++){const a=i/6*TAU;P.push([1.3*Math.cos(a),(i%2?.5:-.5),1.3*Math.sin(a)])}const E=[];for(let i=2;i<8;i++){E.push([0,i]);E.push([i,i<7?i+1:2])}E.push([0,1]);return[...P.map(p=>[1.6,box(p,.3,.3,.3)]),...E.map(e=>[.5,ln(P[e[0]],P[e[1]],.02)])]},
java:()=>{const o=[[6,fru([0,-.2,0],.8,.62,1.1)],[1.2,tor([0,.35,0],.8,.03,1,1)],[2.2,tor([.95,-.2,0],.38,.05,.5,0)],[2,tor([0,-.85,0],1.05,.04,1,1)],[1.5,cyl([0,-.95,0],1.05,.06)]];for(const x of[-.3,0,.3])for(let j=0;j<3;j++)o.push([.2,()=>{const t=R();return[x+Math.sin(t*6+j)*.12,.45+t*.9,(R()-.5)*.04]}]);return o},
sql:()=>[-1,0,1].map(y=>[3,cyl([0,y*1.0,0],1,.7)]),
three:()=>[...wfe(new THREE.IcosahedronGeometry(1.4,1)),[2,sph([0,0,0],.45)]],
doc:()=>{const o=[[4,box([0,0,0],1.2,1.6,.06)],[1.2,box([0,-.1,.12],1.3,.04,.2)]];for(let i=0;i<6;i++)o.push([.45,ln([-.4,.55-i*.2,.05],[.4-(i%3)*.15,.55-i*.2,.05],.015)]);return o},
bars:()=>{const H=[.6,1.1,.8,1.5,1,1.3],o=[[1,ln([-1.2,-.8,0],[1.2,-.8,0])],[1,ln([-1.2,-.8,0],[-1.2,1,0])]];H.forEach((h,i)=>o.push([h*2.4,box([-.85+i*.34,-.8+h/2,0],.24,h,.24)]));return o},
wave:()=>[[1,()=>{const i=(R()*64)|0,x=-1.6+i*.05,a=Math.abs(Math.sin(x*3.2))*(.25+.9*Math.exp(-x*x*.6));return[x,(R()*2-1)*a,(R()-.5)*.1]}]],
flow:()=>{const P=[0,1,2,3,4].map(i=>[-1.6+i*.8,Math.sin(i*1.1)*.5,0]);return[...P.map(p=>[2,sph(p,.17)]),...[0,1,2,3].map(i=>[1.4,ln(P[i],P[i+1],.04)])]},
brand:()=>{const T=[[[-1.3,.9],[-.6,-.9]],[[-.6,-.9],[.1,.9]],[[.7,.9],[.7,-.35]],[[.7,-.35],[.45,-.85]],[[.45,-.85],[.1,-.7]]];return T.map(s=>[2,ln([s[0][0],s[0][1],0],[s[1][0],s[1][1],0],.12,.4)])},
github:()=>logo("github"),linkedin:()=>logo("linkedin"),instagram:()=>logo("instagram"),mail:()=>logo("mail"),whatsapp:()=>logo("whatsapp")};
const NOISY={wave:1};SC.ai=()=>[[5,box([0,-.9,0],2.4,.06,1)],[3,box([0,-.2,-.3],1.3,.8,.05)]];SC.phone=()=>[[6,box([0,0,0],.8,1.5,.08)]];SC.python=()=>[[3,tor([-.35,0,0],.6,.2,1,0)],[3,tor([.35,0,0],.6,.2,1,1)]];SC.cloud=()=>[[3,sph([-.65,-.15,0],.6)],[4,sph([0,.15,0],.85)],[3,sph([.7,-.1,0],.65)]];SC.device=()=>[[6,box([0,0,0],.8,1.4,.1)]];SC.aiflow=()=>SC.flow();
function apply(k){const parts=SC[k](),W=parts.reduce((s,p)=>s+p[0],0),T=aTo.array,F=aFrom.array;let n=0;parts.forEach((p,pi)=>{const c=pi===parts.length-1?N-n:Math.floor(N*p[0]/W);for(let j=0;j<c&&n<N;j++,n++){const q=p[1]();T[n*3]=q[0];T[n*3+1]=q[1];T[n*3+2]=q[2]}});
for(let i=0;i<N;i++){if(NOISY[k]){for(let a=0;a<3;a++)F[i*3+a]=T[i*3+a]+(R()-.5)*1.6}else{const u=R()*2-1,a=R()*TAU,s=Math.sqrt(1-u*u),r=3+R()*2.5;F[i*3]=r*s*Math.cos(a);F[i*3+1]=r*u;F[i*3+2]=r*s*Math.sin(a)}}
aTo.needsUpdate=aFrom.needsUpdate=true}
/* scroll triggers: one object per section element */
let TR=[];function scan(){TR=[];document.querySelectorAll('[data-scene]').forEach(el=>{const k=el.getAttribute('data-scene');TR.push({el,key:k.includes(',')?k.split(','):k})})}scan();
const LM={GitHub:"github",LinkedIn:"linkedin",Instagram:"instagram",Email:"mail",WhatsApp:"whatsapp"};
const socials=[];let hover=null;
document.querySelectorAll("#social a").forEach(a=>{const k=LM[a.getAttribute("aria-label")];if(!k)return;socials.push(k);["pointerenter","focus"].forEach(e=>a.addEventListener(e,()=>hover=k));["pointerleave","blur"].forEach(e=>a.addEventListener(e,()=>hover=null))});
let fc=0,pk=[null,0],asm=0,cur=null,mx=0,my=0,rx=0,ry=0,spin=0,last=performance.now(),slow=0,shown=false;
addEventListener("pointermove",e=>{mx=e.clientX/innerWidth-.5;my=e.clientY/innerHeight-.5},{passive:true});
let ready=0,base=1,hw=3,gx=0;function size(){if(ready)layout(innerWidth,innerHeight)}addEventListener("resize",size);
function pick(now){let best=0,key=null;const vh=innerHeight;for(const t of TR){const r=t.el.getBoundingClientRect();if(r.bottom<0||r.top>vh)continue;const p=1-Math.abs((r.top+r.bottom)/2-vh/2)/(vh*.55);if(p>best){best=p;key=t.key}}
 if(Array.isArray(key))key=key[Math.floor(now/4000)%key.length];if(key==="social")key=socials.length?socials[Math.floor(now/3500)%socials.length]:null;return[key,Math.max(0,Math.min(1,(best-.12)/.5))]}
/* ===== Cinematic background: depth particles, neural lines, wire structures, flow paths; one shared renderer ===== */
const bgr=new THREE.Group();sc.add(bgr);
const D=mob?600:1400,bp=new Float32Array(D*3),bl=new Float32Array(D),bh=new Float32Array(D);
for(let i=0;i<D;i++){bp[i*3]=(R()-.5)*16;bp[i*3+1]=(R()-.5)*9;bp[i*3+2]=-1-R()*9;bl[i]=R();bh[i]=R()*6.28}
const bgG=new THREE.BufferGeometry();bgG.setAttribute('position',new THREE.BufferAttribute(bp,3));bgG.setAttribute('aL',new THREE.BufferAttribute(bl,1));bgG.setAttribute('aH',new THREE.BufferAttribute(bh,1));
const U={uT:{value:0},uL:{value:mob?.5:.3},uM:{value:new THREE.Vector2()},uC:mat.uniforms.uCol,uPR:mat.uniforms.uPR};
const bgM=new THREE.ShaderMaterial({transparent:true,depthWrite:false,uniforms:U,vertexShader:'attribute float aL,aH;uniform float uT,uPR,uL;uniform vec2 uM;varying float vA;void main(){vec3 p=position;float s=.15+aL*.35;p.x+=sin(uT*s+aH)*.6+uM.x*(1.+aL*2.);p.y+=cos(uT*s*.8+aH*1.7)*.5-uM.y*(1.+aL*2.);vec4 mv=modelViewMatrix*vec4(p,1.);gl_Position=projectionMatrix*mv;gl_PointSize=(1.+aL*2.)*uPR;vA=(.25+.4*aL)*mix(uL,1.,smoothstep(-.1,.6,gl_Position.x/gl_Position.w));}',fragmentShader:'uniform vec3 uC;varying float vA;void main(){if(length(gl_PointCoord-.5)>.5)discard;gl_FragColor=vec4(uC*.8,vA*.4);}'});
bgr.add(new THREE.Points(bgG,bgM));
const NN=mob?34:64,np=[],lp=[],lh=[],le=[];for(let i=0;i<NN;i++)np.push([(R()-.5)*14,(R()-.5)*7,-2-R()*5]);
for(let i=0;i<NN;i++)for(let j=i+1;j<NN;j++){if(Math.hypot(np[i][0]-np[j][0],np[i][1]-np[j][1],np[i][2]-np[j][2])<2.8){lp.push(...np[i],...np[j]);const h=R()*6.28;lh.push(h,h);le.push(0,1)}}
const lg=new THREE.BufferGeometry();lg.setAttribute('position',new THREE.Float32BufferAttribute(lp,3));lg.setAttribute('aH',new THREE.Float32BufferAttribute(lh,1));lg.setAttribute('aE',new THREE.Float32BufferAttribute(le,1));
const LU={uT:{value:0},uW:{value:0},uL:{value:mob?.5:.3},uC:mat.uniforms.uCol};
bgr.add(new THREE.LineSegments(lg,new THREE.ShaderMaterial({transparent:true,depthWrite:false,uniforms:LU,vertexShader:'attribute float aH,aE;uniform float uT,uW,uL;varying float vA;void main(){float p=.5+.5*sin(uT*.6+aH);gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);vA=p*p*p*uW*(.5+.5*sin(aE*3.14+uT*1.6+aH))*mix(uL,1.,smoothstep(-.1,.6,gl_Position.x/gl_Position.w));}',fragmentShader:'uniform vec3 uC;varying float vA;void main(){gl_FragColor=vec4(uC,vA*.4);}'})));
const ng=new THREE.BufferGeometry();ng.setAttribute('position',new THREE.Float32BufferAttribute(np.flat(),3));const nm=new THREE.PointsMaterial({size:.06,transparent:true,opacity:0,depthWrite:false});bgr.add(new THREE.Points(ng,nm));
const wmk=()=>new THREE.LineBasicMaterial({transparent:true,opacity:0,depthWrite:false});
const wS=new THREE.LineSegments(new THREE.WireframeGeometry(new THREE.IcosahedronGeometry(2.6,2)),wmk()),wT=new THREE.LineSegments(new THREE.WireframeGeometry(new THREE.TorusGeometry(2.2,.55,12,36)),wmk()),wG=new THREE.GridHelper(24,30);wG.material=wmk();wG.position.set(0,-2.3,-3);bgr.add(wS,wT,wG);
const FP=mob?160:320,fa=new Float32Array(FP*3),fb=new Float32Array(FP*3),fs=new Float32Array(FP),SG=[0,1,2,3,4].map(i=>[-1+i*.5,Math.sin(i*1.3)*.5]);
for(let i=0;i<FP;i++){const g=i%4;fa.set([SG[g][0],SG[g][1]+(R()-.5)*.1,0],i*3);fb.set([SG[g+1][0],SG[g+1][1]+(R()-.5)*.1,0],i*3);fs[i]=R()}
const fg=new THREE.BufferGeometry();fg.setAttribute('position',new THREE.BufferAttribute(fa,3));fg.setAttribute('aB',new THREE.BufferAttribute(fb,3));fg.setAttribute('aS',new THREE.BufferAttribute(fs,1));
const FU={uT:{value:0},uW:{value:0},uHW:{value:3},uC:mat.uniforms.uCol};
const fpt=new THREE.Points(fg,new THREE.ShaderMaterial({transparent:true,depthWrite:false,uniforms:FU,vertexShader:'attribute vec3 aB;attribute float aS;uniform float uT,uHW;varying float vF;void main(){float f=fract(uT*.12+aS);vec3 p=mix(position,aB,f);p.x*=uHW;p.z=-1.5;p.y+=sin(f*6.28+aS*9.)*.12;vF=sin(f*3.14);gl_Position=projectionMatrix*modelViewMatrix*vec4(p,1.);gl_PointSize=2.5;}',fragmentShader:'uniform vec3 uC;uniform float uW;varying float vF;void main(){gl_FragColor=vec4(uC,vF*uW*.8);}'}));fpt.frustumCulled=false;bgr.add(fpt);
const bmM=new THREE.ShaderMaterial({transparent:true,depthWrite:false,side:THREE.DoubleSide,uniforms:{uC:mat.uniforms.uCol},vertexShader:'varying vec2 vU;void main(){vU=uv;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);}',fragmentShader:'uniform vec3 uC;varying vec2 vU;void main(){float s=sin(vU.x*3.1416);gl_FragColor=vec4(uC,s*s*s*(1.-vU.y*.7)*.05);}'}),bm=[3,5.6].map((x,i)=>{const b=new THREE.Mesh(new THREE.PlaneGeometry(1.6+i,18),bmM);b.position.set(x,0,-6-i);bgr.add(b);return b});
const MOOD={home:[1,1,0,1,0],about:[1,.3,0,1,0],services:[0,0,1,.7,0],expertise:[.6,.8,.5,.4,0],projects:[.3,.3,0,.3,0],process:[0,0,.3,.4,1],contact:[.4,.3,0,.8,0]},W=[1,1,0,1,0],SECS=[...document.querySelectorAll('main>section')];
/* solid chrome / ceramic / glass meshes for the three project showcases (fade in as particles settle) */
sc.add(new THREE.AmbientLight(0xffffff,.55));const kl=new THREE.DirectionalLight(0xffffff,1.3);kl.position.set(3,4,5);sc.add(kl);
const chrome=new THREE.MeshStandardMaterial({color:0xd0d0d0,metalness:1,roughness:.2,transparent:true,opacity:0}),cer=new THREE.MeshStandardMaterial({color:0xf2f2f2,metalness:.1,roughness:.6,transparent:true,opacity:0}),glass=new THREE.MeshStandardMaterial({color:0xffffff,metalness:.2,roughness:.15,transparent:true,opacity:0,depthWrite:false});
const bx=(w,h,d)=>new THREE.BoxGeometry(w,h,d),PM={doc:new THREE.Group(),bars:new THREE.Group(),wave:new THREE.Group()};
const beam=new THREE.Mesh(bx(1.4,.03,.3),chrome);PM.doc.add(new THREE.Mesh(bx(1.2,1.6,.06),cer),beam);
for(let i=0;i<5;i++){const m=new THREE.Mesh(new THREE.SphereGeometry(.07,16,12),chrome);m.position.set(.95,.55-i*.28,.1);PM.doc.add(m)}
[.6,1.1,.8,1.5,1,1.3].forEach((h,i)=>{const m=new THREE.Mesh(bx(.24,h,.24),chrome);m.position.set(-.85+i*.34,-.8+h/2,0);PM.bars.add(m)});
const pan=new THREE.Mesh(bx(2.1,1.9,.03),glass);pan.position.set(0,.1,-.35);PM.bars.add(pan);
const WN=48,wv=new THREE.InstancedMesh(bx(.04,1,.04),chrome,WN),dm=new THREE.Object3D();PM.wave.add(wv);
const rings=[0,1,2].map(i=>{const r=new THREE.Mesh(new THREE.TorusGeometry(.8+i*.35,.008,8,48),glass);PM.wave.add(r);return r});
wv.frustumCulled=false;
/* solid objects: bevel-extruded shield + V/J monogram, neural/process nodes, android, SQL stack */
const CYL=new THREE.CylinderGeometry(.012,.012,1,6),UP=new THREE.Vector3(0,1,0),SP=new THREE.SphereGeometry(.11,24,16);
const edge=(a,b,m,g)=>{const d=new THREE.Vector3(b[0]-a[0],b[1]-a[1],b[2]-a[2]),e=new THREE.Mesh(CYL,m);e.position.set((a[0]+b[0])/2,(a[1]+b[1])/2,(a[2]+b[2])/2);e.scale.y=d.length();e.quaternion.setFromUnitVectors(UP,d.normalize());g.add(e)};
const ext=(pts,dp,bv)=>{const s=new THREE.Shape();pts.forEach((p,i)=>i?s.lineTo(p[0],p[1]):s.moveTo(p[0],p[1]));const g=new THREE.ExtrudeGeometry(s,{depth:dp,bevelEnabled:true,bevelThickness:bv,bevelSize:bv,bevelSegments:3});g.translate(0,0,-dp/2);return g};
PM.shield=new THREE.Group();{const s=new THREE.Shape();s.moveTo(0,1.25);s.lineTo(.95,.95);s.lineTo(.95,.1);s.quadraticCurveTo(.9,-.7,0,-1.3);s.quadraticCurveTo(-.9,-.7,-.95,.1);s.lineTo(-.95,.95);s.closePath();const g=new THREE.ExtrudeGeometry(s,{depth:.2,bevelEnabled:true,bevelThickness:.06,bevelSize:.06,bevelSegments:3,curveSegments:16});g.translate(0,0,-.1);PM.shield.add(new THREE.Mesh(g,chrome));const i=new THREE.Mesh(g,cer);i.scale.set(.7,.7,1.5);PM.shield.add(i)}
PM.brand=new THREE.Group();PM.brand.add(new THREE.Mesh(ext([[-1.3,.9],[-.95,.9],[-.6,-.45],[-.25,.9],[.1,.9],[-.45,-.95],[-.75,-.95]],.25,.04),chrome),new THREE.Mesh(ext([[.45,.9],[.8,.9],[.8,-.35],[.45,-.95],[.05,-.7],[.25,-.5],[.45,-.62]],.25,.04),cer));PM.brand.position.x=.1;
const lay=(cs,xs,gap,g)=>{const L=cs.map((c,l)=>Array.from({length:c},(_,i)=>[xs[l],(i-(c-1)/2)*gap,0]));L.flat().forEach(p=>{const m=new THREE.Mesh(SP,chrome);m.position.set(...p);g.add(m)});for(let l=0;l<L.length-1;l++)L[l].forEach(a=>L[l+1].forEach(b=>edge(a,b,glass,g)))};
PM.neural=new THREE.Group();lay([3,4,4,3],[-1.5,-.5,.5,1.5],.55,PM.neural);
PM.flow=new THREE.Group();{const P=[0,1,2,3,4].map(i=>[-1.6+i*.8,Math.sin(i*1.1)*.5,0]);P.forEach(p=>{const m=new THREE.Mesh(SP,chrome);m.scale.setScalar(1.5);m.position.set(...p);PM.flow.add(m)});for(let i=0;i<4;i++)edge(P[i],P[i+1],glass,PM.flow)}
PM.sql=new THREE.Group();[-1,0,1].forEach(y=>{const m=new THREE.Mesh(new THREE.CylinderGeometry(1,1,.7,48),y?chrome:cer);m.position.y=y;PM.sql.add(m)});
PM.android=new THREE.Group();{const ad=(g,m,x,y,r,h)=>{const o=new THREE.Mesh(g,m);o.position.set(x,y,0);PM.android.add(o);return o};const cy=(r,h)=>new THREE.CylinderGeometry(r,r,h,24);ad(cy(.7,1.1),cer,0,-.4,0);ad(new THREE.SphereGeometry(.7,32,16,0,6.2832,0,1.5708),chrome,0,.15,0);ad(cy(.17,.8),chrome,-1,-.35,0);ad(cy(.17,.8),chrome,1,-.35,0);ad(cy(.18,.55),chrome,-.3,-1.3,0);ad(cy(.18,.55),chrome,.3,-1.3,0);ad(new THREE.SphereGeometry(.07,12,8),cer,-.28,.45,.6);ad(new THREE.SphereGeometry(.07,12,8),cer,.28,.45,.6)}
/* AI workstation scene (stage-driven by scroll) + MediStock phone showcase */
const matte=new THREE.MeshStandardMaterial({color:0x3a3a3a,metalness:.3,roughness:.7,transparent:true,opacity:0});
const mk=(g,m,x,y,z,P)=>{const o=new THREE.Mesh(g,m);o.position.set(x,y,z);P.add(o);return o};
const limb=(a,b,r,m,P)=>{const d=new THREE.Vector3(b[0]-a[0],b[1]-a[1],b[2]-a[2]),o=new THREE.Mesh(new THREE.CylinderGeometry(r,r,d.length(),12),m);o.position.set((a[0]+b[0])/2,(a[1]+b[1])/2,(a[2]+b[2])/2);o.quaternion.setFromUnitVectors(UP,d.normalize());P.add(o)};
const cvT=(w,h)=>{const c=document.createElement('canvas');c.width=w;c.height=h;return[c,c.getContext('2d'),new THREE.CanvasTexture(c)]};
const sm2=u=>{u=Math.max(0,Math.min(1,u));return u*u*(3-2*u)};
const lt0=mat.uniforms.uCol.value.r<.5;
PM.ai=new THREE.Group();const A=PM.ai;A.scale.setScalar(.75);A.position.y=-.1;
mk(bx(2.4,.06,1),matte,0,-.9,0,A);mk(bx(1.3,.8,.05),matte,0,-.2,-.3,A);mk(new THREE.CylinderGeometry(.05,.08,.3,12),chrome,0,-.65,-.3,A);mk(bx(.9,.03,.3),cer,0,-.86,.2,A);
const[scv,sx,tx]=cvT(512,300),scrM=new THREE.MeshBasicMaterial({map:tx,transparent:true,opacity:0});mk(new THREE.PlaneGeometry(1.2,.7),scrM,0,-.2,-.27,A);
const Hx=-1.15,Hz=.25;mk(new THREE.CylinderGeometry(.19,.17,.6,20),matte,Hx,-.42,Hz,A);mk(new THREE.SphereGeometry(.14,24,16),chrome,Hx+.03,.02,Hz,A);
limb([Hx,-.7,Hz],[Hx+.45,-.72,Hz],.09,matte,A);limb([Hx+.45,-.72,Hz],[Hx+.5,-1.2,Hz],.07,matte,A);limb([Hx,-.2,Hz],[Hx+.12,-.5,Hz+.08],.06,chrome,A);limb([Hx+.12,-.5,Hz+.08],[Hx+.6,-.78,.2],.05,chrome,A);
mk(bx(.5,.05,.4),cer,Hx,-.74,Hz,A);mk(bx(.05,.55,.4),cer,Hx-.3,-.45,Hz,A);const hand=mk(new THREE.SphereGeometry(.05,12,8),chrome,Hx+.6,-.8,.2,A);
const G=[0,1,2,3,4].map(()=>{const g=new THREE.Group();g.position.set(0,.85,-.3);A.add(g);return g});
const idea=new THREE.Mesh(new THREE.IcosahedronGeometry(.32,1),new THREE.MeshBasicMaterial({wireframe:true,transparent:true,opacity:.6}));G[0].add(idea);mk(new THREE.SphereGeometry(.1,20,14),chrome,0,0,0,G[0]);
const nsub=new THREE.Group();nsub.scale.setScalar(.5);G[2].add(nsub);lay([3,4,3],[-.9,0,.9],.5,nsub);const pl2=mk(new THREE.SphereGeometry(.07,12,8),cer,0,0,0,nsub);
for(const x of[-.6,0,.6]){const t=mk(new THREE.TorusGeometry(.3,.02,8,32),chrome,x,0,0,G[3]);t.rotation.y=1.5708}const pl3=mk(new THREE.SphereGeometry(.06,12,8),cer,0,0,0,G[3]);
[[-.7,.25],[0,.35],[.7,.25]].forEach(p=>mk(bx(.35,.25,.2),cer,p[0],p[1],0,G[4]));mk(new THREE.CylinderGeometry(.18,.18,.3,24),chrome,-.7,-.25,0,G[4]);[0,.12,.24].forEach(i=>mk(new THREE.SphereGeometry(.1,12,8),glass,.6+i*.3-.15,-.2+(i?0:.05),0,G[4]));edge([-.7,-.25,0],[0,.35,0],glass,G[4]);edge([0,.35,0],[.7,-.2,0],glass,G[4]);
const LB=['Role Definition','Context','Objective','Constraints','Input Data','Expected Output','Validation Criteria'].map((t,i)=>{const[c,x,tex]=cvT(256,56);x.font='600 22px sans-serif';x.fillStyle='#fff';x.fillText(t,6,36);const m=mk(new THREE.PlaneGeometry(.9,.2),new THREE.MeshBasicMaterial({map:tex,transparent:true,opacity:0}),1.4,.55-i*.22,-.2,A);return m});
const PROMPT=['ROLE: senior software engineer','CONTEXT: sample project brief','OBJECTIVE: define the goal','CONSTRAINTS: scope, stack, limits','INPUT DATA: requirements','EXPECTED OUTPUT: structured plan','VALIDATION: review and test'],TOT=PROMPT.join('').length;
let sg=0,tc=0,lastTc=-1,lastMod=-1;let PE=null;
PM.phone=new THREE.Group();const PH=PM.phone;
{const s=new THREE.Shape(),w=.4,h=.75,r=.1;s.moveTo(-w+r,-h);s.lineTo(w-r,-h);s.quadraticCurveTo(w,-h,w,-h+r);s.lineTo(w,h-r);s.quadraticCurveTo(w,h,w-r,h);s.lineTo(-w+r,h);s.quadraticCurveTo(-w,h,-w,h-r);s.lineTo(-w,-h+r);s.quadraticCurveTo(-w,-h,-w+r,-h);const g=new THREE.ExtrudeGeometry(s,{depth:.06,bevelEnabled:true,bevelThickness:.015,bevelSize:.015,bevelSegments:3});g.translate(0,0,-.03);PH.add(new THREE.Mesh(g,matte))}
const[pc,px,pt]=cvT(360,720),pmM=new THREE.MeshBasicMaterial({map:pt,transparent:true,opacity:0});mk(new THREE.PlaneGeometry(.72,1.42),pmM,0,0,.05,PH);
const MOD=[['Medicine Finder',['Sample Medicine A','Pharmacy 1 · Available · Qty 20 · ₹42','Pharmacy 2 · Available · Qty 8 · ₹45']],['Partner Finder',['Doctors','Hospitals','Clinics','Diagnostic Labs']],['Appointments',['Sample Doctor','Tomorrow 10:00','Request appointment']],['Emergency',['EMERGENCY SUPPORT','Tap for emergency contacts']]];
function drawPh(m){px.fillStyle='#0b0b0b';px.fillRect(0,0,360,720);px.fillStyle='#fff';px.font='700 24px sans-serif';px.fillText('MediStock Finder',20,60);px.font='13px sans-serif';px.fillStyle='#888';px.fillText('SAMPLE DATA',20,84);px.strokeStyle='#555';px.lineWidth=1;px.strokeRect(20,110,320,44);px.fillStyle='#bbb';px.font='16px sans-serif';px.fillText(MOD[m][0],32,138);MOD[m][1].forEach((t,i)=>{px.strokeStyle='#333';px.strokeRect(20,180+i*80,320,64);px.fillStyle='#eee';px.font='15px sans-serif';px.fillText(t,32,218+i*80)});px.strokeStyle='#fff';px.lineWidth=2;px.strokeRect(20,640,320,48);px.fillStyle='#fff';px.font='700 15px sans-serif';px.fillText('EMERGENCY',130,670);pt.needsUpdate=true}
const OB=[],S6=new THREE.SphereGeometry(.06,12,8),og=f=>{const g=new THREE.Group();f(g);PH.add(g);OB.push(g)};
og(g=>{mk(new THREE.CylinderGeometry(.06,.06,.2,16),cer,0,0,0,g);mk(S6,chrome,0,.1,0,g);mk(S6,chrome,0,-.1,0,g)});og(g=>mk(new THREE.CylinderGeometry(.1,.1,.04,24),cer,0,0,0,g));
og(g=>{mk(bx(.08,.26,.05),chrome,0,0,0,g);mk(bx(.26,.08,.05),chrome,0,0,0,g)});og(g=>{mk(bx(.3,.2,.2),cer,0,0,0,g);mk(bx(.34,.04,.24),chrome,0,.12,0,g)});
og(g=>{mk(bx(.24,.42,.2),cer,0,0,0,g);mk(bx(.06,.14,.02),chrome,0,.1,.11,g);mk(bx(.14,.06,.02),chrome,0,.1,.11,g)});og(g=>{mk(new THREE.SphereGeometry(.07,16,12),chrome,0,.16,0,g);mk(new THREE.ConeGeometry(.12,.26,16),cer,0,-.02,0,g)});
og(g=>{const c=mk(new THREE.ConeGeometry(.08,.2,16),chrome,0,-.06,0,g);c.rotation.x=Math.PI;mk(new THREE.SphereGeometry(.08,16,12),chrome,0,.06,0,g)});og(g=>{mk(new THREE.ConeGeometry(.12,.2,16),glass,0,-.06,0,g);mk(new THREE.CylinderGeometry(.04,.04,.14,12),glass,0,.1,0,g)});
function aiUpdate(T,mo,dt){const lt=mat.uniforms.uCol.value.r<.5;matte.color.setHex(lt?0x222222:0x3a3a3a);matte.opacity=scrM.opacity=pmM.opacity=mo;
if(cur==='ai'){let bi=0,bd=1e9;[...document.querySelectorAll('[data-ai-stage]')].forEach((e,i)=>{const r=e.getBoundingClientRect(),d=Math.abs((r.top+r.bottom)/2-innerHeight/2);if(d<bd){bd=d;bi=i}});
 sg=rm?bi:sg+(bi-sg)*Math.min(1,dt*3);G.forEach((g,i)=>{const w=Math.max(0,1-Math.abs(sg-i)*1.2);g.visible=w>.01;g.scale.setScalar(Math.max(.001,w))});
 idea.material.color.copy(mat.uniforms.uCol.value);idea.rotation.y=T*.4;pl2.position.x=-.9+((T*.5)%1)*1.8;pl3.position.x=-.8+((T*.6)%1)*1.6;
 const lw=sm2(sg-.3)*(1-sm2(sg-3.2));LB.forEach((l,i)=>{l.material.opacity=lw*mo*sm2((sg-.4)*2-i*.25);l.material.color.setHex(lt?0:0xffffff)});
 const tg=sg>=.7?TOT:0;tc=rm?tg:Math.max(0,Math.min(TOT,tc+(tg>tc?1:-1)*dt*45));
 if(Math.floor(tc)!==lastTc){lastTc=Math.floor(tc);sx.fillStyle='#0b0b0b';sx.fillRect(0,0,512,300);sx.font='16px monospace';sx.fillStyle='#bdbdbd';let n=lastTc,y=30;sx.fillText('> prompt.md',16,y);for(const L of PROMPT){if(n<=0)break;y+=26;sx.fillText(L.slice(0,n),16,y);n-=L.length}tx.needsUpdate=true}
 hand.position.y=-.8+(sg>=.7&&tc<TOT&&!rm?Math.abs(Math.sin(T*10))*.02:0)}
else if(cur==='phone'&&(PE=document.querySelector('[data-scene="phone"]'))){const m=Math.floor(T/3)%4;if(m!==lastMod){drawPh(m);lastMod=m}const r=PE.getBoundingClientRect(),p=(innerHeight-r.top)/(innerHeight+r.height),cv=sm2((p-.62)/.3),rad=1.35-cv*.95;PH.rotation.y=Math.sin(T*.4)*.35;
 OB.forEach((g,i)=>{const a=T*.25+i*.785,s=rm?1:sm2(mo*9-i);g.visible=s>.01;g.scale.setScalar(Math.max(.001,s)*(1-cv*.5));g.position.set(Math.cos(a)*rad,Math.sin(i*1.7)*.6,Math.sin(a)*rad*.6+.1);g.rotation.y=T*.5});const q=cl.geometry.attributes.position.array;OB.forEach((g,i)=>{q[i*6+3]=g.position.x;q[i*6+4]=g.position.y;q[i*6+5]=g.position.z});cl.geometry.attributes.position.needsUpdate=true;cl.material.opacity=.35*mo;cl.material.color.copy(mat.uniforms.uCol.value);cl.visible=mo>.3}else if(cur==='aiflow')flowUpdate(T,mo)}
const[ac,ax,at]=cvT(256,256);for(let i=0;i<256;i++){const v=110+((i*7919)%90);ax.fillStyle='rgb('+v+','+v+','+v+')';ax.fillRect(0,i,256,1)}at.wrapS=at.wrapT=THREE.RepeatWrapping;at.needsUpdate=true;
const alu=new THREE.MeshStandardMaterial({color:0xc4c4c4,metalness:1,roughness:.55,roughnessMap:at,transparent:true,opacity:0});
PM.basket=new THREE.Group();{const b=PM.basket;mk(new THREE.CylinderGeometry(1.1,.75,.9,40),chrome,0,-.3,0,b);const r=mk(new THREE.TorusGeometry(1.1,.04,10,48),alu,0,.15,0,b);r.rotation.x=1.5708;mk(new THREE.TorusGeometry(.95,.04,10,40,Math.PI),alu,0,.15,0,b)}
PM.arch=new THREE.Group();{const P=[[0,0,0],[0,1.2,.2]];for(let i=0;i<6;i++){const a=i/6*6.2832;P.push([1.3*Math.cos(a),i%2?.5:-.5,1.3*Math.sin(a)])}P.forEach((p,i)=>mk(bx(.3,.3,.3),i?cer:alu,p[0],p[1],p[2],PM.arch));for(let i=2;i<8;i++){edge(P[0],P[i],glass,PM.arch);edge(P[i],P[i<7?i+1:2],glass,PM.arch)}edge(P[0],P[1],glass,PM.arch)}
PM.java=new THREE.Group();{const j=PM.java;mk(new THREE.CylinderGeometry(.8,.62,1.1,40),cer,0,-.2,0,j);mk(new THREE.CylinderGeometry(1.05,1.05,.06,40),alu,0,-.8,0,j);const h=mk(new THREE.TorusGeometry(.38,.06,10,24,Math.PI),chrome,.8,-.2,0,j);h.rotation.z=-1.5708;[0,1,2].forEach(i=>mk(new THREE.SphereGeometry(.07-i*.01,12,8),glass,Math.sin(i*2)*.12,.55+i*.28,0,j))}
PM.three=new THREE.Group();mk(new THREE.IcosahedronGeometry(1.1,1),cer,0,0,0,PM.three);mk(new THREE.IcosahedronGeometry(1.6,1),glass,0,0,0,PM.three);
[-1.15,-1.02,-.89].forEach((y,i)=>mk(new THREE.CylinderGeometry(.22,.22,.1,24),i?chrome:cer,0,y,0,PH));edge([0,-.89,0],[0,-.6,0],glass,PH);
const clg=new THREE.BufferGeometry();clg.setAttribute('position',new THREE.BufferAttribute(new Float32Array(OB.length*6),3));const cl=new THREE.LineSegments(clg,new THREE.LineBasicMaterial({transparent:true,opacity:0,depthWrite:false}));cl.frustumCulled=false;PH.add(cl);
PM.think=new THREE.Group();{const t=PM.think,kg=new THREE.TorusKnotGeometry(.85,.11,200,14,2,3);mk(kg,chrome,0,0,0,t);const pa=kg.attributes.position,Q=[];for(let i=0;i<10;i++){const x=i*20*15;Q.push([pa.getX(x),pa.getY(x),pa.getZ(x)]);mk(new THREE.SphereGeometry(.09,16,12),cer,Q[i][0],Q[i][1],Q[i][2],t)}for(let i=0;i<10;i++)edge(Q[i],Q[(i+3)%10],glass,t);[0,1].forEach(i=>{const r=mk(new THREE.TorusGeometry(1.45,.012,8,64),glass,0,0,0,t);r.rotation.set(i?1.2:.4,i?.5:0,0)})}
PM.python=new THREE.Group();mk(new THREE.TorusGeometry(.6,.2,16,40),chrome,-.35,0,0,PM.python);mk(new THREE.TorusGeometry(.6,.2,16,40),cer,.35,0,0,PM.python).rotation.x=1.5708;
PM.cloud=new THREE.Group();[[-.65,-.15,.6],[0,.15,.85],[.7,-.1,.65],[.2,-.2,.7]].forEach(c=>{const s=mk(new THREE.SphereGeometry(c[2],32,20),cer,c[0],c[1],0,PM.cloud);s.scale.y=.85});mk(bx(.7,.26,.4),alu,0,-1,0,PM.cloud);edge([0,-.87,0],[0,-.4,0],glass,PM.cloud);
PM.device=new THREE.Group();{const d=PM.device;mk(ext([[-.4,-.7],[.4,-.7],[.4,.7],[-.4,.7]],.1,.05),matte,0,0,0,d);mk(new THREE.PlaneGeometry(.7,1.3),glass,0,0,.16,d);mk(new THREE.SphereGeometry(.04,12,8),chrome,0,.58,.17,d);d.rotation.set(.1,-.4,0)}
PM.aiflow=new THREE.Group();const AF=[0,1,2,3,4,5].map(i=>[-1.5+i*.6,Math.sin(i*1.2)*.4,0]),afn=AF.map(p=>mk(SP,chrome,p[0],p[1],0,PM.aiflow)),afc=[0,1,2,3,4].map(()=>mk(new THREE.SphereGeometry(.045,10,8),cer,0,0,0,PM.aiflow));for(let i=0;i<5;i++)edge(AF[i],AF[i+1],glass,PM.aiflow);
function flowUpdate(T,mo){const fe=document.getElementById('flow');if(!fe)return;const r=fe.getBoundingClientRect(),k=Math.max(0,Math.min(6,(innerHeight*.85-r.top)/(innerHeight*.45)*6));afn.forEach((n,i)=>n.scale.setScalar(.6+.8*sm2(k-i)));afc.forEach((c,i)=>{const f=(T*.4+i*.2)%1,a=AF[i],b=AF[i+1];c.visible=k>i+1;c.position.set(a[0]+(b[0]-a[0])*f,a[1]+(b[1]-a[1])*f,0)})}
for(const k in PM){PM[k].visible=false;grp.add(PM[k])}
const _x=0;
const layout=(w,h)=>{gl.setSize(w,h,false);cam.aspect=w/h;cam.updateProjectionMatrix();hw=2.26*(w/h);const d=w>860;gx=d?hw*.5:0;grp.position.set(gx,d?0:.7,0);base=d?.95:.7;wS.position.set(-hw*.55,.3,-4);wT.position.set(hw*.6,-.8,-5)};
try{const pm=new THREE.PMREMGenerator(gl),es=new THREE.Scene(),pb=(w,h,d,x,y,z,i)=>{const m=new THREE.Mesh(new THREE.BoxGeometry(w,h,d),new THREE.MeshBasicMaterial({color:new THREE.Color(i,i,i)}));m.position.set(x,y,z);es.add(m)};es.add(new THREE.Mesh(new THREE.BoxGeometry(30,30,30),new THREE.MeshBasicMaterial({color:0x111111,side:THREE.BackSide})));pb(10,1,6,0,8,0,6);pb(1,8,8,-9,0,0,2.5);pb(1,8,8,9,0,0,2.5);pb(8,6,1,0,0,-9,3);sc.environment=pm.fromScene(es,.04).texture;pm.dispose()}catch(e){}
ready=1;size();
let raf=0;
function loop(now){raf=requestAnimationFrame(loop);const dt=Math.min(.05,(now-last)/1000);last=now;
 if(dt>.028){if(++slow>40&&pr>1){pr=1;gl.setPixelRatio(1);mat.uniforms.uPR.value=1;size()}}else if(slow>0)slow--;
 if(fc%90===0)scan();if(fc++%3===0)pk=pick(now);let[k,A]=pk;if(hover){k=hover;A=1}
 if(!k)A=0;else if(k!==cur){if(asm<.03||!cur){apply(k);cur=k}else A=0}
 asm=rm?A:asm+(A-asm)*Math.min(1,dt*(A>asm?5:8));
 pts.visible=asm>.003;
 shown=true;spin-=rm?0:dt*.3;const h=hover?1.6:1;
 rx+=(my*.5*h-rx)*.06;ry+=(mx*.8*h-ry)*.06;
 grp.rotation.set(rx,(cur==='ai'||cur==='phone')?Math.sin(spin*.8)*.35+ry:spin+ry-scrollY*.0006,-.08);const e=1-Math.pow(1-asm,3),ck=cur||'x',dx=((ck.charCodeAt(0)+ck.length)%3-1)*3*(1-e);grp.scale.setScalar(base*(.1+.9*e));grp.position.z=-(1-e)*9;grp.position.x=gx+dx;
 mat.uniforms.uP.value=asm;mat.uniforms.uA.value=.95*sm2(asm/.3);mat.uniforms.uT.value=rm?0:now/1000;
 const T=rm?0:now/1000,CU=mat.uniforms.uCol.value,lt=CU.r<.5;U.uT.value=T;U.uM.value.set(mx*.8,my*.5);LU.uT.value=FU.uT.value=T;FU.uHW.value=hw*.85;
 let id=document.body.dataset.mood||'home';
 const tw=MOOD[id]||MOOD.home;for(let i=0;i<5;i++)W[i]=rm?tw[i]:W[i]+(tw[i]-W[i])*Math.min(1,dt*1.5);
 bgr.position.z=Math.min(3,scrollY*.0004);bgr.rotation.y=Math.sin(T*.05)*.08+mx*.05;bm.forEach((b,i)=>{b.rotation.z=.35+Math.sin(T*.12+i*2)*.05});bgr.rotation.x=my*.03;cam.position.x=mx*.25;cam.position.y=-my*.15-scrollY*.0003;cam.lookAt(0,0,0);
 for(const o of[wS,wT,wG])o.material.color.copy(CU);nm.color.copy(CU);
 wS.material.opacity=.12*W[0];wS.rotation.y=T*.05;wS.rotation.x=T*.03;wT.material.opacity=.1*W[1];wT.rotation.x=T*.04;wT.rotation.y=T*.06;wG.material.opacity=.12*W[2];
 LU.uW.value=W[3];fpt.visible=W[4]>.01;wS.visible=W[0]>.01;wT.visible=W[1]>.01;wG.visible=W[2]>.01;if(innerWidth<=860)grp.position.y=PM[cur]?1:.7;nm.opacity=.4*W[3];FU.uW.value=W[4];
 chrome.color.setHex(lt?0x2a2a2a:0xd0d0d0);cer.color.setHex(lt?0x111111:0xf2f2f2);glass.color.setHex(lt?0:0xffffff);
 const mo=Math.max(0,Math.min(1,(asm-.55)/.35));for(const k in PM)PM[k].visible=cur===k&&mo>0;chrome.opacity=cer.opacity=alu.opacity=mo;glass.opacity=.22*mo;
 if(cur==='doc')beam.position.y=Math.sin(T*.8)*.8;aiUpdate(T,mo,dt);
 if(cur==='wave'&&mo>0){for(let i=0;i<WN;i++){const x=-1.2+i*.05,a=Math.abs(Math.sin(x*3.2))*(.25+.9*Math.exp(-x*x*.6))*2,nz=.1+Math.abs(Math.sin(i*12.9898))*1.2,h=nz+(a+.05-nz)*mo;dm.position.set(x,0,0);dm.scale.set(1,h,1);dm.updateMatrix();wv.setMatrixAt(i,dm.matrix)}wv.instanceMatrix.needsUpdate=true;rings.forEach((r,i)=>r.scale.setScalar(1+((T*.3+i*.33)%1)*.6))}
 gl.render(sc,cam)}
raf=requestAnimationFrame(loop);
document.addEventListener("visibilitychange",()=>{last=performance.now()});
addEventListener("pagehide",()=>{cancelAnimationFrame(raf);geo.dispose();mat.dispose();[bgG,lg,ng,fg].forEach(x=>x.dispose());bgM.dispose();gl.dispose()});
})();

}
