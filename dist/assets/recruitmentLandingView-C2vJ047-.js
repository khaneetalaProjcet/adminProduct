import{aq as E,ar as R,_ as I,r as c,k as S,c as T,b as r,w as i,a1 as A,e as d,h as y,o as m,a2 as B,a as e,t as o,V as p,a4 as j,C as D}from"./index-C7AltrTm.js";import{V as z}from"./VDialog--c7lFYuv.js";import{V as P}from"./VAlert-Js0FlmH-.js";import{V as k,b as L}from"./VCard-CLif6kG0.js";import{V as $}from"./VTextField-COCTn4qh.js";import{V as U}from"./VDataTable-DjpsoDyL.js";import{V as q}from"./VSpacer-hhzBSD5h.js";import"./VMenu-CrnGFTgo.js";import"./index-DTdRoQyC.js";import"./VImg-BzN2btvi.js";import"./createSimpleFunctional-CyYDSdiz.js";import"./VSelect-DVTRRlMM.js";const b=R(),g=E.create({baseURL:"https://gateway.khanetala.ir/v1/admin",headers:{"Content-Type":"application/json",Accept:"application/json","Content-Security-Policy":"default-src 'self'; script-src 'self'; style-src 'self'; object-src 'none'; frame-ancestors 'none'; base-uri 'self'","X-Content-Type-Options":"nosniff","Referrer-Policy":"strict-origin-when-cross-origin"}});g.interceptors.request.use(l=>{const u=localStorage.getItem("token");return u?l.headers.Authorization=`Bearer ${u}`:b.replace("/login"),l},l=>Promise.reject(l));g.interceptors.response.use(l=>l,l=>(l.response.status==401&&(localStorage.removeItem("token"),b.replace("/login")),console.error("API Error:",l.response||l.message),Promise.reject(l)));const M={async AllRecruitment(){return(await g.get("/coorporation/all")).data}},F={class:"d-flex flex-column flex-md-row justify-space-between w-100 px-4 py-8 recruitment-dialog-info"},G={class:"d-flex flex-column w-100 px-4"},H={class:"d-flex align-items-center my-2"},K={class:"mx-2"},O={class:"d-flex align-items-center my-2"},X={class:"mx-2"},J={class:"d-flex align-items-center my-2"},Q={class:"mx-2"},W={class:"d-flex align-items-center my-2"},Y={class:"mx-2"},Z={class:"d-flex align-items-center my-2"},ee={class:"mx-2"},te={class:"d-flex align-items-center my-2"},le={class:"mx-2"},se={class:"d-flex flex-column w-100 px-4"},oe={class:"d-flex align-items-center my-2"},ae={class:"mx-2"},ne={class:"d-flex align-items-center my-2"},re={class:"mx-2"},ie={class:"d-flex align-items-center my-2"},ce={class:"d-flex align-items-center my-2"},ue={class:"mx-2"},me={class:"d-flex align-items-center my-2"},de={class:"mx-2"},pe={__name:"recruitmentLandingView",setup(l){const u=c(!1),v=c(""),_=c(""),x=c(!1),V=c(),f=c(!1),w=c([{title:"نام",key:"firstName"},{title:"نام خانوادگی",key:"lastName"},{title:"شماره همراه",key:"phoneNumber"},{title:"شماره همراه",key:"phoneNumber"},{title:"استان",key:"province"},{title:"شهر",key:"city"},{title:"سابقه کار مرتبط",key:"relevantExperience"},{title:"فعالیت",key:"action"}]),s=c(),h=async()=>{try{u.value=!0;const a=await M.AllRecruitment();return V.value=a.data,a}catch(a){a.response.status==401&&(localStorage.clear(),router.replace("/login")),_.value=a.response.data.error||"خطایی رخ داده است!",x.value=!0,setTimeout(()=>{x.value=!1},1e4)}finally{u.value=!1}},C=a=>a.toString().replace(/\B(?=(\d{3})+(?!\d))/g,","),N=a=>{f.value=!0,console.log(a),s.value=a};return S(()=>{h()}),(a,t)=>(m(),T("div",null,[r(A,null,{default:i(()=>[r(B,{cols:"12"},{default:i(()=>[r(k,{title:"درخواست همکاری"},{text:i(()=>[r($,{modelValue:v.value,"onUpdate:modelValue":t[0]||(t[0]=n=>v.value=n),label:"جستجو","prepend-inner-icon":"ri-search-line"},null,8,["modelValue"])]),default:i(()=>[r(U,{headers:w.value,items:V.value,search:v.value,loading:u.value},{"item.wallet.balance":i(({item:n})=>[e("p",null,o(C(n.wallet.balance)),1)]),"item.relevantExperience":i(({item:n})=>[n.relevantExperience==!1?(m(),d(p,{key:0,size:"small",icon:"ri-close-line",color:"#c9190c"})):n.relevantExperience==!0?(m(),d(p,{key:1,size:"small",icon:"ri-check-line",color:"#0b8707"})):y("",!0)]),"item.action":i(({item:n})=>[r(p,{class:"me-2",size:"small",icon:"ri-information-line",color:"#d4af37",onClick:fe=>N(n)},null,8,["onClick"])]),_:1},8,["headers","items","search","loading"])]),_:1})]),_:1})]),_:1}),r(z,{modelValue:f.value,"onUpdate:modelValue":t[2]||(t[2]=n=>f.value=n),"max-width":"600",class:"dialog"},{default:i(()=>[r(k,{class:"dialog-card"},{default:i(()=>[t[14]||(t[14]=e("div",{class:"k-dialog-title"},[e("p",null,"اطلاعات کاربر")],-1)),e("div",F,[e("div",G,[e("div",H,[t[3]||(t[3]=e("p",null,"نام: ",-1)),e("p",K,o(s.value.firstName),1)]),e("div",O,[t[4]||(t[4]=e("p",null,"نام خانوادگی: ",-1)),e("p",X,o(s.value.lastName),1)]),e("div",J,[t[5]||(t[5]=e("p",null,"شماره همراه: ",-1)),e("p",Q,o(s.value.phoneNumber),1)]),e("div",W,[t[6]||(t[6]=e("p",null,"استان: ",-1)),e("p",Y,o(s.value.province),1)]),e("div",Z,[t[7]||(t[7]=e("p",null,"انگیزه همکاری: ",-1)),e("p",ee,o(s.value.motivation),1)]),e("div",te,[t[8]||(t[8]=e("p",null,"علایق: ",-1)),e("p",le,o(s.value.interests),1)])]),e("div",se,[e("div",oe,[t[9]||(t[9]=e("p",null,"تاریخ تولد: ",-1)),e("p",ae,o(s.value.birthDate),1)]),e("div",ne,[t[10]||(t[10]=e("p",null,"کد ملی: ",-1)),e("p",re,o(s.value.nationalCode),1)]),e("div",ie,[t[11]||(t[11]=e("p",null,"سابقه کاری: ",-1)),s.value.relevantExperience==!1?(m(),d(p,{key:0,icon:"ri-close-line",color:"#c9190c"})):s.value.relevantExperience==!0?(m(),d(p,{key:1,icon:"ri-check-line",color:"#0b8707"})):y("",!0)]),e("div",ce,[t[12]||(t[12]=e("p",null,"طریق آشنایی: ",-1)),e("p",ue,o(s.value.howToKnow),1)]),e("div",me,[t[13]||(t[13]=e("p",null,"شهر: ",-1)),e("p",de,o(s.value.city),1)])])]),r(L,null,{default:i(()=>[r(q),r(j,{text:"بستن",onClick:t[1]||(t[1]=n=>f.value=!1),size:"large",class:"m-3"})]),_:1})]),_:1})]),_:1},8,["modelValue"]),x.value?(m(),d(P,{key:0,color:"error",border:"bottom",elevation:"2",class:"k-alert alert-animatiton",closable:""},{default:i(()=>[D(o(_.value),1)]),_:1})):y("",!0)]))}},Ee=I(pe,[["__scopeId","data-v-e004e7ba"]]);export{Ee as default};
