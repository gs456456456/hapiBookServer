module.exports = (sequelize, DataTypes) => sequelize.define(
    'books',
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
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
    },

    {
        tableName: 'books',
    },
)