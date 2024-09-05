import request from '../utils/request'
// 导入二次封装的axios
// 这里暴露整个 在pc端是一个一个暴露
export default {
    login(data) {
        return request.post('/login', data)
    },
    // 首页数据
    index() {
        return request.get('/Index/index')
    },
    // 订单详情
    h5Companion() {
        return request.get('/h5/companion')
    },
    // 提价订单
    createOrder(data) {
        return request.post('/createOrder', data)
    },
    // 提价订单
    orderList(params) {
        return request.get('/order/list', { params })
    },
    // 订单详情
    orderDetail(params) {
        return request.get('/order/detail', { params })
    },
}