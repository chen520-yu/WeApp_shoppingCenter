// pages/detail/detail.js

const db = wx.cloud.database()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        id: ""
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        console.log(options.id)
        this.setData({
            id: options.id
        })
        console.log(this.data.id)

        // db.collection('product').where({
        //     price:500
        // }).update({
        //     data:{
        //         name:"product2"
        //     }
        // }).then(console.log)
        // .catch(console.error)   

        wx.cloud.callFunction({
            name: "getProduct",
            data: {
                id: this.data.id
            }
        }).then(res => {
            console.log(res)

        }).catch(res => {
            console.log(res)
        })
    }
})