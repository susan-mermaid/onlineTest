<template>
   <div>
      <v-navigation-drawer v-model="drawer" app color="#03a9f5">
         <v-list dense>
            <v-list-item class="mt-6">
               <v-row align="center" justify="center">
                  <v-img src="../assets/images/boy.png" aspect-ratio="1" class="grey lighten-2"
                     max-width="100" max-height="100" contain></v-img>
               </v-row>
            </v-list-item>
            <v-list-item class="mt-0">
               <v-row align="center" justify="center">
                  <v-card color="#03a9f5" flat>
                     <v-card-text class="white--text text-center pa-0" justify="center" algin="center">
                        <span class="title white--text" v-text="name"></span><br>
                        <span v-text="kelas"></span>

                     </v-card-text>
                  </v-card>   
               </v-row>
            </v-list-item>   
            <v-list-item to="/home">
               <v-list-item-action>
                  <v-icon x-large color="white">mdi-home</v-icon>
               </v-list-item-action>
               <v-list-item-content>
                  <v-list-item-title class="title white--text" >DashBoard</v-list-item-title>
               </v-list-item-content>
            </v-list-item>
            <v-list-item to="/examlist">
               <v-list-item-action>
                  <v-icon x-large color="white">mdi-view-list</v-icon>
               </v-list-item-action>
               <v-list-item-content>
                  <v-list-item-title class="title white--text">List</v-list-item-title>
               </v-list-item-content>
            </v-list-item>
            <v-list-item to="/examhistory">
               <v-list-item-action>
                  <v-icon  x-large color="white">mdi-history</v-icon>
               </v-list-item-action>
               <v-list-item-content>
                  <v-list-item-title class="title white--text">History</v-list-item-title>
               </v-list-item-content>
            </v-list-item>
         </v-list>
      </v-navigation-drawer>

    <v-app-bar app color="#0288d1" dark>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-btn text color="#0288d1" dark to="/home" class="title white--text">Dashboard</v-btn>
      <div class="flex-grow-1"></div>
  
        <v-menu left bottom>
            <template v-slot:activator="{ on }">
               <v-btn icon v-on="on">
                  <v-icon>mdi-dots-vertical</v-icon>
               </v-btn>
            </template>
            <v-list>
               <v-list-item  to="/">
                  <v-list-item-title>Logout</v-list-item-title>
               </v-list-item>
            </v-list>
         </v-menu>
    </v-app-bar>
  </div>
</template>

<script>
export default {
   name: 'Header', 
   props: {
      source: String,
   },
   data: () => ({
      drawer: null,
      name  :'',
      kelas : '',
   }),
   async created(){
      if(this.$session.get("login")){
         this.name = this.$session.get('name')
         this.kelas = this.$session.get('kelas')
      }
   }
}
</script>