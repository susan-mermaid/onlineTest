<template>
    <div class="ma-10" width="80%">
        <v-row  no-gutters>
            <v-col  cols="12" xs="3" sm="3" md="2" lg="2">
                <div class="mb-3">
                    <span> NO SOAL</span>
                </div>
                <div class="mb-3">
                    <span> Untuk</span>
                </div>
                <div class="mb-3">
                    <span> Materi</span>
                </div>
                <div class="mb-3">
                    <span> Guru Pengampu</span>
                </div>
                <div class="mb-3">
                    <span> Jumlah Soal</span>
                </div>
                <div class="mb-3">
                    <span> Waktu</span>
                </div>
                <div>
                    <span> Token</span>
                </div>
            </v-col> 
            <v-col  cols="12" xs="4" sm="4" md="4" lg="4">
                <div class="mb-3">
                    <span> :{{examId}} </span>
                </div>
                <div class="mb-3">
                    <span class="ml-1"> :{{forwhat}} </span><br>
                </div>
                <div class="mb-3">
                    <span class="ml-1"> :{{subject}} </span><br>
                </div>
                <div class="mb-3">
                    <span class="ml-1"> :{{teacher}}</span><br>
                </div>
                <div class="mb-3">
                    <span class="ml-1"> :{{probCnt}}</span><br>
                </div>
                <div class="mb-3">
                    <span class="ml-1"> :{{duration}}</span><br>
                </div>
                <v-text-field  outlined label="Your Token" v-model="token"
                    :append-icon="show ? 'fa-eye' : 'fa-eye-slash'" :type="show ? 'text' : 'password'"
                    @click:append="() => (show = !show)" class="ma-3">
                </v-text-field>
            
            </v-col>
            <v-col  cols="12" xs="4" sm="4" md="4" lg="4">
                <!-- <ExamCamera/> -->
            </v-col>      
        </v-row>   
                    
        <v-card-actions>
            <v-btn text color="orange" to="examlist">Back</v-btn>
            <v-btn color="green" large @click="onStart()" class="white--text">Start</v-btn>
        </v-card-actions>
        
    </div>
</template>

<script>

import ExamCamera from "./ExamCamera.vue"
import axios from "axios"
import {API_BASE_URL} from "../config"

export default {
    name:"examList",
    components:{
        ExamCamera
    },
    data () {
        return {
            show: false,
            token: 'Password',
            ip:'',
            examId:'',
            forwhat:'',
            subject:'',
            teacher:'',
            duration:'',
            probCnt:'',
            isCamAct:true
        }
    },
    async created(){
        axios.post(API_BASE_URL + '/examdetail', 
            {examId:this.$session.get("examId")})
        .then(response =>{
            if(response.data == null){
                alert("Exam Data does not Exist")
            }else{
                this.examId = response.data.nosoal
                this.forwhat = response.data.untuk
                this.subject = response.data.materi
                this.teacher = response.data.nama
                this.$session.set("teacher", this.teacher)
                this.duration = response.data.waktu + "min"
                this.probCnt = response.data.jumlahsoal 
            }
        },
        error=>{
            console.error();
        })
    },
    methods:{
        onStart(){
            let token = this.token;
            if(!ExamCamera.data().isActive){
                alert("Active your camera");
            }else{
                if(token.length == 0){
                    alert("Please input your token")
                }else{
                    axios.post(API_BASE_URL+'/checktoken', 
                        {token:token, examId:this.examId})
                    .then(response=>{
                        if(response.data == null){
                            alert("Invalid Token.")
                        }else{
                            this.$session.set("tokenpass", true)
                            this.$router.push("/exam")
                        }
                    }),
                    error=>{
                        alert(error)
                    };
                    
                }
            }
            var elem = document.documentElement;
              
            if (elem.requestFullscreen) {
                elem.requestFullscreen();
            } else if (elem.mozRequestFullScreen) { /* Firefox */
                elem.mozRequestFullScreen();
            } else if (elem.webkitRequestFullscreen) { /* Chrome, Safari and Opera */
                elem.webkitRequestFullscreen();
            } else if (elem.msRequestFullscreen) { /* IE/Edge */
                elem.msRequestFullscreen();
            }
              
            
        }
    }
}
</script>