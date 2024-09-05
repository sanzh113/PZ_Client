<template>
    
    <router-view></router-view>
    <van-tabbar v-model="active">
        <van-tabbar-item
        v-for="item in router.options.routes[0].children" 
        :key="item.path" 
        :icon="item.meta.icon"
        :url="`#/${item.path}`"
        >{{item.meta.name}}</van-tabbar-item>
        
    </van-tabbar>

</template>
<script setup>
import { ref ,onMounted} from 'vue';
import {useRouter,useRoute} from 'vue-router'


const active = ref(0);
// 获取到路由数据 路由中meta有icon的具体值
const router = useRouter()
const route = useRoute()
// 在mouted生命周期里取得icon数据
onMounted(()=>{
    console.log('router',router);
    // home路由
    const data = router.options.routes[0]
    // 当前点击的这一项 通过路由拿到路径 对路径进行匹配 得到索引 把这个索引值给active 
    active.value = data.children.findIndex(item=> '/'+item.path === route.path)
})

</script>
