import{S as C}from"./api-BWeBxzOs.js";import{_ as S,r as s,k as w,c,b as e,w as a,F as f,o as d,a1 as x,a2 as D,V as h,a as p,a8 as b,a4 as A,t as B}from"./index-yGymRVgy.js";import{V as I}from"./VContainer-C9TwM40s.js";import{V as M}from"./VDialog-DPXsKJ0b.js";import{V,b as T}from"./VCard-C1q09xgF.js";import{V as z}from"./VTextField-73vQssEG.js";import{V as E}from"./VDataTable-N7xMg3ZY.js";import{a as F}from"./VSelect-Z1Xi88UQ.js";import{V as N}from"./VSpacer-CfLOvZqJ.js";import{e as U}from"./VMenu-uoiypAtJ.js";import"./index-BRm_Gf3E.js";import"./VImg-BJXfrDAW.js";const q={async AllStatus(){return(await C.get("/logger/status")).data}},L={class:"pa-5"},$={__name:"serverMonitorView",setup(g){const u=s(!1),m=s(),_=s([{title:"service name",key:"service"},{title:"status",key:"status"},{title:"request count",key:"total.all"},{title:"request count",key:"total.all"},{title:"success",key:"total.statusCount.success"},{title:"failed",key:"total.statusCount.failed"},{title:"internalIssues",key:"total.statusCount.internalIssues"},{title:"error",key:"error"}]),i=s(null),o=s(),n=s(!1),k=async()=>{try{u.value=!0;const r=await q.AllStatus();return m.value=r.data,r}catch(r){errorMsg.value=r.response.data.error||"خطایی رخ داده است!",alertError.value=!0,setTimeout(()=>{alertError.value=!1},1e4)}finally{u.value=!1}},y=r=>{n.value=!0,o.value=r.total.error,console.log(o.value),console.log(o.value)};return w(()=>{k()}),(r,l)=>(d(),c(f,null,[e(I,null,{default:a(()=>[e(x,null,{default:a(()=>[e(D,{cols:"12"},{default:a(()=>[e(V,{title:"سرویس ها"},{text:a(()=>[e(z,{modelValue:i.value,"onUpdate:modelValue":l[0]||(l[0]=t=>i.value=t),label:"جستجو","prepend-inner-icon":"ri-search-line"},null,8,["modelValue"])]),default:a(()=>[e(E,{headers:_.value,items:m.value,search:i.value,loading:u.value},{"item.status":a(({item:t})=>[e(F,{text:t.status==0?"DOWN":"UP",color:t.status==0?"#ff0000":"#43A047",size:"small"},null,8,["text","color"])]),"item.error":a(({item:t})=>[e(h,{class:"me-2",size:"small",icon:"ri-signal-wifi-error-line",color:"#d4af37",onClick:v=>y(t)},null,8,["onClick"])]),_:1},8,["headers","items","search","loading"])]),_:1})]),_:1})]),_:1})]),_:1}),e(M,{modelValue:n.value,"onUpdate:modelValue":l[2]||(l[2]=t=>n.value=t),"max-width":"500",class:"error-dialog"},{default:a(()=>[e(V,{class:"dialog-card"},{default:a(()=>[p("div",L,[(d(!0),c(f,null,b(o.value,(t,v)=>(d(),c("div",{key:v},[p("p",null,B(t),1),e(U)]))),128))]),e(T,null,{default:a(()=>[e(N),e(A,{text:"close",onClick:l[1]||(l[1]=t=>n.value=!1),size:"large",class:"m-3"})]),_:1})]),_:1})]),_:1},8,["modelValue"])],64))}},Z=S($,[["__scopeId","data-v-ac799950"]]);export{Z as default};
