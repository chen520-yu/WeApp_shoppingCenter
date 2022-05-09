// app.js
App({
    onLaunch() {
        // 展示本地存储能力
        const logs = wx.getStorageSync('logs') || []
        logs.unshift(Date.now())
        wx.setStorageSync('logs', logs)

        wx.cloud.init({
            env: "cloud-3gisu2ovd9db2e1b"
        })
        data: {
            icon: []
        }
    },
    globalData: {
        userInfo: null
    }
})