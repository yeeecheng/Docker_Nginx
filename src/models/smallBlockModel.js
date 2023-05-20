module.exports = (sequelize, DataTypes) => {
    const SmallBlock = sequelize.define("smallBlock", {
        name: {
            type: DataTypes.STRING(40),
            allowNull: false
        }
    })

    return SmallBlock
}