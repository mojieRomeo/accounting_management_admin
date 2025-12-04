import axios from "axios";
export const loginApi = async (data: any) => {
    try {
        const res = await axios.post('/api/user/login', data)
        return res.data
    } catch (err: any) {
        return err.response.data
    }
}
