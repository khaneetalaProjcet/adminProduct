import VerifyTemplate from "./api";


const AuthService = {
    async Shahkar(credentials) {
        const response = await VerifyTemplate.post("", credentials);
        localStorage.setItem("authtoken", response.data.token);
        return response.data
    },

    async Login(loginInfo) {
        const body = JSON.stringify(loginInfo);
        const response = await VerifyTemplate.post("/admin/login", body);
        const token = response.data.data.token;
        const userPermissions = response.data.data.accessPoints;
        console.log(userPermissions)
        localStorage.setItem("token", token);
        localStorage.setItem("permissions", JSON.stringify(userPermissions));
        return response.data
    },


}


export default AuthService
