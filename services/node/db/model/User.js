// // const connection = require('../connection');
// const Sequelize = require('sequelize');

// const User = connection.Sequelize.define('user', {
    
//     name: {
//         type: Sequelize.STRING(50)
//     },
//     email: {
//         type: Sequelize.STRING(100),
//         allowNull: false,
//         unique: true
//     },
//     profilePic: {
//         type: Sequelize.STRING(100),
//         allowNull: true
//     },
//     password: {
//         type: Sequelize.TEXT,
//         allowNull: false
//     },
//     age_over: {
//         type: Sequelize.BOOLEAN,
//         allowNull: false
//     }
    
// }, {
//     timestamps: true,
//     freezeTableName: true,
//     createdAt: 'created_at',
//     updatedAt: 'updated_at',
//     tableName: 'user'
// });

// module.exports = User;