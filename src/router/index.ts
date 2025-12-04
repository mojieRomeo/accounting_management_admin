import {createRouter, createWebHistory} from 'vue-router'
import LoginView from "@/views/LoginView.vue";
import HomeView from "@/views/HomeView.vue";
import RegisterView from "@/views/RegisterView.vue";
import TableView from "@/views/TableView.vue";
import ChartView from "@/views/ChartView.vue";

const routes = [
    {path: '/', redirect: '/login'}, //默认跳转
    {path: '/login', component: LoginView},
    {path:'/register',component: RegisterView},
    {
        path: '/home',
        component: HomeView,
        children: [{
            path: 'table', component: TableView
        },
            {
                path: 'echarts', component: ChartView
            }]
    }

]

const router = createRouter({
    history: createWebHistory(), routes
})
export default router