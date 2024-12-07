import express  from "express";
const router = express.Router();
import { createAuthor, getAuthors } from "../controllers/author.controllers.js";
import { createArticle, getAllArticles,getAuthorArticles,deleteArticle ,getArticle, bulkArticle ,updateArticle} from "../controllers/articles.controllers.js";
// admit route
router.get('/authors', getAuthors);
router.post('/author', createAuthor);
router.get('/admin/bloglist',getAuthorArticles);
router.post('/admin/blog',createArticle);
router.delete('/admin/blog/:id',deleteArticle);
router.put('/admin/blog/:id',updateArticle);
router.get('/admin/blog/:id',getArticle);

// generate route

router.post('/bulkBlog',bulkArticle);
router.get('/blogList',getAllArticles);
router.get('/blog/:id',getArticle);



export default router;
