module.exports = (sequelize, DataTypes) => {
    const authors = sequelize.define(
    'authors',
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING(20),
            allowNull: false
        },
        country: {
            type: DataTypes.STRING(20),
        },
        description:{
            type: DataTypes.STRING,
        },
        created_at: DataTypes.DATE,
        updated_at: DataTypes.DATE,
    },

    {
        tableName: 'authors',
    },
)
    authors.associate = function(models) {
        authors.hasMany(models.books,{foreignKey: 'author_id', sourceKey: 'id'});
    };
        return authors;
}