export default (sequelize, DataTypes)=>{
  const article = sequelize.define('article', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    title: DataTypes.TEXT,
    content: DataTypes.TEXT,
    author_id: DataTypes.INTEGER,
    date : DataTypes.DATE,
    image_url : DataTypes.TEXT,
    excerpt : DataTypes.TEXT,
    tags: DataTypes.STRING(255)
  },{
    tableName : 'articles',
    schema : 'article'
  });

  article.associate = function(models) {
    this.belongsTo(models.author, {
      foreignKey: 'author_id',
      as: 'author'
    });
  }
  return article
}