module.exports = (sequelize, DataTypes) => {
    const reviews = sequelize.define(
        'reviews',
        {
            review_id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
            },
            title: {
                type: DataTypes.STRING(20),
                allowNull: false
            },
            content: {
                type: DataTypes.STRING,
                allowNull: false
            },
            star: {
                type: DataTypes.INTEGER,
                max: 5
            },
            book_id: {
                type: DataTypes.INTEGER,
                references: {
                    model: 'books',
                    key: 'id'
                }
            },
            user_id: {
                type: DataTypes.INTEGER,
                references: {
                    model: 'users',
                    key: 'id'
                }
            },
            img_url: {
                type: DataTypes.STRING
            },
            created_at: DataTypes.DATE,
            updated_at: DataTypes.DATE,
        },
        {
            tableName: 'booksReview'
        })

    reviews.associate = function (models) {
        reviews.belongsTo(models.books, { foreignKey: 'id', sourceKey: 'book_id' })
        reviews.belongsTo(models.users, { foreignKey: 'id', sourceKey: 'user_id' })
    };
    return reviews;
}