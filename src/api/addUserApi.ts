import axios from "axios";

export const addUserApi = async (data: any) => {
    try {
        const res = await axios.post('/api/user/addUser', data)
        return res.data
    }
    catch (err : any) {
        return err.response.data
    }
}