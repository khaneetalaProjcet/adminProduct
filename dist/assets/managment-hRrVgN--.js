import{S as a}from"./api-cTxqDW9U.js";import{a5 as o,a6 as i}from"./index-3Gb3Dr87.js";const r=i(),t=o.create({baseURL:"https://gateway.khanetala.ir/v1/admin",headers:{"Content-Type":"application/json",Accept:"application/json"}});t.interceptors.request.use(e=>{const s=localStorage.getItem("token");return s?e.headers.Authorization=`Bearer ${s}`:r.replace("/login"),e},e=>Promise.reject(e));t.interceptors.response.use(e=>e,e=>(e.response.status==401&&(localStorage.removeItem("token"),r.replace("/login")),console.error("API Error:",e.response||e.message),Promise.reject(e)));const m={async AdminList(){return(await t.get("/all")).data},async AccessPoint(e){return(await t.get(`/menu/all/${e}`)).data},async SubmitAccessPoint(e,s){const n=JSON.stringify({accessPoints:e});return(await t.post(`/access/update/${s}`,n)).data},async AddAdmin(e){const s=JSON.stringify(e);return(await t.post("/create",s)).data},async GetUserActivity(){return(await a.get("/logger/admin/all")).data},async GetExpertActivity(){return(await a.get("/logger/user/all")).data},async GetPermission(){return(await a.get("/main/trade")).data},async TradePermission(){return(await a.post("/main/trade/permision")).data}};export{m as M};
