const express = require('express');
const router  = express.Router();
const authMiddleware=require('../middleware/authMiddleware');
const {getBookmarks,createBookmark}=require('../controllers/bookmarksController')

router.use(authMiddleware);
router.get('/',getBookmarks);
router.post('/',createBookmark);

module.exports=router;