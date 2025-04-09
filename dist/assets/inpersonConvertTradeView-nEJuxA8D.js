import{A as Ue,o as r,e as c,J as il,_ as ml,r as v,c as S,b as l,w as a,a1 as V,h as y,F as ee,q as rl,a2 as n,a6 as re,a7 as G,a as t,C as p,u as ve,a4 as g,V as H,t as m,a3 as vl,a8 as cl}from"./index-B6b8d133.js";import{V as N}from"./VTextField-CFZ92jUg.js";import{I as j}from"./inperson-DYM3QWKJ.js";import{V as fl,a as pl,b as yl,c as q,G as bl,d as Vl}from"./VStepper-Cx5AWfwG.js";import{V as gl}from"./VAlert-DvW1afGq.js";import{V as _l}from"./VDialog-DjZDkzMJ.js";import{V as $,b as O}from"./VCard-CYQcusif.js";import{V as M}from"./VForm-BnKR07ua.js";import{V as xl}from"./VOtpInput-DKLdo02m.js";import{V as L}from"./VSelect-BiPDzVBA.js";import{e as Te}from"./VMenu-flDz4ANH.js";import"./index-DVKoPyw-.js";import"./VImg-GTgk7A-9.js";import"./axios-upsvKRUO.js";import"./createSimpleFunctional-DWF0aMWO.js";import"./VWindowItem-jTbYTC5E.js";const ce={__name:"MoneyInput",props:{modelValue:{type:[Number,String],default:0}},emits:["update:modelValue"],setup(fe,{emit:le}){const ae=fe,Y=le,te=Ue(()=>{const f=Number(ae.modelValue);return isNaN(f)?"":f.toLocaleString("en-US")});function i(f){const U=Number(String(f).replace(/,/g,""));isNaN(U)?Y("update:modelValue",0):Y("update:modelValue",U)}return(f,U)=>(r(),c(N,il(f.$attrs,{"model-value":te.value,"onUpdate:modelValue":i}),null,16,["model-value"]))}},kl={class:"w-100 d-flex justify-space-between align-items-center"},wl={key:0,class:"d-flex"},Cl={key:1,class:"d-flex"},Nl={key:1,class:"d-flex"},Pl={class:"mb-0"},Sl={class:"d-flex"},Tl={class:"mb-0"},Ul={class:"d-flex"},Il={class:"mb-0"},Dl={class:"d-flex"},Wl={key:0,class:"mb-0"},zl={key:1,class:"mb-0"},Ll={class:"d-flex"},Bl={class:"mb-0"},Fl={class:"d-flex"},Rl={class:"mb-0"},$l={class:"d-flex"},Ml={class:"mb-0"},Al={class:"d-flex"},Gl={class:"mb-0"},Hl={class:"d-flex"},jl={class:"d-flex"},ql={class:"mb-0"},Ol={class:"livePrice-box py-2"},Yl={key:0,class:"d-flex justify-end py-3 px-4"},El={class:"total-price"},Jl={class:"d-flex"},Kl={class:"d-flex"},Ql={class:"d-flex"},Xl={class:"d-flex"},Zl={class:"d-flex"},hl={class:"d-flex"},ea={class:"d-flex"},la={class:"d-flex"},aa={class:"d-flex"},ta={class:"d-flex"},ua={class:"d-flex"},sa={class:"d-flex"},na={class:"d-flex"},oa={class:"d-flex"},da={class:"d-flex form-total-price"},ia={class:"goldbox-section"},ma={class:"ma-0"},ra={class:"goldbox-section"},va={class:"ma-0"},ca={class:"goldbox-section"},fa={class:"ma-0"},pa={class:"d-flex flex-column"},ya={class:"d-flex flex-column"},ba={class:"d-flex flex-column"},Va={__name:"inpersonConvertTradeView",setup(fe){const le=v([1,2,3,4,5]),ae=v([{name:"نقد",value:"0"},{name:"نقد و صندوق طلا",value:"1"},{name:"صندوق طلا",value:"2"}]),Y=v([{name:"قسطی",value:"0"},{name:"چکی",value:"1"},{name:"نقد",value:"2"}]),te=v([{name:"3 ماهه 3٪",value:"0"},{name:"6ماه 12٪",value:"1"},{name:"12ماهه 23٪",value:"2"}]),i=v({paymentType:null,cash:0,totalCash:"",installmentType:"",payment:"",creditCard:0,transfer:0,chequeNumber:"",goldWeight:"",creditCardId:"",transferId:"",paymentType:""}),f=v(1),U=v({}),ue=v(!1),E=v(!1),se=v(!1),pe=v(!1),ne=v(!1),J=v(!1),oe=v(!1),D=v(!1),B=v(),F=v(),R=v(),Ie=v(null),x=v(!1),W=v(""),K=v(!1),k=v({phoneNumber:"",otp:""}),De=v(["النگو","سرویس","انگشتر","زنجیر","دستبند","پلاک","گوشواره","کلاسیک","همکاری","طلاجات کلی"]),w=v({title:"",category:"",wage:"",number:"",weight:"",totalPrice:""}),Q=v([]),d=v({isVerified:"",id:"",firstName:"",birthDate:"",lastName:"",fatherName:"",gender:"",officeName:"",phoneNumber:"",nationalCode:"",isHaveBank:"",wallet:{id:"",goldWeight:"",balance:""}}),C=v({date:"",time:"",buyPrice:"",sellPrice:"",milliseconds:""}),We=v({}),_=v(),z=v({totalInvoicePrice:0,nationalCode:"",productList:[]}),ze=v([{name:"1",value:1},{name:"2",value:2},{name:"3",value:3},{name:"4",value:4},{name:"5",value:5},{name:"6",value:6},{name:"7",value:7},{name:"8",value:8},{name:"9",value:9},{name:"10",value:10},{name:"11",value:11},{name:"12",value:12},{name:"13",value:13},{name:"14",value:14},{name:"15",value:15},{name:"16",value:16},{name:"17",value:17},{name:"18",value:18},{name:"19",value:19},{name:"20",value:20},{name:"21",value:21},{name:"22",value:22},{name:"23",value:23},{name:"24",value:24},{name:"25",value:25},{name:"26",value:26},{name:"27",value:27},{name:"28",value:28},{name:"29",value:29},{name:"30",value:30},{name:"31",value:31}]),Le=v([{name:"فروردین",value:1},{name:"اردیبهشت",value:2},{name:"خرداد",value:3},{name:"تیر",value:4},{name:"مرداد",value:5},{name:"شهریور",value:6},{name:"مهر",value:7},{name:"آبان",value:8},{name:"آذر",value:9},{name:"دی",value:10},{name:"بهمن",value:11},{name:"اسفند",value:12}]),Be=v([{name:"1300",value:1300},{name:"1301",value:1301},{name:"1302",value:1302},{name:"1303",value:1303},{name:"1304",value:1304},{name:"1305",value:1305},{name:"1306",value:1306},{name:"1307",value:1307},{name:"1308",value:1308},{name:"1309",value:1309},{name:"1310",value:1310},{name:"1311",value:1311},{name:"1312",value:1312},{name:"1313",value:1313},{name:"1314",value:1314},{name:"1315",value:1315},{name:"1316",value:1316},{name:"1317",value:1317},{name:"1318",value:1318},{name:"1319",value:1319},{name:"1320",value:1320},{name:"1321",value:1321},{name:"1322",value:1322},{name:"1323",value:1323},{name:"1324",value:1324},{name:"1325",value:1325},{name:"1326",value:1326},{name:"1327",value:1327},{name:"1328",value:1328},{name:"1329",value:1329},{name:"1330",value:1330},{name:"1331",value:1331},{name:"1332",value:1332},{name:"1333",value:1333},{name:"1334",value:1334},{name:"1335",value:1335},{name:"1336",value:1336},{name:"1337",value:1337},{name:"1338",value:1338},{name:"1339",value:1339},{name:"1340",value:1340},{name:"1341",value:1341},{name:"1342",value:1342},{name:"1343",value:1343},{name:"1344",value:1344},{name:"1345",value:1345},{name:"1346",value:1346},{name:"1347",value:1347},{name:"1348",value:1348},{name:"1349",value:1349},{name:"1350",value:1350},{name:"1351",value:1351},{name:"1352",value:1352},{name:"1353",value:1353},{name:"1354",value:1354},{name:"1355",value:1355},{name:"1356",value:1356},{name:"1357",value:1357},{name:"1358",value:1358},{name:"1359",value:1359},{name:"1360",value:1360},{name:"1361",value:1361},{name:"1362",value:1362},{name:"1363",value:1363},{name:"1364",value:1364},{name:"1365",value:1365},{name:"1366",value:1366},{name:"1367",value:1367},{name:"1368",value:1368},{name:"1369",value:1369},{name:"1370",value:1370},{name:"1371",value:1371},{name:"1372",value:1372},{name:"1373",value:1373},{name:"1374",value:1374},{name:"1375",value:1375},{name:"1376",value:1376},{name:"1377",value:1377},{name:"1378",value:1378},{name:"1379",value:1379},{name:"1380",value:1380},{name:"1381",value:1381},{name:"1382",value:1382},{name:"1383",value:1383},{name:"1384",value:1384},{name:"1385",value:1385},{name:"1386",value:1386},{name:"1387",value:1387},{name:"1388",value:1388},{name:"1389",value:1389},{name:"1390",value:1390},{name:"1391",value:1391},{name:"1392",value:1392},{name:"1393",value:1393},{name:"1394",value:1394},{name:"1395",value:1395},{name:"1396",value:1396},{name:"1397",value:1397},{name:"1398",value:1398},{name:"1399",value:1399},{name:"1400",value:1400},{name:"1401",value:1401},{name:"1402",value:1402},{name:"1403",value:1403}]),de=s=>s<f.value,Fe=()=>{if(K.value){const s={...w.value,totalPrice:Re(w.value)};Q.value.push(s),Me()}},Re=s=>{const u=(s.wage/100*s.weight+ +s.weight)*C.value.buyPrice;return z.value.totalInvoicePrice+=u,u},$e=(s,e)=>{Q.value.splice(s,1),z.value.totalInvoicePrice-=e.totalPrice},Me=()=>{w.value={category:null,title:null,number:null,weight:null,wage:null}},A=(s,e)=>{s&&(U.value[e]=s)},X=()=>{f.value>1&&f.value--,D.value=!1,B.value="",F.value="",R.value="",d.value.nationalCode="",k.value.otp="",k.value.phoneNumber=""},ie=Ue(()=>{var s;return!U.value[f.value]||D.value&&((s=k.value.otp)==null?void 0:s.length)!==4?!1:U.value[f.value].isValid}),Z=async s=>{const e=U.value[f.value];if(e){const{valid:b}=await e.validate();b&&await Ae()&&f.value++}},Ae=async()=>{if(f.value===1)return await He();if(f.value===2)return!0;if(f.value===3)return await qe();if(f.value===4)return!0;if(f.value===5)return await ye()},Ge=async()=>{try{oe.value=!0;const s=await j.sendOtp(k.value.phoneNumber);return D.value=!0,s}catch(s){s.response.status==401&&(localStorage.clear(),router.replace("/login")),W.value=s.response.data.error||"خطایی رخ داده است!",x.value=!0,setTimeout(()=>{x.value=!1},1e4)}finally{oe.value=!1}},He=async()=>{var s,e,b,u,P,T,h,Ve,ge,_e,xe,ke,we,Ce,Ne,Pe,Se;try{ue.value=!0;const o=await j.submitOtp(k.value);return o.data.isVerified==0?d.value.isVerified=o.data.isVerified:(d.value.id=(s=o==null?void 0:o.data)==null?void 0:s.id,d.value.isVerified=(e=o==null?void 0:o.data)==null?void 0:e.isVerified,d.value.firstName=(b=o==null?void 0:o.data)==null?void 0:b.firstName,d.value.lastName=(u=o==null?void 0:o.data)==null?void 0:u.lastName,d.value.fatherName=(P=o==null?void 0:o.data)==null?void 0:P.fatherName,d.value.gender=(T=o==null?void 0:o.data)==null?void 0:T.gender,d.value.isHaveBank=(h=o==null?void 0:o.data)==null?void 0:h.isHaveBank,d.value.nationalCode=(Ve=o==null?void 0:o.data)==null?void 0:Ve.nationalCode,d.value.birthDate=(ge=o==null?void 0:o.data)==null?void 0:ge.birthDate,d.value.officeName=(_e=o==null?void 0:o.data)==null?void 0:_e.officeName,d.value.phoneNumber=(xe=o==null?void 0:o.data)==null?void 0:xe.phoneNumber,d.value.wallet.balance=(we=(ke=o==null?void 0:o.data)==null?void 0:ke.wallet)==null?void 0:we.balance,d.value.wallet.goldWeight=(Ne=(Ce=o==null?void 0:o.data)==null?void 0:Ce.wallet)==null?void 0:Ne.goldWeight,d.value.wallet.id=(Se=(Pe=o==null?void 0:o.data)==null?void 0:Pe.wallet)==null?void 0:Se.id),o}catch(o){o.response.status==401&&(localStorage.clear(),router.replace("/login")),W.value=o.response.data.error||"خطایی رخ داده است!",x.value=!0,setTimeout(()=>{x.value=!1},1e4)}finally{ue.value=!1}},je=async()=>{try{E.value=!0;const s=await j.identityUser(d.value);return d.value.isVerified=s.data.isVerified,s}catch(s){s.response.status==401&&(localStorage.clear(),router.replace("/login")),W.value=s.response.data.error||"خطایی رخ داده است!",x.value=!0,setTimeout(()=>{x.value=!1},1e4)}finally{E.value=!1}},qe=async()=>{try{se.value=!0,z.value.nationalCode=d.value.nationalCode,z.value.productList=Q.value;const s=await j.SubmitConvertTrade(z.value);return _.value=s.data,s}catch(s){s.response.status==401&&(localStorage.clear(),router.replace("/login")),W.value=s.response.data.error||"خطایی رخ داده است!",x.value=!0,setTimeout(()=>{x.value=!1},1e4)}finally{se.value=!1}},Oe=async()=>{Ye();try{ne.value=!0;const s=await bl.GoldPriceByTime(C.value.milliseconds);return C.value.buyPrice=s.buyPrice,C.value.sellPrice=s.sellPrice,s}catch(s){s.response.status==401&&(localStorage.clear(),router.replace("/login")),W.value=s.response.data.error||"خطایی رخ داده است!",x.value=!0,setTimeout(()=>{x.value=!1},1e4)}finally{ne.value=!1}},ye=async()=>{try{pe.value=!0,i.value.totalCash=+i.value.cash+ +i.value.creditCard+ +i.value.transfer;const s=await j.SubmitPayment(i.value,_.value.id);return We.value=s.data,nl(),s}catch(s){s.response.status==401&&(localStorage.clear(),router.replace("/login")),W.value=s.response.data.error||"خطایی رخ داده است!",x.value=!0,setTimeout(()=>{x.value=!1},1e4)}finally{pe.value=!1}},Ye=()=>{const[s,e,b]=C.value.date.split("/").map(Number),[u,P]=C.value.time.split(":").map(Number),T=cl.toGregorian(s,e,b),h=new Date(T.gy,T.gm-1,T.gd,u,P,0);C.value.milliseconds=h.getTime()},Ee=()=>{k.value.phoneNumber=k.value.phoneNumber.replace(/\D/g,"").slice(0,11)},Je=[s=>!!s||"شماره همراه الزامی است",s=>/^09\d{9}$/.test(s)||"شماره معتبر نیست"],Ke=[s=>!!s||"کد تایید را وارد کنید",s=>(s==null?void 0:s.length)===4||"کد تایید باید ۴ رقمی باشد"],be=[s=>!!s||"کد ملی الزامی است",s=>/^\d{10}$/.test(s)||"کد ملی باید ۱۰ رقم باشد",s=>{if(!/^\d{10}$/.test(s))return!0;const e=+s[9],b=s.split("").slice(0,9).reduce((u,P,T)=>u+ +P*(10-T),0)%11;return b<2&&e===b||b>=2&&e+b===11||"کد ملی نامعتبر است"}],Qe=[s=>!!s,s=>/^\d+(\.\d{1,3})?$/.test(s)],Xe=[s=>!!s],Ze=[s=>!!s],he=[s=>!!s],el=[s=>!!s],ll=s=>{B.value=s,me()},al=s=>{F.value=s,me()},tl=s=>{R.value=s,me()},me=()=>{if(R.value&&F.value&&B.value){const s=String(F.value).padStart(2,"0"),e=String(B.value).padStart(2,"0");d.value.birthDate=`${R.value}${s}${e}`}},ul=()=>{Ie.value=null},sl=()=>{d.value.nationalCode=d.value.nationalCode.replace(/\D/g,"").slice(0,10),be.every(s=>s(d.value.nationalCode)===!0)},I=s=>s.toString().replace(/\B(?=(\d{3})+(?!\d))/g,","),nl=async()=>{J.value=!0,setInterval(()=>{J.value=!1,D.value=!1,k.value.phoneNumber="",k.value.otp="",f.value=1},3e3)},ol=()=>_.value.totalInvoicePrice-(+i.value.cash+ +i.value.creditCard+ +i.value.transfer)-+i.value.goldWeight*+_.value.goldPrice,dl=()=>{window.print()};return(s,e)=>{const b=rl("persian-date-picker");return r(),S(ee,null,[l(V,null,{default:a(()=>[l(n,{cols:"12"},{default:a(()=>[l(fl,{modelValue:f.value,"onUpdate:modelValue":e[25]||(e[25]=u=>f.value=u)},{default:a(()=>[l(pl,null,{default:a(()=>[(r(!0),S(ee,null,re(le.value,u=>(r(),c(Vl,{key:u,complete:de(u),title:`مرحله ${u}`,value:u,icon:de(u)?"ri-check-line":"ri-close-line",color:de(u)?"#0b8707":"#c7c3c3",class:"custom-stepper-icon"},null,8,["complete","title","value","icon","color"]))),128))]),_:1}),l(yl,null,{default:a(()=>[l(q,{value:1},{default:a(()=>[l($,{class:"step-card"},{default:a(()=>[l(M,{ref:u=>A(u,1)},{default:a(()=>[l(G,null,{default:a(()=>[l(V,null,{default:a(()=>[l(n,{cols:"12"},{default:a(()=>e[27]||(e[27]=[t("div",{class:"d-flex"},[t("h3",{class:"trade-step-title"},"احراز هویت")],-1)])),_:1}),l(n,{cols:"12",md:"4",class:"d-none d-md-flex"}),l(n,{cols:"12",md:"4"},{default:a(()=>[l(N,{modelValue:k.value.phoneNumber,"onUpdate:modelValue":e[0]||(e[0]=u=>k.value.phoneNumber=u),label:"شماره همراه",variant:"outlined",rules:Je,onInput:Ee,disabled:D.value!=!1},null,8,["modelValue","disabled"])]),_:1}),l(n,{cols:"12",md:"4",class:"d-none d-md-flex"})]),_:1}),D.value!=!1?(r(),c(V,{key:0},{default:a(()=>[l(n,{cols:"12",md:"4",class:"d-none d-md-flex"}),l(n,{cols:"12",md:"4"},{default:a(()=>[l(xl,{length:4,modelValue:k.value.otp,"onUpdate:modelValue":e[1]||(e[1]=u=>k.value.otp=u),type:"number",rules:Ke,variant:"outlined",class:"otp-input"},null,8,["modelValue"])]),_:1}),l(n,{cols:"12",md:"4",class:"d-none d-md-flex"})]),_:1})):y("",!0)]),_:1})]),_:1},512),l(O,{class:"btn-box first-step"},{default:a(()=>[D.value==!1?(r(),c(g,{key:0,onClick:Ge,color:"primary",size:"large",variant:"elevated",disabled:!ve(ie),loading:oe.value},{default:a(()=>e[28]||(e[28]=[p(" ارسال کد تایید ")])),_:1},8,["disabled","loading"])):(r(),c(g,{key:1,onClick:Z,color:"primary",size:"large",variant:"elevated",loading:ue.value,disabled:!ve(ie)},{default:a(()=>e[29]||(e[29]=[p(" بعدی ")])),_:1},8,["loading","disabled"]))]),_:1})]),_:1})]),_:1}),l(q,{value:2},{default:a(()=>[l($,{class:"step-card"},{default:a(()=>[l(M,{ref:u=>A(u,2)},{default:a(()=>[l(G,null,{default:a(()=>[l(V,null,{default:a(()=>[l(n,{cols:"12"},{default:a(()=>[t("div",kl,[e[32]||(e[32]=t("h3",{class:"trade-step-title"},"اطلاعات کاربر",-1)),d.value.isVerified==1?(r(),S("div",wl,[e[30]||(e[30]=t("p",{class:"mb-0"},"کاربر احراز هویت شده است",-1)),l(H,{class:"me-2",size:"small",icon:"ri-check-line",color:"#0b8707"})])):(r(),S("div",Cl,[e[31]||(e[31]=t("p",{class:"mb-0"},"کاربر احراز هویت نشده است",-1)),l(H,{class:"me-2",size:"small",icon:"ri-close-line",color:"#c9190c"})]))])]),_:1}),l(n,{cols:"12",md:"3",class:"my-3"},{default:a(()=>[d.value.isVerified!=1?(r(),c(N,{key:0,modelValue:d.value.nationalCode,"onUpdate:modelValue":e[2]||(e[2]=u=>d.value.nationalCode=u),label:"کد ملی",variant:"outlined",rules:be,onInput:sl},null,8,["modelValue"])):(r(),S("div",Nl,[e[33]||(e[33]=t("p",{class:"mb-0"},"کد ملی : ",-1)),t("p",Pl,m(d.value.nationalCode),1)]))]),_:1}),d.value.isVerified!=1?(r(),c(n,{key:0,cols:"4",md:"3",class:"my-3"})):y("",!0),d.value.isVerified!=1?(r(),c(n,{key:1,cols:"4",md:"2",class:"my-3"},{default:a(()=>[l(L,{modelValue:B.value,"onUpdate:modelValue":[e[3]||(e[3]=u=>B.value=u),ll],label:"روز تولد",items:ze.value,variant:"outlined","item-title":"name","item-value":"value",class:"first-select",rules:[u=>!!u||"روز الزامی است"]},null,8,["modelValue","items","rules"])]),_:1})):y("",!0),d.value.isVerified!=1?(r(),c(n,{key:2,cols:"4",md:"2",class:"my-3"},{default:a(()=>[l(L,{modelValue:F.value,"onUpdate:modelValue":[e[4]||(e[4]=u=>F.value=u),al],label:"ماه تولد",items:Le.value,variant:"outlined",class:"second-select","item-title":"name","item-value":"value",rules:[u=>!!u||"ماه الزامی است"]},null,8,["modelValue","items","rules"])]),_:1})):y("",!0),d.value.isVerified!=1?(r(),c(n,{key:3,cols:"4",md:"2",class:"my-3"},{default:a(()=>[l(L,{modelValue:R.value,"onUpdate:modelValue":[e[5]||(e[5]=u=>R.value=u),tl],label:"سال تولد",items:Be.value,variant:"outlined",class:"third-select","item-title":"name","item-value":"value",rules:[u=>!!u||"سال الزامی است"]},null,8,["modelValue","items","rules"])]),_:1})):y("",!0),d.value.isVerified==1?(r(),c(n,{key:4,cols:"12",md:"3",class:"my-3"},{default:a(()=>[t("div",Sl,[e[34]||(e[34]=t("p",{class:"mb-0"},"تاریخ تولد : ",-1)),t("p",Tl,m(d.value.birthDate),1)])]),_:1})):y("",!0),l(n,{cols:"12",md:"3",class:"my-3"},{default:a(()=>[t("div",Ul,[e[35]||(e[35]=t("p",{class:"mb-0"},"شماره همراه : ",-1)),t("p",Il,m(d.value.phoneNumber),1)])]),_:1}),l(n,{cols:"12",md:"3",class:"my-3"},{default:a(()=>[t("div",Dl,[e[36]||(e[36]=t("p",{class:"mb-0"},"جنسیت : ",-1)),d.value.gender==!0?(r(),S("p",Wl,"مرد")):d.value.gender==!1?(r(),S("p",zl,"زن")):y("",!0)])]),_:1}),l(n,{cols:"12",md:"3",class:"my-3"},{default:a(()=>[t("div",Ll,[e[37]||(e[37]=t("p",{class:"mb-0"},"نام : ",-1)),t("p",Bl,m(d.value.firstName),1)])]),_:1}),l(n,{cols:"12",md:"3",class:"my-3"},{default:a(()=>[t("div",Fl,[e[38]||(e[38]=t("p",{class:"mb-0"},"نام خانوادگی : ",-1)),t("p",Rl,m(d.value.lastName),1)])]),_:1}),l(n,{cols:"12",md:"3",class:"my-3"},{default:a(()=>[t("div",$l,[e[39]||(e[39]=t("p",{class:"mb-0"},"نام پدر : ",-1)),t("p",Ml,m(d.value.fatherName),1)])]),_:1}),l(n,{cols:"12",md:"3",class:"my-3"},{default:a(()=>[t("div",Al,[e[40]||(e[40]=t("p",{class:"mb-0"},"شهر : ",-1)),t("p",Gl,m(d.value.officeName),1)])]),_:1}),l(n,{cols:"12",md:"3",class:"my-3"},{default:a(()=>[t("div",Hl,[e[41]||(e[41]=t("p",{class:"mb-0"},"کارت بانکی : ",-1)),d.value.isHaveBank==!1?(r(),c(H,{key:0,size:"small",icon:"ri-close-line",color:"#c9190c"})):d.value.isHaveBank==!0?(r(),c(H,{key:1,size:"small",icon:"ri-check-line",color:"#0b8707"})):y("",!0)])]),_:1}),l(n,{cols:"12",md:"3",class:"my-3"},{default:a(()=>[t("div",jl,[e[42]||(e[42]=t("p",{class:"mb-0"},"موجودی صندوق طلا : ",-1)),t("p",ql,m(d.value.wallet.goldWeight),1)])]),_:1})]),_:1})]),_:1})]),_:1},512),l(O,{class:"btn-box"},{default:a(()=>[l(g,{onClick:X,size:"large"},{default:a(()=>e[43]||(e[43]=[p("قبلی")])),_:1}),d.value.isVerified!=1?(r(),c(g,{key:0,onClick:je,color:"primary",size:"large",variant:"elevated",disabled:!ve(ie),loading:E.value},{default:a(()=>e[44]||(e[44]=[p(" استعلام هویت ")])),_:1},8,["disabled","loading"])):(r(),c(g,{key:1,onClick:Z,color:"primary",size:"large",variant:"elevated",loading:E.value},{default:a(()=>e[45]||(e[45]=[p(" بعدی ")])),_:1},8,["loading"]))]),_:1})]),_:1})]),_:1}),l(q,{value:3},{default:a(()=>[l($,{class:"step-card"},{default:a(()=>[l(M,{ref:u=>A(u,3)},{default:a(()=>[l(G,null,{default:a(()=>[l(V,null,{default:a(()=>[l(n,{cols:"12"},{default:a(()=>e[46]||(e[46]=[t("div",{class:"w-100 d-flex justify-space-between align-items-center"},[t("h3",{class:"trade-step-title"},"تبدیل صندوق طلا")],-1)])),_:1})]),_:1}),l(V,{class:"my-3"},{default:a(()=>[l(n,{cols:"12",md:"3",class:"my-2"},{default:a(()=>[l(b,{modelValue:C.value.date,"onUpdate:modelValue":e[6]||(e[6]=u=>C.value.date=u),placeholder:"تاریخ"},null,8,["modelValue"])]),_:1}),l(n,{cols:"12",md:"3",class:"my-2"},{default:a(()=>[l(b,{type:"time",modelValue:C.value.time,"onUpdate:modelValue":e[7]||(e[7]=u=>C.value.time=u),placeholder:"زمان"},null,8,["modelValue"])]),_:1}),l(n,{cols:"12",md:"3",class:"my-2"},{default:a(()=>[t("div",Ol,[e[47]||(e[47]=t("p",null,"قیمت طلا : ",-1)),t("p",null,m(I(+C.value.buyPrice))+" تومان",1)])]),_:1}),l(n,{cols:"12",md:"3",class:"my-2"},{default:a(()=>[l(g,{onClick:Oe,class:"h-100 py-2",color:"primary",size:"large",variant:"elevated",block:"",loading:ne.value},{default:a(()=>e[48]||(e[48]=[p(" استعلام قیمت طلا ")])),_:1},8,["loading"])]),_:1})]),_:1}),C.value.buyPrice!=""?(r(),c(V,{key:0,class:"invoice-box my-3"},{default:a(()=>[e[51]||(e[51]=t("div",{class:"d-flex my-2"},[t("h3",{class:"trade-step-title"},"ثبت محصول")],-1)),l(M,{modelValue:K.value,"onUpdate:modelValue":e[13]||(e[13]=u=>K.value=u),class:"w-100",onSubmit:vl(Fe,["prevent"])},{default:a(()=>[l(V,{class:"my-3"},{default:a(()=>[l(n,{cols:"6",md:"3",class:"my-2"},{default:a(()=>[l(L,{modelValue:w.value.category,"onUpdate:modelValue":e[8]||(e[8]=u=>w.value.category=u),items:De.value,label:"دسته بندی",variant:"outlined",rules:el,"item-title":"label","item-value":"item"},null,8,["modelValue","items"])]),_:1}),l(n,{cols:"6",md:"3",class:"my-2"},{default:a(()=>[l(N,{modelValue:w.value.title,"onUpdate:modelValue":e[9]||(e[9]=u=>w.value.title=u),label:"نام محصول",variant:"outlined",rules:Xe},null,8,["modelValue"])]),_:1}),l(n,{cols:"6",md:"1",class:"my-2"},{default:a(()=>[l(N,{modelValue:w.value.number,"onUpdate:modelValue":e[10]||(e[10]=u=>w.value.number=u),label:"تعداد",variant:"outlined",rules:Ze},null,8,["modelValue"])]),_:1}),l(n,{cols:"6",md:"1",class:"my-2"},{default:a(()=>[l(N,{modelValue:w.value.weight,"onUpdate:modelValue":e[11]||(e[11]=u=>w.value.weight=u),label:"وزن",variant:"outlined",rules:Qe},null,8,["modelValue"])]),_:1}),l(n,{cols:"6",md:"1",class:"my-2"},{default:a(()=>[l(N,{modelValue:w.value.wage,"onUpdate:modelValue":e[12]||(e[12]=u=>w.value.wage=u),label:"اجرت",variant:"outlined",rules:he},null,8,["modelValue"])]),_:1}),l(n,{cols:"6",md:"3",class:"my-2"},{default:a(()=>[l(g,{type:"submit",disabled:!K.value,class:"py-6",variant:"outlined",block:""},{default:a(()=>e[49]||(e[49]=[p("ثبت محصول")])),_:1},8,["disabled"])]),_:1}),l(n,{cols:"12"},{default:a(()=>[e[50]||(e[50]=t("div",{class:"d-flex my-4"},[t("h5",{class:"trade-step-title"},"لیست محصولات")],-1)),(r(!0),S(ee,null,re(Q.value,(u,P)=>(r(),c(V,{key:P,class:"invoice-row"},{default:a(()=>[l(n,{cols:"6",sm:"4",md:"2"},{default:a(()=>[p(" دسته بندی : "+m(u.category),1)]),_:2},1024),l(n,{cols:"6",sm:"4",md:"2"},{default:a(()=>[p(" نام : "+m(u.title),1)]),_:2},1024),l(n,{cols:"6",sm:"4",md:"2"},{default:a(()=>[p(" تعداد : "+m(u.number),1)]),_:2},1024),l(n,{cols:"6",sm:"4",md:"2"},{default:a(()=>[p(" وزن : "+m(u.weight)+" گرم ",1)]),_:2},1024),l(n,{cols:"6",sm:"4",md:"2"},{default:a(()=>[p(" اجرت : "+m(u.wage)+" ٪ ",1)]),_:2},1024),l(n,{cols:"6",sm:"4",md:"2"},{default:a(()=>[p(" جمع کل : "+m(I(+u.totalPrice))+" تومان ",1)]),_:2},1024),l(g,{density:"compact",icon:"ri-close-line",color:"#DC143C",size:"x-small",class:"delete-icon",onClick:T=>$e(P,u)},null,8,["onClick"])]),_:2},1024))),128)),z.value.totalInvoicePrice>0?(r(),S("div",Yl,[t("p",El,"جمع کل : "+m(I(z.value.totalInvoicePrice))+" تومان",1)])):y("",!0)]),_:1})]),_:1})]),_:1},8,["modelValue"])]),_:1})):y("",!0)]),_:1})]),_:1},512),l(O,{class:"btn-box"},{default:a(()=>[l(g,{onClick:X,size:"large"},{default:a(()=>e[52]||(e[52]=[p("قبلی")])),_:1}),l(g,{onClick:Z,color:"primary",size:"large",variant:"elevated",loading:se.value},{default:a(()=>e[53]||(e[53]=[p(" بعدی ")])),_:1},8,["loading"])]),_:1})]),_:1})]),_:1}),l(q,{value:4},{default:a(()=>[l($,{class:"step-card"},{default:a(()=>[l(M,{ref:u=>A(u,4)},{default:a(()=>[l(G,null,{default:a(()=>[l(V,null,{default:a(()=>[l(n,{cols:"12"},{default:a(()=>e[54]||(e[54]=[t("div",{class:"w-100 d-flex justify-space-between align-items-center"},[t("h3",{class:"trade-step-title"},"فاکتور فروش")],-1)])),_:1})]),_:1}),l(V,null,{default:a(()=>[l(n,{cols:"12"},{default:a(()=>e[55]||(e[55]=[t("div",{class:"d-flex"},[t("h4",null,"اطلاعات کاربر")],-1)])),_:1}),l(n,{cols:"6",md:"3"},{default:a(()=>[t("div",Jl,[e[56]||(e[56]=t("p",null,"نام : ",-1)),t("p",null,m(_.value.buyer.firstName),1)])]),_:1}),l(n,{cols:"6",md:"3"},{default:a(()=>[t("div",Kl,[e[57]||(e[57]=t("p",null,"نام خانوادگی : ",-1)),t("p",null,m(_.value.buyer.lastName),1)])]),_:1}),l(n,{cols:"6",md:"3"},{default:a(()=>[t("div",Ql,[e[58]||(e[58]=t("p",null,"نام پدر : ",-1)),t("p",null,m(_.value.buyer.fatherName),1)])]),_:1}),l(n,{cols:"6",md:"3"},{default:a(()=>[t("div",Xl,[e[59]||(e[59]=t("p",null,"کد ملی : ",-1)),t("p",null,m(_.value.buyer.nationalCode),1)])]),_:1}),l(n,{cols:"6",md:"3"},{default:a(()=>[t("div",Zl,[e[60]||(e[60]=t("p",null," شماره همراه : ",-1)),t("p",null,m(_.value.buyer.phoneNumber),1)])]),_:1}),l(n,{cols:"6",md:"3"},{default:a(()=>[t("div",hl,[e[61]||(e[61]=t("p",null,"کارشناس : ",-1)),t("p",null,m(_.value.adminId),1)])]),_:1}),l(Te),l(n,{cols:"12 my-2"},{default:a(()=>e[62]||(e[62]=[t("div",{class:"d-flex"},[t("h4",null,"اطلاعات محصولات خریداری شده")],-1)])),_:1}),l(n,{cols:"12"},{default:a(()=>[(r(!0),S(ee,null,re(_.value.productList,(u,P)=>(r(),c(V,{key:P,class:"product-row"},{default:a(()=>[l(n,{cols:"6",md:"3"},{default:a(()=>[t("div",ea,[e[63]||(e[63]=t("p",null,"نام محصول : ",-1)),t("p",null,m(u.title),1)])]),_:2},1024),l(n,{cols:"6",md:"3"},{default:a(()=>[t("div",la,[e[64]||(e[64]=t("p",null,"دسته بندی : ",-1)),t("p",null,m(u.category),1)])]),_:2},1024),l(n,{cols:"6",md:"3"},{default:a(()=>[t("div",aa,[e[65]||(e[65]=t("p",null,"تعداد : ",-1)),t("p",null,m(u.number),1)])]),_:2},1024),l(n,{cols:"6",md:"3"},{default:a(()=>[t("div",ta,[e[66]||(e[66]=t("p",null,"وزن کل : ",-1)),t("p",null,m(u.weight),1)])]),_:2},1024),l(n,{cols:"6",md:"3"},{default:a(()=>[t("div",ua,[e[67]||(e[67]=t("p",null,"وزن کل : ",-1)),t("p",null,m(u.weight),1)])]),_:2},1024),l(n,{cols:"6",md:"3"},{default:a(()=>[t("div",sa,[e[68]||(e[68]=t("p",null,"اجرت : ",-1)),t("p",null,m(u.wage)+" %",1)])]),_:2},1024),l(n,{cols:"6",md:"3"},{default:a(()=>[t("div",na,[e[69]||(e[69]=t("p",null,"قیمت کل : ",-1)),t("p",null,m(I(u.totalPrice))+" تومان",1)])]),_:2},1024)]),_:2},1024))),128))]),_:1}),l(Te),l(n,{cols:"12"},{default:a(()=>e[70]||(e[70]=[t("div",{class:"d-flex"},[t("h4",null,"صورتحساب")],-1)])),_:1}),l(n,{cols:"12",md:"6"},{default:a(()=>[t("div",oa,[e[71]||(e[71]=t("p",null," قیمت لحظه ای طلا : ",-1)),t("p",null,m(I(_.value.goldPrice))+" تومان",1)])]),_:1}),l(n,{cols:"12",md:"6"},{default:a(()=>[t("div",da,[e[72]||(e[72]=t("p",null,"جمع کل: ",-1)),t("p",null,m(I(_.value.totalInvoicePrice))+" تومان",1)])]),_:1}),l(n,{cols:"6",md:"3"})]),_:1})]),_:1})]),_:1},512),l(O,{class:"btn-box"},{default:a(()=>[l(g,{onClick:X,size:"large"},{default:a(()=>e[73]||(e[73]=[p("قبلی")])),_:1}),t("div",null,[l(g,{onClick:Z,color:"primary",size:"large",variant:"elevated"},{default:a(()=>e[74]||(e[74]=[p(" نحوه پرداخت ")])),_:1}),l(g,{onClick:dl,color:"error",size:"large",variant:"elevated"},{default:a(()=>e[75]||(e[75]=[p("پرینت")])),_:1})])]),_:1})]),_:1})]),_:1}),l(q,{value:5},{default:a(()=>[l($,{class:"step-card"},{default:a(()=>[l(M,{ref:u=>A(u,5)},{default:a(()=>[l(G,null,{default:a(()=>[l(V,null,{default:a(()=>[l(n,{cols:"12"},{default:a(()=>[t("div",ia,[e[76]||(e[76]=t("p",{class:"ma-0"},"موجودی صندوق طلا :",-1)),t("p",ma,m(d.value.wallet.goldWeight)+" گرم",1)]),t("div",ra,[e[77]||(e[77]=t("p",{class:"ma-0"},"مبلغ قابل پرداخت :",-1)),t("p",va,m(I(_.value.totalInvoicePrice))+" تومان",1)]),t("div",ca,[e[78]||(e[78]=t("p",{class:"ma-0"},"مبلغ مانده :",-1)),t("p",fa,m(I(ol()))+" تومان",1)])]),_:1})]),_:1}),l(V,null,{default:a(()=>[l(n,{cols:"12",md:"6"},{default:a(()=>[l(L,{modelValue:i.value.paymentType,"onUpdate:modelValue":[e[14]||(e[14]=u=>i.value.paymentType=u),ul],label:"نحوه پرداخت",items:ae.value,variant:"outlined","item-title":"name","item-value":"value",rules:[u=>!!u||"نحوه پرداخت رو انتخاب کنید"]},null,8,["modelValue","items","rules"])]),_:1}),i.value.paymentType==0||i.value.paymentType==1?(r(),c(n,{key:0,cols:"12",md:"6"},{default:a(()=>[l(L,{modelValue:i.value.payment,"onUpdate:modelValue":e[15]||(e[15]=u=>i.value.payment=u),label:"روش پرداخت نقدی",items:Y.value,variant:"outlined","item-title":"name","item-value":"value",rules:[u=>!!u||"نحوه پرداخت نقدی رو انتخاب کنید"]},null,8,["modelValue","items","rules"])]),_:1})):y("",!0),i.value.paymentType==2?(r(),c(n,{key:1,cols:"12",md:"6"},{default:a(()=>[l(N,{modelValue:i.value.goldWeight,"onUpdate:modelValue":e[16]||(e[16]=u=>i.value.goldWeight=u),label:"طلا (گرم)",variant:"outlined"},null,8,["modelValue"])]),_:1})):y("",!0)]),_:1}),i.value.payment==0||i.value.payment==1||i.value.payment==2?(r(),c(V,{key:0},{default:a(()=>[l(n,{cols:"6",md:"4",class:"my-2"},{default:a(()=>[t("div",pa,[l(ce,{modelValue:i.value.cash,"onUpdate:modelValue":e[17]||(e[17]=u=>i.value.cash=u),label:"مبلغ نقد",variant:"outlined",class:"my-2"},null,8,["modelValue"]),i.value.payment==1?(r(),c(N,{key:0,modelValue:i.value.chequeNumber,"onUpdate:modelValue":e[18]||(e[18]=u=>i.value.chequeNumber=u),label:"شناسه چک",variant:"outlined",class:"my-2"},null,8,["modelValue"])):y("",!0),i.value.payment==0?(r(),c(L,{key:1,modelValue:i.value.installmentType,"onUpdate:modelValue":e[19]||(e[19]=u=>i.value.installmentType=u),label:"نوع قسط",items:te.value,variant:"outlined","item-title":"name","item-value":"value",rules:[u=>!!u||"نحوه پرداخت قسطی رو انتخاب کنید"],class:"my-2"},null,8,["modelValue","items","rules"])):y("",!0)])]),_:1}),l(n,{cols:"6",md:"4",class:"my-2"},{default:a(()=>[t("div",ya,[l(ce,{modelValue:i.value.creditCard,"onUpdate:modelValue":e[20]||(e[20]=u=>i.value.creditCard=u),label:"دستگاه پوز",variant:"outlined",class:"my-2"},null,8,["modelValue"]),l(N,{modelValue:i.value.creditCardId,"onUpdate:modelValue":e[21]||(e[21]=u=>i.value.creditCardId=u),label:"شناسه",variant:"outlined",class:"my-2"},null,8,["modelValue"])])]),_:1}),l(n,{cols:"6",md:"4",class:"my-2"},{default:a(()=>[t("div",ba,[l(ce,{modelValue:i.value.transfer,"onUpdate:modelValue":e[22]||(e[22]=u=>i.value.transfer=u),label:"کارت به کارت",variant:"outlined",class:"my-2"},null,8,["modelValue"]),l(N,{modelValue:i.value.transferId,"onUpdate:modelValue":e[23]||(e[23]=u=>i.value.transferId=u),label:"شناسه",variant:"outlined",class:"my-2"},null,8,["modelValue"])])]),_:1}),i.value.paymentType==1?(r(),c(n,{key:0,cols:"6",md:"4",class:"my-2"},{default:a(()=>[l(N,{modelValue:i.value.goldWeight,"onUpdate:modelValue":e[24]||(e[24]=u=>i.value.goldWeight=u),label:"طلا (گرم)",variant:"outlined",class:"my-2"},null,8,["modelValue"])]),_:1})):y("",!0),l(n,{cols:"6",md:"4",class:"my-2"},{default:a(()=>e[79]||(e[79]=[t("div",{class:"d-flex flex-column"},null,-1)])),_:1})]),_:1})):y("",!0)]),_:1})]),_:1},512),l(O,{class:"btn-box"},{default:a(()=>[l(g,{onClick:X,size:"large"},{default:a(()=>e[80]||(e[80]=[p("قبلی")])),_:1}),l(g,{onClick:ye,color:"primary",size:"large",variant:"elevated"},{default:a(()=>e[81]||(e[81]=[p(" ثبت نهایی ")])),_:1})]),_:1})]),_:1})]),_:1})]),_:1})]),_:1},8,["modelValue"])]),_:1})]),_:1}),x.value?(r(),c(gl,{key:0,color:"error",border:"bottom",elevation:"2",class:"k-alert alert-animatiton",closable:""},{default:a(()=>[p(m(W.value),1)]),_:1})):y("",!0),l(_l,{modelValue:J.value,"onUpdate:modelValue":e[26]||(e[26]=u=>J.value=u),"max-width":"500",persistent:""},{default:a(()=>[l($,{title:"تایید فاکتور",class:"modal-card"},{default:a(()=>[l(H,{class:"mt-3 mb-6",icon:"ri-checkbox-circle-fill",color:"#0b8707"}),e[82]||(e[82]=t("h4",null,null,-1))]),_:1})]),_:1},8,["modelValue"])],64)}}},Ba=ml(Va,[["__scopeId","data-v-6d6a71e4"]]);export{Ba as default};
