<template>
    <div class="home">
        <Header/>
        <v-content>
            <v-row no-gutters>
                <v-col  cols="12" sm="12" md="12" lg="12">
                <ExamDetail/>
                </v-col>
            </v-row>
        </v-content>>
        <!-- <Footer/> -->
        
    </div>
</template>

<script>
// @ is an alias to /src
import Header from "@/components/Header.vue";
import ExamDetail from "@/components/ExamDetail.vue";
import Footer from "@/components/Footer.vue";

export default {
    name: "examlistview",
    components: {
        Header,
        ExamDetail,
        Footer
    }
};
</script>