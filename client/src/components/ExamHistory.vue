<template>
    <div>
        
        <v-data-table :headers="headers" :items="items" :page.sync="page" 
            :items-per-page="itemsPerPage"
            hide-default-footer class="elevation-1 mx-8" @page-count="pageCount = $event">

            <template v-slot:item.nilai="{ item }">
                <v-chip :color="getColor(item.nilai)" dark>{{ item.nilai}}</v-chip>
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
        name:"examHist",
        data () {
            return {
                page: 1,
                pageCount: 0,
                itemsPerPage: 15,
                headers: [
                    { text: 'Exam Index',align: 'center', sortable: false, value: 'nosoal',},
                    { text: 'Time', value: 'waktu' },
                    { text: 'Test Type', value: 'jenis_tes' },
                    { text: 'Duration', value: 'lama' },
                    { text: 'True', value: 'benar' },
                    { text: 'False', value: 'salah' },
                    { text: 'Result', value: 'nilai' },
                ],
                items: [],
            }
        },
        async created(){
            
            try{
                const response = await axios.post(API_BASE_URL + '/examhistory',{id:this.$session.get('id')})
                this.items = response.data
                
            }catch(e){
                
            }
        },
        methods: {
            getColor (marks) {
                // if (marks > 90) return 'green'
                // else if (marks > 60) return 'orange'
                // else return 'green'
                if(marks > 90) return 'green'
                else if(marks > 50) return 'orange'
                return 'red'
            },
        },
  }
</script>