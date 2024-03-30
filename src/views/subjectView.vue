<script setup>
import { ref, onMounted } from 'vue'
import { useSubjectStore } from '@/stores/subject';

const subjectStore = useSubjectStore();

onMounted(() => {
    subjectStore.fetchUserSubject();
});

const color = ref('indigo-lighten-2')

const year = ref("")
const term = ref("")
const subjectName = ref("")

const dialogCreateSubj = ref(false)
</script>

<template>
    <v-container>
        <v-row align="center" class="mx-0">
            <!-- ใช้ v-for วนลูปข้อมูลวิชาทั้งหมดจาก store -->
            <v-col v-for="subject in subjectStore.userSubject" :key="subject.id" cols="3">
                <v-card :color="color" class="mx-auto" max-width="250">
                    <v-card-item>
                        <div>
                            <div class="text-h6 mb-1">
                                {{ subject.name_subject }} | {{ subject.term }}/{{ subject.year }}
                            </div>
                            <div class="text-caption">{{ subject.id_subject }}</div>
                        </div>
                    </v-card-item>

                    <v-card-actions>
                        <v-btn>
                            <v-icon>mdi-pen</v-icon> <!-- ปุ่มสำหรับดำเนินการเกี่ยวกับวิชานี้ -->
                            Edit
                        </v-btn>
                        <v-btn>
                            <v-icon>mdi-trash-can-outline</v-icon> <!-- ปุ่มสำหรับดำเนินการเกี่ยวกับวิชานี้ -->
                            Delete
                        </v-btn>
                    </v-card-actions>
                </v-card>
            </v-col>
            <!-- <v-card :color="color" class="mx-0" max-width="400" height="130"> -->
            <!-- <v-card-actions> -->
            <div class="mx-4">
                <v-btn height="130" color="indigo-lighten-4" @click="dialogCreateSubj = true">
                    <v-icon>mdi-plus-circle-outline</v-icon>
                </v-btn>


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
                                        <v-text-field label="Subject" v-model="subjectName"></v-text-field>
                                    </v-col>
                                </v-row>
                            </v-container>
                        </v-card-text>

                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn color="error" variant="text" @click="dialogCreateSubj = false"> Cancel </v-btn>
                            <v-btn color="blue-darken-1" variant="text" @click="save"> Save </v-btn>
                        </v-card-actions>
                        <!-- <template v-slot:actions>
                            <v-btn class="ms-auto" text="Cancel" @click="dialog = false" color="error"></v-btn>
                            <v-btn class="ms-auto" text="Create Subject"></v-btn>
                        </template> -->
                    </v-card>

                </v-dialog>
            </div>
            <!-- </v-card-actions> -->
            <!-- </v-card> -->
        </v-row>
    </v-container>
</template>