import { createApp } from 'vue'
// import './style.css'
import App from './App.vue'
import router from './router'
import api from './api'

const app = createApp(App)

// 在实例上绑定属性
app.config.globalProperties.$api = api
// 如果当前未登录 登录的token也不存在 返回登录界面
router.beforeEach((to, from) => {
    if (to.path !== '/login') {
        if (!localStorage.getItem('h5_token')) {
            return '/login'
        }
    }
})


// 路由挂载
app.use(router)

app.mount('#app')
