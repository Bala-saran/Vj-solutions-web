import type * as THREE from "three";
export type Th=typeof THREE;
export type Group=InstanceType<Th["Group"]>;export type Material=InstanceType<Th["Material"]>;export type Object3D=InstanceType<Th["Object3D"]>;export type BufferGeometry=InstanceType<Th["BufferGeometry"]>;export type Mesh=InstanceType<Th["Mesh"]>;export type Sprite=InstanceType<Th["Sprite"]>;export type SpriteMaterial=InstanceType<Th["SpriteMaterial"]>;type MeshStandardMaterialParameters=NonNullable<ConstructorParameters<Th["MeshStandardMaterial"]>[0]>;
export type Kit=ReturnType<typeof mk>;
export type Built={g:Group;upd?:(t:number,dt:number,s:number,lv:number)=>void;still?:boolean};
export type Builder=(T:Th,k:Kit,mob:boolean)=>Built;
export function mk(T:Th){const c=(o:MeshStandardMaterialParameters)=>new T.MeshStandardMaterial({transparent:true,...o});
const m={chrome:c({color:0xd8d8d8,metalness:1,roughness:.18}),ceramic:c({color:0xf2f2f2,metalness:.1,roughness:.55}),glass:c({color:0xffffff,metalness:.2,roughness:.12,depthWrite:false}),matte:c({color:0x3a3a3a,metalness:.3,roughness:.7})};
const base={chrome:1,ceramic:1,glass:.25,matte:1};const fade:Material[]=[];
return{...m,fade,set(o:number){(Object.keys(m) as (keyof typeof m)[]).forEach(n=>{m[n].opacity=base[n]*o});fade.forEach(f=>{f.opacity=o})},dispose(){Object.values(m).forEach(x=>x.dispose());fade.forEach(x=>x.dispose())}}}
export const add=(T:Th,p:Object3D,g:BufferGeometry,m:Material,x=0,y=0,z=0)=>{const o=new T.Mesh(g,m);o.position.set(x,y,z);p.add(o);return o};
export const link=(T:Th,p:Object3D,a:number[],b:number[],m:Material,r=.012)=>{const d=new T.Vector3(b[0]-a[0],b[1]-a[1],b[2]-a[2]);const o=new T.Mesh(new T.CylinderGeometry(r,r,d.length(),6),m);o.position.set((a[0]+b[0])/2,(a[1]+b[1])/2,(a[2]+b[2])/2);o.quaternion.setFromUnitVectors(new T.Vector3(0,1,0),d.normalize());p.add(o);return o};
export const tex=(T:Th,w:number,h:number)=>{const c=document.createElement("canvas");c.width=w;c.height=h;return{c,x:c.getContext("2d")!,t:(()=>{const q=new T.CanvasTexture(c);q.colorSpace=T.SRGBColorSpace;return q})()}};
export const ease=(u:number)=>{u=Math.max(0,Math.min(1,u));return u*u*(3-2*u)};
