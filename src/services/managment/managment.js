import ManagmentTemplate from "./api";


const ManagmentService = {
    async AdminList() {
        const response = await ManagmentTemplate.get('/all');
        return response.data;
    },
}


export default ManagmentService
