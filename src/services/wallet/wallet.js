import WalletTemplate from "./api";


const WalletService = {
    async AllWallet() {
        const response = await WalletTemplate.get("/wallet/all");
        return response.data
    },

    async PendingWithdraw() {
        const response = await WalletTemplate.get("/withdraw/pending");
        return response.data
    },

    async CompleteWithdraw() {
        const response = await WalletTemplate.get("/withdraw/succeed");
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
        const response = await WalletTemplate.get("/deposit/pending");
        return response.data
    },

    async CompleteDeposit() {
        const response = await WalletTemplate.get("/deposit/succeed");
        return response.data
    },

    async FailedDeposit() {
        const response = await WalletTemplate.get("/deposit/failed");
        return response.data
    },

    async SubmitDeposit(info) {
        const body = JSON.stringify({
            'authority': info.authority,
        });
        const response = await WalletTemplate.put(`/deposit/${info.id}`, body);
        return response.data
    },
}


export default WalletService
