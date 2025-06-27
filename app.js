const cors=require('cors');
const express=require('express');
const authRoutes=require('./routes/auth');
const bookmarkRoutes=require('./routes/bookmarks');

const app=express();

app.use(cors());
app.use(express.json());

app.use('/api/auth',authRoutes);
app.use('/api/bookmarks',bookmarkRoutes);

module.exports=app;