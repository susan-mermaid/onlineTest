<template>
    <v-card outlined>
     
        <v-toolbar color="primary" height="100" class="px-5" >
            <div class="flex-grow-1"></div>
             
            <v-img src="../assets/images/boy.png" aspect-ratio="1" class="grey lighten-2"
                max-width="80" max-height="80" contain></v-img>
           <div class="ml-3" >
               <div class="white--text" justify="center">{{sName}}</div>
               <div class="white--text" justify="center">{{sId}}</div>
           </div>
        </v-toolbar>
          <v-card  class="mx-2 my-2"   style="border:2px solid #0288d1;">
            <v-card-title >
                <span>Question No. 
                    <v-chip class="ma-2" label color="primary">
                        {{currentProb}}
                    </v-chip>
                </span>
                <div class="flex-grow-1"></div>
                <div>
                    <div >{{ansCnt}}/{{totalProb}}</div>
                    <div id="progbar" class="progbar"></div>
                </div>
                <TimeCounter />
            </v-card-title>
            <v-divider ></v-divider>
            <v-row no-gutters>
                <v-col  cols="12" xs="7" sm="7" md="7" lg="7">
                <div  class="d-inline-flex pa-3">
                        <span id="question">
                        </span>
                    </div> 
                    <v-radio-group column class="ma-4" v-model="ansSelected" @change="selectAns()">

                        <v-radio :label= optionA color="success" value="A"></v-radio>
                        <v-radio :label= optionB color="success" value="B"></v-radio>
                        <v-radio :label= optionC color="success" value="C"></v-radio>
                        <v-radio :label= optionD color="success" value="D"></v-radio>
                        <v-radio :label= optionE color="success" value="E"></v-radio>
                    </v-radio-group>
                </v-col>
                <v-divider vertical class="mx-3"></v-divider>
               
                    <v-col cols="12" xs="4" sm="4" md="4" lg="4">
                         <!-- <v-navigation-drawer v-model="drawer" absolute temporary right> -->
                        <!-- <scrollbar ref="scrollbar" class="btnContainer"> -->
                            <v-badge class="mt-2" color="green" overlap  v-for="probno in totalProb" :key="probno">
                                <template v-slot:badge>
                                    <span >{{ probno }}</span>
                                </template>
                                <span v-if="probno == currentProb">
                                    <v-btn class="ma-2"  color="indigo">{{probno}}
                                    </v-btn>
                                </span>
                                <span v-else>
                                    <v-btn class="ma-2" outlined color="indigo" @click="goProb(probno)">{{probno}}
                                    </v-btn>
                                </span>
                            </v-badge>
                        <!-- </scrollbar>  -->
                         <!-- </v-navigation-drawer> -->
                    </v-col>
                </v-row>
            
            <v-divider></v-divider>
            <v-card-actions>
                <v-btn @click="prevProb()">Prev</v-btn>
                <v-btn color="warning" @click="doubt()">Doubt</v-btn>
                <v-btn color="primary" @click="nextProb()">Next</v-btn>
                <v-btn color="primary" @click="finish()">Finish</v-btn>
                <v-btn  color="pink"
          dark
          @click.stop="drawer = !drawer"
        >
          Toggle
        </v-btn>
            </v-card-actions>
        </v-card>
        <v-card  class="mx-2 my-1 mb-1" align="right"  style="border:2px solid #0288d1;">
            <div class="mr-2">
                <span>IP ADRESS Status-Connected</span>
            </div>
        </v-card>
    </v-card>
</template>

<script>

import TimeCounter from './TimeCounter';
import axios from "axios"
import {API_BASE_URL} from "../config"

var intervalTimer;

export default {
    name: "examcontent",
    components:{
        TimeCounter
    },
    data(){
        return{
            currentProb: 1,
            totalProb: this.$session.get("dispcnt"),
            ansCnt : 0,
            optionA: '',
            optionB: '',
            optionC: '',
            optionD: '',
            optionE: '',
            ansSelected: '',
            questions:[],
            answers: {},
            sName: '',
            sId  : '' 
        }
    },
    methods:{
        prevProb(){
            
            if(this.currentProb > 1){
                this.currentProb--;
                document.getElementById("question").innerHTML = this.questions[this.currentProb - 1].pertanyaan
            }else if(this.currentProb === 1){
                this.currentProb = this.totalProb;
                document.getElementById("question").innerHTML = this.questions[this.currentProb - 1].pertanyaan
            }
            this.setOption()
            this.ansSelected = this.answers[this.questions[this.currentProb - 1].id.toString()]
        },
        nextProb(){
            this.ansSelected = ''
            if(this.currentProb < this.totalProb){
                this.currentProb++;
                document.getElementById("question").innerHTML = this.questions[this.currentProb - 1].pertanyaan
            }else if(this.currentProb === this.totalProb){
                this.currentProb = 1
                document.getElementById("question").innerHTML = this.questions[this.currentProb - 1].pertanyaan
            }
            this.setOption()
            this.ansSelected = this.answers[this.questions[this.currentProb - 1].id.toString()]
            
        },
        goProb(num){
            this.currentProb = num
            document.getElementById("question").innerHTML = this.questions[this.currentProb - 1].pertanyaan
            this.setOption()
            this.ansSelected = this.answers[this.questions[this.currentProb - 1].id.toString()]
        },
        setOption(){
            this.optionA = this.questions[this.currentProb - 1].opsia
            this.optionB = this.questions[this.currentProb - 1].opsib
            this.optionC = this.questions[this.currentProb - 1].opsic
            this.optionD = this.questions[this.currentProb - 1].opsid
            this.optionE = this.questions[this.currentProb - 1].opsie
        },
        doubt(){
            // this.answers[this.questions[this.currentProb - 1].id.toString()] = "doubt"
        },
        selectAns(){
            this.answers[this.questions[this.currentProb - 1].id.toString()] = this.ansSelected;
            this.ansCnt = Object.keys(this.answers).length
        },
        async finish(){
            await axios.post(API_BASE_URL + '/sendResult', this.answers)
                .then(response =>{
                    if(response.data == null){
                        alert("saving result is not failed")
                    }else{
                        alert(response.data)
                    }
                },
                error=>{
                    alert(error)
                })
            this.$router.push("/home")
        }
    },
    async created(){
        if(!this.$session.get("tokenpass")){
            alert("Token is not correct");
            this.$router.push("/home");
        }else{
            axios.post(API_BASE_URL + '/examcontent', 
                { examId:this.$session.get("examId"),
                  dispcnt:this.$session.get("dispcnt"),
                  method:this.$session.get("method")})
            .then(response =>{
                if(response.data == null){
                    alert("Exam Data does not Exist")
                }else{
                    this.questions = response.data
                    document.getElementById("question").innerHTML = this.questions[0].pertanyaan
                    this.setOption()
                    this.sName = this.$session.get("name")
                    this.sId   = this.$session.get("id")  
                }
            },
            error=>{
                console.error();
            })
        }
    }  
};
</script>
<style scoped>
    .btnContainer{
        position: relative;
        max-height: 500px;
        overflow: hidden;
    }
    .progbar{
        width:180px;
        height:10px;
        background-color:#234567;
    }
    /* .cardborder{
        border:2px solid blue;
        border-radius: 2px;
    } */
</style>