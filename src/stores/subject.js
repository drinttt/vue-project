import { defineStore } from 'pinia'
import axios from 'axios'

export const useSubjectStore = defineStore('userSubject', {
    state: () => ({
        userSubject: []
    }),
    actions: {
        async fetchUserSubject() {
            const username = localStorage.getItem('Username');
            try {
                const response = await axios.get(`http://localhost/api/subject.php?username=${username}`);
                console.log(response.data);
                this.userSubject = response.data;
              } catch (error) {
                console.error('Error fetching user profile:', error);
              }
        },
        async addSubject(subjectData) {
            try {
                const response = await axios.post('http://localhost/api/add_subject.php', subjectData);
                if (response.data.success) {
                    this.fetchUserSubject(); // รีเฟรชข้อมูลวิชา
                } else {
                    console.error('Error adding subject:', response.data.message);
                }
            } catch (error) {
                console.error('Error adding subject:', error);
            }
        }
    }
})