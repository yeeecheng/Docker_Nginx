module.exports = (sequelize, DataTypes) => {
    const Farm = sequelize.define("farm", {
        name: {
            type: DataTypes.STRING(40),
            allowNull: false
        },
        key:{
            type: DataTypes.STRING(100),
            // allowNull: false
        },
        warmingValue:{
            type: DataTypes.INTEGER,
            defaultValue: 90
        }
    })

    return Farm
}