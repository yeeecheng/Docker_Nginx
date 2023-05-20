module.exports = (sequelize, DataTypes) => {
    const Block = sequelize.define("block", {
        name: {
            type: DataTypes.STRING(40),
            allowNull: false
        },
        vegetable:{
            type: DataTypes.STRING(40),
            // allowNull: false
        }
    })

    return Block
}