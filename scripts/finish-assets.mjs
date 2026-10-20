import {load} from 'cheerio';
import {mkdir,writeFile,readFile} from 'node:fs/promises';
await mkdir('public/fonts',{recursive:true});
const css=await (await fetch('https://fonts.googleapis.com/css2?family=Manrope:wght@200..800&display=swap',{headers:{'User-Agent':'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'}})).text();
for(const subset of ['latin-ext','latin']) {
 const section=css.split(`/* ${subset} */`)[1]?.split('}')[0];
 const url=section?.match(/url\(([^)]+)\)/)?.[1];
 if(!url)throw new Error('Missing font '+subset);
 await writeFile(`public/fonts/manrope-${subset}.woff2`,Buffer.from(await (await fetch(url)).arrayBuffer()));
}
const all={};
for(const slug of ['','scoala-de-soferi','atestate-profesionale','consultanta']){
 const $=load(await (await fetch(`https://permisatestat.ro/${slug}/`)).text());
 const srcs=[...new Set($('article img').map((_,el)=>$(el).attr('src')).get())];
 all[slug||'home']=[];
 for(let i=0;i<srcs.length;i++){
  const url=srcs[i];const name=`original-${slug||'home'}-${i}.`+(url.split('?')[0].endsWith('.png')?'png':'jpg');
  const r=await fetch(url);if(!r.ok)throw new Error(url);
  await writeFile('public/images/'+name,Buffer.from(await r.arrayBuffer()));
  all[slug||'home'].push({src:'/images/'+name,original:url});
 }
 console.log(slug||'home',srcs);
}
await writeFile('src/data/gallery.json',JSON.stringify(all,null,2));
