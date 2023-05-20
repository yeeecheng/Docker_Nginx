module.exports = (sequelize, DataTypes) => {
    const HealthData = sequelize.define("healthData", {
        value: {
            type: DataTypes.DECIMAL(4,1),
            allowNull: false
        }
    })

    return HealthData
}