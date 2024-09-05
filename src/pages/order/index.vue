<template>
    <div class="container">
        <div class="header">我的订单</div>
        <van-tabs v-model:active="active" @click-tab="onClickTab">
            <!-- 1 待支付,2 待服务, 3 已完成, 4 已取消，不传查询全部 -->
            <van-tab title="全部" name=""></van-tab>
            <van-tab title="待支付" name="1"></van-tab>
            <van-tab title="待服务" name="2"></van-tab>
            <van-tab title="已完成" name="3"></van-tab>
            <van-tab title="已取消" name="4"></van-tab>
        </van-tabs>
        <!-- out_trade_no订单编号 -->
        <van-row @click="goDetail(item)" v-for="item in order" :key="item.out_trade_no">
            <!-- 左边是图片 右边是文字 -->
            <van-col span="5">
                <van-image width="50" height="50" radius="5" :src="item.serviceImg"></van-image>
            </van-col>
            <van-col span="14">
                <div class="text1">{{ item.service_name }}</div>
                <div class="text2">
                    <div>{{ item.hospital_name }}</div>
                    <div>预约时间:{{ item.starttime }}</div>
                </div>
               
            </van-col>
            <!-- 待支付显示倒计时 根据支付的状态 显示文字颜色不同-->
            <van-col class="text2" span="5" :style="{color:colorMap[item.trade_state]}">
                {{ item.trade_state }}
                <!-- 待支付时出现倒计时 从提交订单2小时倒计时 -->
                <counter :second="item.timer" v-if="item.trade_state === '待支付'"></counter>
            
            </van-col>
        </van-row>
        <div class="bottom-text">没有更多</div>
    </div>
</template>
<script setup>
import {ref,getCurrentInstance, onMounted} from 'vue'
import counter from '../../components/counter.vue';
import { useRouter,useRoute } from 'vue-router';
const router = useRouter()
const route = useRoute()
const order = ref([])
const active = ref("")
// 获取当前vue实例
const {proxy} = getCurrentInstance()

const colorMap = {
    '待支付': '#ffa200',
    '待服务': '#1da6fd',
    '已完成': '#21c521',
}

onMounted(()=>{
    // 第一次进去 查询全部
    getOrderList('')
    // if(route.query.active){
    //     active.value = route.query.active
    // }
})


// 获得订单列表
const getOrderList = async (state)=>{
    const {data} = await proxy.$api.orderList({state})
    console.log(data);
    order.value = data.data
    data.data.forEach(item=>{
        // 倒计时时间
        item.timer = item.order_start_time + 7200000 - Date.now()
    })
    
}
// 点击时触发的回调函数
const onClickTab = (item)=>{
    // 当前点击这一项的name就是要传给后端的status
    getOrderList(item.name)
}

// 跳转详情
const goDetail =(item)=>{
    // 跳转到订单详情 路由传递参数
    router.push(`/detail?oid=${item.out_trade_no}`)
}

</script>

<style lang="less" scoped>
.container {
    background-color: #f0f0f0;
    height: 100vh;
  }
  .header {
    background-color: #fff;
    line-height: 40px;
    text-align: center;
  }
  .van-row {
    background-color: #fff;
    padding: 10px;
    margin: 5px;
    border-radius: 5px;
    .text1 {
      font-size: 16px;
      line-height: 25px;
      font-weight: bold;
    }
    .text2 {
      font-size: 14px;
      line-height: 20px;
      color: #999999;
    }
  }
  .bottom-text {
    line-height: 50px;
    text-align: center;
    color: #999999;
  }
</style>