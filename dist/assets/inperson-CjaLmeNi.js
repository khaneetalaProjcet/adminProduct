import{a5 as o,a6 as a}from"./index-3Gb3Dr87.js";const r=a(),t=o.create({baseURL:"https://gateway.khanetala.ir/v1/main",headers:{"Content-Type":"application/json",Accept:"application/json"}});t.interceptors.request.use(e=>{const s=localStorage.getItem("token");return s?e.headers.Authorization=`Bearer ${s}`:r.replace("/login"),e},e=>Promise.reject(e));t.interceptors.response.use(e=>e,e=>(e.response.status==401&&(localStorage.removeItem("token"),r.replace("/login")),console.error("API Error:",e.response||e.message),Promise.reject(e)));const p={async sendOtp(e){const s=JSON.stringify({phoneNumber:e});return(await t.post("/otp",s)).data},async submitOtp(e){const s=JSON.stringify(e);return(await t.post("/inperson/otp/verify",s)).data},async identityUser(e){const s=JSON.stringify({phoneNumber:e.phoneNumber,nationalCode:e.nationalCode,birthDate:e.birthDate,id:e.id});return(await t.post("/user/identity",s)).data},async CreateBuy(e){const s=JSON.stringify(e);return(await t.post("/inperson/buy/create",s)).data},async CreateSell(e){const s=JSON.stringify(e);return(await t.post("/inperson/sell/create",s)).data},async InPersonBuy(e){return(await t.get(`/inperson/buy/all/${e}`)).data},async InPersonSell(e){return(await t.get(`/inperson/sell/all/${e}`)).data},async SubmitInPersonBuy(e){const s=JSON.stringify({status:e.status,id:e.id,description:e.description});return(await t.post("/inperson/transaction/changestatus",s)).data},async SubmitConvertTrade(e){const s=JSON.stringify(e);return(await t.post("/inperson/convert/create",s)).data}};export{p as I};
