<template>
    <div class="home">
        <!-- <Header/> -->
        <v-content>
            <v-row no-gutters>
                <v-col  cols="12" xs="12" sm="12" md="12" lg="12">
                <ExamContent/>
                </v-col>
            </v-row>
        </v-content>
        <!-- <Footer/> -->
        
    </div>
</template>

<script>
// @ is an alias to /src
import Header from "@/components/Header.vue";
import Footer from "@/components/Footer.vue";
import ExamInfo from "@/components/ExamInfo.vue";
import ExamCamera from "@/components/ExamCamera.vue";
import ExamContent from "@/components/ExamContent.vue";
export default {
    name: "examlistview",
    components: {
        Header,
        ExamInfo,
        ExamCamera,
        ExamContent,
        Footer
    }
};
</script>