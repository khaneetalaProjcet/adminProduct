import LandingTemplate from "./api";


const LandingService = {
    async AllInstallment() {
        const response = await LandingTemplate.get('/all');
        return response.data
    },
}


export default LandingService
