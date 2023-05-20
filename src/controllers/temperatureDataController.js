const db = require('../models')

const TemperatureData = db.temperatureDatas

// main work

// 1. create temperatureData

const addTemperatureData = async (req, res) => {
    let info = {
        value: req.body.value,
        smallBlockId: req.body.smallBlockId,
        sensorId: req.body.sensorId,
        createdAt: req.body.createdAt
    }
    try{
        const temperatureData = await TemperatureData.create(info)
        res.status(200).send(temperatureData)
        //console.log(temperatureData)
    }catch(err){
        res.status(400).send()
    }
}

// 2. get all temperatureDatas

const getAllTemperatureDatas = async (req, res) => {
    try{
        let temperatureDatas = await TemperatureData.findAll({})
        res.status(200).send(temperatureDatas)
    }catch(err){
        res.status(400).send()
    }
}

// 3. get single temperatureData by id

const getOneTemperatureData = async (req, res) => {
    try{
        let id = req.params.id
        let temperatureData = await TemperatureData.findByPk(id, { include: ["smallBlock"] })
        res.status(200).send(temperatureData)
    }catch(err){
        res.status(400).send()
    }
}

// 4. update temperatureData by id

const updateTemperatureData = async (req, res) => {
    try{
        let id = req.params.id
        let temperatureData = await TemperatureData.update(req.body, {where: { id: id }})
        res.status(200).send(temperatureData)
    }catch(err){
        res.status(400).send()
    }
}

// 5. delete temperatureData by id

const deleteTemperatureData = async (req, res) => {
    try{
        let id = req.params.id
        await TemperatureData.destroy({where: { id: id }})
        res.status(200).send('TemperatureData is deleted!')
    }catch(err){
        res.status(400).send()
    }
}

module.exports = {
    addTemperatureData,
    getAllTemperatureDatas,
    getOneTemperatureData,
    updateTemperatureData,
    deleteTemperatureData
}