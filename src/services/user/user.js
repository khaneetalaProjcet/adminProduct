import ReportTemplate from "../report/api";
import QueryTemplate from "../template/api";
import VerifyTemplate from "../verify/api";
import UserTemplate from "./api";


const UserService = {
    async Alluser(params) {
        const response = await QueryTemplate.get(`/admin/users/all?page=${params.page}&perPage=${params.perPage}&search=${params.search}`);
        return response.data;
    },

    async oldUser(params) {
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
    },

    async CheckToken() {
        const response = await UserTemplate.get(`/token/check`);
        return response.data;
    },

    async transferData(id) {
        const response = await UserTemplate.post(`/admin/oldChecker/${id}`);
        return response.data;
    },

    async SubmitFilterUser(userForm) {
        const body = JSON.stringify(userForm);
        const response = await ReportTemplate.post(`/report/users`, body);
        return response.data
    },

    async SubmitAddUser(form) {
        const body = JSON.stringify(form);
        const response = await UserTemplate.post(`/user/handle`, body);
        return response.data
    },
}


export default UserService
