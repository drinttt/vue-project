<script setup>
import { ref, onMounted, } from 'vue'
import { useSubjectStore } from '@/stores/subject';
import { useUserProfileStore } from '@/stores/profile';

const userStore = useUserProfileStore();
const subjectStore = useSubjectStore();

onMounted(() => {
    userStore.fetchUserProfile(),
    subjectStore.fetchUserSubject();
});

const color = ref('indigo-lighten-2')

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

<!-- <script setup>
import { ref, onMounted, reactive } from 'vue';
import { useSubjectStore } from '@/stores/subject';
import { useUserProfileStore } from '@/stores/profile';

const userStore = useUserProfileStore();
const subjectStore = useSubjectStore();

onMounted(() => {
  userStore.fetchUserProfile();
  subjectStore.fetchUserSubject();
});

const color = ref('indigo-lighten-2');
const dialogCreateSubj = ref(false);
const dialogEditSubj = ref(false);

// ใช้ 'reactive' สำหรับจัดการ state ของข้อมูลที่ต้องการแก้ไข
const selectedSubject = reactive({});

const editSubject = (subject) => {
    // คัดลอกข้อมูลวิชาที่ต้องการแก้ไขไปยัง selectedSubject
    Object.assign(selectedSubject, subject);
    // เปิด dialog การแก้ไข
    dialogEditSubj.value = true;
};

const updateSubject = async () => {
  try {
    // ส่งข้อมูลที่อัปเดตไปยัง backend
    await subjectStore.updateSubject(selectedSubject);
    // ปิด dialog และรีเซ็ตข้อมูลที่เลือกหลังจากอัปเดต
    dialogEditSubj.value = false;
    // รีเซ็ต selectedSubject
    Object.keys(selectedSubject).forEach(key => selectedSubject[key] = '');
  } catch (error) {
    console.error('Error updating subject:', error);
  }
};

const cancelEdit = () => {
  // รีเซ็ต selectedSubject และปิด dialog
  Object.keys(selectedSubject).forEach(key => selectedSubject[key] = '');
  dialogEditSubj.value = false;
};
</script> -->



<template>
    <v-container>
        <div v-if="subjectStore.userSubject.length > 0">

        <v-row align="center" class="mx-0">
            <!-- ใช้ v-for วนลูปข้อมูลวิชาทั้งหมดจาก store -->
            <!-- <div v-if="subjectStore.userSubject.length > 0"> -->
            <v-col v-for="subject in subjectStore.userSubject" :key="subject.id" cols="3">
                <v-card :color="color" class="mx-auto" max-width="250">
                    <v-card-item>
                        <div>
                            <div class="text-h6 mb-1">
                                {{ subject.name_subject }} | {{ subject.term }}/{{ subject.year }}
                            </div>
                            <div class="text-caption">{{ subject.id_subject }}</div>
                            {{ subject.code_subject }}
                        </div>
                    </v-card-item>

                    <v-card-actions>
                        <v-btn @click="editSubject(subject)">
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
            <!-- <v-card :color="color" class="mx-0" max-width="400" height="130"> -->
            <!-- <v-card-actions> -->
            <!-- <div class="mx-4">
                <v-btn height="130" color="indigo-lighten-4" @click="dialogCreateSubj = true">
                    <v-icon>mdi-plus-circle-outline</v-icon>
                </v-btn> -->


                <!-- Dialog create Subject -->
                <v-dialog v-model="dialogCreateSubj" width="auto">
                    <v-card width="600" prepend-icon="mdi-folder-plus-outline" title="Create Subject">
                        <v-card-text>
                            <v-container>
                                <v-row>
                                    <v-col>
                                        <v-text-field label="Year" v-model="year"></v-text-field>
                                    </v-col>
                                    <v-col>
                                        <v-text-field label="Term" v-model="term"></v-text-field>
                                    </v-col>

                                </v-row>
                                <v-row>
                                    <v-col>
                                        <v-text-field label="ID Subject" v-model="id_subject"></v-text-field>
                                    </v-col>
                                </v-row>
                                <v-row>
                                    <v-col>
                                        <v-text-field label="Subject" v-model="subjectName"></v-text-field>
                                    </v-col>
                                </v-row>
                            </v-container>
                        </v-card-text>

                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn color="error" variant="text" @click="cancel"> Cancel </v-btn>
                            <v-btn color="blue-darken-1" variant="text" @click="add_subject"> Save </v-btn>
                        </v-card-actions>
                        <!-- <template v-slot:actions>
                            <v-btn class="ms-auto" text="Cancel" @click="dialog = false" color="error"></v-btn>
                            <v-btn class="ms-auto" text="Create Subject"></v-btn>
                        </template> -->
                    </v-card>

                </v-dialog>

                <!-- Dialog Edit Subject -->
                <v-dialog v-model="dialogEditSubj" width="auto">
                    <v-card width="600" prepend-icon="mdi-folder-plus-outline" title="Edit Subject">
                        <v-card-text>
                            <v-container>
                                <v-row>
                                    <!-- <v-col>
                                        <v-text-field label="code"></v-text-field>
                                    </v-col> -->
                                    <v-col>
                                        <v-text-field label="Year" v-model="selectedSubject.year"></v-text-field>
                                    </v-col>
                                    <v-col>
                                        <v-text-field label="Term" v-model="selectedSubject.term"></v-text-field>
                                    </v-col>

                                </v-row>
                                <v-row>
                                    <v-col>
                                        <v-text-field label="ID Subject"
                                            v-model="selectedSubject.id_subject"></v-text-field>
                                    </v-col>
                                </v-row>
                                <v-row>
                                    <v-col>
                                        <v-text-field label="Subject"
                                            v-model="selectedSubject.name_subject"></v-text-field>
                                    </v-col>
                                </v-row>
                            </v-container>
                        </v-card-text>

                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn color="error" variant="text" @click="cancelEdit"> Cancel </v-btn>
                            <v-btn color="blue-darken-1" variant="text" @click="updateSubject"> Save </v-btn>
                        </v-card-actions>
                    </v-card>

                </v-dialog>
            <!-- </div> -->
            <div class="mx-4">
                <v-btn height="130" color="indigo-lighten-4" @click="dialogCreateSubj = true">
                    <v-icon>mdi-plus-circle-outline</v-icon>
                </v-btn>
            </div>
            <!-- </v-card-actions> -->
            <!-- </v-card> -->

        </v-row>
        </div>
    </v-container>
</template>