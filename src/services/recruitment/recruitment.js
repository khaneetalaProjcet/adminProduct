import RecruitmentTemplate from "./api";



const RecruitmentService = {
    async AllRecruitment() {
        const response = await RecruitmentTemplate.get('/coorporation/all');
        return response.data
    },
}


export default RecruitmentService
