import ReportTemplate from "../report/api";
import ServerTemplate from "../server/api";
import QueryTemplate from "../template/api";
import UserTemplate from "../user/api";
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

    async QuiryWallet(nationalCode) {
        const response = await QueryTemplate.get(`/admin/inquiry/${nationalCode}`,);
        return response.data
    },

    async CreateTransfer(info) {
        const body = JSON.stringify(info);
        const response = await WalletTemplate.post(`/transPort`, body);
        return response.data;
    },

    async TransferOtp(id) {
        const body = JSON.stringify({
            transPortId: id,
        });
        const response = await WalletTemplate.post(`/transPort/otp`, body);
        return response.data;
    },

    async VerifyTransferOtp(otp, id) {
        const body = JSON.stringify({
            otp: otp,
            transPortId: id,
        });
        const response = await WalletTemplate.post(`/transPort/verifyotp`, body);
        return response.data;
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
    },

    async TransferGoldList(status) {
        const response = await QueryTemplate.get(`/admin/transport/all?status=${status}`);
        return response.data
    },

    async UseGoldList(status) {
        const response = await ServerTemplate.get(`/branch/transaction/all?type=${status}`);
        return response.data
    },

    async UserFinance(params) {
        const response = await QueryTemplate.get(`/user/glance?page=${params.page}&perPage=${params.perPage}&search=${params.search}`);
        return response.data
    },

    async UserFinanceItem(id) {
        const response = await QueryTemplate.get(`/user/glance/${id}`);
        return response.data
    },

    async SubmitFilterWallet(walletForm) {
        const body = JSON.stringify(walletForm);
        const response = await ReportTemplate.post(`/report/analyze/report/wallettransactions`, body);
        return response.data
    },

    async EmergencyTransferList(params) {
        const response = await ServerTemplate.get(`old/transmission/?page=${params.page}&perPage=${params.perPage}&search=${params.search}`);
        return response.data
    },

    async submitCharge(nationalCode, detail) {
        const body = JSON.stringify(detail);
        const response = await UserTemplate.post(`/admin/wallet/charge/${nationalCode}`, body);
        return response.data
    },

    async chargeList() {
        const response = await QueryTemplate.get(`/wallet/charge`);
        return response.data
    },

    async returnChargeList() {
        const response = await QueryTemplate.get(`/wallet/charge/return`);
        return response.data
    },

    async submitAccountingCharge(detail, status) {
        const body = JSON.stringify({
            status: status,
            description: detail.description,
        });
        const response = await UserTemplate.post(`/admin/wallet/charge/change/${detail.id}`, body);
        return response.data
    },

    async submitWithdrawCharge(detail) {
        const body = JSON.stringify({
            status: 4,
            invoiceId: detail.invoiceId,
        });
        const response = await UserTemplate.post(`/admin/wallet/charge/change/${detail.id}`, body);
        return response.data
    },

    async sumbitUpdateWallet(detail) {
        const body = JSON.stringify(detail);
        const response = await UserTemplate.post(`/admin/wallet/charge/update/${detail.id}`, body);
        return response.data
    },

    async GetAccountingWallet(params, status) {
        const response = await QueryTemplate.get(`wallet/charge/all?page=${params.page}&perPage=${params.perPage}&search=${params.search}&${status}`);
        return response.data;
    },
}


export default WalletService
