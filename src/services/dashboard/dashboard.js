import DashboardTemplate from "./api";


const DashboardService = {
    async Dashboard() {
        const response = await DashboardTemplate.get('/home/charts');
        return response.data;
    },
}


export default DashboardService
