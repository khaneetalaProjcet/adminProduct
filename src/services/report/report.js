import ReportTemplate from "./api";


const ReportService = {
    async ReportSubmit(item) {
        const body = JSON.stringify(item);
        const response = await ReportTemplate.post('/report/analyze/data', body);
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
}


export default ReportService
