import{a5 as s,a6 as a}from"./index-yGymRVgy.js";const r=a(),o=s.create({baseURL:"https://gateway.khanetala.ir/v1",headers:{"Content-Type":"application/json",Accept:"application/json"}});o.interceptors.request.use(e=>{const t=localStorage.getItem("token");return t?e.headers.Authorization=`Bearer ${t}`:r.replace("/login"),e},e=>Promise.reject(e));o.interceptors.response.use(e=>e,e=>(e.response.status==401&&(localStorage.removeItem("token"),r.replace("/login")),console.error("API Error:",e.response||e.message),Promise.reject(e)));export{o as S};
