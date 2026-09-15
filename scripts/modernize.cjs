const fs=require('fs'),acorn=require('acorn');
for(const file of fs.readdirSync('.').filter(f=>/^app-.*\.js$/.test(f))){let s=fs.readFileSync(file,'utf8');s=s.replace(/load\(\);render\(\);[\s\S]*$/,'');const ast=acorn.parse(s,{ecmaVersion:'latest'}),edits=[],asyncNodes=new Set();
function walk(n,parents=[]){if(!n||typeof n!=='object')return;if(n.type==='CallExpression'&&n.callee.type==='Identifier'&&n.callee.name==='save'){edits.push([n.start,'await ']);const fn=[...parents].reverse().find(x=>/Function/.test(x.type));if(fn&&!fn.async)asyncNodes.add(fn);}
for(const [k,v]of Object.entries(n)){if(k==='start'||k==='end')continue;if(Array.isArray(v))v.forEach(x=>walk(x,[...parents,n]));else if(v&&typeof v==='object')walk(v,[...parents,n]);}}
walk(ast);for(const fn of asyncNodes)edits.push([fn.start,'async ']);for(const [i,v]of edits.sort((a,b)=>b[0]-a[0]))s=s.slice(0,i)+v+s.slice(i);fs.writeFileSync(file,s);}
