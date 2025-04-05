import{g as al,h as nl,i as ol,V as xe}from"./VTextField-73vQssEG.js";import{D as q,M as Q,aK as ze,N as ue,ay as Ee,R as pe,G as Z,H as oe,I as De,A as p,aE as ul,b8 as ke,ag as Oe,x as _,K as te,b as r,b0 as Le,z as E,r as ne,al as il,J as G,Z as ge,aq as Me,F as ee,V as X,aG as sl,aR as He,aL as ve,W as cl,S as rl,b9 as ye,as as Ve,E as Ge,aO as dl,Q as Se,b5 as Ue,af as vl,m as $e,b6 as qe,aB as fe,ba as fl,ak as ce,j as le,aW as ml,aA as We,ae as Ke,aQ as Pe,aa as hl,ab as gl,a$ as yl,P as bl,bb as pl,az as kl,U as Ne,ac as Vl,bc as Sl,ad as Cl,T as Il,bd as xl,b1 as Pl,be as wl,b2 as Al,ah as se,$ as Tl,ap as we,au as me,bf as Bl,aX as Rl,aF as Fl,aZ as _l,bg as zl,ai as de,k as El,bh as Dl,C as Ol,bi as Ae}from"./index-yGymRVgy.js";import{d as Te,e as Ll,V as be,f as Ml}from"./index-BRm_Gf3E.js";import{k as Hl,l as Gl,g as Ul,n as $l,a as ql,b as Wl,c as Be}from"./VMenu-uoiypAtJ.js";import{m as Kl}from"./VImg-BJXfrDAW.js";const je=Symbol.for("vuetify:selection-control-group"),Qe=q({color:String,disabled:{type:Boolean,default:null},defaultsTarget:String,error:Boolean,id:String,inline:Boolean,falseIcon:Q,trueIcon:Q,ripple:{type:[Boolean,Object],default:!0},multiple:{type:Boolean,default:null},name:String,readonly:{type:Boolean,default:null},modelValue:null,type:String,valueComparator:{type:Function,default:ze},...ue(),...Ee(),...pe()},"SelectionControlGroup"),Nl=q({...Qe({defaultsTarget:"VSelectionControl"})},"VSelectionControlGroup");Z()({name:"VSelectionControlGroup",props:Nl(),emits:{"update:modelValue":e=>!0},setup(e,s){let{slots:a}=s;const u=oe(e,"modelValue"),n=De(),m=p(()=>e.id||`v-selection-control-group-${n}`),v=p(()=>e.name||m.value),i=new Set;return ul(je,{modelValue:u,forceUpdate:()=>{i.forEach(o=>o())},onForceUpdate:o=>{i.add(o),ke(()=>{i.delete(o)})}}),Oe({[e.defaultsTarget]:{color:_(e,"color"),disabled:_(e,"disabled"),density:_(e,"density"),error:_(e,"error"),inline:_(e,"inline"),modelValue:u,multiple:p(()=>!!e.multiple||e.multiple==null&&Array.isArray(u.value)),name:v,falseIcon:_(e,"falseIcon"),trueIcon:_(e,"trueIcon"),readonly:_(e,"readonly"),ripple:_(e,"ripple"),type:_(e,"type"),valueComparator:_(e,"valueComparator")}}),te(()=>{var o;return r("div",{class:["v-selection-control-group",{"v-selection-control-group--inline":e.inline},e.class],style:e.style,role:e.type==="radio"?"radiogroup":void 0},[(o=a.default)==null?void 0:o.call(a)])}),{}}});const Xe=q({label:String,baseColor:String,trueValue:null,falseValue:null,value:null,...ue(),...Qe()},"VSelectionControl");function jl(e){const s=sl(je,void 0),{densityClasses:a}=He(e),u=oe(e,"modelValue"),n=p(()=>e.trueValue!==void 0?e.trueValue:e.value!==void 0?e.value:!0),m=p(()=>e.falseValue!==void 0?e.falseValue:!1),v=p(()=>!!e.multiple||e.multiple==null&&Array.isArray(u.value)),i=p({get(){const C=s?s.modelValue.value:u.value;return v.value?ve(C).some(k=>e.valueComparator(k,n.value)):e.valueComparator(C,n.value)},set(C){if(e.readonly)return;const k=C?n.value:m.value;let I=k;v.value&&(I=C?[...ve(u.value),k]:ve(u.value).filter(d=>!e.valueComparator(d,n.value))),s?s.modelValue.value=I:u.value=I}}),{textColorClasses:o,textColorStyles:y}=cl(p(()=>{if(!(e.error||e.disabled))return i.value?e.color:e.baseColor})),{backgroundColorClasses:x,backgroundColorStyles:V}=rl(p(()=>i.value&&!e.error&&!e.disabled?e.color:e.baseColor)),f=p(()=>i.value?e.trueIcon:e.falseIcon);return{group:s,densityClasses:a,trueValue:n,falseValue:m,model:i,textColorClasses:o,textColorStyles:y,backgroundColorClasses:x,backgroundColorStyles:V,icon:f}}const Re=Z()({name:"VSelectionControl",directives:{Ripple:Le},inheritAttrs:!1,props:Xe(),emits:{"update:modelValue":e=>!0},setup(e,s){let{attrs:a,slots:u}=s;const{group:n,densityClasses:m,icon:v,model:i,textColorClasses:o,textColorStyles:y,backgroundColorClasses:x,backgroundColorStyles:V,trueValue:f}=jl(e),C=De(),k=E(!1),I=E(!1),d=ne(),S=p(()=>e.id||`input-${C}`),P=p(()=>!e.disabled&&!e.readonly);n==null||n.onForceUpdate(()=>{d.value&&(d.value.checked=i.value)});function T(g){P.value&&(k.value=!0,ye(g.target,":focus-visible")!==!1&&(I.value=!0))}function w(){k.value=!1,I.value=!1}function U(g){g.stopPropagation()}function K(g){if(!P.value){d.value&&(d.value.checked=i.value);return}e.readonly&&n&&Ve(()=>n.forceUpdate()),i.value=g.target.checked}return te(()=>{var O,L;const g=u.label?u.label({label:e.label,props:{for:S.value}}):e.label,[D,$]=il(a),R=r("input",G({ref:d,checked:i.value,disabled:!!e.disabled,id:S.value,onBlur:w,onFocus:T,onInput:K,"aria-disabled":!!e.disabled,"aria-label":e.label,type:e.type,value:f.value,name:e.name,"aria-checked":e.type==="checkbox"?i.value:void 0},$),null);return r("div",G({class:["v-selection-control",{"v-selection-control--dirty":i.value,"v-selection-control--disabled":e.disabled,"v-selection-control--error":e.error,"v-selection-control--focused":k.value,"v-selection-control--focus-visible":I.value,"v-selection-control--inline":e.inline},m.value,e.class]},D,{style:e.style}),[r("div",{class:["v-selection-control__wrapper",o.value],style:y.value},[(O=u.default)==null?void 0:O.call(u,{backgroundColorClasses:x,backgroundColorStyles:V}),ge(r("div",{class:["v-selection-control__input"]},[((L=u.input)==null?void 0:L.call(u,{model:i,textColorClasses:o,textColorStyles:y,backgroundColorClasses:x,backgroundColorStyles:V,inputNode:R,icon:v.value,props:{onFocus:T,onBlur:w,id:S.value}}))??r(ee,null,[v.value&&r(X,{key:"icon",icon:v.value},null),R])]),[[Me("ripple"),e.ripple&&[!e.disabled&&!e.readonly,null,["center","circle"]]]])]),g&&r(al,{for:S.value,onClick:U},{default:()=>[g]})])}),{isFocused:k,input:d}}}),Ql=q({indeterminate:Boolean,indeterminateIcon:{type:Q,default:"$checkboxIndeterminate"},...Xe({falseIcon:"$checkboxOff",trueIcon:"$checkboxOn"})},"VCheckboxBtn"),Xl=Z()({name:"VCheckboxBtn",props:Ql(),emits:{"update:modelValue":e=>!0,"update:indeterminate":e=>!0},setup(e,s){let{slots:a}=s;const u=oe(e,"indeterminate"),n=oe(e,"modelValue");function m(o){u.value&&(u.value=!1)}const v=p(()=>u.value?e.indeterminateIcon:e.falseIcon),i=p(()=>u.value?e.indeterminateIcon:e.trueIcon);return te(()=>{const o=Ge(Re.filterProps(e),["modelValue"]);return r(Re,G(o,{modelValue:n.value,"onUpdate:modelValue":[y=>n.value=y,m],class:["v-checkbox-btn",e.class],style:e.style,type:"checkbox",falseIcon:v.value,trueIcon:i.value,"aria-checked":u.value?"mixed":void 0}),a)}),{}}});function Zl(e){let{selectedElement:s,containerElement:a,isRtl:u,isHorizontal:n}=e;const m=re(n,a),v=Ze(n,u,a),i=re(n,s),o=Je(n,s),y=i*.4;return v>o?o-y:v+m<o+i?o-m+i+y:v}function Jl(e){let{selectedElement:s,containerElement:a,isHorizontal:u}=e;const n=re(u,a),m=Je(u,s),v=re(u,s);return m-n/2+v/2}function Fe(e,s){const a=e?"scrollWidth":"scrollHeight";return(s==null?void 0:s[a])||0}function Yl(e,s){const a=e?"clientWidth":"clientHeight";return(s==null?void 0:s[a])||0}function Ze(e,s,a){if(!a)return 0;const{scrollLeft:u,offsetWidth:n,scrollWidth:m}=a;return e?s?m-n+u:u:a.scrollTop}function re(e,s){const a=e?"offsetWidth":"offsetHeight";return(s==null?void 0:s[a])||0}function Je(e,s){const a=e?"offsetLeft":"offsetTop";return(s==null?void 0:s[a])||0}const et=Symbol.for("vuetify:v-slide-group"),Ye=q({centerActive:Boolean,direction:{type:String,default:"horizontal"},symbol:{type:null,default:et},nextIcon:{type:Q,default:"$next"},prevIcon:{type:Q,default:"$prev"},showArrows:{type:[Boolean,String],validator:e=>typeof e=="boolean"||["always","desktop","mobile"].includes(e)},...ue(),...dl({mobile:null}),...Se(),...Ue({selectedClass:"v-slide-group-item--active"})},"VSlideGroup"),_e=Z()({name:"VSlideGroup",props:Ye(),emits:{"update:modelValue":e=>!0},setup(e,s){let{slots:a}=s;const{isRtl:u}=vl(),{displayClasses:n,mobile:m}=$e(e),v=qe(e,e.symbol),i=E(!1),o=E(0),y=E(0),x=E(0),V=p(()=>e.direction==="horizontal"),{resizeRef:f,contentRect:C}=fe(),{resizeRef:k,contentRect:I}=fe(),d=fl(),S=p(()=>({container:f.el,duration:200,easing:"easeOutQuart"})),P=p(()=>v.selected.value.length?v.items.value.findIndex(l=>l.id===v.selected.value[0]):-1),T=p(()=>v.selected.value.length?v.items.value.findIndex(l=>l.id===v.selected.value[v.selected.value.length-1]):-1);if(ce){let l=-1;le(()=>[v.selected.value,C.value,I.value,V.value],()=>{cancelAnimationFrame(l),l=requestAnimationFrame(()=>{if(C.value&&I.value){const c=V.value?"width":"height";y.value=C.value[c],x.value=I.value[c],i.value=y.value+1<x.value}if(P.value>=0&&k.el){const c=k.el.children[T.value];U(c,e.centerActive)}})})}const w=E(!1);function U(l,c){let h=0;c?h=Jl({containerElement:f.el,isHorizontal:V.value,selectedElement:l}):h=Zl({containerElement:f.el,isHorizontal:V.value,isRtl:u.value,selectedElement:l}),K(h)}function K(l){if(!ce||!f.el)return;const c=re(V.value,f.el),h=Ze(V.value,u.value,f.el);if(!(Fe(V.value,f.el)<=c||Math.abs(l-h)<16)){if(V.value&&u.value&&f.el){const{scrollWidth:b,offsetWidth:A}=f.el;l=b-A-l}V.value?d.horizontal(l,S.value):d(l,S.value)}}function g(l){const{scrollTop:c,scrollLeft:h}=l.target;o.value=V.value?h:c}function D(l){if(w.value=!0,!(!i.value||!k.el)){for(const c of l.composedPath())for(const h of k.el.children)if(h===c){U(h);return}}}function $(l){w.value=!1}let R=!1;function O(l){var c;!R&&!w.value&&!(l.relatedTarget&&((c=k.el)!=null&&c.contains(l.relatedTarget)))&&M(),R=!1}function L(){R=!0}function N(l){if(!k.el)return;function c(h){l.preventDefault(),M(h)}V.value?l.key==="ArrowRight"?c(u.value?"prev":"next"):l.key==="ArrowLeft"&&c(u.value?"next":"prev"):l.key==="ArrowDown"?c("next"):l.key==="ArrowUp"&&c("prev"),l.key==="Home"?c("first"):l.key==="End"&&c("last")}function M(l){var h,B;if(!k.el)return;let c;if(!l)c=ml(k.el)[0];else if(l==="next"){if(c=(h=k.el.querySelector(":focus"))==null?void 0:h.nextElementSibling,!c)return M("first")}else if(l==="prev"){if(c=(B=k.el.querySelector(":focus"))==null?void 0:B.previousElementSibling,!c)return M("last")}else l==="first"?c=k.el.firstElementChild:l==="last"&&(c=k.el.lastElementChild);c&&c.focus({preventScroll:!0})}function F(l){const c=V.value&&u.value?-1:1,h=(l==="prev"?-c:c)*y.value;let B=o.value+h;if(V.value&&u.value&&f.el){const{scrollWidth:b,offsetWidth:A}=f.el;B+=b-A}K(B)}const j=p(()=>({next:v.next,prev:v.prev,select:v.select,isSelected:v.isSelected})),J=p(()=>{switch(e.showArrows){case"always":return!0;case"desktop":return!m.value;case!0:return i.value||Math.abs(o.value)>0;case"mobile":return m.value||i.value||Math.abs(o.value)>0;default:return!m.value&&(i.value||Math.abs(o.value)>0)}}),ae=p(()=>Math.abs(o.value)>1),t=p(()=>{if(!f.value)return!1;const l=Fe(V.value,f.el),c=Yl(V.value,f.el);return l-c-Math.abs(o.value)>1});return te(()=>r(e.tag,{class:["v-slide-group",{"v-slide-group--vertical":!V.value,"v-slide-group--has-affixes":J.value,"v-slide-group--is-overflowing":i.value},n.value,e.class],style:e.style,tabindex:w.value||v.selected.value.length?-1:0,onFocus:O},{default:()=>{var l,c,h;return[J.value&&r("div",{key:"prev",class:["v-slide-group__prev",{"v-slide-group__prev--disabled":!ae.value}],onMousedown:L,onClick:()=>ae.value&&F("prev")},[((l=a.prev)==null?void 0:l.call(a,j.value))??r(Te,null,{default:()=>[r(X,{icon:u.value?e.nextIcon:e.prevIcon},null)]})]),r("div",{key:"container",ref:f,class:"v-slide-group__container",onScroll:g},[r("div",{ref:k,class:"v-slide-group__content",onFocusin:D,onFocusout:$,onKeydown:N},[(c=a.default)==null?void 0:c.call(a,j.value)])]),J.value&&r("div",{key:"next",class:["v-slide-group__next",{"v-slide-group__next--disabled":!t.value}],onMousedown:L,onClick:()=>t.value&&F("next")},[((h=a.next)==null?void 0:h.call(a,j.value))??r(Te,null,{default:()=>[r(X,{icon:u.value?e.prevIcon:e.nextIcon},null)]})])]}})),{selected:v.selected,scrollTo:F,scrollOffset:o,focus:M,hasPrev:ae,hasNext:t}}}),el=Symbol.for("vuetify:v-chip-group"),lt=q({column:Boolean,filter:Boolean,valueComparator:{type:Function,default:ze},...Ye(),...ue(),...Ue({selectedClass:"v-chip--selected"}),...Se(),...pe(),...We({variant:"tonal"})},"VChipGroup");Z()({name:"VChipGroup",props:lt(),emits:{"update:modelValue":e=>!0},setup(e,s){let{slots:a}=s;const{themeClasses:u}=Ke(e),{isSelected:n,select:m,next:v,prev:i,selected:o}=qe(e,el);return Oe({VChip:{color:_(e,"color"),disabled:_(e,"disabled"),filter:_(e,"filter"),variant:_(e,"variant")}}),te(()=>{const y=_e.filterProps(e);return r(_e,G(y,{class:["v-chip-group",{"v-chip-group--column":e.column},u.value,e.class],style:e.style}),{default:()=>{var x;return[(x=a.default)==null?void 0:x.call(a,{isSelected:n,select:m,next:v,prev:i,selected:o.value})]}})}),{}}});const tt=q({activeClass:String,appendAvatar:String,appendIcon:Q,closable:Boolean,closeIcon:{type:Q,default:"$delete"},closeLabel:{type:String,default:"$vuetify.close"},draggable:Boolean,filter:Boolean,filterIcon:{type:Q,default:"$complete"},label:Boolean,link:{type:Boolean,default:void 0},pill:Boolean,prependAvatar:String,prependIcon:Q,ripple:{type:[Boolean,Object],default:!0},text:String,modelValue:{type:Boolean,default:!0},onClick:Pe(),onClickOnce:Pe(),...hl(),...ue(),...Ee(),...gl(),...yl(),...bl(),...pl(),...kl(),...Se({tag:"span"}),...pe(),...We({variant:"tonal"})},"VChip"),at=Z()({name:"VChip",directives:{Ripple:Le},props:tt(),emits:{"click:close":e=>!0,"update:modelValue":e=>!0,"group:selected":e=>!0,click:e=>!0},setup(e,s){let{attrs:a,emit:u,slots:n}=s;const{t:m}=Ne(),{borderClasses:v}=Vl(e),{colorClasses:i,colorStyles:o,variantClasses:y}=Sl(e),{densityClasses:x}=He(e),{elevationClasses:V}=Cl(e),{roundedClasses:f}=Il(e),{sizeClasses:C}=xl(e),{themeClasses:k}=Ke(e),I=oe(e,"modelValue"),d=Pl(e,el,!1),S=wl(e,a),P=p(()=>e.link!==!1&&S.isLink.value),T=p(()=>!e.disabled&&e.link!==!1&&(!!d||e.link||S.isClickable.value)),w=p(()=>({"aria-label":m(e.closeLabel),onClick(g){g.preventDefault(),g.stopPropagation(),I.value=!1,u("click:close",g)}}));function U(g){var D;u("click",g),T.value&&((D=S.navigate)==null||D.call(S,g),d==null||d.toggle())}function K(g){(g.key==="Enter"||g.key===" ")&&(g.preventDefault(),U(g))}return()=>{var F;const g=S.isLink.value?"a":e.tag,D=!!(e.appendIcon||e.appendAvatar),$=!!(D||n.append),R=!!(n.close||e.closable),O=!!(n.filter||e.filter)&&d,L=!!(e.prependIcon||e.prependAvatar),N=!!(L||n.prepend),M=!d||d.isSelected.value;return I.value&&ge(r(g,G({class:["v-chip",{"v-chip--disabled":e.disabled,"v-chip--label":e.label,"v-chip--link":T.value,"v-chip--filter":O,"v-chip--pill":e.pill,[`${e.activeClass}`]:e.activeClass&&((F=S.isActive)==null?void 0:F.value)},k.value,v.value,M?i.value:void 0,x.value,V.value,f.value,C.value,y.value,d==null?void 0:d.selectedClass.value,e.class],style:[M?o.value:void 0,e.style],disabled:e.disabled||void 0,draggable:e.draggable,tabindex:T.value?0:void 0,onClick:U,onKeydown:T.value&&!P.value&&K},S.linkProps),{default:()=>{var j;return[Al(T.value,"v-chip"),O&&r(Ll,{key:"filter"},{default:()=>[ge(r("div",{class:"v-chip__filter"},[n.filter?r(se,{key:"filter-defaults",disabled:!e.filterIcon,defaults:{VIcon:{icon:e.filterIcon}}},n.filter):r(X,{key:"filter-icon",icon:e.filterIcon},null)]),[[Tl,d.isSelected.value]])]}),N&&r("div",{key:"prepend",class:"v-chip__prepend"},[n.prepend?r(se,{key:"prepend-defaults",disabled:!L,defaults:{VAvatar:{image:e.prependAvatar,start:!0},VIcon:{icon:e.prependIcon,start:!0}}},n.prepend):r(ee,null,[e.prependIcon&&r(X,{key:"prepend-icon",icon:e.prependIcon,start:!0},null),e.prependAvatar&&r(be,{key:"prepend-avatar",image:e.prependAvatar,start:!0},null)])]),r("div",{class:"v-chip__content","data-no-activator":""},[((j=n.default)==null?void 0:j.call(n,{isSelected:d==null?void 0:d.isSelected.value,selectedClass:d==null?void 0:d.selectedClass.value,select:d==null?void 0:d.select,toggle:d==null?void 0:d.toggle,value:d==null?void 0:d.value.value,disabled:e.disabled}))??e.text]),$&&r("div",{key:"append",class:"v-chip__append"},[n.append?r(se,{key:"append-defaults",disabled:!D,defaults:{VAvatar:{end:!0,image:e.appendAvatar},VIcon:{end:!0,icon:e.appendIcon}}},n.append):r(ee,null,[e.appendIcon&&r(X,{key:"append-icon",end:!0,icon:e.appendIcon},null),e.appendAvatar&&r(be,{key:"append-avatar",end:!0,image:e.appendAvatar},null)])]),R&&r("button",G({key:"close",class:"v-chip__close",type:"button","data-testid":"close-chip"},w.value),[n.close?r(se,{key:"close-defaults",defaults:{VIcon:{icon:e.closeIcon,size:"x-small"}}},n.close):r(X,{key:"close-icon",icon:e.closeIcon,size:"x-small"},null)])]}}),[[Me("ripple"),T.value&&e.ripple,null]])}}}),nt=q({renderless:Boolean,...ue()},"VVirtualScrollItem"),ot=Z()({name:"VVirtualScrollItem",inheritAttrs:!1,props:nt(),emits:{"update:height":e=>!0},setup(e,s){let{attrs:a,emit:u,slots:n}=s;const{resizeRef:m,contentRect:v}=fe(void 0,"border");le(()=>{var i;return(i=v.value)==null?void 0:i.height},i=>{i!=null&&u("update:height",i)}),te(()=>{var i,o;return e.renderless?r(ee,null,[(i=n.default)==null?void 0:i.call(n,{itemRef:m})]):r("div",G({ref:m,class:["v-virtual-scroll__item",e.class],style:e.style},a),[(o=n.default)==null?void 0:o.call(n)])})}}),ut=-1,it=1,he=100,st=q({itemHeight:{type:[Number,String],default:null},height:[Number,String]},"virtual");function ct(e,s){const a=$e(),u=E(0);we(()=>{u.value=parseFloat(e.itemHeight||0)});const n=E(0),m=E(Math.ceil((parseInt(e.height)||a.height.value)/(u.value||16))||1),v=E(0),i=E(0),o=ne(),y=ne();let x=0;const{resizeRef:V,contentRect:f}=fe();we(()=>{V.value=o.value});const C=p(()=>{var t;return o.value===document.documentElement?a.height.value:((t=f.value)==null?void 0:t.height)||parseInt(e.height)||0}),k=p(()=>!!(o.value&&y.value&&C.value&&u.value));let I=Array.from({length:s.value.length}),d=Array.from({length:s.value.length});const S=E(0);let P=-1;function T(t){return I[t]||u.value}const w=Bl(()=>{const t=performance.now();d[0]=0;const l=s.value.length;for(let c=1;c<=l-1;c++)d[c]=(d[c-1]||0)+T(c-1);S.value=Math.max(S.value,performance.now()-t)},S),U=le(k,t=>{t&&(U(),x=y.value.offsetTop,w.immediate(),F(),~P&&Ve(()=>{ce&&window.requestAnimationFrame(()=>{J(P),P=-1})}))});ke(()=>{w.clear()});function K(t,l){const c=I[t],h=u.value;u.value=h?Math.min(u.value,l):l,(c!==l||h!==u.value)&&(I[t]=l,w())}function g(t){return t=me(t,0,s.value.length-1),d[t]||0}function D(t){return rt(d,t)}let $=0,R=0,O=0;le(C,(t,l)=>{l&&(F(),t<l&&requestAnimationFrame(()=>{R=0,F()}))});function L(){if(!o.value||!y.value)return;const t=o.value.scrollTop,l=performance.now();l-O>500?(R=Math.sign(t-$),x=y.value.offsetTop):R=t-$,$=t,O=l,F()}function N(){!o.value||!y.value||(R=0,O=0,F())}let M=-1;function F(){cancelAnimationFrame(M),M=requestAnimationFrame(j)}function j(){if(!o.value||!C.value)return;const t=$-x,l=Math.sign(R),c=Math.max(0,t-he),h=me(D(c),0,s.value.length),B=t+C.value+he,b=me(D(B)+1,h+1,s.value.length);if((l!==ut||h<n.value)&&(l!==it||b>m.value)){const A=g(n.value)-g(h),z=g(b)-g(m.value);Math.max(A,z)>he?(n.value=h,m.value=b):(h<=0&&(n.value=h),b>=s.value.length&&(m.value=b))}v.value=g(n.value),i.value=g(s.value.length)-g(m.value)}function J(t){const l=g(t);!o.value||t&&!l?P=t:o.value.scrollTop=l}const ae=p(()=>s.value.slice(n.value,m.value).map((t,l)=>({raw:t,index:l+n.value})));return le(s,()=>{I=Array.from({length:s.value.length}),d=Array.from({length:s.value.length}),w.immediate(),F()},{deep:!0}),{calculateVisibleItems:F,containerRef:o,markerRef:y,computedItems:ae,paddingTop:v,paddingBottom:i,scrollToIndex:J,handleScroll:L,handleScrollend:N,handleItemResize:K}}function rt(e,s){let a=e.length-1,u=0,n=0,m=null,v=-1;if(e[a]<s)return a;for(;u<=a;)if(n=u+a>>1,m=e[n],m>s)a=n-1;else if(m<s)v=n,u=n+1;else return m===s?n:u;return v}const dt=q({items:{type:Array,default:()=>[]},renderless:Boolean,...st(),...ue(),...Rl()},"VVirtualScroll"),vt=Z()({name:"VVirtualScroll",props:dt(),setup(e,s){let{slots:a}=s;const u=Fl("VVirtualScroll"),{dimensionStyles:n}=_l(e),{calculateVisibleItems:m,containerRef:v,markerRef:i,handleScroll:o,handleScrollend:y,handleItemResize:x,scrollToIndex:V,paddingTop:f,paddingBottom:C,computedItems:k}=ct(e,_(e,"items"));return zl(()=>e.renderless,()=>{function I(){var P,T;const S=(arguments.length>0&&arguments[0]!==void 0?arguments[0]:!1)?"addEventListener":"removeEventListener";v.value===document.documentElement?(document[S]("scroll",o,{passive:!0}),document[S]("scrollend",y)):((P=v.value)==null||P[S]("scroll",o,{passive:!0}),(T=v.value)==null||T[S]("scrollend",y))}El(()=>{v.value=Hl(u.vnode.el,!0),I(!0)}),ke(I)}),te(()=>{const I=k.value.map(d=>r(ot,{key:d.index,renderless:e.renderless,"onUpdate:height":S=>x(d.index,S)},{default:S=>{var P;return(P=a.default)==null?void 0:P.call(a,{item:d.raw,index:d.index,...S})}}));return e.renderless?r(ee,null,[r("div",{ref:i,class:"v-virtual-scroll__spacer",style:{paddingTop:de(f.value)}},null),I,r("div",{class:"v-virtual-scroll__spacer",style:{paddingBottom:de(C.value)}},null)]):r("div",{ref:v,class:["v-virtual-scroll",e.class],onScrollPassive:o,onScrollend:y,style:[n.value,e.style]},[r("div",{ref:i,class:"v-virtual-scroll__container",style:{paddingTop:de(f.value),paddingBottom:de(C.value)}},[I])])}),{calculateVisibleItems:m,scrollToIndex:V}}});function ft(e,s){const a=E(!1);let u;function n(i){cancelAnimationFrame(u),a.value=!0,u=requestAnimationFrame(()=>{u=requestAnimationFrame(()=>{a.value=!1})})}async function m(){await new Promise(i=>requestAnimationFrame(i)),await new Promise(i=>requestAnimationFrame(i)),await new Promise(i=>requestAnimationFrame(i)),await new Promise(i=>{if(a.value){const o=le(a,()=>{o(),i()})}else i()})}async function v(i){var x,V;if(i.key==="Tab"&&((x=s.value)==null||x.focus()),!["PageDown","PageUp","Home","End"].includes(i.key))return;const o=(V=e.value)==null?void 0:V.$el;if(!o)return;(i.key==="Home"||i.key==="End")&&o.scrollTo({top:i.key==="Home"?0:o.scrollHeight,behavior:"smooth"}),await m();const y=o.querySelectorAll(":scope > :not(.v-virtual-scroll__spacer)");if(i.key==="PageDown"||i.key==="Home"){const f=o.getBoundingClientRect().top;for(const C of y)if(C.getBoundingClientRect().top>=f){C.focus();break}}else{const f=o.getBoundingClientRect().bottom;for(const C of[...y].reverse())if(C.getBoundingClientRect().bottom<=f){C.focus();break}}}return{onScrollPassive:n,onKeydown:v}}const mt=q({chips:Boolean,closableChips:Boolean,closeText:{type:String,default:"$vuetify.close"},openText:{type:String,default:"$vuetify.open"},eager:Boolean,hideNoData:Boolean,hideSelected:Boolean,listProps:{type:Object},menu:Boolean,menuIcon:{type:Q,default:"$dropdown"},menuProps:{type:Object},multiple:Boolean,noDataText:{type:String,default:"$vuetify.noDataText"},openOnClear:Boolean,itemColor:String,...Gl({itemChildren:!1})},"Select"),ht=q({...mt(),...Ge(nl({modelValue:null,role:"combobox"}),["validationValue","dirty","appendInnerIcon"]),...Kl({transition:{component:Ul}})},"VSelect"),Vt=Z()({name:"VSelect",props:ht(),emits:{"update:focused":e=>!0,"update:modelValue":e=>!0,"update:menu":e=>!0},setup(e,s){let{slots:a}=s;const{t:u}=Ne(),n=ne(),m=ne(),v=ne(),i=oe(e,"menu"),o=p({get:()=>i.value,set:t=>{var l;i.value&&!t&&((l=m.value)!=null&&l.ΨopenChildren.size)||(i.value=t)}}),{items:y,transformIn:x,transformOut:V}=$l(e),f=oe(e,"modelValue",[],t=>x(t===null?[null]:ve(t)),t=>{const l=V(t);return e.multiple?l:l[0]??null}),C=p(()=>typeof e.counterValue=="function"?e.counterValue(f.value):typeof e.counterValue=="number"?e.counterValue:f.value.length),k=ol(e),I=p(()=>f.value.map(t=>t.value)),d=E(!1),S=p(()=>o.value?e.closeText:e.openText);let P="",T;const w=p(()=>e.hideSelected?y.value.filter(t=>!f.value.some(l=>e.valueComparator(l,t))):y.value),U=p(()=>e.hideNoData&&!w.value.length||k.isReadonly.value||k.isDisabled.value),K=p(()=>{var t;return{...e.menuProps,activatorProps:{...((t=e.menuProps)==null?void 0:t.activatorProps)||{},"aria-haspopup":"listbox"}}}),g=ne(),D=ft(g,n);function $(t){e.openOnClear&&(o.value=!0)}function R(){U.value||(o.value=!o.value)}function O(t){Ae(t)&&L(t)}function L(t){var B,b;if(!t.key||k.isReadonly.value)return;["Enter"," ","ArrowDown","ArrowUp","Home","End"].includes(t.key)&&t.preventDefault(),["Enter","ArrowDown"," "].includes(t.key)&&(o.value=!0),["Escape","Tab"].includes(t.key)&&(o.value=!1),t.key==="Home"?(B=g.value)==null||B.focus("first"):t.key==="End"&&((b=g.value)==null||b.focus("last"));const l=1e3;if(e.multiple||!Ae(t))return;const c=performance.now();c-T>l&&(P=""),P+=t.key.toLowerCase(),T=c;const h=y.value.find(A=>A.title.toLowerCase().startsWith(P));if(h!==void 0){f.value=[h];const A=w.value.indexOf(h);ce&&window.requestAnimationFrame(()=>{var z;A>=0&&((z=v.value)==null||z.scrollToIndex(A))})}}function N(t){let l=arguments.length>1&&arguments[1]!==void 0?arguments[1]:!0;if(!t.props.disabled)if(e.multiple){const c=f.value.findIndex(B=>e.valueComparator(B.value,t.value)),h=l??!~c;if(~c){const B=h?[...f.value,t]:[...f.value];B.splice(c,1),f.value=B}else h&&(f.value=[...f.value,t])}else{const c=l!==!1;f.value=c?[t]:[],Ve(()=>{o.value=!1})}}function M(t){var l;(l=g.value)!=null&&l.$el.contains(t.relatedTarget)||(o.value=!1)}function F(){var t;e.eager&&((t=v.value)==null||t.calculateVisibleItems())}function j(){var t;d.value&&((t=n.value)==null||t.focus())}function J(t){d.value=!0}function ae(t){if(t==null)f.value=[];else if(ye(n.value,":autofill")||ye(n.value,":-webkit-autofill")){const l=y.value.find(c=>c.title===t);l&&N(l)}else n.value&&(n.value.value="")}return le(o,()=>{if(!e.hideSelected&&o.value&&f.value.length){const t=w.value.findIndex(l=>f.value.some(c=>e.valueComparator(c.value,l.value)));ce&&window.requestAnimationFrame(()=>{var l;t>=0&&((l=v.value)==null||l.scrollToIndex(t))})}}),le(()=>e.items,(t,l)=>{o.value||d.value&&!l.length&&t.length&&(o.value=!0)}),te(()=>{const t=!!(e.chips||a.chip),l=!!(!e.hideNoData||w.value.length||a["prepend-item"]||a["append-item"]||a["no-data"]),c=f.value.length>0,h=xe.filterProps(e),B=c||!d.value&&e.label&&!e.persistentPlaceholder?void 0:e.placeholder;return r(xe,G({ref:n},h,{modelValue:f.value.map(b=>b.props.value).join(", "),"onUpdate:modelValue":ae,focused:d.value,"onUpdate:focused":b=>d.value=b,validationValue:f.externalValue,counterValue:C.value,dirty:c,class:["v-select",{"v-select--active-menu":o.value,"v-select--chips":!!e.chips,[`v-select--${e.multiple?"multiple":"single"}`]:!0,"v-select--selected":f.value.length,"v-select--selection-slot":!!a.selection},e.class],style:e.style,inputmode:"none",placeholder:B,"onClick:clear":$,"onMousedown:control":R,onBlur:M,onKeydown:L,"aria-label":u(S.value),title:u(S.value)}),{...a,default:()=>r(ee,null,[r(ql,G({ref:m,modelValue:o.value,"onUpdate:modelValue":b=>o.value=b,activator:"parent",contentClass:"v-select__content",disabled:U.value,eager:e.eager,maxHeight:310,openOnClick:!1,closeOnContentClick:!1,transition:e.transition,onAfterEnter:F,onAfterLeave:j},K.value),{default:()=>[l&&r(Wl,G({ref:g,selected:I.value,selectStrategy:e.multiple?"independent":"single-independent",onMousedown:b=>b.preventDefault(),onKeydown:O,onFocusin:J,tabindex:"-1","aria-live":"polite",color:e.itemColor??e.color},D,e.listProps),{default:()=>{var b,A,z;return[(b=a["prepend-item"])==null?void 0:b.call(a),!w.value.length&&!e.hideNoData&&(((A=a["no-data"])==null?void 0:A.call(a))??r(Be,{title:u(e.noDataText)},null)),r(vt,{ref:v,renderless:!0,items:w.value},{default:Y=>{var Ie;let{item:W,index:ie,itemRef:H}=Y;const Ce=G(W.props,{ref:H,key:ie,onClick:()=>N(W,null)});return((Ie=a.item)==null?void 0:Ie.call(a,{item:W,index:ie,props:Ce}))??r(Be,G(Ce,{role:"option"}),{prepend:ll=>{let{isSelected:tl}=ll;return r(ee,null,[e.multiple&&!e.hideSelected?r(Xl,{key:W.value,modelValue:tl,ripple:!1,tabindex:"-1"},null):void 0,W.props.prependAvatar&&r(be,{image:W.props.prependAvatar},null),W.props.prependIcon&&r(X,{icon:W.props.prependIcon},null)])}})}}),(z=a["append-item"])==null?void 0:z.call(a)]}})]}),f.value.map((b,A)=>{function z(H){H.stopPropagation(),H.preventDefault(),N(b,!1)}const Y={"onClick:close":z,onKeydown(H){H.key!=="Enter"&&H.key!==" "||(H.preventDefault(),H.stopPropagation(),z(H))},onMousedown(H){H.preventDefault(),H.stopPropagation()},modelValue:!0,"onUpdate:modelValue":void 0},W=t?!!a.chip:!!a.selection,ie=W?Dl(t?a.chip({item:b,index:A,props:Y}):a.selection({item:b,index:A})):void 0;if(!(W&&!ie))return r("div",{key:b.value,class:"v-select__selection"},[t?a.chip?r(se,{key:"chip-defaults",defaults:{VChip:{closable:e.closableChips,size:"small",text:b.title}}},{default:()=>[ie]}):r(at,G({key:"chip",closable:e.closableChips,size:"small",text:b.title,disabled:b.props.disabled},Y),null):ie??r("span",{class:"v-select__selection-text"},[b.title,e.multiple&&A<f.value.length-1&&r("span",{class:"v-select__selection-comma"},[Ol(",")])])])})]),"append-inner":function(){var Y;for(var b=arguments.length,A=new Array(b),z=0;z<b;z++)A[z]=arguments[z];return r(ee,null,[(Y=a["append-inner"])==null?void 0:Y.call(a,...A),e.menuIcon?r(X,{class:"v-select__menu-icon",icon:e.menuIcon},null):void 0])}})}),Ml({isFocused:d,menu:o,select:N},n)}});export{Vt as V,at as a,Re as b,Xl as c,Ye as d,_e as e,Xe as m};
