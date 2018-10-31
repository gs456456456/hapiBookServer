module.exports = (sequelize, DataTypes) => sequelize.define(
    'authors',
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
        country: {
            type: DataTypes.STRING(20),
        },
        created_at: DataTypes.DATE,
        updated_at: DataTypes.DATE,
    },

    {
        tableName: 'authors',
    },
)