import { defineStore } from 'pinia';
import axios from 'axios';

export const useExamStore = defineStore('userExam', {
  state: () => ({
    userExam: []
  }),
  actions: {
    async fetchUserExam(code_subject) {
      try {
        const response = await axios.get(`http://localhost/api/exam.php?code_subject=${code_subject}`);
        this.userExam = response.data;
      } catch (error) {
        console.error('Error fetching exams:', error);
      }
    },
  }
});
