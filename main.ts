import{mkdirSync as a,readdirSync as b,readFileSync as c,writeFileSync as d}from'node:fs';
import{join as e}from'node:path';
function run(p,q){
const D=new Int32Array(256),C=new Int32Array(64),M=new Int32Array(256),o=new Uint8Array(65536);
let s=0,t=0,l=0,i=0,pc=0,n=p.length,k=0;
const R=x=>[o.subarray(0,l),x];
for(;;){
if(k===1e6)return R(10);
if(pc<0||pc>=n)return R(9);
const f=p[pc];
if(!(f<=7||(f>=16&&f<=30)||(f>=32&&f<=34)||(f>=48&&f<=52)||f===64||f===65||(f>=80&&f<=83)))return R(5);
const m=f===1?1:f===2?4:f>=48&&f<=51?2:0;
if(pc+m>=n)return R(9);
const u=f===7?3:(f===5||f===6||f===65||(f>=16&&f<=30&&f!==23&&f!==27)||(f>=32&&f<=34))?2:(f<3||f===48||f===51||f===52||f===82)?0:1;
const v=(f===4||f===5)?2:f===6?3:(f===1||f===2||f===64||f===82||(f>=16&&f<=30)||(f>=32&&f<=34))?1:0;
k++;
if(s<u)return R(2);
if(s-u+v>256)return R(3);
const x=pc+1+m;pc=x;
if(f===0)return R(0);
else if(f===1)D[s++]=(p[x-1]<<24)>>24;
else if(f===2)D[s++]=p[x-4]|(p[x-3]<<8)|(p[x-2]<<16)|(p[x-1]<<24);
else if(f===3)s--;
else if(f===4){D[s]=D[s-1];s++;}
else if(f===5){const y=D[s-1];D[s-1]=D[s-2];D[s-2]=y;}
else if(f===6){D[s]=D[s-2];s++;}
else if(f===7){const y=D[s-3];D[s-3]=D[s-2];D[s-2]=D[s-1];D[s-1]=y;}
else if(f===23)D[s-1]=-D[s-1]|0;
else if(f===27)D[s-1]=~D[s-1];
else if(f>=16&&f<=34){
const B=D[s-1],A=D[s-2];let r;
if(f===16)r=(A+B)|0;
else if(f===17)r=(A-B)|0;
else if(f===18)r=Math.imul(A,B);
else if(f===19){if(!B)return R(4);r=A===-2147483648&&B===-1?A:(A/B)|0;}
else if(f===20){if(!B)return R(4);r=B===-1?0:A%B|0;}
else if(f===21){if(!B)return R(4);r=Math.floor((A>>>0)/(B>>>0))|0;}
else if(f===22){if(!B)return R(4);r=(A>>>0)%(B>>>0)|0;}
else if(f===24)r=A&B;
else if(f===25)r=A|B;
else if(f===26)r=A^B;
else if(f===28)r=A<<(B&31);
else if(f===29)r=A>>(B&31);
else if(f===30)r=(A>>>(B&31))|0;
else if(f===32)r=A===B?1:0;
else if(f===33)r=A<B?1:0;
else r=(A>>>0)<(B>>>0)?1:0;
D[s-2]=r;s--;
}
else if(f>=48&&f<=50){
const rel=((p[x-2]|(p[x-1]<<8))<<16)>>16;let take=true;
if(f!==48){const w=D[--s];take=f===49?w===0:w!==0;}
if(take)pc=x+rel;
}
else if(f===51){if(t===64)return R(7);C[t++]=x;pc=p[x-2]|(p[x-1]<<8);}
else if(f===52){if(!t)return R(8);pc=C[--t];}
else if(f===64){const w=D[s-1];if(w<0||w>255)return R(6);D[s-1]=M[w];}
else if(f===65){const w=D[s-1],z=D[s-2];if(w<0||w>255)return R(6);s-=2;M[w]=z;}
else if(f===80){
const str=String(D[s-1]),L=str.length;
if(l+L>65536)return R(11);
s--;
for(let j=0;j<L;j++)o[l++]=str.charCodeAt(j);
}
else if(f===81){if(l+1>65536)return R(11);o[l++]=D[--s]&255;}
else if(f===82)D[s++]=i<q.length?q[i++]:-1;
else return R(D[--s]&255);
}
}
const I=process.env.MAKEFUN_INPUT_DIR??'/input',O=process.env.MAKEFUN_OUTPUT_DIR??'/output';
for(const id of b(I).sort()){
const[bytes,code]=run(new Uint8Array(c(e(I,id,'program.bin'))),new Uint8Array(c(e(I,id,'input.bin'))));
a(e(O,id),{recursive:true});
d(e(O,id,'stdout.bin'),bytes);
d(e(O,id,'exit.txt'),`${code}\n`);
}
