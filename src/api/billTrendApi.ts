// src/api/billTrendApi.ts
import axios from 'axios'


export const getBillTrendApi = async () => {
    try {
        const res = await axios.post('/api/bill/getBillTrend') // 后端接口
        return res.data
    } catch (err:any) {
        return err.response.data
    }
}
