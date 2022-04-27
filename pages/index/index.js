// pages/index/index.js
const db = wx.cloud.database();

Page({
    data: {
        interval: 3000,
        duration: 1000,
        circular: true,
        indicatordots: true,
        autoplay: true,
        duration: 1000,
        banners: [],
        newProduct: [],
        icon_images: [{
                theme_icon: "images/theme@1.png",
                theme_name: "新品糖果"
            },
            {
                theme_icon: "images/theme@2.png",
                theme_name: "精品糖果"
            },
            {
                theme_icon: "images/theme@3.png",
                theme_name: "美味坚果"
            },
            {
                theme_icon: "images/theme@4.png",
                theme_name: "优质推荐"
            }
        ],
    },
    onLoad() {
        db.collection('banners').get()
            .then(res => {
                console.log("banners image success", res)
                this.setData({
                    banners: res.data
                })
            }).catch(res => {
                console.log("banners images fail", res)
            })

        db.collection('newProduct').get()
            .then(res => {
                console.log("get newProduct success", res)
                this.setData({
                    newProduct: res.data
                })
            }).catch(res => {
                console.log("get newProduct fail", res)
            })
    },
    addCar(e) {
        console.log(e.target.dataset.item)
        let item = e.target.dataset.item
        wx.showLoading({
            title: '添加中',
        })
        db.collection('shoppingCar').where({
                _id: item._id
            }).get()
            .then(res => {
                console.log(res)
                if (res.data.length > 0) {
                    wx.showToast({
                        title: '购物车中已存在',
                        icon: "none"
                    })
                } else {
                    db.collection("shoppingCar").add({
                        data: {
                            _id: item._id,
                            image: item.image,
                            price: item.salePrice,
                            name: item.name,
                            time: db.serverDate(),
                            num:1
                        }
                    }).then(res => {
                        wx.hideLoading({})
                        wx.showToast({
                            title: "添加成功",
                            icon: 'none'
                        })
                    }).catch(res => {
                        console.log(res)
                        wx.showToast({
                            title: '添加失败',
                            icon: 'error'
                        })
                    })

                }

            })


    }
})