const sequelize = require("../config/connection");
const {Model,DataTypes} = require("sequelize");
const bcrypt = require("bcrypt");

class User extends Model {
    verifyPassword(inputPass) {
        return bcrypt.compareSync(inputPass,this.password); //to what is this.password referring?
    }
    getUserName() {
        return this.username; //retrieves the username for the current record
    }
    getUserId() {
        return this.id;
    }
} 

User.init(
    {
        id: {
            type:DataTypes.INTEGER,
            allowNull:false,
            primaryKey:true,
            autoIncrement:true,
        },
        username: {
            type:DataTypes.STRING,
            allowNull:false,
        },
        password: {
            type: DataTypes.STRING,
            allowNull:false,
            validate: {
                len : [8],
            },
        },
    },
    {
        hooks: {
            async beforeCreate(newUser) {
                newUser.password = await bcrypt.hash(newUser.password, 10);
                return newUser;
            },
        },
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: "user",
        
    }
);

module.exports = User;