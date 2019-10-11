<template>
	<v-img class="white--text mx-auto ml-3" width="100%" src="@/assets/images/camera.png">
		<v-card-title class="align-end fill-height"><v-btn>Activate</v-btn></v-card-title>
	</v-img>
</template>

<script>
export default {
    data(){
        return{
			ip: 	 '192.161.0.10',
			subject: "English",
			myclass: "Class A",
			token:	"AScb1245" ,
			isActive: true
        }
    }
}
</script>