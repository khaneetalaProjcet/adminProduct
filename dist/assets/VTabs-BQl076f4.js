import{D as k,E as A,b1 as N,H as P,a0 as X,r as E,A as C,M as W,aa as M,b as i,F as D,L as h,O as J,b2 as L,b3 as K,aP as Q,I as G,aH as Z,U as ee,a_ as ae,Y as te,x as f,J as se,ao as oe,aq as le,b4 as ne}from"./index-C9yqJSFV.js";import{m as re,V as z,a as ie,b as R}from"./VWindowItem-DJV5xopz.js";import{d as de,e as U}from"./VSelect-V6tcFLf1.js";const $=Symbol.for("vuetify:v-tabs"),ue=k({fixed:Boolean,sliderColor:String,hideSlider:Boolean,direction:{type:String,default:"horizontal"},...A(N({selectedClass:"v-tab--selected",variant:"text"}),["active","block","flat","location","position","symbol"])},"VTab"),ce=P()({name:"VTab",props:ue(),setup(e,l){let{slots:n,attrs:a}=l;const{textColorClasses:r,textColorStyles:v}=X(e,"sliderColor"),o=E(),u=E(),c=C(()=>e.direction==="horizontal"),x=C(()=>{var b,t;return((t=(b=o.value)==null?void 0:b.group)==null?void 0:t.isSelected.value)??!1});function B(b){var s,m;let{value:t}=b;if(t){const d=(m=(s=o.value)==null?void 0:s.$el.parentElement)==null?void 0:m.querySelector(".v-tab--selected .v-tab__slider"),I=u.value;if(!d||!I)return;const H=getComputedStyle(d).color,g=d.getBoundingClientRect(),V=I.getBoundingClientRect(),T=c.value?"x":"y",S=c.value?"X":"Y",p=c.value?"right":"bottom",w=c.value?"width":"height",F=g[T],O=V[T],y=F>O?g[p]-V[p]:g[T]-V[T],Y=Math.sign(y)>0?c.value?"right":"bottom":Math.sign(y)<0?c.value?"left":"top":"center",j=(Math.abs(y)+(Math.sign(y)<0?g[w]:V[w]))/Math.max(g[w],V[w])||0,q=g[w]/V[w]||0,_=1.5;L(I,{backgroundColor:[H,"currentcolor"],transform:[`translate${S}(${y}px) scale${S}(${q})`,`translate${S}(${y/_}px) scale${S}(${(j-1)/_+1})`,"none"],transformOrigin:Array(3).fill(Y)},{duration:225,easing:K})}}return W(()=>{const b=M.filterProps(e);return i(M,h({symbol:$,ref:o,class:["v-tab",e.class],style:e.style,tabindex:x.value?0:-1,role:"tab","aria-selected":String(x.value),active:!1},b,a,{block:e.fixed,maxWidth:e.fixed?300:void 0,"onGroup:selected":B}),{...n,default:()=>{var t;return i(D,null,[((t=n.default)==null?void 0:t.call(n))??e.text,!e.hideSlider&&i("div",{ref:u,class:["v-tab__slider",r.value],style:v.value},null)])}})}),J({},o)}}),be=k({...A(re(),["continuous","nextIcon","prevIcon","showArrows","touch","mandatory"])},"VTabsWindow"),me=P()({name:"VTabsWindow",props:be(),emits:{"update:modelValue":e=>!0},setup(e,l){let{slots:n}=l;const a=Q($,null),r=G(e,"modelValue"),v=C({get(){var o;return r.value!=null||!a?r.value:(o=a.items.value.find(u=>a.selected.value.includes(u.id)))==null?void 0:o.value},set(o){r.value=o}});return W(()=>{const o=z.filterProps(e);return i(z,h({_as:"VTabsWindow"},o,{modelValue:v.value,"onUpdate:modelValue":u=>v.value=u,class:["v-tabs-window",e.class],style:e.style,mandatory:!1,touch:!1}),n)}),{}}}),ve=k({...ie()},"VTabsWindowItem"),fe=P()({name:"VTabsWindowItem",props:ve(),setup(e,l){let{slots:n}=l;return W(()=>{const a=R.filterProps(e);return i(R,h({_as:"VTabsWindowItem"},a,{class:["v-tabs-window-item",e.class],style:e.style}),n)}),{}}});function ge(e){return e?e.map(l=>ne(l)?l:{text:l,value:l}):[]}const Ve=k({alignTabs:{type:String,default:"start"},color:String,fixedTabs:Boolean,items:{type:Array,default:()=>[]},stacked:Boolean,bgColor:String,grow:Boolean,height:{type:[Number,String],default:void 0},hideSlider:Boolean,sliderColor:String,...de({mandatory:"force",selectedClass:"v-tab-item--selected"}),...Z(),...ee()},"VTabs"),Te=P()({name:"VTabs",props:Ve(),emits:{"update:modelValue":e=>!0},setup(e,l){let{attrs:n,slots:a}=l;const r=G(e,"modelValue"),v=C(()=>ge(e.items)),{densityClasses:o}=ae(e),{backgroundColorClasses:u,backgroundColorStyles:c}=te(f(e,"bgColor")),{scopeId:x}=se();return oe({VTab:{color:f(e,"color"),direction:f(e,"direction"),stacked:f(e,"stacked"),fixed:f(e,"fixedTabs"),sliderColor:f(e,"sliderColor"),hideSlider:f(e,"hideSlider")}}),W(()=>{const B=U.filterProps(e),b=!!(a.window||e.items.length>0);return i(D,null,[i(U,h(B,{modelValue:r.value,"onUpdate:modelValue":t=>r.value=t,class:["v-tabs",`v-tabs--${e.direction}`,`v-tabs--align-tabs-${e.alignTabs}`,{"v-tabs--fixed-tabs":e.fixedTabs,"v-tabs--grow":e.grow,"v-tabs--stacked":e.stacked},o.value,u.value,e.class],style:[{"--v-tabs-height":le(e.height)},c.value,e.style],role:"tablist",symbol:$},x,n),{default:()=>{var t;return[((t=a.default)==null?void 0:t.call(a))??v.value.map(s=>{var m;return((m=a.tab)==null?void 0:m.call(a,{item:s}))??i(ce,h(s,{key:s.text,value:s.value}),{default:a[`tab.${s.value}`]?()=>{var d;return(d=a[`tab.${s.value}`])==null?void 0:d.call(a,{item:s})}:void 0})})]}}),b&&i(me,h({modelValue:r.value,"onUpdate:modelValue":t=>r.value=t,key:"tabs-window"},x),{default:()=>{var t;return[v.value.map(s=>{var m;return((m=a.item)==null?void 0:m.call(a,{item:s}))??i(fe,{value:s.value},{default:()=>{var d;return(d=a[`item.${s.value}`])==null?void 0:d.call(a,{item:s})}})}),(t=a.window)==null?void 0:t.call(a)]}})])}),{}}});export{Te as V,ce as a,me as b,fe as c};
