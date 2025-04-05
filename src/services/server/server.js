import ServerTemplate from "./api";


const ServerService = {
    async AllStatus() {
        const response = await ServerTemplate.get("/logger/status");
        return response.data
    },
}


export default ServerService
