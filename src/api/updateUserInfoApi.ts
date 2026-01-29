import axios from "axios";
export const updateUserInfoApi = async (data: FormData) => {
    try {
        const res = await axios.post('/api/user/updateUserInfo', data);
        return res.data
    }catch (err:any){
        return err.response.data
    }
}