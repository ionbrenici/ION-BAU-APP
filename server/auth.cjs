const {scryptSync,randomBytes,timingSafeEqual,createHash}=require('node:crypto');
const digest=s=>createHash('sha256').update(s).digest('hex');
function hash(p){if(typeof p!=='string'||p.length<12||p.length>256)throw Error('Passwort benötigt 12 bis 256 Zeichen.');const salt=randomBytes(16).toString('hex');return salt+':'+scryptSync(p,salt,64).toString('hex');}
function verify(p,h){try{const [s,k]=h.split(':');const v=scryptSync(p,s,64),b=Buffer.from(k,'hex');return b.length===v.length&&timingSafeEqual(b,v);}catch{return false;}}
module.exports={digest,hash,verify,randomBytes};
