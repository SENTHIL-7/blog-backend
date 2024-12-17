import { where } from 'sequelize';
import db from '../models/index.js'
import models from '../models/index.js';
const {article} = db.db;

const findAll = async () => {
  return await article.findAll();
}

const findOne = async (blogId) => {
  return await article.findOne({
    where :{
      id: blogId,
    },
    include: [{
      model: db.db.author, // Make sure to import your Author model
      as: 'author',
      attributes: [] 
    }],
    attributes: {
      include: [
        [db.db.sequelize.col('author.name'), 'authorName']
      ]
    },
    raw: true,
    nest: true
  });
}

const create = async (data) => {
  return await article.create(data);
}

const update = async (data , id) =>{
  return await article.update(data,{
    where :{
      id : id,
      author_id : data.author_id
    }
  });}
export {
  findAll,
  findOne,
  create,
  update
}