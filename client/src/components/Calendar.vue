<template>
  <v-row justify="center">
    <v-date-picker v-model="picker"  color="green lighten-1" header-color="green"></v-date-picker>
  </v-row>
</template>
<script>
export default {
    data () {
        return {
            picker: new Date().toISOString().substr(0, 10),
        }
    },
}
</script>