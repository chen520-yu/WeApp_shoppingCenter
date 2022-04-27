// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
    env: "cloud-3gisu2ovd9db2e1b"
})
const db = cloud.database()

// 云函数入口函数
exports.main = async (event, context) => {
    try {
        return await db.collection('newProduct').where({
            _id: event.id
        }).get()
    } catch (error) {
        console.log(error)
    }

}