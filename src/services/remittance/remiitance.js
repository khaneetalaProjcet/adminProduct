import RemittanceTemplate from "./api";


const RemiitanceService = {
    async AuthNumberRemiitance(item) {
        const body = JSON.stringify({
            'phoneNumber': item
        });
        const response = await RemittanceTemplate.post(`/users/check`, body);
        return response.data
    },

    async AuthIdentityUser(item) {
        const body = JSON.stringify({
            'phoneNumber': item.phoneNumber,
            'birthDate': item.birthDate,
            'nationalCode': item.nationalCode,
        });
        const response = await RemittanceTemplate.post(`/users/newuser`, body);
        return response.data
    },

    async CreateRemiitanceBuy(item) {
        const body = JSON.stringify(item);
        const response = await RemittanceTemplate.post(`/buy`, body);
        return response.data
    },

    async CreateRemiitanceSell(item) {
        const body = JSON.stringify(item);
        const response = await RemittanceTemplate.post(`/sell`, body);
        return response.data
    },

    async RemiitanceBuy(item) {
        const response = await RemittanceTemplate.get(`/buy/${item}`);
        return response.data
    },

    async RemiitanceSell(item) {
        const response = await RemittanceTemplate.get(`/sell/${item}`);
        return response.data
    },

}


export default RemiitanceService
