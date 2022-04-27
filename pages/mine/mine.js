Page({

    data: {
        body_item: [{
                icon: "./icon/all-fill.png",
                content: "待付款"
            },
            {
                icon: "./icon/all-fill.png",
                content: "待付款"
            },
            {
                icon: "./icon/all-fill.png",
                content: "待付款"
            },
            {
                icon: "./icon/all-fill.png",
                content: "待付款"
            },
            {
                icon: "./icon/all-fill.png",
                content: "待付款"
            },
        ],
        bottom: [{
                icon: "./icon/all-fill.png",
                content: "待付款"
            },
            {
                icon: "./icon/all-fill.png",
                content: "待付款"
            },
            {
                icon: "./icon/all-fill.png",
                content: "待付款"
            },
            {
                icon: "./icon/all-fill.png",
                content: "待付款"
            },
        ],
        logged: false,
        userImg: "./icon/login.jpg",
        name: ""
    },
    getuserinfo() {
        wx.getUserProfile({
          desc: '用于完善个人信息',
        }).then(res=>{
            console.log(res)
            this.setData({
                logged: true,
                userImg: res.userInfo.avatarUrl,
                name: res.userInfo.nickName
            })
        }).catch(console.error)


    }

})