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

}


export default RemiitanceService
