module.exports = (sequelize, DataTypes) => {
    const Sensor = sequelize.define("sensor", {
        type: {
            type: DataTypes.STRING,
            allowNull: false
        }
    })
    return Sensor
}