require('dotenv').config();
const mongoose=require('mongoose');
const app=require('./app')

const PORT=process.env.PORT || 4000;
const MONGO_URL=process.env.MONGO_URL;

mongoose.connect(MONGO_URL).then(()=>{
    console.log('connected to MongoDB');
    app.listen(PORT,()=>{
        console.log(`Running on ${PORT}`)
    });
}).catch((err)=>{
    console.error('MongoDB connection failed:', err.message);
});