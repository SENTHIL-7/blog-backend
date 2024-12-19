import db from '../models/index.js'
const {author} = db.db;

const create = async data => {
   let result = await author.create(data);
   delete result.dataValues.password;
   return result
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