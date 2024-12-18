import {findAll ,create, update, findOne, destroy} from '../services/article.service.js';
export const getAllArticles = async (req, res) => {
  console.log(req.cookies['authcookie'])
  try{
    const articles = await findAll();
    res.status(200).send(articles);
  }
  catch(error){
    console.log(error);
    res.status(422).send(error);
  }
} 


export const getArticle = async (req, res) => {
  try{
    const {id} = req.params;
    const articles = await findOne(id);
    // const authorName = await   
    // const article = await pool.query('SELECT * FROM articles WHERE id = $1', [id]);
    // const authorName = await pool.query('SELECT name FROM authors WHERE id = $1', [authorId]);
    // console.log('authorName',authorName)
    // const result ={
    //   authorName : authorName.rows[0].name,
    //   ...article.rows[0]
    // }
    res.status(200).send(articles);
  }
  catch(error){
    console.log(error);
    res.status(422).send(error);
  }
}
export const deleteArticle = async (req, res) => {
  try{
    const {id} = req.params;
    const authorId = req.user.id;
    const result = await destroy(id,authorId);
    res.status(200).send(result);
  }
  catch(error){
    console.log(error);
    res.status(422).send(error);
  }
}


export const updateArticle = async (req, res) => {
  try{
    const {id} = req.params;
    const author_id = req.user.id;
    const {title ,image_url ,excerpt ,content ,tags , date} = req.body;
    const result = await update({title ,image_url ,excerpt ,content ,tags ,date ,author_id},id);
    res.status(200).send(result);
  }
  catch(error){
    console.log(error);
    res.status(422).send(error);
  }
}

export const createArticle = async (req, res) => {
  try{
    const {title ,image_url ,excerpt ,content ,tags , date} = req.body;
    const author_id  =req.user.id;
    const articles = await create({title ,image_url ,excerpt ,content ,tags ,author_id ,date});
    res.status(201).send(articles);
  }
  catch(error){
    console.log(error);
    res.status(422).send(error);
  }  
}

export const bulkArticle = async (req, res) => {
  const articles = req.body;
  try{
  // Prepare the values for bulk insert
  const values = articles.flatMap(article => [
    article.title, 
    article.author_id, 
    article.image_url, 
    article.excerpt, 
    article.content,
    article.tags
  ]);

  // Construct the query with multiple value sets
  const placeholders = articles.map((_, index) => 
    `($${index * 5 + 1}, $${index * 5 + 2}, $${index * 5 + 3}, $${index * 5 + 4}, $${index * 5 + 5})`
  ).join(', ');

  const query = `
    INSERT INTO articles (title, author_id, image_url, excerpt, content ,tags) 
    VALUES ${placeholders} 
    RETURNING *
  `;

  const result = await pool.query(query, values);
  res.status(200).send(result.rows);
  }
  catch(error){
    console.log(error);
    res.status(422).send(error);
  }  
}


//admin 

export const getAuthorArticles = async (req, res) => {
  try{
    const adminId = req.user.id;
    const articles = await findAll(adminId);
    res.status(200).send(articles);
  }
  catch(error){
    console.log(error);
    res.status(422).send(error);
  }
}