<template>
 <div id="app">
  <v-app id="inspire">
     <router-view />
   
  </v-app>
</div>
   
</template>

<style scoped>
   .content{
      margin:30px 30px 0 30px;
   }
     html{
        overflow-y:auto!important;
    }
</style>

<script>

export default {
  name: 'App',
  components: {
   
  },
  data:() => ({
    //
  }),
};
</script>
