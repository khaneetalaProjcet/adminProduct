import WalletTemplate from "./api";


const WalletService = {
    async AllWallet() {
        const response = await WalletTemplate.get("/wallet/all");
        return response.data
    },
}


export default WalletService
