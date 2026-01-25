import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useUserStore = defineStore('user', () => {
    // ===== state =====
    const username = ref(localStorage.getItem('username') || '')

    // ===== actions =====
    const setUsername = (name: string) => {
        localStorage.setItem('username', name)
    }

    return {
        username,
        setUsername
    }
})
