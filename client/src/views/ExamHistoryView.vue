<template>
    <div class="home">
        <Header/>
        <v-content>
            <v-row no-gutters>
                <v-col  cols="12" sm="12" md="12" lg="12">
                <h3 class="text-center my-5"> <span>My Exam History</span></h3>
                <ExamHistory msg="UserName"/>
                </v-col>
            </v-row>
            
        </v-content>
        <!-- <Footer/> -->
    </div>
</template>

<script>
// @ is an alias to /src
import Header from "@/components/Header.vue";
import ExamHistory from "@/components/ExamHistory.vue";
import Footer from "@/components/Footer.vue";
export default {
    name: "examlistview",
    components: {
        Header,
        ExamHistory,
        Footer
    }
};
</script>