<script>
import axios from 'axios'

export default {
  name: 'CreateExamView',
  data() {
    return {
      exam: {
        code_subject: '',
        name_exam: '',
        qty_exam: null,
        points: null,
      },
      codeSubjects: [], // เพิ่ม property ไว้เก็บ code_subjects ที่ได้จาก API
    };
  },
  mounted() {
    this.fetchCodeSubjects(); // เรียก method เมื่อ component ถูกโหลด
  },
  methods: {
    async fetchCodeSubjects() {
      try {
        const response = await axios.get('http://localhost/api/getCodeSubjects.php');
        this.codeSubjects = response.data;
      } catch (error) {
        console.error('Error fetching code subjects:', error);
      }
    },
    async submitExam() {
    try {
        const formData = new FormData();
        formData.append('code_subject', this.exam.code_subject);
        formData.append('name_exam', this.exam.name_exam);
        formData.append('qty_exam', this.exam.qty_exam);
        formData.append('points', this.exam.points);

        const response = await axios.post('http://localhost/api/createExam.php', formData);
        console.log(response.data);

        if (response.data.success) {
            // แสดงข้อความคำตอบจาก API ในรูปแบบของ pop-up
            alert('Exam created successfully');
        } else {
            alert('An error occurred while submitting the exam. Please try again later.');
        }
    } catch (error) {
        console.error('There was an error submitting the exam:', error);
        alert('An error occurred while submitting the exam. Please try again later.');
    }
},



  },
};
</script>

<style scoped>
.create-exam-view {
  max-width: 500px;
  margin: auto;
  padding: 20px;
}

.form-group {
  margin-bottom: 15px;
}

.form-group label {
  display: block;
  margin-bottom: 5px;
}

.form-group input[type="text"],
.form-group input[type="number"],
.form-group select { /* เพิ่มเลือกเข้ามาในการปรับแต่ง */
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

button[type="submit"] {
  background-color: #007bff; /* เปลี่ยนเป็นสีฟ้า */
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button[type="submit"]:hover {
  background-color: #0056b3; /* เปลี่ยนสีเมื่อโฮเวอร์ */
}
</style>

<template>
    <div class="create-exam-view">
      <h1>Create Exam</h1>
      <form @submit.prevent="submitExam">
        
        <div class="form-group">
          <label for="codeSubject">Subject:</label>
          <select id="codeSubject" v-model="exam.code_subject" required>
            <option value="">Please select</option>
            <option v-for="subject in codeSubjects" :key="subject.code_subject" :value="subject.code_subject">{{ subject.name_subject }}</option>
          </select>
        </div>
  
        <div class="form-group">
          <label for="nameExam">Name Exam:</label>
          <input type="text" id="nameExam" v-model="exam.name_exam" required>
        </div>
  
        <div class="form-group">
          <label for="qtyExam">Quantity Exam:</label>
          <input type="number" id="qtyExam" v-model.number="exam.qty_exam" required min="1">
        </div>
  
        <div class="form-group">
          <label for="points">Points:</label>
          <input type="number" id="points" v-model.number="exam.points" required min="1">
          <div style="color: red; font-weight: bold; font-size: smaller; font-style: italic;">
             หมายเหตุ: Points คือ คะแนนในแต่ละข้อ
          </div>
        </div>


        <button type="submit">Submit</button>
      </form>
    </div>
</template>

  
