import{D as ee,H as te,I as ae,A as y,r as v,z as ne,az as le,k as oe,j as m,l as ue,M as ie,au as re,b as l,L as k,F as R,a4 as T,aA as se,aB as ce,O as de,ag as S,aC as fe,aq as ve,aD as me}from"./index-C9yqJSFV.js";import{m as xe,b as ge,u as he,a as _,c as G,d as we}from"./VTextField-FfkoJG28.js";import{I as Ve}from"./VImg-_speSVzn.js";const ye=ee({autoGrow:Boolean,autofocus:Boolean,counter:[Boolean,Number,String],counterValue:Function,prefix:String,placeholder:String,persistentPlaceholder:Boolean,persistentCounter:Boolean,noResize:Boolean,rows:{type:[Number,String],default:5,validator:e=>!isNaN(parseFloat(e))},maxRows:{type:[Number,String],validator:e=>!isNaN(parseFloat(e))},suffix:String,modelModifiers:Object,...xe(),...ge()},"VTextarea"),Ie=te()({name:"VTextarea",directives:{Intersect:Ve},inheritAttrs:!1,props:ye(),emits:{"click:control":e=>!0,"mousedown:control":e=>!0,"update:focused":e=>!0,"update:modelValue":e=>!0},setup(e,E){let{attrs:C,emit:M,slots:i}=E;const o=ae(e,"modelValue"),{isFocused:f,focus:U,blur:O}=he(e),j=y(()=>typeof e.counterValue=="function"?e.counterValue(o.value):(o.value||"").toString().length),$=y(()=>{if(C.maxlength)return C.maxlength;if(!(!e.counter||typeof e.counter!="number"&&typeof e.counter!="string"))return e.counter});function q(t,n){var a,u;!e.autofocus||!t||(u=(a=n[0].target)==null?void 0:a.focus)==null||u.call(a)}const N=v(),x=v(),z=ne(""),g=v(),L=y(()=>e.persistentPlaceholder||f.value||e.active);function F(){var t;g.value!==document.activeElement&&((t=g.value)==null||t.focus()),f.value||U()}function J(t){F(),M("click:control",t)}function K(t){M("mousedown:control",t)}function Q(t){t.stopPropagation(),F(),S(()=>{o.value="",fe(e["onClick:clear"],t)})}function W(t){var a;const n=t.target;if(o.value=n.value,(a=e.modelModifiers)!=null&&a.trim){const u=[n.selectionStart,n.selectionEnd];S(()=>{n.selectionStart=u[0],n.selectionEnd=u[1]})}}const c=v(),h=v(Number(e.rows)),P=y(()=>["plain","underlined"].includes(e.variant));le(()=>{e.autoGrow||(h.value=Number(e.rows))});function d(){e.autoGrow&&S(()=>{if(!c.value||!x.value)return;const t=getComputedStyle(c.value),n=getComputedStyle(x.value.$el),a=parseFloat(t.getPropertyValue("--v-field-padding-top"))+parseFloat(t.getPropertyValue("--v-input-padding-top"))+parseFloat(t.getPropertyValue("--v-field-padding-bottom")),u=c.value.scrollHeight,w=parseFloat(t.lineHeight),I=Math.max(parseFloat(e.rows)*w+a,parseFloat(n.getPropertyValue("--v-input-control-height"))),b=parseFloat(e.maxRows)*w+a||1/0,s=me(u??0,I,b);h.value=Math.floor((s-a)/w),z.value=ve(s)})}oe(d),m(o,d),m(()=>e.rows,d),m(()=>e.maxRows,d),m(()=>e.density,d);let r;return m(c,t=>{t?(r=new ResizeObserver(d),r.observe(c.value)):r==null||r.disconnect()}),ue(()=>{r==null||r.disconnect()}),ie(()=>{const t=!!(i.counter||e.counter||e.counterValue),n=!!(t||i.details),[a,u]=re(C),{modelValue:w,...I}=_.filterProps(e),b=G.filterProps(e);return l(_,k({ref:N,modelValue:o.value,"onUpdate:modelValue":s=>o.value=s,class:["v-textarea v-text-field",{"v-textarea--prefixed":e.prefix,"v-textarea--suffixed":e.suffix,"v-text-field--prefixed":e.prefix,"v-text-field--suffixed":e.suffix,"v-textarea--auto-grow":e.autoGrow,"v-textarea--no-resize":e.noResize||e.autoGrow,"v-input--plain-underlined":P.value},e.class],style:e.style},a,I,{centerAffix:h.value===1&&!P.value,focused:f.value}),{...i,default:s=>{let{id:V,isDisabled:A,isDirty:B,isReadonly:X,isValid:Y}=s;return l(G,k({ref:x,style:{"--v-textarea-control-height":z.value},onClick:J,onMousedown:K,"onClick:clear":Q,"onClick:prependInner":e["onClick:prependInner"],"onClick:appendInner":e["onClick:appendInner"]},b,{id:V.value,active:L.value||B.value,centerAffix:h.value===1&&!P.value,dirty:B.value||e.dirty,disabled:A.value,focused:f.value,error:Y.value===!1}),{...i,default:Z=>{let{props:{class:H,...D}}=Z;return l(R,null,[e.prefix&&l("span",{class:"v-text-field__prefix"},[e.prefix]),T(l("textarea",k({ref:g,class:H,value:o.value,onInput:W,autofocus:e.autofocus,readonly:X.value,disabled:A.value,placeholder:e.placeholder,rows:e.rows,name:e.name,onFocus:F,onBlur:O},D,u),null),[[se("intersect"),{handler:q},null,{once:!0}]]),e.autoGrow&&T(l("textarea",{class:[H,"v-textarea__sizer"],id:`${D.id}-sizer`,"onUpdate:modelValue":p=>o.value=p,ref:c,readonly:!0,"aria-hidden":"true"},null),[[ce,o.value]]),e.suffix&&l("span",{class:"v-text-field__suffix"},[e.suffix])])}})},details:n?s=>{var V;return l(R,null,[(V=i.details)==null?void 0:V.call(i,s),t&&l(R,null,[l("span",null,null),l(we,{active:e.persistentCounter||f.value,value:j.value,max:$.value,disabled:e.disabled},i.counter)])])}:void 0})}),de({},N,x,g)}});export{Ie as V};
