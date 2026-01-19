import axios from "axios";
export const loginApi = async (data: any) => {
    try {
        const res = await axios.post('/api/user/login', data)
        return res.data//res.data就是postman里返回的数据responseEntity，只不过又被封装成了res（const res = res.data）
    } catch (err: any) {
        //前段弹窗alert返回错误信息所需要的，不然就是undefined
        /*
        err = {
            message: "...",
            config: {...},
            request: {...},
            response: {   // 错误响应在这里
            status: 500,
            data: { msg: "账号不存在", status: 500, data: null }
            }
        }

         */
        return err.response.data
    }
}
