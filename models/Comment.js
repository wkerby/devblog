const sequelize = require("../config/connection");
const {Model,DataTypes} = require("sequelize");

class Comment extends Model {} 

Comment.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull:false,
            primaryKey:true,
            autoIncrement:true,
        },
        post_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'post',
                key: 'id',
            },
        },
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'user',
                key: 'id',
            },
        },
        date: {
            type: DataTypes.DATE,
        },
        content: {
            type: DataTypes.STRING,
        },
    },
    {
        sequelize, 
        freezeTableName:true,
        timestamps: false,
        underscored: true,
        modelName: "comment"
    }

);

module.exports = Comment;