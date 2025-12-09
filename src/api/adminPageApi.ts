import axios from "axios";

export const adminPageApi = async (data: any) => {
    try {
        const res = await axios.post('/api/user/adminPage', data)
        return res.data
    } catch (err: any) {
        return err.response.data
    }
}