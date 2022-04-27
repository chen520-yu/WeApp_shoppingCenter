const db = wx.cloud.database()
Page({
    data: {
        result: [],
        product: [],
        checked: false,
        price: 0
    },
    deletePro(e) {
        let index = e.currentTarget.dataset.index
        wx.showLoading({
            title: '删除中',
        })
        db.collection('shoppingCar').doc(this.data.product[index]._id).remove()
            .then(res => {
                wx.hideLoading({})
                wx.showToast({
                    title: '删除成功',
                })
                this.getPrice()
            }).catch(res => {
                wx.hideLoading({})
                wx.showToast({
                    title: '删除失败',
                    icon: 'none'
                })
            })
            this.getPrice()
    },
    addNum(e) {
        console.log(e)
        let index = e.currentTarget.dataset.index
        let temp = 'product[' + index + '].num'
        this.setData({
            [temp]: e.detail
        })
        db.collection('shoppingCar').doc(this.data.product[index]._id).update({
            data: {
                num: e.detail
            }
        })
        this.getPrice()
    },
    getPrice() {
        let that = this;
        let temp = 0;
        let all = 0;

        for (let i = 0; i < this.data.result.length; i++) {
            temp = parseInt(this.data.result[i])
            all = all + this.data.product[temp].price * this.data.product[temp].num
        }
        all = all * 100
        that.setData({
            price: all
        })

    },
    Change(e) {
        let temp = e.detail
        let that = this
        let result = []
        this.setData({
            checked: e.detail
        })
        if (temp == true) {
            console.log("true")
            for (let i = 0; i < this.data.product.length; i++) {
                result.push(i + '')
                that.setData({
                    result: result
                })
            }
            console.log(that.data.result)
        } else {
            console.log("false")
            that.setData({
                result: result
            })
        }
        this.getPrice()


    },
    onChange(event) {
        let that = this
        console.log(event.detail)
        this.setData({
            result: event.detail,
        });
        if (that.data.result.length < this.data.product.length) {
            that.setData({
                checked: false
            })
        }
        if (that.data.result.length == this.data.product.length) {
            that.setData({
                checked: true
            })
        }
        this.getPrice()
    },
    get_shopping_car(){
        db.collection('shoppingCar')
        .orderBy('time', 'asc')
        .get()
        .then(res => {
            console.log("success get car", res)
            this.setData({
                product: res.data
            })
        }).catch(res => {
            console.log("fail get car", res)
        })
    },
    onLoad() {
        this.get_shopping_car()
    },
    onShow() {
        this.get_shopping_car()
        this.getPrice()
    },


})