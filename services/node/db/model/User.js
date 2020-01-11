const connection = require('../connection')
const Sequelize = require('sequelize')

const User = connection.Sequelize.define('user', {
    
    name: {
        type: Sequelize.STRING(50),
        allowNull: true
    },
    email: {
        type: Sequelize.STRING(50),
        allowNull: false,
        unique: true
    },
    password: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    wallet: {
        type: Sequelize.STRING(100)
    }
}, {
    timestamps: true,
    freezeTableName: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    tableName: 'user'
})

module.exports = User