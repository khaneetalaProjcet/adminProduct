import VerifyTemplate from "../verify/api";
import UserTemplate from "./api";


const UserService = {
    async Alluser() {
        const response = await UserTemplate.get('/admin/users/all');
        return response.data;
    },

    async oldUser(params) {
        console.log(params.search , typeof params.search)
        const response = await VerifyTemplate.get(`/old/users/all/${params.page}/${params.perPage}?search=${params.search}`);
        return response.data;
    },

    async VerifyUser(info) {
        const body = JSON.stringify({
            'phoneNumber': info.phoneNumber,
            'nationalCode': info.nationalCode,
            'birthDate': info.birthDate,
        });
        const response = await VerifyTemplate.post(`old/approve/${info.id}`, body);
        return response.data;
    }
}


export default UserService
