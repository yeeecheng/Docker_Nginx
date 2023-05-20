const db = require('../models')

const HumidityData = db.humidityDatas

// main work

// 1. create humidityData

const addHumidityData = async (req, res) => {
    let info = {
        value: req.body.value,
        smallBlockId: req.body.smallBlockId,
        sensorId: req.body.sensorId,
        createdAt: req.body.createdAt
    }
    try{
        const humidityData = await HumidityData.create(info)
        res.status(200).send(humidityData)
        //console.log(humidityData)
    }catch(err){
        res.status(400).send()
    }
}

// 2. get all humidityDatas

const getAllHumidityDatas = async (req, res) => {
    try{
        let humidityDatas = await HumidityData.findAll({})
        res.status(200).send(humidityDatas)
    }catch(err){
        res.status(400).send()
    }
}

// 3. get single humidityData by id

const getOneHumidityData = async (req, res) => {
    try{
        let id = req.params.id
        let humidityData = await HumidityData.findByPk(id, { include: ["smallBlock"] })
        res.status(200).send(humidityData)
    }catch(err){
        res.status(400).send()
    }
}

// 4. update humidityData by id

const updateHumidityData = async (req, res) => {
    try{
        let id = req.params.id
        let humidityData = await HumidityData.update(req.body, {where: { id: id }})
        res.status(200).send(humidityData)
    }catch(err){
        res.status(400).send()
    }
}

// 5. delete humidityData by id

const deleteHumidityData = async (req, res) => {
    try{
        let id = req.params.id
        await HumidityData.destroy({where: { id: id }})
        res.status(200).send('HumidityData is deleted!')
    }catch(err){
        res.status(400).send()
    }
}

module.exports = {
    addHumidityData,
    getAllHumidityDatas,
    getOneHumidityData,
    updateHumidityData,
    deleteHumidityData
}