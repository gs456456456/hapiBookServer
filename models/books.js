module.exports = (sequelize, DataTypes) => {
    const books = sequelize.define(
    'books',
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING(20),
            allowNull: false
        },
        isbn: {
            type: DataTypes.STRING,
            allowNull: false
        },
        score: {
            type: DataTypes.FLOAT,
            // allowNull: false
        },
        price:{ 
            type: DataTypes.FLOAT,
            allowNull: false
        },
        pagecount:{
            type: DataTypes.INTEGER
        },
        binding:{
            type: DataTypes.STRING 
        },
        description:{
            type: DataTypes.STRING
        },
        author_id:{
            type: DataTypes.INTEGER,
            references: {
                model: 'authors',
                key: 'id'
            }
        },
        publishingFirm:{
            type: DataTypes.STRING
        },
        img_url:{
            type: DataTypes.STRING
        },
        book_created_date:{
            type:DataTypes.DATE
        }
    },

    {
        tableName: 'books'
    })

    books.associate = function(models) {
        books.belongsTo(models.authors,{foreignKey: 'author_id', sourceKey: 'id'});
        books.hasMany(models.reviews, { foreignKey: 'book_id', sourceKey: 'id' });
  };
  return books;
}