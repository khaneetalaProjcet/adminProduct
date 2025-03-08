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
}


export default WalletService
