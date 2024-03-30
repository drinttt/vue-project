<!-- <script setup>
import { onMounted, ref } from 'vue';
import axios from 'axios';

const userProfile = ref({}); // สำหรับเก็บข้อมูลโปรไฟล์

const fetchUserProfile = async () => {
  const username = localStorage.getItem('Username'); // ดึง username จาก localStorage
  try {
    const response = await axios.get(`http://localhost/api/user.php?username=${username}`);
    userProfile.value = response.data; // จัดเก็บข้อมูลโปรไฟล์ที่ได้รับใน userProfile
  } catch (error) {
    console.error('Error fetching user profile:', error);
  }
};

onMounted(fetchUserProfile);
</script>

<template>
  <v-container grid-list-xs>
    {{ userProfile.username }}
    {{ userProfile.email }}
  </v-container>
</template> -->

<script setup>
import { onMounted } from 'vue';
import { useUserProfileStore } from '@/stores/profile';

const userStore = useUserProfileStore();

onMounted(() => {
  userStore.fetchUserProfile();
});
</script>

<template>
  <div>
    <p>Username: {{ userStore.userProfile.username }}</p>
    <p>Email: {{ userStore.userProfile.email }}</p>
  </div>
</template>

