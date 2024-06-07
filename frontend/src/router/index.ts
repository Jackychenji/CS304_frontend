import { createRouter, createWebHashHistory } from 'vue-router'
import { type RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
    {
        path: '/',
        redirect: { name: 'Login' }
    },
    {
        path: '/login',
        name: 'Login',
        component: () => import(/* webpackChunkName: "About" */ '@/views/Login.vue')
    },
    {
        path: '/main',
        name: 'Main',
        component: () => import(/* webpackChunkName: "About" */ '@/views/Main.vue'),
        children: [
            {
                path: 'home',
                name: '主页',
                component: () => import(/* webpackChunkName: "About" */ '@/views/Home.vue')
            },
            {
                path: 'usercenter',
                name: '用户中心',
                component: () => import(/* webpackChunkName: "About" */ '@/views/UserCenter/index.vue')
            },
            {
                path: 'notification',
                name: '通知',
                component: () => import(/* webpackChunkName: "About" */ '@/views/Notification/index.vue')
            },
            {
                path: 'online-chat',
                name: '在线聊天',
                component: () => import(/* webpackChunkName: "About" */ '@/views/OnlineChat/index.vue')
            },
            {
                path: 'demo',
                name: 'Demo',
                component: () => import(/* webpackChunkName: "About" */ '@/views/Demo.vue')
            }
        ]
    },
    {
        path: '/course',
        name: 'Course',
        component: () => import(/* webpackChunkName: "About" */ '@/views/Main.vue'),
        children: [
            {
                path: 'material/:courseCode',
                name: '课程资料',
                component: () => import(/* webpackChunkName: "About" */ '@/views/Course/introduction/material.vue')
            },
            {
                path: 'introduction',
                name: '课程信息',
                component: () => import(/* webpackChunkName: "About" */ '@/views/Course/introduction/course.vue')

            },
            {
                path: 'recommendation',
                name: '课程推荐',
                component: () => import(/* webpackChunkName: "About" */ '@/views/Course/recommendation/index.vue')
            },
            {
                path: 'class/:classId',
                name: '班级详细信息',
                component: () => import(/* webpackChunkName: "About" */ '@/views/Course/introduction/classDetail.vue')
            },
            {
                path: 'class',
                name: '课程班级',
                component: () => import(/* webpackChunkName: "About" */ '@/views/Course/introduction/index.vue')
            },
            {
                path: 'course/:classId',
                name: '课程详细信息',
                component: () => import(/* webpackChunkName: "About" */ '@/views/Course/introduction/courseDetail.vue')
            },


        ]
    },
    {
        path: '/study',
        name: 'Study',
        component: () => import(/* webpackChunkName: "About" */ '@/views/Main.vue'),
        children: [
            {
                path: 'view',
                name: '查看论坛',
                component: () => import(/* webpackChunkName: "About" */ '@/views/Study/view/index.vue')
            },
            {
                path: 'post',
                name: '上传问题',
                component: () => import(/* webpackChunkName: "About" */ '@/views/Study/post/index.vue')
            },
            {
                path: 'own',
                name: '我的问题',
                component: () => import(/* webpackChunkName: "About" */ '@/views/Study/own/index.vue')
            },
            {
                path: 'issue/:issueId',
                name: '问题信息',
                component: () => import(/* webpackChunkName: "About" */ '@/views/Study/view/issueDetail.vue')
            },
            {
                path: 'myIssue/:issueId',
                name: '我的问题信息',
                component: () => import(/* webpackChunkName: "About" */ '@/views/Study/view/myIssueDetail.vue')
            },
        ]
    },
    {

        path: '/tutoring',
        name: 'Tutoring',
        component: () => import(/* webpackChunkName: "About" */ '@/views/Main.vue'),
        children: [
            {
                path: 'consultation',
                name: '预约中心',
                component: () => import(/* webpackChunkName: "About" */ '@/views/TutoringCounseling/ConsultationCourse.vue')
            },
            {
                path: 'reservation',
                name: '我的预约',
                component: () => import(/* webpackChunkName: "About" */ '@/views/TutoringCounseling/UserReservation.vue')
            },

        ]
    },
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

export default router
