const Promise = require('bluebird')
const bcrypt = Promise.promisifyAll(require('bcrypt-nodejs'))

function hashPassword(user){
    const SALT_FACTOR = 10; 

    if(!user.changed('password')){
        return;
    }

    return bcrypt
        .genSaltAsync(SALT_FACTOR)
        .then(salt => bcrypt.hashAsync(user.password, salt, null))
        .then(hash => {
            user.setDataValue('password', hash)
        })
}

module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define("user", {
        name:{
            type: DataTypes.STRING(40),
            allowNull: false
        },
        account: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        LINE_ID: {
            type: DataTypes.CHAR(33),
        },
        permission:{
            type: DataTypes.STRING(10)
        },
        refreshToken:{
            type: DataTypes.STRING
        },
        lineSmallBlockId:{
            type: DataTypes.INTEGER,
            defaultValue: 1
        }
    }, 
    {
        hooks:{
            beforeSave: hashPassword
        }
    })

    User.prototype.comparePassword = function (password) {
        return bcrypt.compareAsync(password, this.password)
    }

    return User
}