<template>
    <div class="home">
        <Header/>
        <v-content>
            <v-row no-gutters>
                <v-col  cols="12" sm="12" md="12" lg="12">
                <ExamList msg="UserName"/>
                </v-col>
            </v-row>
            
        </v-content>
        <!-- <Footer/> -->
    </div>
</template>

<script>
// @ is an alias to /src
import Header from "@/components/Header.vue";
import ExamList from "@/components/ExamList.vue";
import Footer from "@/components/Footer.vue";
export default {
    name: "examlistview",
    components: {
        Header,
        ExamList,
        Footer
    }
};
</script>