import{D as b,M as _,aa as B,N as T,ay as A,P as C,az as O,Q as E,R as W,aA as z,G as p,ae as $,ac as L,bc as I,aR as D,T as F,bd as M,K as H,b as m,V as j,ah as q,b2 as G,bE as w,bx as S,B as P,bF as N}from"./index-3Gb3Dr87.js";import{V as J}from"./VImg-BJXVsm4H.js";class v{constructor(o){let{x:a,y:i,width:r,height:s}=o;this.x=a,this.y=i,this.width=r,this.height=s}get top(){return this.y}get bottom(){return this.y+this.height}get left(){return this.x}get right(){return this.x+this.width}}function U(e,o){return{x:{before:Math.max(0,o.left-e.left),after:Math.max(0,e.right-o.right)},y:{before:Math.max(0,o.top-e.top),after:Math.max(0,e.bottom-o.bottom)}}}function Z(e){return Array.isArray(e)?new v({x:e[0],y:e[1],width:0,height:0}):e.getBoundingClientRect()}function k(e){const o=e.getBoundingClientRect(),a=getComputedStyle(e),i=a.transform;if(i){let r,s,t,n,l;if(i.startsWith("matrix3d("))r=i.slice(9,-1).split(/, /),s=+r[0],t=+r[5],n=+r[12],l=+r[13];else if(i.startsWith("matrix("))r=i.slice(7,-1).split(/, /),s=+r[0],t=+r[3],n=+r[4],l=+r[5];else return new v(o);const f=a.transformOrigin,c=o.x-n-(1-s)*parseFloat(f),d=o.y-l-(1-t)*parseFloat(f.slice(f.indexOf(" ")+1)),h=s?o.width/s:e.offsetWidth+1,g=t?o.height/t:e.offsetHeight+1;return new v({x:c,y:d,width:h,height:g})}else return new v(o)}function tt(e,o,a){if(typeof e.animate>"u")return{finished:Promise.resolve()};let i;try{i=e.animate(o,a)}catch{return{finished:Promise.resolve()}}return typeof i.finished>"u"&&(i.finished=new Promise(r=>{i.onfinish=()=>{r(i)}})),i}const et="cubic-bezier(0.4, 0, 0.2, 1)",nt="cubic-bezier(0.0, 0, 0.2, 1)",st="cubic-bezier(0.4, 0, 1, 1)",y=Symbol("Forwarded refs");function x(e,o){let a=e;for(;a;){const i=Reflect.getOwnPropertyDescriptor(a,o);if(i)return i;a=Object.getPrototypeOf(a)}}function it(e){for(var o=arguments.length,a=new Array(o>1?o-1:0),i=1;i<o;i++)a[i-1]=arguments[i];return e[y]=a,new Proxy(e,{get(r,s){if(Reflect.has(r,s))return Reflect.get(r,s);if(!(typeof s=="symbol"||s.startsWith("$")||s.startsWith("__"))){for(const t of a)if(t.value&&Reflect.has(t.value,s)){const n=Reflect.get(t.value,s);return typeof n=="function"?n.bind(t.value):n}}},has(r,s){if(Reflect.has(r,s))return!0;if(typeof s=="symbol"||s.startsWith("$")||s.startsWith("__"))return!1;for(const t of a)if(t.value&&Reflect.has(t.value,s))return!0;return!1},set(r,s,t){if(Reflect.has(r,s))return Reflect.set(r,s,t);if(typeof s=="symbol"||s.startsWith("$")||s.startsWith("__"))return!1;for(const n of a)if(n.value&&Reflect.has(n.value,s))return Reflect.set(n.value,s,t);return!1},getOwnPropertyDescriptor(r,s){var n;const t=Reflect.getOwnPropertyDescriptor(r,s);if(t)return t;if(!(typeof s=="symbol"||s.startsWith("$")||s.startsWith("__"))){for(const l of a){if(!l.value)continue;const f=x(l.value,s)??("_"in l.value?x((n=l.value._)==null?void 0:n.setupState,s):void 0);if(f)return f}for(const l of a){const f=l.value&&l.value[y];if(!f)continue;const c=f.slice();for(;c.length;){const d=c.shift(),h=x(d.value,s);if(h)return h;const g=d.value&&d.value[y];g&&c.push(...g)}}}}})}const K=b({start:Boolean,end:Boolean,icon:_,image:String,text:String,...B(),...T(),...A(),...C(),...O(),...E(),...W(),...z({variant:"flat"})},"VAvatar"),at=p()({name:"VAvatar",props:K(),setup(e,o){let{slots:a}=o;const{themeClasses:i}=$(e),{borderClasses:r}=L(e),{colorClasses:s,colorStyles:t,variantClasses:n}=I(e),{densityClasses:l}=D(e),{roundedClasses:f}=F(e),{sizeClasses:c,sizeStyles:d}=M(e);return H(()=>m(e.tag,{class:["v-avatar",{"v-avatar--start":e.start,"v-avatar--end":e.end},i.value,r.value,s.value,l.value,f.value,c.value,n.value,e.class],style:[t.value,d.value,e.style]},{default:()=>[a.default?m(q,{key:"content-defaults",defaults:{VImg:{cover:!0,src:e.image},VIcon:{icon:e.icon}}},{default:()=>[a.default()]}):e.image?m(J,{key:"image",src:e.image,alt:"",cover:!0},null):e.icon?m(j,{key:"icon",icon:e.icon},null):e.text,G(!1,"v-avatar")]})),{}}}),Q=b({disabled:Boolean,group:Boolean,hideOnLeave:Boolean,leaveAbsolute:Boolean,mode:String,origin:String},"transition");function u(e,o,a){return p()({name:e,props:Q({mode:a,origin:o}),setup(i,r){let{slots:s}=r;const t={onBeforeEnter(n){i.origin&&(n.style.transformOrigin=i.origin)},onLeave(n){if(i.leaveAbsolute){const{offsetTop:l,offsetLeft:f,offsetWidth:c,offsetHeight:d}=n;n._transitionInitialStyles={position:n.style.position,top:n.style.top,left:n.style.left,width:n.style.width,height:n.style.height},n.style.position="absolute",n.style.top=`${l}px`,n.style.left=`${f}px`,n.style.width=`${c}px`,n.style.height=`${d}px`}i.hideOnLeave&&n.style.setProperty("display","none","important")},onAfterLeave(n){if(i.leaveAbsolute&&(n!=null&&n._transitionInitialStyles)){const{position:l,top:f,left:c,width:d,height:h}=n._transitionInitialStyles;delete n._transitionInitialStyles,n.style.position=l||"",n.style.top=f||"",n.style.left=c||"",n.style.width=d||"",n.style.height=h||""}}};return()=>{const n=i.group?w:S;return P(n,{name:i.disabled?"":e,css:!i.disabled,...i.group?void 0:{mode:i.mode},...i.disabled?{}:t},s.default)}}})}function R(e,o){let a=arguments.length>2&&arguments[2]!==void 0?arguments[2]:"in-out";return p()({name:e,props:{mode:{type:String,default:a},disabled:Boolean,group:Boolean},setup(i,r){let{slots:s}=r;const t=i.group?w:S;return()=>P(t,{name:i.disabled?"":e,css:!i.disabled,...i.disabled?{}:o},s.default)}})}function V(){let e=arguments.length>0&&arguments[0]!==void 0?arguments[0]:"";const a=(arguments.length>1&&arguments[1]!==void 0?arguments[1]:!1)?"width":"height",i=N(`offset-${a}`);return{onBeforeEnter(t){t._parent=t.parentNode,t._initialStyle={transition:t.style.transition,overflow:t.style.overflow,[a]:t.style[a]}},onEnter(t){const n=t._initialStyle;t.style.setProperty("transition","none","important"),t.style.overflow="hidden";const l=`${t[i]}px`;t.style[a]="0",t.offsetHeight,t.style.transition=n.transition,e&&t._parent&&t._parent.classList.add(e),requestAnimationFrame(()=>{t.style[a]=l})},onAfterEnter:s,onEnterCancelled:s,onLeave(t){t._initialStyle={transition:"",overflow:t.style.overflow,[a]:t.style[a]},t.style.overflow="hidden",t.style[a]=`${t[i]}px`,t.offsetHeight,requestAnimationFrame(()=>t.style[a]="0")},onAfterLeave:r,onLeaveCancelled:r};function r(t){e&&t._parent&&t._parent.classList.remove(e),s(t)}function s(t){const n=t._initialStyle[a];t.style.overflow=t._initialStyle.overflow,n!=null&&(t.style[a]=n),delete t._initialStyle}}u("fab-transition","center center","out-in");u("dialog-bottom-transition");u("dialog-top-transition");const rt=u("fade-transition"),ot=u("scale-transition");u("scroll-x-transition");u("scroll-x-reverse-transition");u("scroll-y-transition");u("scroll-y-reverse-transition");u("slide-x-transition");u("slide-x-reverse-transition");const lt=u("slide-y-transition");u("slide-y-reverse-transition");const ft=R("expand-transition",V()),ut=R("expand-x-transition",V("",!0));export{v as B,at as V,ft as a,ot as b,tt as c,rt as d,ut as e,it as f,Z as g,U as h,nt as i,st as j,lt as k,k as n,et as s};
