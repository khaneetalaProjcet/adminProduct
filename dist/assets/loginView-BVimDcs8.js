import{_ as x,r,c as k,e as w,w as m,h,a as d,b as l,o as c,C as f,t as N,a3 as S,a4 as C,a0 as _}from"./index-B6b8d133.js";import{V as g}from"./api-C2aGN2MR.js";import{V as I}from"./VAlert-DvW1afGq.js";import{V as B}from"./VCard-CYQcusif.js";import{V as A}from"./VForm-BnKR07ua.js";import{V as v}from"./VTextField-CFZ92jUg.js";import"./axios-upsvKRUO.js";import"./createSimpleFunctional-DWF0aMWO.js";import"./index-DVKoPyw-.js";import"./VImg-GTgk7A-9.js";const T="/logo.png",D={async Shahkar(n){const o=await g.post("",n);return localStorage.setItem("authtoken",o.data.token),o.data},async Login(n){const o=JSON.stringify(n),t=await g.post("/admin/login",o),s=t.data.data.token,i=t.data.data.accessPoints;return localStorage.setItem("token",s),localStorage.setItem("permissions",JSON.stringify(i)),t.data}},F={__name:"loginView",setup(n){const o=r(!1),t=r({phoneNumber:"",password:""}),s=r(!1),i=r("test"),p=r(!1),V=[e=>!!e||"شماره همراه نمی‌تواند خالی باشد",e=>/^\d{11}$/.test(e)||"شماره همراه باید 11 رقم باشد",e=>e.startsWith("09")||"شماره همراه باید با 09 شروع شود"],b=()=>{t.value.phoneNumber=t.value.phoneNumber.replace(/[٠-٩۰-۹]/g,e=>String.fromCharCode(e.charCodeAt(0)-(e.charCodeAt(0)>=1776?1728:1584))).replace(/\D/g,"").slice(0,11)},y=async()=>{try{s.value=!0;const e=await D.Login(t.value);return _.push("/Dashboard"),e}catch(e){i.value=e.response.data.error||"خطایی رخ داده است!",p.value=!0,setTimeout(()=>{p.value=!1},5e3)}finally{s.value=!1}};return(e,a)=>(c(),k("div",null,[p.value?(c(),w(I,{key:0,color:"error",border:"bottom",elevation:"2",class:"k-alert alert-animatiton",closable:""},{default:m(()=>[f(N(i.value),1)]),_:1})):h("",!0),a[4]||(a[4]=d("div",{class:"d-flex flex-column justify-center align-items-center"},[d("img",{src:T,class:"mx-auto my-6","max-width":"228",alt:"خانه طلا"}),d("p",{class:"title"},"پنل مدیریت خانه طلا")],-1)),l(B,{class:"mx-2 mx-md-auto pa-8",elevation:"4","max-width":"448",rounded:"lg"},{default:m(()=>[l(A,{ref:"form",onSubmit:S(y,["prevent"])},{default:m(()=>[l(v,{modelValue:t.value.phoneNumber,"onUpdate:modelValue":a[0]||(a[0]=u=>t.value.phoneNumber=u),label:"شماره همراه",class:"my-6 login-input",rules:V,onInput:b},null,8,["modelValue"]),l(v,{modelValue:t.value.password,"onUpdate:modelValue":a[1]||(a[1]=u=>t.value.password=u),label:"رمز عبور",class:"my-6 login-input","append-inner-icon":o.value?"ri-eye-line":"ri-eye-off-line",type:o.value?"text":"password","onClick:appendInner":a[2]||(a[2]=u=>o.value=!o.value)},null,8,["modelValue","append-inner-icon","type"]),l(C,{type:"submit",class:"mb-8 k-btn",color:"#d4af37",size:"large",loading:s.value,block:""},{default:m(()=>a[3]||(a[3]=[f(" ورود به پنل ")])),_:1},8,["loading"])]),_:1},512)]),_:1})]))}},R=x(F,[["__scopeId","data-v-6f110f5a"]]);export{R as default};
