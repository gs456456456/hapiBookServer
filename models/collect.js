module.exports = (sequelize, DataTypes) => {
    const collect = sequelize.define(
        'collect',
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
            },
            bookId: {
                type: DataTypes.INTEGER,
                references: {
                    model: 'books',
                    key: 'id'
                }
            },
            userId: {
                type: DataTypes.INTEGER,
                references: {
                    model: 'users',
                    key: 'id'
                }
            },
            created_at: DataTypes.DATE,
            updated_at: DataTypes.DATE,
        },
        {
            tableName: 'usersBooksCollect'
        })

    collect.associate = function (models) {
        collect.belongsTo(models.books, { foreignKey: 'bookId', sourceKey: 'id' })
        collect.belongsTo(models.users, { foreignKey: 'userId', sourceKey: 'id' })
    };
    return collect;
}