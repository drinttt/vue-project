<script setup>
// import { ref, defineEmits } from 'vue';
import { ref, } from 'vue';
import { useloginStore } from '@/stores/login'


const loginStore = useloginStore();
// const emit = defineEmits(['login']);


const form = ref(null);
const Username = ref(null);
const Password = ref(null);
const valid = ref(true);

const login = async () => {
  const { valid: formValid } = await form.value.validate();
  if (formValid) {
    loginStore.login(Username.value, Password.value);
    console.log("form success");
    // emit("login", Username.value)
  }
};
</script>


<template>
    <v-app>
        <v-container>
            <v-row justify="center" class="no-gutters setFont" style="padding-top: 8vh">
                <v-col cols="6">
                    <img alt="Vue logo" class="logo" src="@/assets/logo.png" width="590" height="600" />
                </v-col>
                <v-col cols="6" class="mt-16">
                    <v-card width="500px" class="mx-auto" id="rounded-card">
                        <br /><br />
                        <v-card-title primary-title class="text-center text-h4 mb-1">
                            <b class="headlogin">Login</b>
                        </v-card-title>
                        <v-card-text class="justify-center">
                            <v-form class="justify-center" ref="form" v-model="valid">
                                <v-col cols="12" class="justify-center">
                                    <v-text-field type="text" label="Username" v-model="Username"
                                        prepend-inner-icon="mdi-account" variant="outlined" required class="headlogin"
                                        :rules="[v => !!v || 'Username is required']">
                                    </v-text-field><br />
                                    <v-text-field type="password" label="Password" v-model="Password"
                                        prepend-inner-icon="mdi-lock" variant="outlined" required class="headlogin"
                                        :rules="[v => !!v || 'Password is required']">
                                    </v-text-field>
                                </v-col>
                                <!-- <v-alert v-if="error" type="error" class="mb-4">{{ error }}</v-alert> -->
                                <div class="text-caption text-center">
                                    <p class="grey">
                                        Don't you have account?<router-link to="/"
                                            class="linkregis">&nbsp;&nbsp;Register here.</router-link>
                                    </p>
                                </div>
                            </v-form>
                        </v-card-text>
                        <v-card-actions class="align-content-xl-center justify-center">
                            <v-btn @click="login" class="text-none mb-3" color="#82B1FF" size="x-large" variant="flat"
                                rounded="xl" width="150px">
                                <b class="buttlogin">LOGIN</b>
                            </v-btn>
                        </v-card-actions>
                        <br />
                    </v-card>
                    <!-- <pre>
                        {{ Username }}
                        {{ Password }}
                    </pre> -->
                </v-col>
            </v-row>
        </v-container>
    </v-app>
</template>

<style>
#rounded-card {
    border-radius: 25px;
    -webkit-box-shadow: 0 20px 50px rgba(0, 0, 0, 0.2);
    box-shadow: 0 -1px 10px rgba(0, 0, 0, 0.2) !important;
}

.headlogin {
    color: #0d47a1;
}

.buttlogin {
    color: white;
}

.linkregis {
    color: #0d47a1;
    text-decoration: none;
}

.grey {
    color: gray;
}
</style>