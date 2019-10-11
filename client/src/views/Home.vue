<template>
    <div class="home">
        <scrollbar ref="scrollbar" class="btnContainer">
            <Header/>
            <v-content>
                <h1 class="ma-3 text-center"><i>Welcome</i> to Our Online Exam</h1>
                <v-row class="mx-2">
                    <v-col   cols="12" sm="8" md="8" lg="8">
                        <!-- <ExamList msg="UserName"/>-->
                        <ExamHistory msg="UserName"/> 
                    </v-col>
                    <v-col  cols="12" sm="4" md="4" lg="4">
                        <v-row justify="center">
                            <v-date-picker v-model="picker"  color="green lighten-1" header-color="green"></v-date-picker>
                        </v-row>
                        <v-row justify="center" class="mt-2">
                            <h3>Your Logging history</h3><br>
                        </v-row>
                        <v-row justify="center" class="mt-2">
                            <h3>Your last login:</h3>{{lastlogin}}<br>
                        </v-row>
                        <v-row justify="center" class="mr-2">
                            <h3>Your IP Address:</h3>{{ip}}<br>
                        </v-row>        
                    </v-col>
                </v-row>
            </v-content>
            <!-- <Footer/> -->
        </scrollbar>
        
    </div>
</template>

<style scoped>
    .btnContainer{
        position: relative;
        max-height: 600;
        overflow: hidden;
    }
</style>

<script>
// @ is an alias to /src
import Header from "@/components/Header.vue";
import ExamList from "@/components/ExamList.vue";
import ExamHistory from "@/components/ExamHistory.vue";
import Footer from "@/components/Footer.vue";

export default {
    name: "home",
    components: {
        Header,
        ExamList,
        ExamHistory,
        Footer,
    },
    data(){
        return{
            ip:'',
            lastlogin:'',
            picker: new Date().toISOString().substr(0, 10),

        }
    },
    async created(){
        if(this.$session.get("login")){
            this.ip = this.$session.get('ip')
            this.lastlogin = this.$session.get('lastlogin')
        }else{
            this.$router.push("/login");
        }
        
    }
};
</script>