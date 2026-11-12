import {readFileSync} from "fs";import {join} from "path";import type {Store} from "./pipeline";
export function loadNews():Store{try{return JSON.parse(readFileSync(join(process.cwd(),"public/data/news.json"),"utf8"))}catch{return{updated:null,articles:[],sources:{}}}}
