module.exports = (sequelize, DataTypes) => sequelize.define(
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