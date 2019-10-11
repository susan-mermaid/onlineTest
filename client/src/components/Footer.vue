<template>
    <div>
        <v-footer absolute  class="font-weight-medium" color="teal darken-2">
            <v-col class="text-left white--text" cols="12" >
                {{ new Date().getFullYear() }} — <strong ><span>Online Test</span></strong>
            </v-col>
        </v-footer>
    </div>
</template>
<style scoped>
    .footer{
        bottom: 0px;
        position: absolute;
    }
</style>>