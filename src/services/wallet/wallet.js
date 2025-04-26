import ReportTemplate from "../report/api";
import QueryTemplate from "../template/api";
import WalletTemplate from "./api";


const WalletService = {
    async AllWallet() {
        const response = await QueryTemplate.get("/admin/wallet/all");
        return response.data
    },

    async PendingWithdraw() {
        const response = await QueryTemplate.get("/admin/withdraw/pending");
        return response.data
    },

    async CompleteWithdraw() {
        const response = await QueryTemplate.get("/admin/withdraw/succeed");
        return response.data
    },

    async SubmitWithdraw(info) {
        const body = JSON.stringify({
            'withdrawalId': info.withdrawalId,
        });
        const response = await WalletTemplate.put(`/withdraw/${info.id}`, body);
        return response.data
    },

    async PendingDeposit() {
        const response = await QueryTemplate.get("/admin/deposit/pending");
        return response.data
    },

    async CompleteDeposit() {
        const response = await QueryTemplate.get("/admin/deposit/succeed");
        return response.data
    },

    async FailedDeposit() {
        const response = await QueryTemplate.get("/admin/deposit/failed");
        return response.data
    },

    async SubmitDeposit(info) {
        const body = JSON.stringify({
            'authority': info.authority,
        });
        const response = await WalletTemplate.put(`/deposit/${info.id}`, body);
        return response.data
    },

    async ExportWithdraw() {
        const body = JSON.stringify({
            "report": 5,
            "type": "withdraw",
            "status": "pending",
            "nationalCode": "all",
            "startDate": "all",
            "endDate": "all",
            "startTime": "all",
            "endTime": "all"
        });
        console.log(body)
        const response = await ReportTemplate.post(`/report/analyze/data`, body);
        return response.data
    }
}


export default WalletService
