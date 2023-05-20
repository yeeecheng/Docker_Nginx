const dbConfig = require('../config/config')

const {Sequelize, DataTypes} = require('sequelize')

const sequelize = new Sequelize(
    dbConfig.db.DB,
    dbConfig.db.USER,
    dbConfig.db.PASSWORD,
    {
        host: dbConfig.db.HOST,
        dialect: dbConfig.db.dialect,
        port: dbConfig.db.PORT,
        dialectOptions: {
            dateStrings: true,
            typeCast: true,
            timezone: "+08:00"
        },
        timezone: "+08:00",
        operatorAliases: false,
        pool: {
            max: dbConfig.db.pool.max,
            min: dbConfig.db.pool.min,
            acquire: dbConfig.db.pool.acquire,
            idle: dbConfig.db.pool.idle
        }
    }
)

sequelize.authenticate()
.then(() => {
    console.log('connected')
})
.catch(err => {
    console.log('Error' + err)
})

const db = {}

db.Sequelize = Sequelize
db.sequelize = sequelize


db.users = require('./userModel.js')(sequelize, DataTypes)
db.farms = require('./farmModel.js')(sequelize, DataTypes)
db.blocks = require('./blockModel.js')(sequelize, DataTypes)
db.smallBlocks = require('./smallBlockModel.js')(sequelize, DataTypes)
db.notes = require('./noteModel.js')(sequelize, DataTypes)
db.temperatureDatas = require('./temperatureDataModel.js')(sequelize, DataTypes)
db.humidityDatas = require('./humidityDataModel.js')(sequelize, DataTypes)
db.healthDatas = require('./healthDataModel.js')(sequelize, DataTypes)
db.sensors = require('./sensorModel.js')(sequelize, DataTypes)

db.farms.hasMany(db.users,{
    as: "users"
})
db.users.belongsTo(db.farms,{
    foreignKey: "farmId",
    as: "farm",
})

db.farms.hasMany(db.blocks,{
    as: "blocks"
})
db.blocks.belongsTo(db.farms,{
    foreignKey: "farmId",
    as: "farm",
})

db.farms.hasMany(db.notes,{
    as: "notes"
})
db.notes.belongsTo(db.farms,{
    foreignKey: "farmId",
    as: "farm",
})

db.sensors.hasMany(db.notes,{
    as: "notes"
})
db.notes.belongsTo(db.sensors,{
    foreignKey: "sensorId",
    as: "sensor",
})

db.blocks.hasMany(db.smallBlocks,{
    as: "smallBlocks"
})
db.smallBlocks.belongsTo(db.blocks,{
    foreignKey: "blockId",
    as: "block",
})
// small blocks
db.smallBlocks.hasMany(db.notes,{
    as: "notes"
})
db.notes.belongsTo(db.smallBlocks,{
    foreignKey: "smallBlockId",
    as: "smallBlock",
})

db.smallBlocks.hasMany(db.healthDatas,{
    as: "healthDatas"
})
db.healthDatas.belongsTo(db.smallBlocks,{
    foreignKey: "smallBlockId",
    as: "smallBlock",
})

db.smallBlocks.hasMany(db.humidityDatas,{
    as: "humidityDatas"
})
db.humidityDatas.belongsTo(db.smallBlocks,{
    foreignKey: "smallBlockId",
    as: "smallBlock",
})

db.smallBlocks.hasMany(db.temperatureDatas,{
    as: "temperatureDatas"
})
db.temperatureDatas.belongsTo(db.smallBlocks,{
    foreignKey: "smallBlockId",
    as: "smallBlock",
})

// sensors
db.sensors.hasMany(db.healthDatas,{
    as: "healthDatas"
})
db.healthDatas.belongsTo(db.sensors,{
    foreignKey: "sensorId",
    as: "sensor",
})

db.sensors.hasMany(db.humidityDatas,{
    as: "humidityDatas"
})
db.humidityDatas.belongsTo(db.sensors,{
    foreignKey: "sensorId",
    as: "sensor",
})

db.sensors.hasMany(db.temperatureDatas,{
    as: "temperatureDatas"
})
db.temperatureDatas.belongsTo(db.sensors,{
    foreignKey: "sensorId",
    as: "sensor",
})


// db.sequelize.sync({force:false, alter: true })
db.sequelize.sync({force:false})
.then(() => {
    console.log('yes re-sync done!')
})


module.exports = db