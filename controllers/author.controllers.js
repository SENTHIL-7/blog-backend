import {pool} from "../db.js";


export const getAuthors = async (req, res) => {
  try {
    const authors = await pool.query('SELECT * FROM authors') 
    console.log(authors.rows);
    res.status(200).send(authors.rows)
  } catch (error) {
    console.log(error.message);
    res.status(422).send(error)
  }
}
export const createAuthor = async (req, res) => {
  console.log('createAuthor',req.body)
  try {
    const {name, email} = req.body;
    console.log(name, email);
    const author = await pool.query('INSERT INTO authors (name , email) VALUES ($1, $2) RETURNING *', [name, email])
    console.log(author.rows);
    res.status(200).send(author.rows)
  } catch (error) {
    console.log(error.message);
    res.status(422).send(error)
  }
}

