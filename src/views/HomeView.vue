<script setup>
import { ref, onMounted, reactive, } from 'vue';
import { useSubjectStore } from '@/stores/subject';
import { useUserProfileStore } from '@/stores/profile';
import { useRouter } from 'vue-router';

const router = useRouter();
const userStore = useUserProfileStore();
const subjectStore = useSubjectStore();

onMounted(() => {
  userStore.fetchUserProfile();
  subjectStore.fetchUserSubject();
});

const color = ref('red');
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

const toSubjDetail = (code_subject) => {
  console.log(code_subject)
  router.push({ name: 'hExam', params: { code_subject } });
};
</script>



<template>
    <v-container>
        <div v-if="subjectStore.userSubject.length > 0">

        <v-row align="center" class="mx-0">
            <!-- ใช้ v-for วนลูปข้อมูลวิชาทั้งหมดจาก store -->
            <v-col v-for="subject in subjectStore.userSubject" :key="subject.id" cols="3">
                <v-card :color="color" @click="toSubjDetail(subject.code_subject)" class="mx-auto" max-width="250">
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
            <div class="mx-4">


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
            </div>
            <!-- </v-card-actions> -->
            <!-- </v-card> -->

        </v-row>
        </div>
    </v-container>
</template>