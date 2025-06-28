const express = require('express');
const router  = express.Router();
const authMiddleware=require('../middleware/authMiddleware');
const {getBookmarks,createBookmark,updateBookmark,deleteBookmark}=require('../controllers/bookmarksController')

router.use(authMiddleware);
router.get('/',getBookmarks);
router.post('/',createBookmark);
router.put('/:id',updateBookmark);
router.delete('/:id',deleteBookmark);

module.exports=router;