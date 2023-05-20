
const db = require('../models')
const config = require('../config/config')

const HealthData = db.healthDatas
const Note = db.notes
const Farm = db.farms
const SmallBlock = db.smallBlocks
var sendEmail = require('./sendEmail');
// main work

// 1. create healthData

const addHealthData = async (req, res) => {
    let info = {
        value: req.body.value,
        smallBlockId: req.body.smallBlockId,
        sensorId: req.body.sensorId,
        createdAt: req.body.createdAt
    }
    try{
        const healthData = await HealthData.create(info)
        let smallBlock = await SmallBlock.findByPk(info.smallBlockId, { 
            attributes:['id'],
            include: [
        { 
            model: db.healthDatas,
            as: "healthDatas",
            order: [[ 'createdAt', 'DESC' ]],
            attributes:['value'],
            limit:1
        }, 
        {
            model: db.humidityDatas,
            as: "humidityDatas",
            order: [[ 'createdAt', 'DESC' ]],
            attributes:['value'],
            limit:1
        }, 
        {
            model: db.temperatureDatas,
            as: "temperatureDatas",
            order: [[ 'createdAt', 'DESC' ]],
            attributes:['value'],
            limit:1
        },
        {
            model: db.blocks,
            as: "block",
            attributes:['id'],
            include: {
                model: db.farms,
                as: "farm",
                attributes:['id', 'warmingValue'],
            }
        }]})
        if(healthData.value>=smallBlock.block.farm.warmingValue || healthData.value == -1){
            res.status(200).send(healthData)
        }else{
            // save a note
            let info = {
                title: "你的農場健康度低於標準",
                comment: `你的農場現在出現嚴重枯黃問題，健康度為${smallBlock.healthDatas[0].value}% ，溫度為${smallBlock.temperatureDatas[0].value}°C，濕度為${smallBlock.humidityDatas[0].value}%RH`,
                icon: 1,
                smallBlockId: healthData.smallBlockId,
                farmId: smallBlock.block.farm.id,
                sensorId: healthData.sensorId,
            }
            var note = await Note.create(info)
            let noteInfo = await Note.findByPk(note.id, { 
                    include: {
                    model: db.smallBlocks,
                    as: "smallBlock",
                    attributes: ['id', 'name'],
                    include: {
                        model: db.blocks,
                        as: "block",
                        attributes: ['id', 'name', 'farmId'],
                    }
                },
            })
            var farm = await Farm.findByPk(note.farmId, {
                attributes: ['id', 'name'],
                include: [{
                    model: db.users,
                    as: "users",
                    attributes: ['id', 'LINE_ID', 'account']
                }]})
            var item = {
                'farm': farm,
                'note': noteInfo
            }
            res.status(200).send(item)
            var request = require('request');
            request.post({ 
                headers: {'content-type' : 'application/json'},
                url: config.line_url+"warning_note", 
                body: JSON.stringify(item)}, function(error, response, body){
                console.log(body); 
            })
            // send email
            farm.users.forEach(user=>{
                if(user.account.includes('@')){
                    let email={
                        message: note.comment,
                        subject: 'Smart Farm - 你的農場健康度低於標準'
                    }
                    sendEmail(user, email)
                }
            })
        }
    }catch(err){
        console.log(err)
        res.status(400).send()
    }
}

// 2. get all healthDatas

const getAllHealthDatas = async (req, res) => {
    try{
        let healthDatas = await HealthData.findAll({})
        res.status(200).send(healthDatas)
    }catch(err){
        res.status(400).send()
    }
}

// 3. get single healthData by id

const getOneHealthData = async (req, res) => {
    try{
        let id = req.params.id
        let healthData = await HealthData.findByPk(id, { include: ["smallBlock"] })
        res.status(200).send(healthData)
    }catch(err){
        res.status(400).send()
    }
}

// 4. update healthData by id

const updateHealthData = async (req, res) => {
    try{
        let id = req.params.id
        let healthData = await HealthData.update(req.body, {where: { id: id }})
        res.status(200).send(healthData)
    }catch(err){
        res.status(400).send()
    }
}

// 5. delete healthData by id

const deleteHealthData = async (req, res) => {
    try{
        let id = req.params.id
        await HealthData.destroy({where: { id: id }})
        res.status(200).send('HealthData is deleted!')
    }catch(err){
        res.status(400).send()
    }
}

module.exports = {
    addHealthData,
    getAllHealthDatas,
    getOneHealthData,
    updateHealthData,
    deleteHealthData
}