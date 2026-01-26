import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useUserStore = defineStore('user', () => {
    // ===== state =====
    //注意：此代码只在页面初始化时执行一次，你退出登录再次登录其他用户不算一次页面初始化因此不运行此段代码，所以第二次之后{{ userStore.username }}获取不到用户名
    const username = ref(localStorage.getItem('username') || '')

    // ===== actions =====
    const setUsername = (name: string) => {
        //username.value = name才是时刻更新{{ userStore.username }}的原因
        username.value = name
        localStorage.setItem('username', name)
    }


    return {
        username,
        setUsername
    }
})
