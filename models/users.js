module.exports = (sequelize, DataTypes) => sequelize.define(
    'users',
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
        type: {
            type: DataTypes.STRING(10),
            defaultValue: 'user'
        },
        isAdmin: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        email: {
            type: DataTypes.STRING(30),
        },
        // follower_id: {
        //     type: DataTypes.INTEGER,
        //     references: {
        //         model: 'users',
        //         key: 'id'
        //     }
        // },
        introduction: {
            type: DataTypes.STRING(50),
        },
        login_time: DataTypes.DATE,
        last_login_time: DataTypes.DATE,
        login_count: DataTypes.INTEGER,
        created_at: DataTypes.DATE,
        updated_at: DataTypes.DATE,
    },

    {
        tableName: 'users',
    },
)