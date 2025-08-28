import ManagmentTemplate from "../managment/api";
import ReportTemplate from "./api";


const ReportService = {
    async ReportSubmit(item) {
        const body = JSON.stringify({
            'reportBody': item
        });
        const response = await ManagmentTemplate.post('/reports/create', body);
        return response.data;
    },

    async ReportHour(item) {
        const body = JSON.stringify(item);
        const response = await ReportTemplate.post('/report/analyze/report/hour', body);
        return response.data;
    },

    async ReportDaily() {
        const response = await ReportTemplate.get('/report/analyze/report/daily');
        return response.data;
    },

    async ReportHistoryList() {
        const response = await ReportTemplate.get('/admin/reports/all');
        return response.data;
    },
}


export default ReportService
