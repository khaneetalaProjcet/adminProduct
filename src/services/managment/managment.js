import ServerTemplate from "../server/api";
import ManagmentTemplate from "./api";


const ManagmentService = {
    async AdminList() {
        const response = await ManagmentTemplate.get('/all');
        return response.data;
    },

    async AccessPoint(id) {
        const response = await ManagmentTemplate.get(`/menu/all/${id}`);
        return response.data;
    },

    async SubmitAccessPoint(AccessList, id) {
        const body = JSON.stringify({ accessPoints: AccessList });
        const response = await ManagmentTemplate.post(`/access/update/${id}`, body);
        return response.data;
    },

    async AddAdmin(info) {
        const body = JSON.stringify(info);
        const response = await ManagmentTemplate.post(`/create`, body);
        return response.data;
    },

    async GetUserActivity() {
        const response = await ServerTemplate.get('/logger/admin/all');
        return response.data;
    },

    async GetExpertActivity() {
        const response = await ServerTemplate.get('/logger/user/all');
        return response.data;
    },

    async GetPermission() {
        const response = await ServerTemplate.get('/main/trade');
        return response.data;
    },

    async TradePermission() {
        const response = await ServerTemplate.post('/main/trade/permision');
        return response.data;
    },

    async BranchList() {
        const response = await ServerTemplate.get('/branch/allbyadmin');
        return response.data;
    },

    async AddBranch(branchInfo) {
        const body = JSON.stringify(branchInfo);
        const response = await ServerTemplate.post('/branch/create', body);
        return response.data;
    },

    async DeleteBranch(id) {
        const response = await ServerTemplate.delete(`/branch/delete/${id}`,);
        return response.data;
    },

    async DeleteSeller(id) {
        const response = await ServerTemplate.delete(`/branch/seller/delete/${id}`,);
        return response.data;
    },

    async SellerList(id) {
        const response = await ServerTemplate.get(`/branch/seller/allbyadmin/${id}`);
        return response.data;
    },

    async AddSeller(sellerInfo, id) {
        const body = JSON.stringify(sellerInfo);
        const response = await ServerTemplate.post(`/branch/seller/create/${id}`, body);
        return response.data;
    },

    async SwitchBranchActivator(id) {
        const response = await ServerTemplate.post(`/branch/active/${id}`);
        return response.data;
    },

    async SwitchBranchSellerActivator(id) {
        const response = await ServerTemplate.post(`/branch/seller/active/${id}`);
        return response.data;
    },

    async SwitchAdminActivator(id) {
        const response = await ServerTemplate.post(`/admin/active/${id}`);
        return response.data;
    },

    async DeleteAdmin(id) {
        const response = await ServerTemplate.delete(`/admin/delete/${id}`,);
        return response.data;
    },

    async UpdateAdmin(detail , id) {
        const body = JSON.stringify(detail);
        const response = await ServerTemplate.post(`/admin/update/${id}`, body);
        return response.data;
    },
}


export default ManagmentService
