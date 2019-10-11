import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

import Login from '@/views/Login.vue'
import Home from '@/views/Home.vue';
import ExamListView from '@/views/ExamListView.vue';
import ExamHistoryView from '@/views/ExamHistoryView.vue'
import ExamDetailView from '@/views/ExamDetailView.vue'
import ExamView from '@/views/ExamView.vue'

export default new VueRouter({
	routes:[
		{
			path: "/login",
			name: "login",
			component: Login
		},
		{
			path: "/",
			name: "login",
			component: Login,
		},
		{
			path: "/home",
			name: "home",
			component: Home,
			method: 'GET',
			handler: function (request, reply) {
				const xFF = request.headers['x-forwarded-for']
				const ip = xFF ? xFF.split(',')[0] : request.info.remoteAddress
				console.log('outside', "ok")
				return reply('client IP: ' + ip)

			}
		},
		{
			path: "/examlist",
			name: "examlist",
			component: ExamListView
		},
		{
			path: "/examhistory",
			name: "examhist",
			component: ExamHistoryView
		},
		{
			path: "/examdetail",
			name: "examdetail",
			component: ExamDetailView
		},
		{
			path: "/exam",
			name: "exam",
			component: ExamView
		},
	]
})