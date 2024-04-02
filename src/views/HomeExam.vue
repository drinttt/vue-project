<script setup>
import { ref, onMounted, } from 'vue';
import { useSubjectStore } from '@/stores/subject';
import { useExamStore } from '@/stores/exam';
import { useUserProfileStore } from '@/stores/profile';
import { useRoute } from 'vue-router';

const route = useRoute();
const code_subject = route.params.code_subject;

const userStore = useUserProfileStore();
const examStore = useExamStore();
const subjectStore = useSubjectStore();

onMounted(() => {
  userStore.fetchUserProfile();
  // subjectStore.fetchUserSubject();
  subjectStore.fetchSubjectByCode(code_subject);
  
  examStore.fetchUserExam(code_subject);
});

const color = ref('yellow')

const year = ref("")
const term = ref("")
const id_subject = ref("")
const subjectName = ref("")

const selectedSubject = ref({});

const resetFormData = () => {
    year.value = '';
    term.value = '';
    id_subject.value = '';
    subjectName.value = '';
};

const add_subject = async () => {
    try {
        const subjectData = {
            username: userStore.userProfile.username,
            year: year.value,
            term: term.value,
            id_subject: id_subject.value, // ตรวจสอบว่าต้องการ id_subject จริงหรือไม่
            name_subject: subjectName.value,
        }
        await subjectStore.addSubject(subjectData)
        dialogCreateSubj.value = false // ปิด dialog หลังจากเพิ่มข้อมูลสำเร็จ
        resetFormData();
    } catch (error) {
        console.error('Error saving subject:', error)
    }
}
const cancel = () => {
    resetFormData(); // รีเซ็ตฟอร์ม
    dialogCreateSubj.value = false; // ปิด dialog
};

// edit

const editSubject = (subject) => {
    selectedSubject.value = { ...subject }; // Clone the subject object to avoid direct mutation
    // Update the v-model bindings with the selected subject's data
    // year.value = selectedSubject.value.year;
    // term.value = selectedSubject.value.term;
    // id_subject.value = selectedSubject.value.id_subject;
    // subjectName.value = selectedSubject.value.name_subject;
    dialogEditSubj.value = true; // Open the edit dialog
    console.log("test")
    console.log(subjectName.value)
    console.log(selectedSubject.value.name_subject)
};

const updateSubject = async () => {
    try {
        year.value = selectedSubject.value.year;
        term.value = selectedSubject.value.term;
        id_subject.value = selectedSubject.value.id_subject;
        subjectName.value = selectedSubject.value.name_subject;
        const subjectData = {
            code_subject: selectedSubject.value.code_subject, // Use the code_subject from selectedSubject
            username: userStore.userProfile.username,
            year: year.value,
            term: term.value,
            id_subject: id_subject.value,
            name_subject: subjectName.value,
        };
        console.log("vue")
        console.log(subjectData.name_subject)
        console.log("end")
        await subjectStore.updateSubject(subjectData); // Call the updateSubject function from the store
        dialogEditSubj.value = false; // Close the dialog
        resetFormData(); // Reset the form data
    } catch (error) {
        console.error('Error updating subject:', error);
    }
};

const cancelEdit = () => {
    // resetFormData();
    dialogEditSubj.value = false; // ปิด dialog
    console.log()
};


const dialogCreateSubj = ref(false)
const dialogEditSubj = ref(false)
</script>


<template>
    <v-container>
      <!-- ข้อสอบของวิชา {{ useSubjectStore.year }} -->
      <div v-if="examStore.userExam.length > 0">

        <v-row align="center" class="mx-0">
            <!-- ใช้ v-for วนลูปข้อมูลวิชาทั้งหมดจาก store -->
            <!-- <div v-if="examStore.userExam.length > 0"> -->
            <v-col v-for="exam in examStore.userExam" :key="exam.id" cols="3">
                <v-card :color="color" class="mx-auto" max-width="250">
                    <v-card-item>
                        <div>
                            <div class="text-h6 mb-1">
                                {{ exam.name_exam }}
                            </div>
                            <div class="text-caption">จำนวน {{ exam.qty_exam }} ข้อ</div>
                            <!-- {{ subject.code_subject }} -->
                        </div>
                    </v-card-item>

                    <v-card-actions>
                        <v-btn @click="editSubject()">
                            <v-icon>mdi-pen</v-icon>
                            Edit
                        </v-btn>
                        <v-btn>
                            <v-icon>mdi-trash-can-outline</v-icon>
                            Delete
                        </v-btn>
                    </v-card-actions>
                </v-card>
            </v-col>
            <!-- </div> -->
            
            <!-- <v-card :color="color" class="mx-0" max-width="400" height="130"> -->
            <!-- <v-card-actions> -->
          
            <!-- </v-card-actions> -->
            <!-- </v-card> -->

        </v-row>
        </div>
    </v-container>
</template>