import{W as t}from"./api-BPB4pKbF.js";const r={async AllWallet(){return(await t.get("/wallet/all")).data},async PendingWithdraw(){return(await t.get("/withdraw/pending")).data},async CompleteWithdraw(){return(await t.get("/withdraw/succeed")).data},async SubmitWithdraw(e){const s=JSON.stringify({withdrawalId:e.withdrawalId});return(await t.put(`/withdraw/${e.id}`,s)).data},async PendingDeposit(){return(await t.get("/deposit/pending")).data},async CompleteDeposit(){return(await t.get("/deposit/succeed")).data},async FailedDeposit(){return(await t.get("/deposit/failed")).data},async SubmitDeposit(e){const s=JSON.stringify({authority:e.authority});return(await t.put(`/deposit/${e.id}`,s)).data}};export{r as W};
