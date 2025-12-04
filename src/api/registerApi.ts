import axios from "axios";

export const registerApi = async (data: any) => {
    const res = await axios.post('/api/user/register', data)
    return res.data
}
