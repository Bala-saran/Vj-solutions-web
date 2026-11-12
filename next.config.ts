import type {NextConfig} from "next";
// Static export for GitHub Pages. NEXT_PUBLIC_BASE_PATH is "" for a custom domain or user site, "/repo-name" for a project site.
const base=process.env.NEXT_PUBLIC_BASE_PATH||"";
const nextConfig:NextConfig={output:"export",basePath:base,assetPrefix:base||undefined,trailingSlash:true,images:{unoptimized:true},cacheComponents:false,
turbopack:{rules:{"*.css":{loaders:["@tailwindcss/turbopack"],as:"*.css"}}}};
export default nextConfig;
