import QueryTemplate from "../template/api";
import AccountingTemplate from "./api";


const AccountingService = {
    async PendingAccountingList() {
        const response = await QueryTemplate.get('/call/status/pending');
        return response.data;
    },
    async CompleteAccountingList() {
        const response = await QueryTemplate.get('/call/status/completed');
        return response.data;
    },
    async rejectAccountingList() {
        const response = await QueryTemplate.get('/call/status/failed');
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
    async GoldBoxSellList() {
        const response = await QueryTemplate.get('/selllist');
        return response.data;
    },
}


export default AccountingService
