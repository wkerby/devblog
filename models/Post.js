const sequelize = require("../config/connection");
const {Model,DataTypes} = require("sequelize");

class Post extends Model {} 

Post.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull:false,
            primaryKey:true,
            autoIncrement:true,
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
        modelName: "post"
    }

)