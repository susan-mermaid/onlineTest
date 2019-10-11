<template>
   <div>
       <v-card  flat>
     
            <v-toolbar color="primary" height="100" class="px-5" >
                <v-img src="../assets/logo-2.png" aspect-ratio="1" class="grey lighten-2"
                    max-width="90" max-height="90" contain></v-img>
                <div class="flex-grow-1"></div>
                
                <v-img src="../assets/images/boy.png" aspect-ratio="1" class="grey lighten-2"
                    max-width="80" max-height="80" contain></v-img>
                <div class="ml-3" >
                    <div class="white--text" justify="center">{{sName}}</div>
                    <div class="white--text" justify="center">{{sId}}</div>
                </div>
            </v-toolbar>
             <v-card  class="mx-12 my-12 pa-10">
                <v-card-title>
                    <span>Question No. 
                        <v-chip class="ma-2" label color="primary">
                            {{currentProb}}
                        </v-chip>
                    </span>
                    <div class="flex-grow-1"></div>
                    <div style="margin-right:60px; margin-bottom:15px;">
                        <div >{{ansCnt}}/{{totalProb}}</div>
                        <div id="progbar" class="progbar"></div>
                    </div>
                    <TimeCounter />
                </v-card-title>
                <v-divider ></v-divider>
                <v-row align="center">
                    <v-col style="position:relative">
                    <template>
                        <v-content>
                            <v-col>
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
                        </v-content>
                        
                        <v-navigation-drawer v-model="drawer" absolute right color="#eeeeee" width="30%" max-height="300px;">
                            <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
                            <scrollbar ref="scrollbar" class="btnContainer">
                            <v-badge class="mt-2" color="green" overlap  v-for="probno in totalProb" :key="probno">
                                <template v-slot:badge>
                                    <span >{{answersForNote[probno]}}</span>
                                </template>
                                <span v-if="probno == currentProb">
                                    <span v-if="doubts[currentProb] == 1">
                                        <v-btn class="ma-2"  color="warning">{{probno}}</v-btn>
                                    </span>
                                    <span v-else>
                                        <v-btn class="ma-2"  color="indigo">{{probno}}</v-btn>
                                    </span>
                                </span>
                                <span v-else>
                                    <span v-if="doubts[probno] == 1">
                                        <v-btn class="ma-2"  color="warning" @click="goProb(probno)">{{probno}}</v-btn>
                                    </span>
                                    <span v-else>
                                        <v-btn class="ma-2" outlined  @click="goProb(probno)">{{probno}}</v-btn>
                                    </span>
                                    
                                </span>
                            </v-badge>
                            </scrollbar> 
                        </v-navigation-drawer>
                    </template> 
                    </v-col>       
                  </v-row>
                <v-card-actions>
                    <v-btn @click="prevProb()">Prev</v-btn>
                    <v-btn color="warning" @click="doubt()">Doubt</v-btn>
                    <v-btn color="primary" @click="nextProb()">Next</v-btn>
                    <v-btn color="green" class="white--text" @click="finish()">Finish</v-btn>
                </v-card-actions>
            </v-card>
       </v-card>
 </div>
 
</template>

<script>

import TimeCounter from './TimeCounter';
import axios from "axios"
import {API_BASE_URL} from "../config"
import  "../assets/html2canvas.min.js"

var intervalTimer;

export default {
    name: "examcontent",
    components:{
        TimeCounter
    },
    data(){
        return{
            drawer:null,
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
            answersForNote:{},
            sName: '',
            sId  : '' ,
            doubts: {}
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
            
            this.doubts[this.currentProb] = 1;
            this.currentProb = this.currentProb + 1
            this.currentProb = this.currentProb - 1

            this.$session.set("doubts", this.doubts)

            // html2canvas(document.body,{
            //     dpi:192,
            //     onrendered: function(canvas){
            //         var req={}
            //         req['img'] = canvas.toDataURL("image/png");
            //         axios.post(API_BASE_URL + "/saveImage", req)
            //             .then(response =>{
            //                 alert(response.data)
            //             },
            //             error=>{
            //                 alert(error)
            //             })
            //     }
		    // })
        },
        selectAns(){
            this.answers[this.questions[this.currentProb - 1].id.toString()] = this.ansSelected;
            this.answersForNote[this.currentProb] = this.ansSelected
            this.drawStatus()
           
            this.$session.set("answers", this.answers)
            this.$session.set("answersForNote", this.answersForNote)
        },
        drawStatus(){
             this.ansCnt = Object.keys(this.answers).length
            var percent = this.ansCnt / this.totalProb
            var progObj = document.getElementById("progbar")
            progObj.style.background = "-webkit-gradient(linear, 0 0,100% 0, color-stop(0, rgba(38, 153, 251)), color-stop(" + percent + ", rgba(38,153,251,1)),color-stop(" + percent + ", #bce0fd))";
        },
        async finish(){
            var req = {}
            req['answers']   = this.answers
            req['nosoal']    = this.$session.get("examId")
            req['kelas']     = this.$session.get('kelas')
            req['jenis_tes'] = this.$session.get("subject")
            req['name']      = this.$session.get("name")
            req['userid']    = this.$session.get("id")

            req['lama']      = this.$session.get("duration")
            req['totalcnt']  = this.totalProb
            await axios.post(API_BASE_URL + '/sendResult', req)
                .then(response =>{
                    if(response.data == null){
                        alert("saving result is not failed")
                    }else{
                        alert(response.data)
                        this.$session.remove("answers")
                        this.$session.remove("answersForNote")
                        this.$session.remove("doubts")
                        this.$session.remove("timeleft")
                        this.$session.remove("duration")
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
                    if(this.$session.get("answers") != null ){
                        this.answers = this.$session.get("answers")
                         this.ansSelected = this.answers[this.questions[0].id.toString()]
                    }
                    if(this.$session.get("answersForNote") != null){
                        this.answersForNote = this.$session.get("answersForNote")
                    }
                    if(this.$session.get("doubts") != null){
                        this.doubts = this.$session.get("doubts")
                    }
                    
                    this.drawStatus()
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
        width:250px;
        height:20px;
        background-color:#bce0fd;
    }
</style>