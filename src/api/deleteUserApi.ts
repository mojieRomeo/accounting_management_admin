import axios from "axios";

export const deleteUserApi = async (id:number) => {
    try {
        const res = await axios.delete(`/api/user/deleteUser/${id}`);
        return res.data
    }catch (err:any){
        return err.response.data
    }
}