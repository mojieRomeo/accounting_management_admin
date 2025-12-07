import axios from "axios";
export const loginApi = async (data: any) => {
    try {
        const res = await axios.post('/api/user/login', data)
        return res.data//res.data就是postman里返回的数据responseEntity，只不过又被封装成了res（const res = res.data）
    } catch (err: any) {
        return err.response.data//前段弹窗alert返回错误信息所需要的，不然就是undefind
    }
}
