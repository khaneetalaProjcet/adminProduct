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
    async SubmitAccountingReview(item) {
        const body = JSON.stringify({
            'description': item.description
        });
        const response = await AccountingTemplate.put(`/approve/${item.id}`, body);
        return response.data;
    },

    async RejectAccountingReview(item) {
        const body = JSON.stringify({
            'description': item.description
        });
        const response = await AccountingTemplate.put(`/reject/${item.id}`, body);
        return response.data;
    },
}


export default AccountingService
