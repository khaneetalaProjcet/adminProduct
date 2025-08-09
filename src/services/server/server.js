import ReportTemplate from "../report/api";
import QueryTemplate from "../template/api";
import ServerTemplate from "./api";


const ServerService = {
    async AllStatus() {
        const response = await ServerTemplate.get("/logger/status");
        return response.data
    },

    async transfer(search) {
        const response = await QueryTemplate.get(`/trlog?search=${search}`);
        return response.data
    },

    async analyseUser() {
        const response = await QueryTemplate.get(``);
        return response.data
    },

    async transferDetail(item) {
        const response = await QueryTemplate.get(`/analyze/${item}`);
        return response.data
    },

    async transferDetail(item) {
        const response = await QueryTemplate.get(`/analyze/${item}`);
        return response.data
    },

    async SubmitFilterTransferInvoice(InvoiceForm) {
        const body = JSON.stringify(InvoiceForm);
        const response = await ReportTemplate.post(`/report/analyze/report/transfer`, body);
        return response.data
    },
}


export default ServerService
