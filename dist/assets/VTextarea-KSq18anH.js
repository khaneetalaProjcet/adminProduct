import{D as ee,G as te,H as ae,A as y,r as v,z as ne,as as le,k as oe,j as m,l as ue,K as ie,an as re,b as l,J as I,F as R,Z as T,at as se,au as ce,a9 as S,av as de,aj as fe,aw as ve}from"./index-BceWp4i6.js";import{m as me,b as xe,u as ge,a as _,c as D,d as he}from"./VTextField-swj-dvwS.js";import{f as we}from"./index-CM72jTuh.js";import{I as Ve}from"./VImg-DcfqTvPg.js";const ye=ee({autoGrow:Boolean,autofocus:Boolean,counter:[Boolean,Number,String],counterValue:Function,prefix:String,placeholder:String,persistentPlaceholder:Boolean,persistentCounter:Boolean,noResize:Boolean,rows:{type:[Number,String],default:5,validator:e=>!isNaN(parseFloat(e))},maxRows:{type:[Number,String],validator:e=>!isNaN(parseFloat(e))},suffix:String,modelModifiers:Object,...me(),...xe()},"VTextarea"),ke=te()({name:"VTextarea",directives:{Intersect:Ve},inheritAttrs:!1,props:ye(),emits:{"click:control":e=>!0,"mousedown:control":e=>!0,"update:focused":e=>!0,"update:modelValue":e=>!0},setup(e,E){let{attrs:F,emit:N,slots:i}=E;const o=ae(e,"modelValue"),{isFocused:f,focus:U,blur:j}=ge(e),O=y(()=>typeof e.counterValue=="function"?e.counterValue(o.value):(o.value||"").toString().length),$=y(()=>{if(F.maxlength)return F.maxlength;if(!(!e.counter||typeof e.counter!="number"&&typeof e.counter!="string"))return e.counter});function J(t,n){var a,u;!e.autofocus||!t||(u=(a=n[0].target)==null?void 0:a.focus)==null||u.call(a)}const H=v(),x=v(),M=ne(""),g=v(),K=y(()=>e.persistentPlaceholder||f.value||e.active);function C(){var t;g.value!==document.activeElement&&((t=g.value)==null||t.focus()),f.value||U()}function Z(t){C(),N("click:control",t)}function q(t){N("mousedown:control",t)}function L(t){t.stopPropagation(),C(),S(()=>{o.value="",de(e["onClick:clear"],t)})}function Q(t){var a;const n=t.target;if(o.value=n.value,(a=e.modelModifiers)!=null&&a.trim){const u=[n.selectionStart,n.selectionEnd];S(()=>{n.selectionStart=u[0],n.selectionEnd=u[1]})}}const c=v(),h=v(Number(e.rows)),P=y(()=>["plain","underlined"].includes(e.variant));le(()=>{e.autoGrow||(h.value=Number(e.rows))});function d(){e.autoGrow&&S(()=>{if(!c.value||!x.value)return;const t=getComputedStyle(c.value),n=getComputedStyle(x.value.$el),a=parseFloat(t.getPropertyValue("--v-field-padding-top"))+parseFloat(t.getPropertyValue("--v-input-padding-top"))+parseFloat(t.getPropertyValue("--v-field-padding-bottom")),u=c.value.scrollHeight,w=parseFloat(t.lineHeight),b=Math.max(parseFloat(e.rows)*w+a,parseFloat(n.getPropertyValue("--v-input-control-height"))),k=parseFloat(e.maxRows)*w+a||1/0,s=ve(u??0,b,k);h.value=Math.floor((s-a)/w),M.value=fe(s)})}oe(d),m(o,d),m(()=>e.rows,d),m(()=>e.maxRows,d),m(()=>e.density,d);let r;return m(c,t=>{t?(r=new ResizeObserver(d),r.observe(c.value)):r==null||r.disconnect()}),ue(()=>{r==null||r.disconnect()}),ie(()=>{const t=!!(i.counter||e.counter||e.counterValue),n=!!(t||i.details),[a,u]=re(F),{modelValue:w,...b}=_.filterProps(e),k=D.filterProps(e);return l(_,I({ref:H,modelValue:o.value,"onUpdate:modelValue":s=>o.value=s,class:["v-textarea v-text-field",{"v-textarea--prefixed":e.prefix,"v-textarea--suffixed":e.suffix,"v-text-field--prefixed":e.prefix,"v-text-field--suffixed":e.suffix,"v-textarea--auto-grow":e.autoGrow,"v-textarea--no-resize":e.noResize||e.autoGrow,"v-input--plain-underlined":P.value},e.class],style:e.style},a,b,{centerAffix:h.value===1&&!P.value,focused:f.value}),{...i,default:s=>{let{id:V,isDisabled:z,isDirty:A,isReadonly:W,isValid:X}=s;return l(D,I({ref:x,style:{"--v-textarea-control-height":M.value},onClick:Z,onMousedown:q,"onClick:clear":L,"onClick:prependInner":e["onClick:prependInner"],"onClick:appendInner":e["onClick:appendInner"]},k,{id:V.value,active:K.value||A.value,centerAffix:h.value===1&&!P.value,dirty:A.value||e.dirty,disabled:z.value,focused:f.value,error:X.value===!1}),{...i,default:Y=>{let{props:{class:B,...G}}=Y;return l(R,null,[e.prefix&&l("span",{class:"v-text-field__prefix"},[e.prefix]),T(l("textarea",I({ref:g,class:B,value:o.value,onInput:Q,autofocus:e.autofocus,readonly:W.value,disabled:z.value,placeholder:e.placeholder,rows:e.rows,name:e.name,onFocus:C,onBlur:j},G,u),null),[[se("intersect"),{handler:J},null,{once:!0}]]),e.autoGrow&&T(l("textarea",{class:[B,"v-textarea__sizer"],id:`${G.id}-sizer`,"onUpdate:modelValue":p=>o.value=p,ref:c,readonly:!0,"aria-hidden":"true"},null),[[ce,o.value]]),e.suffix&&l("span",{class:"v-text-field__suffix"},[e.suffix])])}})},details:n?s=>{var V;return l(R,null,[(V=i.details)==null?void 0:V.call(i,s),t&&l(R,null,[l("span",null,null),l(he,{active:e.persistentCounter||f.value,value:O.value,max:$.value,disabled:e.disabled},i.counter)])])}:void 0})}),we({},H,x,g)}});export{ke as V};
