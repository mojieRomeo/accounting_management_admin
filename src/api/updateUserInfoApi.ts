import axios from "axios";

export const updateUserInfoApi = async (data: any) => {
    try {
        const res = await axios.post('/api/user/updateUserInfo', data);
        return res.data
    }catch (err:any){
        return err.response.data
    }
}