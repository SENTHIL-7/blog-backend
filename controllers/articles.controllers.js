
import {pool} from "../db.js";
export const getAllArticles = async (req, res) => {
  try{
    const articles = await pool.query('SELECT * FROM articles');
    res.status(200).send(articles.rows);
  }
  catch(error){
    console.log(error);
    res.status(422).send(error);
  }
} 


export const getArticle = async (req, res) => {
  try{
    const {id} = req.params;
    const authorId  =1;
    const article = await pool.query('SELECT * FROM articles WHERE id = $1', [id]);
    const authorName = await pool.query('SELECT name FROM authors WHERE id = $1', [authorId]);
    console.log('authorName',authorName)
    const result ={
      authorName : authorName.rows[0].name,
      ...article.rows[0]
    }
    res.status(200).send(result);
  }
  catch(error){
    console.log(error);
    res.status(422).send(error);
  }
}
export const deleteArticle = async (req, res) => {
  try{
    const {id} = req.params;
    const authorId  =1;
    const result = await pool.query('DELETE FROM articles WHERE id = $1 AND author_id = $2 RETURNING *', [id,authorId]);
    res.status(200).send(result.rows[0]);
  }
  catch(error){
    console.log(error);
    res.status(422).send(error);
  }
}


export const updateArticle = async (req, res) => {
  try{
    const {id} = req.params;
    const authorId  =1;
    const {title ,image_url ,excerpt ,content ,tags} = req.body;
    const result = await pool.query('UPDATE articles SET title = $1, image_url = $2, excerpt = $3, content = $4, tags = $5  WHERE id = $5 AND author_id = $6 RETURNING *', [title ,image_url ,excerpt ,content ,tags ,id ,authorId]);
    res.status(200).send(result.rows[0]);
  }
  catch(error){
    console.log(error);
    res.status(422).send(error);
  }
}

export const createArticle = async (req, res) => {
  try{
    const {title ,image_url ,excerpt ,content ,tags} = req.body;
    const author_id  =1;
    const articles = await pool.query('INSERT INTO articles (title ,author_id  ,image_url ,excerpt ,content ,tags) VALUES ($1, $2, $3, $4, $5 ,$6) RETURNING *', [title ,author_id  ,image_url ,excerpt ,content,tags ]);
    res.status(201).send(articles.rows);
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
    const adminId = 1;
    const articles = await pool.query('SELECT * FROM articles WHERE author_id=$1',[adminId]);
    res.status(200).send(articles.rows);
  }
  catch(error){
    console.log(error);
    res.status(422).send(error);
  }
}