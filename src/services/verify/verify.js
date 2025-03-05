import VerifyTemplate from "./api";


const AuthService = {
    async Shahkar(credentials) {
        const response = await VerifyTemplate.post("", credentials);
        localStorage.setItem("authtoken", response.data.token);
        return response.data
    },

    async Login(loginInfo) {
        const body = JSON.stringify(loginInfo);
        const response = await VerifyTemplate.post("/login", body);
        console.log(response)
        const token = response.data.data.token;
        localStorage.setItem("token", token);
        return response.data
    },

    
}


export default AuthService
