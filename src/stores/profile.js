// import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios'

// stores/userProfileStore.js

export const useUserProfileStore = defineStore('userProfile', {
  state: () => ({
    userProfile: {}
  }),
  actions: {
    async fetchUserProfile() {
      const username = localStorage.getItem('Username');
      try {
        const response = await axios.get(`http://localhost/api/user.php?username=${username}`);
        this.userProfile = response.data;
      } catch (error) {
        console.error('Error fetching user profile:', error);
      }
    }
  }
});
