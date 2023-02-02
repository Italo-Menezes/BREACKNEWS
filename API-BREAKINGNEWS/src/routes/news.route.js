import { Router } from 'express';
const router = Router();

import { create, findAll, topnews, findById, SearchByTitle, byUser, update, erase, likeNews, addComment, deleteComment} from '../controllers/news.controller.js';
import {authMIddleware} from '../middlewares/auth.middlewares.js';

router.post('/',authMIddleware ,create)
router.get('/', findAll) 
router.get('/top', topnews);
router.get('/search/',SearchByTitle);
router.get('/byUser',authMIddleware, byUser )
router.patch('/:id',authMIddleware,update); 
router.get('/:id',findById);
router.delete('/:id',authMIddleware, erase);
router.patch('/like/:id',authMIddleware, likeNews);
router.patch('/comment/:id',authMIddleware, addComment);
router.patch('/comment/:idnews/:idComment',authMIddleware, deleteComment);



export default router;