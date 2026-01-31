import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useUserStore = defineStore('user', () => {
    // ===== state =====
    // 注意：此代码只在页面初始化时执行一次，他只会读取你第一次登录localStorage存的username，此后（页面刷新前或页面初始化之前）就再也和localStorage无关了
    // 你退出登录，再次登录其他用户账号不算一次页面初始化因此不运行此段代码，所以第二次之后{{ userStore.username }}再也不能通过localStorage获取用户名了
    const username = ref(localStorage.getItem('username') || '')
    const avatar = ref(localStorage.getItem('avatar') || '')

    // ===== actions =====
    const setUsername = (name: string) => {
        //username.value = name才是时刻更新{{ userStore.username }}的原因
        username.value = name
        localStorage.setItem('username', name)
    }
    const setAvatar = (avatarUrl: string) => {
        avatar.value = avatarUrl
        localStorage.setItem('avatar', avatarUrl)
    }


    return {
        username,
        avatar,
        setUsername,
        setAvatar
    }
})
