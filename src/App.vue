<script setup>
// import { RouterLink, RouterView } from 'vue-router'
import '@mdi/font/css/materialdesignicons.css'


// import HelloWorld from './components/HelloWorld.vue'

import MainView from "./views/MainView.vue"
import loginView from "./views/loginView.vue"
// import { computed, ref, onMounted } from 'vue';
import { onMounted } from 'vue';
import { useloginStore } from '@/stores/login'

const loginStore = useloginStore();

onMounted(() => {
  console.log("on mouse")
  loginStore.loadData();
})

</script>

<template>
  <!-- <MainView/> -->
  <!-- <loginView v-if="loginStore.isLogin" @login="loginStore.login"/>
  <MainView v-if="!loginStore.isLogin" @logout="loginStore.logout" :Username="loginStore.Username"/> -->

  <loginView v-if="loginStore.isLogin"/>
  <MainView v-if="!loginStore.isLogin" @logout="loginStore.logout" :Username="loginStore.Username"/>
</template>

<style scoped>

</style>
