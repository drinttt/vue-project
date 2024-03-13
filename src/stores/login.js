import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
// import axios from 'axios';

export const useloginStore = defineStore('login', () => {
  const Username = ref("");
  const isLogin = computed(() => {
    return Username.value === '';
  })

  const login = (userName) => {
    Username.value = userName
    localStorage.setItem("Username", userName)
  }

  const logout = () => {
    Username.value = ""
    localStorage.removeItem("Username")
  }

  const loadData = () => {
    Username.value = localStorage.getItem("Username") || "";
  }

  return { Username, isLogin, login, logout, loadData }
})
