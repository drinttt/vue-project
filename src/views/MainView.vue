<script setup>
// import { ref,defineEmits} from 'vue'
import { ref,} from 'vue'

import { useloginStore } from '@/stores/login'

const loginStore = useloginStore();

const theme = ref('light')

function onClick() {
  theme.value = theme.value === 'light' ? 'dark' : 'light'
}

// const emit = defineEmits(['logout'])

// const props = defineProps({
//   Username: String,
// });

const logout = () =>{
  // emit("logout")
  loginStore.logout()
}
</script>

<template>
  <v-app :theme="theme">
    <v-app-bar>
      <v-spacer></v-spacer>

      <v-btn prepend-icon="theme === 'light' ? 'mdi-weather-sunny' : 'mdi-weather-night'"
        @click="onClick">Toggle</v-btn>
      <v-btn @click="logout" color="error">Log out</v-btn>
    </v-app-bar>

    <v-navigation-drawer expand-on-hover rail permanent>
      <v-list>
        <v-list-item prepend-avatar="https://randomuser.me/api/portraits/women/85.jpg" subtitle="sandra_a88@gmailcom"
          :title="loginStore.Username"></v-list-item>
      </v-list>

      <v-divider></v-divider>

      <v-list density="compact" nav>
        <v-list-item prepend-icon="mdi-folder" title="My Files" value="myfiles"></v-list-item>
        <v-list-item prepend-icon="mdi-account-multiple" title="Shared with me" value="shared"></v-list-item>
        <v-list-item prepend-icon="mdi-star" title="Starred" value="starred"></v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-main>
      <v-container>
        <router-view></router-view>
      </v-container>
    </v-main>
  </v-app>
</template>