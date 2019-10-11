<template>
    <div class="">
		<div class="container-login100" id="signin">
			<div class="wrap-login100">
				<div class="login100-pic js-tilt" data-tilt>
					<img src="../assets/login/images/img-01.png" alt="IMG">
				</div>

				<v-form   ref="form"  v-model="valid" lazy-validation >
					<span class="login100-form-title">
						Member Login
					</span>

                    <span v-text="errors" style="color:red;"></span>
                    <!-- <v-text-field v-model="email" :rules="emailRules" outlined label="Email"
                        prepend-inner-icon="fa fa-envelope"></v-text-field> -->
                    <v-text-field v-model="name" :rules="nameRules" label="Name"
                        outlined required></v-text-field>

                    <v-text-field outlined label="Password" v-model="password"
                        :append-icon="show ? 'fa-eye' : 'fa-eye-slash'"
                        :type="show ? 'text' : 'password'"
                        @click:append="() => (show = !show)">
                    </v-text-field>
					

                    <v-btn x-large color="success" style="width:300px;" dark @click="login()">LOGIN</v-btn>
                    
                    <!-- <div class="text-center p-t-12">
                        <span class="txt1">
                            Forgot
                        </span>
                        <a class="txt2" href="#">
                            Username / Password?
                        </a>
                    </div>

                    <div class="text-center p-t-136">
                        <a class="txt2" href="#">
                            Create your Account
                            <i class="fa fa-long-arrow-right m-l-5" aria-hidden="true"></i>
                        </a>
                    </div> -->
				</v-form>
			</div>
		</div>
        
    </div>
</template>
<style scoped>
    @import '../assets/login/css/util.css';
    @import '../assets/login/css/main.css';
</style>

<script>
import axios from "axios";
import {API_BASE_URL} from "../config";

export default {
    data: () => ({
        valid: false,
        name:'',
        nameRules: [
            v => !!v || 'Name is required',
            v => v.length <= 32 || 'Name must be less than 10 characters',
        ],
        email: '',
        emailRules: [
            v => !!v || 'E-mail is required',
            v => /.+@.+/.test(v) || 'E-mail must be valid',
        ],
        show: false,
        password: 'Password',
        errors:''
    }),
    async created(){
        this.$session.clear()
        this.$session.set("login", false)
        console.log(this.$session.get("name"))
    },
    methods:{
        async login(){
            const ip = await axios.get(API_BASE_URL + "/getip")
            this.$session.set('ip', ip.data)
            axios.post(API_BASE_URL + "/login", {name:this.name, pwd:this.password})
            .then(response =>{
                if(response.data === null){
                    this.errors = "User Name or Password Incorrect."
                } else {
                    this.$session.set("login", true)
                    this.$session.set("id", response.data.nis)
                    this.$session.set("name", response.data.nama_siswa)
                    this.$session.set("kelas", response.data.kelas)
                    this.$session.set("lastlogin", response.data.lastlogin)
                    this.$router.push("/home")
                }
            },
            error=>{
                this.errors = error;
            })
        }
    }

}
</script>