<template>
    <div class="upload-students-view">
        <h1>Upload List of Students</h1>
        <form @submit.prevent="submitList">
            <div class="form-group">
                <label for="codeSubject">Subject:</label>
                <select id="codeSubject" v-model="selectedSubject" required>
                    <option value="">Please select</option>
                    <option v-for="subject in codeSubjects" :key="subject.code_subject" :value="subject.code_subject">
                        {{ subject.name_subject }} - {{ subject.code_subject }}
                    </option>
                </select>
            </div>

            <div class="form-group">
                <label for="section">Section:</label>
                <input type="text" id="section" v-model="section" required>
            </div>

            <div class="form-group">
                <label for="excelFile">Upload Excel File:</label>
                <input type="file" id="excelFile" ref="file" accept=".xls,.xlsx" required>
            </div>

            <button type="submit">Upload</button>
        </form>
    </div>
</template>

<script>
import axios from 'axios';
import * as XLSX from 'xlsx';

export default {
    name: 'UploadStudentsView',
    data() {
        return {
            selectedSubject: '',
            section: '',
            file: null,
            codeSubjects: [],
        };
    },
    mounted() {
        this.fetchCodeListStd();
    },
    methods: {
        async fetchCodeListStd() {
            try {
                const response = await axios.get('http://localhost/api/getCodeSubjects.php');
                this.codeSubjects = response.data;
            } catch (error) {
                console.error('Error fetching code subjects:', error);
            }
        },
        async submitList() {
            try {
                const file = this.$refs.file.files[0];
                if (!file) {
                    alert("Please select a file.");
                    return;
                }

                console.log(this.selectedSubject); // Debug: Log the selectedSubject to confirm it's set

                // const vueInstance = this; // Ensure vueInstance is defined in the correct scope

                const reader = new FileReader();
                reader.onload = async (e) => {
                    const data = e.target.result;
                    const workbook = XLSX.read(data, { type: 'array' });
                    const sheetName = workbook.SheetNames[0];
                    const worksheet = workbook.Sheets[sheetName];
                    const json = XLSX.utils.sheet_to_json(worksheet);

                    for (const row of json) {
                        const dataToSend = {
                            code_subject: this.selectedSubject, // Correctly use vueInstance here
                            list_id_std: row['เลขประจำตัวนักศึกษา'],
                            list_name: row['ชื่อ'],
                            list_sec: this.section
                        };

                        try {
                            const response = await axios.post("http://localhost/api/uploadStudentList.php", dataToSend, {
                                headers: {
                                    "Content-Type": "application/json"
                                }
                            });

                            if (!response.data.success) {
                                alert(`Failed to import data for row: list_id_std=${row['list_id_std']}, list_name=${row['list_name']}`);
                            }
                        } catch (error) {
                            console.error(`Error sending data for row: ${JSON.stringify(row)} - `, error);
                            alert(`Failed to send data for row: list_id_std=${row['list_id_std']}, list_name=${row['list_name']}`);
                        }
                    }

                    alert("Data import process completed. Please check for any errors in the console.");
                };
                reader.readAsArrayBuffer(file);
            } catch (error) {
                console.error("Error processing file:", error);
                alert("An error occurred while processing the file. Please try again later.");
            }
        }

    },
};
</script>

<style scoped>
.upload-students-view {
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

.form-group input,
.form-group select {
    width: 100%;
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 4px;
}

button {
    background-color: #007bff;
    color: white;
    padding: 10px 20px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
}

button:hover {
    background-color: #0056b3;
}
</style>
