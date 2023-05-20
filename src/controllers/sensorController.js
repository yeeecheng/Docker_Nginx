const db = require('../models')

const Sensor = db.sensors

// main work


// 1. create sensor

const addSensor = async (req, res) => {
    let info = {
        type: req.body.type,
    }
    try{
        const sensor = await Sensor.create(info)
        res.status(200).send(sensor)
    }catch(err){
        res.status(400).send()
    }
}

// 2. get all sensors

const getAllSensors = async (req, res) => {
    try{
        let sensors = await Sensor.findAll({})
        res.status(200).send(sensors)
    }catch(err){
        res.status(400).send()
    }
}

// 3. get single sensor by id

const getOneSensor = async (req, res) => {
    try{
        let id = req.params.id
        let sensor = await Sensor.findByPk(id, { include: [
            { 
                model: db.healthDatas,
                as: "healthDatas",
                order: [[ 'createdAt', 'DESC' ]],
                limit:10
            }, 
            {
                model: db.humidityDatas,
                as: "humidityDatas",
                order: [[ 'createdAt', 'DESC' ]],
                limit:10
            }, 
            {
                model: db.temperatureDatas,
                as: "temperatureDatas",
                order: [[ 'createdAt', 'DESC' ]],
                limit:10
            }]})
        res.status(200).send(sensor)
    }catch(err){
        res.status(400).send()
    }
}

// 4. update sensor by id

const updateSensor = async (req, res) => {
    try{
        let id = req.params.id
        let sensor = await Sensor.update(req.body, {where: { id: id }})
        res.status(200).send(sensor)
    }catch(err){
        res.status(400).send()
    }
}

// 5. delete sensor by id

const deleteSensor = async (req, res) => {
    try{
        let id = req.params.id
        await Sensor.destroy({where: { id: id }})
        res.status(200).send('Sensor is deleted!')
    }catch(err){
        res.status(400).send()
    }
}

module.exports = {
    addSensor,
    getAllSensors,
    getOneSensor,
    updateSensor,
    deleteSensor
}