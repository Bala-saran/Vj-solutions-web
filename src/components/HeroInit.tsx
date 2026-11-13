"use client";
import {useEffect} from "react";
export default function HeroInit(){useEffect(()=>{let dead=false;const w=window as unknown as {__heroDead?:boolean};w.__heroDead=false;
(async()=>{const THREE=await import("three");const {default:init}=await import("@/lib/cinematic/hero");if(dead)return;init(THREE,(s:string)=>document.querySelector(s))})();
return()=>{dead=true;w.__heroDead=true}},[]);return null}
