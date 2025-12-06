import axios from "axios";

export const registerApi = async (data: any) => {
    try{
        const res = await axios.post('/api/user/register', data)
        return res.data
    }catch (err:any){
        return err.response.data
    }
}
