import AccountingTemplate from "./api";


const AccountingService = {
    async PendingAccountingList() {
        const response = await AccountingTemplate.get('/status/pending');
        return response.data;
    },
    async CompleteAccountingList() {
        const response = await AccountingTemplate.get('/status/completed');
        return response.data;
    },
    async rejectAccountingList() {
        const response = await AccountingTemplate.get('/status/failed');
        return response.data;
    },
}


export default AccountingService
