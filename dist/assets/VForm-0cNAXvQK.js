import{D as p,N as b,G as v,r as F,K as V,b as y}from"./index-BceWp4i6.js";import{i as h,j as R}from"./VTextField-swj-dvwS.js";import{f as P}from"./index-CM72jTuh.js";const k=p({...b(),...h()},"VForm"),S=v()({name:"VForm",props:k(),emits:{"update:modelValue":r=>!0,submit:r=>!0},setup(r,i){let{slots:n,emit:f}=i;const a=R(r),s=F();function l(t){t.preventDefault(),a.reset()}function u(t){const o=t,e=a.validate();o.then=e.then.bind(e),o.catch=e.catch.bind(e),o.finally=e.finally.bind(e),f("submit",o),o.defaultPrevented||e.then(c=>{var m;let{valid:d}=c;d&&((m=s.value)==null||m.submit())}),o.preventDefault()}return V(()=>{var t;return y("form",{ref:s,class:["v-form",r.class],style:r.style,novalidate:!0,onReset:l,onSubmit:u},[(t=n.default)==null?void 0:t.call(n,a)])}),P(a,s)}});export{S as V};
