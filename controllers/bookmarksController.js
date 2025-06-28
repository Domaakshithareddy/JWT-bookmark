const Bookmark=require('../models/Bookmark');

const getBookmarks=async (req,res)=>{
    try{
        const bookmarks = await Bookmark.find({ userId: req.userId });
        res.json({bookmarks});
    }
    catch (err) {
        res.status(500).json({ message: 'Error fetching bookmarks', error: err.message });
    }
};

const createBookmark= async (req,res)=>{
    const {title,url}=req.body;
    if (!title || !url){
        return res.status(400).json({ message: 'Title and URL are required' });
    }
    try {
        const newBookmark=new Bookmark({
            title, url,
            userId:req.user.userId,
        });
        await newBookmark.save();
        res.status(201).json({ message: 'Bookmark created', bookmark: newBookmark });
    }
    catch (err){
        res.status(500).json({ message: 'Error creating bookmark', error: err.message });
    }
};

module.exports={ getBookmarks, createBookmark };