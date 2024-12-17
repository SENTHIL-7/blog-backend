import express  from "express";
const router = express.Router();
import { createAuthor, getAuthors } from "../controllers/author.controllers.js";
import { createArticle, getAllArticles,getAuthorArticles,deleteArticle ,getArticle, bulkArticle ,updateArticle} from "../controllers/articles.controllers.js";
import { login, refreshToken } from "../controllers/auth.controllers.js";
import passportConfig from "../middleware/passport.js";
import passport from "passport";
passportConfig(passport);
// auth route
router.post('/login', login);
router.post('/refreshToken', refreshToken);

// admit route
router.get('/authors',getAuthors);
router.post('/author', createAuthor);
router.get('/admin/bloglist',passport.authenticate('jwt', { session: false }), getAuthorArticles);
router.post('/admin/blog',passport.authenticate('jwt', { session: false }), createArticle);
router.delete('/admin/blog/:id',passport.authenticate('jwt', { session: false }), deleteArticle);
router.put('/admin/blog/:id',passport.authenticate('jwt', { session: false }), updateArticle);
router.get('/admin/blog/:id',passport.authenticate('jwt', { session: false }), getArticle);
router.post('/admin/bulkBlog',passport.authenticate('jwt', { session: false }), bulkArticle);

// generate route
router.get('/blogList',getAllArticles);
router.get('/blog/:id',getArticle);



export default router;

