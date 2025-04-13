import{G as k}from"./goldbox-C7HC4pqI.js";import{_ as U,r as o,k as M,c as z,b as t,w as e,a1 as E,e as S,h as b,o as f,a2 as B,C as m,a as s,t as i}from"./index-C7AltrTm.js";import{V as _}from"./VAlert-Js0FlmH-.js";import{V as H,a as G,b as A,c as h}from"./VTabs-GF7w3wA5.js";import{a as R,V as C}from"./VCard-CLif6kG0.js";import{V as w}from"./VTextField-COCTn4qh.js";import{V as T}from"./VDataTable-DjpsoDyL.js";import{a as N}from"./VSelect-DVTRRlMM.js";import"./createSimpleFunctional-CyYDSdiz.js";import"./index-DTdRoQyC.js";import"./VImg-BzN2btvi.js";import"./VWindowItem-B5Jj4rxQ.js";import"./VMenu-CrnGFTgo.js";const j={__name:"goldboxSellView",setup(q){const c=o(""),F=o(""),u=o(!1),W=o(!1),d=o(null),p=o(),P=o([{title:"نام",key:"seller.firstName"},{title:"نام خانوادگی",key:"seller.lastName"},{title:"مبلغ خرید (تومان)",key:"totalPrice"},{title:"وزن طلا (گرم)",key:"goldWeight"},{title:"تاریخ",key:"date"},{title:"زمان",key:"time"},{title:"شناسه پرداخت",key:"invoiceId"},{title:"وضعیت",key:"status"}]),D=o([{title:"نام",key:"seller.firstName"},{title:"نام خانوادگی",key:"seller.lastName"},{title:"مبلغ خرید (تومان)",key:"totalPrice"},{title:"وزن طلا (گرم)",key:"goldWeight"},{title:"تاریخ",key:"date"},{title:"زمان",key:"time"},{title:"شناسه پرداخت",key:"invoiceId"},{title:"وضعیت",key:"status"}]),V=o(),n=o(),g=o(),x=o(),v=o(),I=async()=>{try{n.value=!0;const a=await k.SellGoldBox(1);return V.value=a.data,a}catch(a){a.response.status==401&&(localStorage.clear(),router.replace("/login")),c.value=a.response.data.error||"خطایی رخ داده است!",u.value=!0,setTimeout(()=>{u.value=!1},1e4)}finally{n.value=!1}},L=async()=>{try{g.value=!0;const a=await k.SellGoldBox(0);return x.value=a.data,a}catch(a){a.response.status==401&&(localStorage.clear(),router.replace("/login")),c.value=a.response.data.error||"خطایی رخ داده است!",u.value=!0,setTimeout(()=>{u.value=!1},1e4)}finally{g.value=!1}},y=a=>a.toString().replace(/\B(?=(\d{3})+(?!\d))/g,",");return M(()=>{I(),L()}),(a,r)=>(f(),z("div",null,[t(E,null,{default:e(()=>[t(B,null,{default:e(()=>[t(H,{modelValue:d.value,"onUpdate:modelValue":r[0]||(r[0]=l=>d.value=l),"align-tabs":"center"},{default:e(()=>[t(G,{value:"one"},{default:e(()=>r[4]||(r[4]=[m("فروش های موفق")])),_:1}),t(G,{value:"two"},{default:e(()=>r[5]||(r[5]=[m("فروش های ناموفق")])),_:1})]),_:1},8,["modelValue"])]),_:1}),t(B,{cols:"12"},{default:e(()=>[t(R,null,{default:e(()=>[t(A,{modelValue:d.value,"onUpdate:modelValue":r[3]||(r[3]=l=>d.value=l)},{default:e(()=>[t(h,{value:"one"},{default:e(()=>[t(C,{title:"فروش موفق"},{text:e(()=>[t(w,{modelValue:p.value,"onUpdate:modelValue":r[1]||(r[1]=l=>p.value=l),label:"جستجو","prepend-inner-icon":"ri-search-line"},null,8,["modelValue"])]),default:e(()=>[t(T,{headers:P.value,items:V.value,search:p.value,loading:n.value},{"item.totalPrice":e(({item:l})=>[s("p",null,i(y(l.totalPrice)),1)]),"item.goldWeight":e(({item:l})=>[s("p",null,i((+l.goldWeight).toFixed(3)),1)]),"item.status":e(({item:l})=>[s("div",null,[t(N,{text:l.status=="completed"?"موفق":"نامشخص",color:l.status=="completed"?"#00853f":"#66666",size:"small"},null,8,["text","color"])])]),_:1},8,["headers","items","search","loading"])]),_:1})]),_:1}),t(h,{value:"two"},{default:e(()=>[t(C,{title:"فروش ناموفق"},{text:e(()=>[t(w,{modelValue:v.value,"onUpdate:modelValue":r[2]||(r[2]=l=>v.value=l),label:"جستجو","prepend-inner-icon":"ri-search-line"},null,8,["modelValue"])]),default:e(()=>[t(T,{headers:D.value,items:x.value,search:v.value,loading:n.value},{"item.totalPrice":e(({item:l})=>[s("p",null,i(y(l.totalPrice)),1)]),"item.goldWeight":e(({item:l})=>[s("p",null,i((+l.goldWeight).toFixed(3)),1)]),"item.status":e(({item:l})=>[s("div",null,[t(N,{text:l.status=="failed"?"ناموفق":"نامشخص",color:l.status=="failed"?"#ff0000":"#66666",size:"small"},null,8,["text","color"])])]),_:1},8,["headers","items","search","loading"])]),_:1})]),_:1})]),_:1},8,["modelValue"])]),_:1})]),_:1})]),_:1}),u.value?(f(),S(_,{key:0,color:"error",border:"bottom",elevation:"2",class:"k-alert alert-animatiton",closable:""},{default:e(()=>[m(i(c.value),1)]),_:1})):b("",!0),W.value?(f(),S(_,{key:1,color:"success",border:"bottom",elevation:"2",class:"k-alert alert-animatiton",closable:""},{default:e(()=>[m(i(F.value),1)]),_:1})):b("",!0)]))}},re=U(j,[["__scopeId","data-v-0da63e52"]]);export{re as default};
