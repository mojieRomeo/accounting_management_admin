import {createRouter, createWebHistory} from 'vue-router'
import LoginView from "@/views/LoginView.vue";
import HomeView from "@/views/HomeView.vue";
import RegisterView from "@/views/RegisterView.vue";
import BillTableView from "@/views/BillTableView.vue";
import ChartView from "@/views/ChartView.vue";
import UserTableView from "@/views/UserTableView.vue";
import UserCenterView from "../views/UserCenterView.vue";

const routes = [
    {path: '/', redirect: '/login'}, //默认跳转
    {path: '/login', component: LoginView},
    {path:'/register',component: RegisterView},
    {
        path: '/home',
        component: HomeView,
        meta:{requiresAuth:true},
        children: [{
            path: 'billTable', component: BillTableView
        },
            {
                path: 'echarts', component: ChartView
            },{
                path: 'userTable', component: UserTableView
            },{
                path: 'center', component: UserCenterView
            }]
    }

]

const router = createRouter({
    history: createWebHistory(), routes
})
router.beforeEach((to, from, next) => {
    const token = localStorage.getItem('tokenValue')
    if (to.meta.requiresAuth && !token) {
        next('/login')
    }
    next()
})


export default router