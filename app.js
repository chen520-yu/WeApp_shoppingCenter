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

        // 登录
        wx.login({
            success: res => {
                // 发送 res.code 到后台换取 openId, sessionKey  , unionId
            }
        })
    },
    globalData: {
        userInfo: null
    }
})