import Default from "@/layouts/default.vue";
import VerifyTemplate from "./api";


const AuthService = {
    async Shahkar(credentials) {
        const response = await VerifyTemplate.post("", credentials);
        localStorage.setItem("authtoken", response.data.token);
        return response.data
    }
}


export default AuthService
