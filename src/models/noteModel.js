module.exports = (sequelize, DataTypes) => {
    const Note = sequelize.define("note", {
        title: {
            type: DataTypes.STRING(40),
            allowNull: false
        },
        comment:{
            type: DataTypes.STRING,
            allowNull: false
        },
        icon:{
            type: DataTypes.INTEGER,
            allowNull: false
        }
    })

    return Note
}