import Vue from "vue";
import VueRouter from "vue-router";

const SystemConfig = resolve => require(['@/views/systemConfig'], resolve); // 系统配置
const LogSet = resolve => require(['@/views/dataStructure/logSet'], resolve); // 日志集
const IndexSet = resolve => require(['@/views/dataStructure/indexSet'], resolve); // 指标集

const AdministratorInformation = resolve => require(['@/views/administratorInformation'], resolve); // 管理员信息

const Login = resolve => require(['@/components/login'], resolve); // 登录
const Index = resolve => require(['@/components/index'], resolve);
const Errorinfo = resolve => require(['@/components/errorinfo'], resolve); //  404页面


Vue.use(VueRouter);
export default new VueRouter({
    // mode: "history",
    base: process.env.BASE_URL,
    routes: [{
            path: '/errorinfo',
            name: 'Errorinfo',
            component: Errorinfo
        },
        { path: "/", redirect: "/login" },
        { path: "/login", name: 'Login', component: Login },
        {
            path: "/index",
            redirect: '/systemConfig',
            component: Index,
            children: [
                { path: '/system-config', name: '系统配置', component: SystemConfig },
                { path: '/data-logset', name: '日志集', component: LogSet },
                { path: '/data-indexset', name: '指标集', component: IndexSet },
            ]
        },
    ],
    scrollBehavior(to, from, savedPosition) {
        if (savedPosition) {
            return savedPosition
        } else {
            return { x: 0, y: 0 }
        }
    },
    beforeEach(to, from, next) {
        console.log(to, from, next)
        if (to.matched.length === 0) {
            from.name ? next({
                name: from.name
            }) : next('/errorinfo');
        } else {
            next(); //如果匹配到正确跳转
        }
    }
});