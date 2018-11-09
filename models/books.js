module.exports = (sequelize, DataTypes) => sequelize.define(
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
            type: DataTypes.INTEGER,
            // allowNull: false
        },
        price:{ 
            type: DataTypes.INTEGER,
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
        tableName: 'books',
    },
)