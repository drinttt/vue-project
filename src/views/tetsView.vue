<template>
  <div>
    <input v-model.number="num1" type="number" placeholder="Number 1">
    <input v-model.number="num2" type="number" placeholder="Number 2">
    <v-btn @click="addNumbers">Add</v-btn>
    <div v-if="result !== null">Result: {{ result }}</div>
    <div v-if="errorMsg">{{ errorMsg }}</div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import axios from 'axios';

const num1 = ref(0);
const num2 = ref(0);
const result = ref(null);
const errorMsg = ref('');

const addNumbers = async () => {
  try {
    const response = await axios.post('http://localhost:5000/api/add', {
      num1: num1.value,
      num2: num2.value
    });
    result.value = response.data.result;
    errorMsg.value = '';  // ล้างข้อความแจ้งเตือนหากการคำนวณสำเร็จ
  } catch (error) {
    console.error('Error adding numbers:', error);
    result.value = null;  // ล้างผลลัพธ์หากเกิดข้อผิดพลาด
    errorMsg.value = 'Error adding numbers. Please try again.';  // แสดงข้อความแจ้งเตือนเมื่อเกิดข้อผิดพลาด
  }
};
</script>

<style>
/* สามารถเพิ่มสไตล์ที่นี่หากจำเป็น */
</style>
