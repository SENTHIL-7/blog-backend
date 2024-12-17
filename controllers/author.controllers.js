import { create , findAll } from "../services/author.service.js";
export const getAuthors = async (req, res) => {
  try {
    const authors = await findAll() 
    res.status(200).send(authors)
  } catch (error) {
    console.log(error.message);
    res.status(422).send(error)
  }
}
export const createAuthor = async (req, res) => {
  console.log('createAuthor',req.body)
  try {
    const author = await create(req.body);
    res.status(200).send(author)
  } catch (error) {
    console.log(error.message);
    res.status(422).send(error)
  }
}

