import db from '../models/index.js'
const {author} = db.db;

const create = async data => {
  return await author.create(data);
}

const findAll = async () => {
  return await author.findAll()
}

const findOne = async (data) => {
  return await author.findOne(data)
}
export {
  create,
  findAll,
  findOne
}