import axios from "axios";

export const updateUserApi = async (data: any) => {
    try {
        const res = await axios.post('/api/user/updateUser', data);
        return res.data
    }catch (err:any){
        return err.response.data
    }
}