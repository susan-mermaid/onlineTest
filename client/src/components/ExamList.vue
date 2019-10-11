<template>
    <div>
        <h3 class="text-center my-5">
            <span >Exam List</span>
        </h3>
        <v-data-table 
            :headers="headers" :items="items" :page.sync="page" 
            :items-per-page="itemsPerPage"
            hide-default-footer class="elevation-1 mx-8" @page-count="pageCount = $event">
            <!-- @click:row="selectExam()"> -->

             <template v-slot:item.action="{ item }">
                <v-btn color="green" class="ma-2 white--text" large @click="selectExam(item)">Start</v-btn>
            </template>  
        </v-data-table>
        <div class="text-center pt-2">
            <v-pagination v-model="page" :length="pageCount"></v-pagination>
        </div>
    </div>
</template>
<script>
    import axios from "axios";
    import {API_BASE_URL} from "../config";

    export default {
        name:"examList",
        methods:{
            selectExam(item){
                if(item.nosoal != this.$session.get("examId")){
                    this.$session.remove("answers")
                    this.$session.remove("answersForNote")
                    this.$session.remove("doubts")

                    this.$session.set("answers", {})
                    this.$session.set("answersForNote", {})
                    this.$session.set("doubts", {})
                }
                this.$session.set("examId", item.nosoal)
                this.$session.set("subject", item.materi)
                this.$session.set("forwhat", item.untuk)
                this.$session.set("examtime", item.waktu)
                this.$session.set("allcnt", item.jumlahsoal )
                this.$session.set("dispcnt", item.disajikan)
                this.$session.set("opcnt", item.opsi)
                this.$session.set("method", item.metode)
                this.$router.push('/examdetail');
            }
        },
        data () {
            return {
                page: 1,
                pageCount: 0,
                itemsPerPage: 10,
                headers: [
                    { text: 'Exam Index',align: 'center',  sortable: false, value: 'nosoal',},
                    { text: 'For What', align: 'center', value: 'untuk',},
                    { text: 'Subject', align: 'center', value: 'materi' },
                    { text: 'Duration', align: 'center', value: 'waktu' },
                    { text: 'Start', align: 'center', value: 'action' },
                ],
                items: [],
            }
        },
        async created(){
            try{
                const response = await axios.post(API_BASE_URL + '/examlist',{id:this.$session.get('id')})
                this.items = response.data
            }catch(e){
                
            }
        }
    }

</script>