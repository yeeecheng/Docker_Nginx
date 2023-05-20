module.exports = (sequelize, DataTypes) => {
    const TemperatureData = sequelize.define("temperatureData", {
        value: {
            type: DataTypes.DECIMAL(4,1),
            allowNull: false
        }
    })

    return TemperatureData
}