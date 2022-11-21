const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27017/linkprediction', {useNewUrlParser: true, useUnifiedTopology: true}, (error => {
    if (error) {
        console.log('数据库连接失败')
    } else {
        console.log('数据库连接成功')
    }
}))

module.exports = mongoose