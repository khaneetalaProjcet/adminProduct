import{aq as P,ar as B,_ as N,r,e as d,w as o,a3 as E,q as F,o as n,b as t,a1 as b,a2 as s,a as v,h as m,c as _,a8 as H,F as I,a4 as L,C as q,a9 as A,a0 as z,t as M}from"./index-CCgHgMQC.js";import{V as O}from"./VForm-ClidtAwn.js";import{V as c}from"./VSelect-D5O_weUo.js";import{V as $}from"./VTextField-CE0wGAPD.js";import"./index-iHf32mYS.js";import"./VImg-BNb1V8fm.js";import"./VMenu-Dm82gQ_a.js";import"./createSimpleFunctional-jnIe0T2z.js";const w=B(),V=P.create({baseURL:"https://gateway.khanetala.ir/v1",headers:{"Content-Type":"application/json",Accept:"application/json","Content-Security-Policy":"default-src 'self'; script-src 'self'; style-src 'self'; object-src 'none'; frame-ancestors 'none'; base-uri 'self'","X-Content-Type-Options":"nosniff","Referrer-Policy":"strict-origin-when-cross-origin"}});V.interceptors.request.use(u=>{const i=localStorage.getItem("token");return i?u.headers.Authorization=`Bearer ${i}`:w.replace("/login"),u},u=>Promise.reject(u));V.interceptors.response.use(u=>u,u=>(u.response.status==401&&(localStorage.removeItem("token"),w.replace("/login")),console.error("API Error:",u.response||u.message),Promise.reject(u)));const G={async ReportSubmit(u){const i=JSON.stringify(u);return(await V.post("/report/analyze/data",i)).data}},J={class:"d-flex flex-column justify-start"},X=["href"],K={class:"d-flex justify-end"},Q={__name:"TotalReportView",setup(u){const i=r(!1),k=r(""),T=r(!1),e=r({report:1,startDate:"",startTime:"",endDate:"",endTime:"",type:"all",deal:"all",status:"all",nationalCode:"",auth:""}),y=r({link:[]}),x=r([{value:1,label:"واریز و برداشت"},{value:2,label:"معاملات"},{value:3,label:"کاربران"},{value:4,label:"گزارش گیری ساعتی"}]),C=r([{value:"all",label:"همه"},{value:"deposit",label:"واریز"},{value:"withdraw",label:"برداشت"}]),U=r([{value:"all",label:"همه"},{value:"sell",label:"فروش"},{value:"buy",label:"خرید"}]),S=r([{value:"all",label:"همه"},{value:"approved",label:"احراز شده"},{value:"pebding",label:"در انتظار احراز"}]),R=r([{value:"all",label:"همه"},{value:"fromPhone",label:"تلفنی"},{value:"inPerson",label:"حضوری"},{value:"fromGateway",label:"آنلاین"}]),j=r([{value:"all",label:"همه"},{value:"completed",label:"موفق"},{value:"failed",label:"ناموفق"},{value:"pending",label:"در انتظار"}]),D=async()=>{try{i.value=!0;const p=await G.ReportSubmit(e.value);return y.value.link.push(p[1]),p}catch(p){p.response.status==401&&(localStorage.clear(),z.replace("/login")),k.value=p.response.data.error||"خطایی رخ داده است!",T.value=!0,setTimeout(()=>{T.value=!1},1e4)}finally{i.value=!1}};return(p,l)=>{const f=F("persian-date-picker");return n(),d(O,{onSubmit:E(D,["prevent"])},{default:o(()=>[t(A,{class:"filter-container"},{default:o(()=>[t(b,null,{default:o(()=>[t(s,{cols:"6",md:"4",class:"my-3"},{default:o(()=>[t(c,{modelValue:e.value.report,"onUpdate:modelValue":l[0]||(l[0]=a=>e.value.report=a),items:x.value,label:"نوع گزارش",variant:"outlined",rules:[a=>!!a||"حداقل یک مورد الزامیست"],"item-title":"label","item-value":"value"},null,8,["modelValue","items","rules"])]),_:1})]),_:1}),e.value.report!=4?(n(),d(b,{key:0},{default:o(()=>[t(s,{cols:"6",md:"4",class:"my-4"},{default:o(()=>l[11]||(l[11]=[v("div",{class:"d-flex justify-start align-center"},[v("p",{class:"mb-0"},"زمان شروع: ")],-1)])),_:1}),t(s,{cols:"6",md:"4",class:"my-4"},{default:o(()=>[t(f,{modelValue:e.value.startDate,"onUpdate:modelValue":l[1]||(l[1]=a=>e.value.startDate=a),placeholder:"تاریخ"},null,8,["modelValue"])]),_:1}),t(s,{cols:"6",md:"4",class:"my-4"},{default:o(()=>[t(f,{type:"time",modelValue:e.value.startTime,"onUpdate:modelValue":l[2]||(l[2]=a=>e.value.startTime=a),placeholder:"زمان",format:"HH:mm:ss"},null,8,["modelValue"])]),_:1}),t(s,{cols:"6",md:"4",class:"my-4"},{default:o(()=>l[12]||(l[12]=[v("div",{class:"d-flex justify-start align-center"},[v("p",{class:"mb-0"},"زمان پایان: ")],-1)])),_:1}),t(s,{cols:"6",md:"4",class:"my-4"},{default:o(()=>[t(f,{modelValue:e.value.endDate,"onUpdate:modelValue":l[3]||(l[3]=a=>e.value.endDate=a),placeholder:"تاریخ"},null,8,["modelValue"])]),_:1}),t(s,{cols:"6",md:"4",class:"my-4"},{default:o(()=>[t(f,{type:"time",modelValue:e.value.endTime,"onUpdate:modelValue":l[4]||(l[4]=a=>e.value.endTime=a),placeholder:"زمان",format:"HH:mm:ss"},null,8,["modelValue"])]),_:1}),e.value.report==1?(n(),d(s,{key:0,cols:"6",md:"4",class:"my-4"},{default:o(()=>[t(c,{modelValue:e.value.type,"onUpdate:modelValue":l[5]||(l[5]=a=>e.value.type=a),items:C.value,label:"نوع انتقال",variant:"outlined","item-title":"label","item-value":"value"},null,8,["modelValue","items"])]),_:1})):m("",!0),e.value.report==2?(n(),d(s,{key:1,cols:"6",md:"4",class:"my-4"},{default:o(()=>[t(c,{modelValue:e.value.type,"onUpdate:modelValue":l[6]||(l[6]=a=>e.value.type=a),items:U.value,label:"نوع معامله",variant:"outlined","item-title":"label","item-value":"value"},null,8,["modelValue","items"])]),_:1})):m("",!0),e.value.report==2?(n(),d(s,{key:2,cols:"6",md:"4",class:"my-4"},{default:o(()=>[t(c,{modelValue:e.value.deal,"onUpdate:modelValue":l[7]||(l[7]=a=>e.value.deal=a),items:R.value,label:"نوع ثبت",variant:"outlined","item-title":"label","item-value":"value"},null,8,["modelValue","items"])]),_:1})):m("",!0),e.value.report!=3?(n(),d(s,{key:3,cols:"6",md:"4",class:"my-4"},{default:o(()=>[t(c,{modelValue:e.value.status,"onUpdate:modelValue":l[8]||(l[8]=a=>e.value.status=a),items:j.value,label:"وضعیت",variant:"outlined","item-title":"label","item-value":"value"},null,8,["modelValue","items"])]),_:1})):m("",!0),e.value.report!=3?(n(),d(s,{key:4,cols:"6",md:"4",class:"my-4"},{default:o(()=>[t($,{modelValue:e.value.nationalCode,"onUpdate:modelValue":l[9]||(l[9]=a=>e.value.nationalCode=a),label:"کد ملی",variant:"outlined"},null,8,["modelValue"])]),_:1})):m("",!0),e.value.report==3?(n(),d(s,{key:5,cols:"6",md:"4",class:"my-4"},{default:o(()=>[t(c,{modelValue:e.value.auth,"onUpdate:modelValue":l[10]||(l[10]=a=>e.value.auth=a),items:S.value,label:"وضعیت کاربران",variant:"outlined","item-title":"label","item-value":"value"},null,8,["modelValue","items"])]),_:1})):m("",!0)]),_:1})):m("",!0),t(b,null,{default:o(()=>[t(s,{cols:"12"},{default:o(()=>[v("div",J,[y.value.link!=""?(n(!0),_(I,{key:0},H(y.value.link,(a,g)=>(n(),_("a",{class:"download-link my-1",key:g,href:a},"دانلود گزارش "+M(g+1),9,X))),128)):m("",!0)])]),_:1}),t(s,{cols:"12"},{default:o(()=>[v("div",K,[t(L,{type:"submit",loading:i.value},{default:o(()=>l[13]||(l[13]=[q("ایجاد گزارش")])),_:1},8,["loading"])])]),_:1})]),_:1})]),_:1})]),_:1})}}},oe=N(Q,[["__scopeId","data-v-ab402c8b"]]);export{oe as default};
