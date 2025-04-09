import{D as U}from"./api-hJNkzfwG.js";import{_ as B,r as i,k as V,c as r,b as o,w as p,a1 as z,e as c,h as S,F,q as j,o as t,a2 as v,a as e,V as b,t as d,C as D,am as u}from"./index-B6b8d133.js";import{V as N}from"./VAlert-DvW1afGq.js";import"./axios-upsvKRUO.js";import"./createSimpleFunctional-DWF0aMWO.js";const W={async Dashboard(){return(await U.get("/home/charts")).data}},O={class:"box"},A={class:"icon-box"},M={class:"my-2 d-flex justify-space-between align-center w-100"},Y={key:1},E={class:"my-2 d-flex justify-space-between align-center"},I={key:1},q={class:"my-2 d-flex justify-space-between align-center total"},G={key:1},L={class:"box"},P={class:"icon-box"},R={class:"my-2 d-flex justify-space-between align-center w-100"},H={key:1},J={class:"my-2 d-flex justify-space-between align-center"},K={key:1},Q={class:"my-2 d-flex justify-space-between align-center total"},X={key:1},Z={class:"box"},$={class:"icon-box"},ee={class:"my-2 d-flex justify-space-between align-center w-100"},ae={key:1},se={class:"my-2 d-flex justify-space-between align-center"},te={key:1},le={class:"my-2 d-flex justify-space-between align-center total"},oe={key:1},ne={class:"box"},ie={class:"box"},re={class:"box"},ce={__name:"OverviewView",setup(T){const n=i(!1),s=i({successUsers:"-",failedUsers:"-",allUsers:"-",pendingsTransactions:"-",failedTransactions:"-",completeTransactions:"-",allTransActions:"-",allBuy:"-",allSell:"-",allWeight:"-",buyChart:{}}),x=i(""),f=i(!1),y=i({chart:{fontFamily:"YekanBakhFaNum"},title:{text:"حجم معاملات ماهانه صندوق طلا",align:"center",style:{fontSize:"16px",fontWeight:"bold",color:"#333"}},xaxis:{categories:[]}}),g=i([{name:"میزان فروش صندوق طلا",data:[],color:"#d4af37"}]),m=i({chart:{fontFamily:"YekanBakhFaNum"},title:{text:"حجم معاملات روزانه صندوق طلا",align:"center",style:{fontSize:"16px",fontWeight:"bold",color:"#333"}},stroke:{curve:"smooth",width:3},xaxis:{categories:[]},colors:["#FF3131","#008000"]}),k=i([{name:"میزان فروش صندوق طلا",data:[]}]),_=i({chart:{type:"pie",fontFamily:"YekanBakhFaNum"},title:{text:"احراز هویت کاربران",align:"center",style:{fontSize:"16px",fontWeight:"bold",color:"#333"}},colors:["#fcc428","#d4af37"],labels:[]}),w=i([]),C=async()=>{try{n.value=!0;const a=await W.Dashboard();return s.value.allBuy=a.data.allBuy,s.value.allSell=a.data.allSell,s.value.allTransActions=a.data.allTransActions,s.value.allUsers=a.data.allUsers,s.value.allWeight=a.data.allWeight,s.value.completeTransactions=a.data.completeTransactions,s.value.failedTransactions=a.data.failedTransactions,s.value.failedUsers=a.data.failedUsers,s.value.pendingsTransactions=a.data.pendingsTransactions,s.value.successUsers=a.data.successUsers,s.value.buyChart=a.data.buyChart,y.value={...y.value,xaxis:{categories:a.data.barChart.label}},g.value=[{name:"فروش ماهانه صندوق طلا",data:a.data.barChart.data}],m.value={...m.value,xaxis:{categories:a.data.lineChart.label}},k.value=[{name:"فروش ماهانه صندوق طلا",data:a.data.lineChart[0].data},{name:"خرید ماهانه صندوق طلا",data:a.data.lineChart[1].data}],_.value={..._.value,labels:a.data.pieChart.label},w.value=a.data.pieChart.data,a}catch(a){a.response.status==401&&(localStorage.clear(),router.replace("/login")),x.value=a.response.data.msg||"خطایی رخ داده است!",f.value=!0,setTimeout(()=>{f.value=!1},1e4)}finally{n.value=!1}};return V(()=>{C()}),(a,l)=>{const h=j("apexchart");return t(),r(F,null,[o(z,null,{default:p(()=>[o(v,{cols:"12",md:"4"},{default:p(()=>[e("div",O,[e("div",A,[o(b,{icon:"ri-user-line",class:"icon"})]),e("div",M,[l[0]||(l[0]=e("p",null,"کاربران احراز شده",-1)),n.value?(t(),c(u,{key:0,color:"#d4af37",indeterminate:"",size:20})):(t(),r("p",Y,d(s.value.successUsers)+" نفر",1))]),e("div",E,[l[1]||(l[1]=e("p",null,"کاربران در انتظار",-1)),n.value?(t(),c(u,{key:0,color:"#d4af37",indeterminate:"",size:20})):(t(),r("p",I,d(s.value.failedUsers)+" نفر",1))]),e("div",q,[l[2]||(l[2]=e("p",null,"همه کاربران",-1)),n.value?(t(),c(u,{key:0,color:"#d4af37",indeterminate:"",size:20})):(t(),r("p",G,d(s.value.allUsers)+" نفر",1))])])]),_:1}),o(v,{cols:"12",md:"4"},{default:p(()=>[e("div",L,[e("div",P,[o(b,{icon:"ri-p2p-line",class:"icon"})]),e("div",R,[l[3]||(l[3]=e("p",null,"معاملات موفق",-1)),n.value?(t(),c(u,{key:0,color:"#d4af37",indeterminate:"",size:20})):(t(),r("p",H,d(s.value.completeTransactions)+" معامله",1))]),e("div",J,[l[4]||(l[4]=e("p",null,"معاملات نامشخص",-1)),n.value?(t(),c(u,{key:0,color:"#d4af37",indeterminate:"",size:20})):(t(),r("p",K,d(s.value.pendingsTransactions)+" معامله",1))]),e("div",Q,[l[5]||(l[5]=e("p",null,"معاملات ناموفق",-1)),n.value?(t(),c(u,{key:0,color:"#d4af37",indeterminate:"",size:20})):(t(),r("p",X,d(s.value.failedTransactions)+" معامله",1))])])]),_:1}),o(v,{cols:"12",md:"4"},{default:p(()=>[e("div",Z,[e("div",$,[o(b,{icon:"ri-exchange-dollar-fill",class:"icon"})]),e("div",ee,[l[6]||(l[6]=e("p",null,"طلای خریداری شده",-1)),n.value?(t(),c(u,{key:0,color:"#d4af37",indeterminate:"",size:20})):(t(),r("p",ae,d(s.value.allBuy)+" گرم",1))]),e("div",se,[l[7]||(l[7]=e("p",null,"طلای فروخته شده",-1)),n.value?(t(),c(u,{key:0,color:"#d4af37",indeterminate:"",size:20})):(t(),r("p",te,d(s.value.allSell)+" گرم",1))]),e("div",le,[l[8]||(l[8]=e("p",null,"مجموع طلای معامله شده",-1)),n.value?(t(),c(u,{key:0,color:"#d4af37",indeterminate:"",size:20})):(t(),r("p",oe,d(s.value.allWeight)+" گرم",1))])])]),_:1}),o(v,{cols:"12",md:"6"},{default:p(()=>[e("div",ne,[o(h,{width:"100%",type:"bar",options:y.value,series:g.value},null,8,["options","series"])])]),_:1}),o(v,{cols:"12",md:"6"},{default:p(()=>[e("div",ie,[o(h,{width:"100%",type:"line",options:m.value,series:k.value},null,8,["options","series"])])]),_:1}),o(v,{cols:"12",md:"4"},{default:p(()=>[e("div",re,[o(h,{width:"100%",type:"pie",options:_.value,series:w.value},null,8,["options","series"])])]),_:1})]),_:1}),f.value?(t(),c(N,{key:0,color:"error",border:"bottom",elevation:"2",class:"k-alert alert-animatiton",closable:""},{default:p(()=>[D(d(x.value),1)]),_:1})):S("",!0)],64)}}},ye=B(ce,[["__scopeId","data-v-b352aa2b"]]);export{ye as default};
