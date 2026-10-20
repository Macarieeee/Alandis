import { load } from 'cheerio';
import { mkdir, writeFile } from 'node:fs/promises';
const base = 'https://permisatestat.ro';
const pages = ['','scoala-de-soferi','atestate-profesionale','consultanta','contact'];
await mkdir('src/data',{recursive:true});
await mkdir('public/documents',{recursive:true});
await mkdir('public/images',{recursive:true});
const content = {};
for (const slug of pages) {
  const response = await fetch(`${base}/${slug ? slug+'/' : ''}`);
  if(!response.ok) throw new Error(`Cannot fetch ${slug}`);
  const html = await response.text();
  const $ = load(html);
  const root = $('.entry-content');
  const paragraphs = root.find('p,h1,h2,h3,h4,li').map((_,el)=>$(el).text().trim()).get().filter(Boolean);
  const documents = root.find('a[href$=".docx"]').map((_,el)=>({title:$(el).text().trim(),url:$(el).attr('href')})).get();
  const images = root.find('img').map((_,el)=>$(el).attr('src')).get();
  content[slug || 'home'] = {title:$('h1.entry-title').text(),paragraphs,documents,images,source:`${base}/${slug ? slug+'/' : ''}`};
  console.log(slug || 'home', paragraphs.length+' paragraphs',documents.length+' documents',images.length+' images');
  for(let i=0;i<documents.length;i++) {
    const doc = documents[i];
    const res = await fetch(doc.url);
    if(!res.ok) throw new Error(`Document unavailable: ${doc.url}`);
    doc.local = `/documents/${i+1}.docx`;
    await writeFile(`public${doc.local}`,Buffer.from(await res.arrayBuffer()));
  }
}
await writeFile('src/data/original.json',JSON.stringify(content,null,2));
console.log('Content and documents saved.');
