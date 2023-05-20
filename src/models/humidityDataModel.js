module.exports = (sequelize, DataTypes) => {
    const HumidityData = sequelize.define("humidityData", {
        value: {
            type: DataTypes.DECIMAL(4,1),
            allowNull: false
        }
    })

    return HumidityData
}