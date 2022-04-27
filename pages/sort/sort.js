const db = wx.cloud.database()

Page({
    data: {
        list: [
            "美女",
            "美景",
            "美食"
        ],
        select: 1,
        products: [],
        top: {}
    },
    slectType(e) {
        console.log("获取选择成功", e.target.dataset)
        this.setData({
            select: JSON.parse(JSON.stringify(e.target.dataset)).index
        })
        console.log(this.data.select)
        wx.showLoading({
            title: '加载中',
        })
        if (this.data.select == 1) {
            this.getPro("beautifulGirl")
        } else if (this.data.select == 2) {
           this.getPro("scenery")
        }else if(this.data.select==3){
            this.getPro("foods")
        }
    },
    onLoad() {
        wx.showLoading({
            title: '加载中',
        })
        this.getPro("beautifulGirl")
    },
    getPro(e){
        db.collection(e).get()
        .then(res => {
            console.log("get foods success", res)
            this.setData({
                products: res.data,
                top: res.data[0].top
            })
            wx.hideLoading({
                success: (res) => {},
            })
        }).catch(res => {
            console.log("get foods fail", res)
            wx.hideLoading({
                success: (res) => {},
            })
            wx.showToast({
                title: '加载失败',
                icon: 'error'
            })
        })
    }
})