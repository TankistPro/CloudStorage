const { Sequelize, DataTypes } = require('sequelize');

const sequelize = require('../connect');

const userModel = sequelize.define('User', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    firstName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    lastName: {
        type: DataTypes.STRING,
        allowNull: true
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    avatarHash: {
        type: DataTypes.STRING,
        allowNull: true
    },
    baseWorkspacePath: {
        type: DataTypes.STRING,
        allowNull: false
    },
}, {
    timestamps: true,
    createdAt: false,
    updatedAt: true
})

module.exports = userModel;
