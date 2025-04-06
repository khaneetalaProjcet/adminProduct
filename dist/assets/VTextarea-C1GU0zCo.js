import{D as p,G as ee,H as te,A as y,r as v,z as ae,ap as ne,k as le,j as m,l as oe,K as ue,al as ie,b as l,J as R,F as b,Z as T,aq as re,ar as se,as as S,at as ce,ai as de,au as fe}from"./index-3Gb3Dr87.js";import{m as ve,b as me,u as xe,a as _,f as ge,c as he,d as we}from"./VTextField-Bih2bCYg.js";import{f as Ve}from"./index-MdKM_L2w.js";import{I as ye}from"./VImg-BJXVsm4H.js";const Fe=p({autoGrow:Boolean,autofocus:Boolean,counter:[Boolean,Number,String],counterValue:Function,prefix:String,placeholder:String,persistentPlaceholder:Boolean,persistentCounter:Boolean,noResize:Boolean,rows:{type:[Number,String],default:5,validator:e=>!isNaN(parseFloat(e))},maxRows:{type:[Number,String],validator:e=>!isNaN(parseFloat(e))},suffix:String,modelModifiers:Object,...ve(),...me()},"VTextarea"),Re=ee()({name:"VTextarea",directives:{Intersect:ye},inheritAttrs:!1,props:Fe(),emits:{"click:control":e=>!0,"mousedown:control":e=>!0,"update:focused":e=>!0,"update:modelValue":e=>!0},setup(e,D){let{attrs:F,emit:H,slots:i}=D;const o=te(e,"modelValue"),{isFocused:f,focus:E,blur:U}=xe(e),O=y(()=>typeof e.counterValue=="function"?e.counterValue(o.value):(o.value||"").toString().length),j=y(()=>{if(F.maxlength)return F.maxlength;if(!(!e.counter||typeof e.counter!="number"&&typeof e.counter!="string"))return e.counter});function $(t,n){var a,u;!e.autofocus||!t||(u=(a=n[0].target)==null?void 0:a.focus)==null||u.call(a)}const M=v(),x=v(),z=ae(""),g=v(),q=y(()=>e.persistentPlaceholder||f.value||e.active);function C(){var t;g.value!==document.activeElement&&((t=g.value)==null||t.focus()),f.value||E()}function J(t){C(),H("click:control",t)}function K(t){H("mousedown:control",t)}function Z(t){t.stopPropagation(),C(),S(()=>{o.value="",ce(e["onClick:clear"],t)})}function L(t){var a;const n=t.target;if(o.value=n.value,(a=e.modelModifiers)!=null&&a.trim){const u=[n.selectionStart,n.selectionEnd];S(()=>{n.selectionStart=u[0],n.selectionEnd=u[1]})}}const c=v(),h=v(+e.rows),P=y(()=>["plain","underlined"].includes(e.variant));ne(()=>{e.autoGrow||(h.value=+e.rows)});function d(){e.autoGrow&&S(()=>{if(!c.value||!x.value)return;const t=getComputedStyle(c.value),n=getComputedStyle(x.value.$el),a=parseFloat(t.getPropertyValue("--v-field-padding-top"))+parseFloat(t.getPropertyValue("--v-input-padding-top"))+parseFloat(t.getPropertyValue("--v-field-padding-bottom")),u=c.value.scrollHeight,w=parseFloat(t.lineHeight),k=Math.max(parseFloat(e.rows)*w+a,parseFloat(n.getPropertyValue("--v-input-control-height"))),I=parseFloat(e.maxRows)*w+a||1/0,s=fe(u??0,k,I);h.value=Math.floor((s-a)/w),z.value=de(s)})}le(d),m(o,d),m(()=>e.rows,d),m(()=>e.maxRows,d),m(()=>e.density,d);let r;return m(c,t=>{t?(r=new ResizeObserver(d),r.observe(c.value)):r==null||r.disconnect()}),oe(()=>{r==null||r.disconnect()}),ue(()=>{const t=!!(i.counter||e.counter||e.counterValue),n=!!(t||i.details),[a,u]=ie(F),{modelValue:w,...k}=_.filterProps(e),I=ge(e);return l(_,R({ref:M,modelValue:o.value,"onUpdate:modelValue":s=>o.value=s,class:["v-textarea v-text-field",{"v-textarea--prefixed":e.prefix,"v-textarea--suffixed":e.suffix,"v-text-field--prefixed":e.prefix,"v-text-field--suffixed":e.suffix,"v-textarea--auto-grow":e.autoGrow,"v-textarea--no-resize":e.noResize||e.autoGrow,"v-input--plain-underlined":P.value},e.class],style:e.style},a,k,{centerAffix:h.value===1&&!P.value,focused:f.value}),{...i,default:s=>{let{id:V,isDisabled:A,isDirty:B,isReadonly:Q,isValid:W}=s;return l(he,R({ref:x,style:{"--v-textarea-control-height":z.value},onClick:J,onMousedown:K,"onClick:clear":Z,"onClick:prependInner":e["onClick:prependInner"],"onClick:appendInner":e["onClick:appendInner"]},I,{id:V.value,active:q.value||B.value,centerAffix:h.value===1&&!P.value,dirty:B.value||e.dirty,disabled:A.value,focused:f.value,error:W.value===!1}),{...i,default:X=>{let{props:{class:N,...G}}=X;return l(b,null,[e.prefix&&l("span",{class:"v-text-field__prefix"},[e.prefix]),T(l("textarea",R({ref:g,class:N,value:o.value,onInput:L,autofocus:e.autofocus,readonly:Q.value,disabled:A.value,placeholder:e.placeholder,rows:e.rows,name:e.name,onFocus:C,onBlur:U},G,u),null),[[re("intersect"),{handler:$},null,{once:!0}]]),e.autoGrow&&T(l("textarea",{class:[N,"v-textarea__sizer"],id:`${G.id}-sizer`,"onUpdate:modelValue":Y=>o.value=Y,ref:c,readonly:!0,"aria-hidden":"true"},null),[[se,o.value]]),e.suffix&&l("span",{class:"v-text-field__suffix"},[e.suffix])])}})},details:n?s=>{var V;return l(b,null,[(V=i.details)==null?void 0:V.call(i,s),t&&l(b,null,[l("span",null,null),l(we,{active:e.persistentCounter||f.value,value:O.value,max:j.value,disabled:e.disabled},i.counter)])])}:void 0})}),Ve({},M,x,g)}});export{Re as V};
