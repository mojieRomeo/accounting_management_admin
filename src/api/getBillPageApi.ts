import axios from "axios";

export const getBillPageApi = async (data:any) => {
    try{
        const res = await axios.post('/api/bill/getBillPage', data);
        return res.data;
    }catch (err:any){
        return err.response.data;
    }
}