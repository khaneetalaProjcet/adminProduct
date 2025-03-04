import ApiTemplate from "./api";


export const GetGoldPrice = async () => {
    try {
        const response = await ApiTemplate.get("posts");
        return response.data;
    } catch (error) {
        throw new Error(error.response.data.message || "Failed to fetch gold price");
    }
};

