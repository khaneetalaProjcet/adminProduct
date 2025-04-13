import QueryTemplate from "../template/api";


const DashboardService = {
    async Dashboard() {
        const response = await QueryTemplate.get('/home/charts');
        return response.data;
    },
}


export default DashboardService
