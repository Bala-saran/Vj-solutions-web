import {readFileSync,writeFileSync,existsSync} from "fs";import {refresh,type Store} from "../src/lib/news/pipeline";
const F="public/data/news.json";const prev:Store=existsSync(F)?JSON.parse(readFileSync(F,"utf8")):{updated:null,articles:[],sources:{}};
refresh(prev,fetch,{maxAgeDays:+(process.env.NEWS_MAX_AGE_DAYS||90),maxItems:+(process.env.NEWS_MAX_ITEMS||400)}).then(s=>{writeFileSync(F,JSON.stringify(s,null,1));console.log("articles:",s.articles.length,"updated:",s.updated,"failed:",Object.entries(s.sources).filter(([,v])=>!v.ok).map(([k])=>k).join(",")||"none")});
