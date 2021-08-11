const mongoose = require('mongoose')

const url = `mongodb+srv://anubhav:WS6mV2PWKe8JPpAF@cluster0.thtks.mongodb.net/APNISHOP?retryWrites=true&w=majority`
mongoose.connect(url,{
    useCreateIndex: true,
    useFindAndModify: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(()=> {
    console.log('Connect Successfully')
}).catch(err=> console.log("error in connecting db", err))
