const Bookmark=require('../models/Bookmark');

const getBookmarks=async (req,res)=>{
    try{
        const bookmarks = await Bookmark.find({ userId: req.user.userId });
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

const updateBookmark = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, url } = req.body;
    const bookmark = await Bookmark.findOneAndUpdate(
      { _id: id, userId: req.user.userId }, 
      { title, url },
      { new: true }
    );
    if (!bookmark) {
      return res.status(404).json({ message: 'Bookmark not found' });
    }
    res.status(200).json({ message: 'Bookmark updated', bookmark });
  } catch (err) {
    res.status(500).json({ message: 'Error updating bookmark', error: err.message });
  }
};

const deleteBookmark=async (req,res)=>{
    const {id}=req.params;
    try{
        const deleted = await Bookmark.findOneAndDelete({
            _id:id,userId:req.user.userId
        });
        if (!deleted) return res.status(404).json({ message: 'Bookmark not found' });
        res.status(200).json({ message: 'Bookmark deleted' });
    }
    catch (err) {
        res.status(500).json({ message: 'Delete failed', error: err.message });
    }
};

module.exports={ getBookmarks, createBookmark ,updateBookmark, deleteBookmark};