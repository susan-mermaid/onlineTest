<template>
	<v-card class="mx-auto mt-5 ml-3" tile>
		<v-list-item>
			<v-list-item-content>
				<v-list-item-title>{{examId}}</v-list-item-title>
			</v-list-item-content>
		</v-list-item>
		<v-list-item>
			<v-list-item-content>
				<v-list-item-title>{{subject}}</v-list-item-title>
			</v-list-item-content>
		</v-list-item>
		<v-list-item>
			<v-list-item-content>
				<v-list-item-title>{{name}}</v-list-item-title>
			</v-list-item-content>
		</v-list-item>
		<v-list-item>
			<v-list-item-content>
				<v-list-item-title>{{kelas}}</v-list-item-title>
			</v-list-item-content>
		</v-list-item>
	</v-card>
</template>

<script>
export default {
    data(){
        return{
				examId:  this.$session.get("examId"),
				subject: this.$session.get("subject"),
				name:	 this.$session.get("name"),
				kelas: this.$session.get("kelas")
        }
    }
}
</script>