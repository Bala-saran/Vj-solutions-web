export type Source={id:string;name:string;url:string;category:string};
// Official engineering blogs, research feeds and advisories. Edit freely; each is fetched once per run.
export const SOURCES:Source[]=[
{id:"openai",name:"OpenAI News",url:"https://openai.com/news/rss.xml",category:"Artificial Intelligence"},
{id:"google-ai",name:"Google AI Blog",url:"https://blog.google/technology/ai/rss/",category:"Artificial Intelligence"},
{id:"huggingface",name:"Hugging Face Blog",url:"https://huggingface.co/blog/feed.xml",category:"Machine Learning"},
{id:"aws-ml",name:"AWS Machine Learning Blog",url:"https://aws.amazon.com/blogs/machine-learning/feed/",category:"Machine Learning"},
{id:"arxiv-ai",name:"arXiv cs.AI",url:"https://rss.arxiv.org/rss/cs.AI",category:"AI Research"},
{id:"github",name:"GitHub Blog",url:"https://github.blog/feed/",category:"Developer Tools"},
{id:"meta-eng",name:"Engineering at Meta",url:"https://engineering.fb.com/feed/",category:"Software Engineering"},
{id:"cisa",name:"CISA Advisories",url:"https://www.cisa.gov/cybersecurity-advisories/all.xml",category:"Cybersecurity"},
{id:"krebs",name:"Krebs on Security",url:"https://krebsonsecurity.com/feed/",category:"Cybersecurity"},
{id:"aws",name:"AWS News Blog",url:"https://aws.amazon.com/blogs/aws/feed/",category:"Cloud Computing"},
{id:"cloudflare",name:"Cloudflare Blog",url:"https://blog.cloudflare.com/rss/",category:"Cloud Computing"},
{id:"android",name:"Android Developers Blog",url:"https://android-developers.googleblog.com/feeds/posts/default",category:"Mobile Technology"},
{id:"mit-tr",name:"MIT Technology Review",url:"https://www.technologyreview.com/feed/",category:"Artificial Intelligence"},
{id:"ieee",name:"IEEE Spectrum",url:"https://spectrum.ieee.org/feeds/feed.rss",category:"Robotics and Automation"},
{id:"ars",name:"Ars Technica",url:"https://feeds.arstechnica.com/arstechnica/technology-lab",category:"Software Engineering"}];
export const CATEGORIES=["Artificial Intelligence","Machine Learning","AI Research","Software Engineering","Cybersecurity","Cloud Computing","Developer Tools","Mobile Technology","Data Science","Robotics and Automation"];
