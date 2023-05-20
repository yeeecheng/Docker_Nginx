const db = require('../models')
const sendEmail = require('./sendEmail');
const config = require('../config/config')

const Farm = db.farms
const Op =db.Sequelize.Op;
// main work

const sendEmailToFarmEveryday = async () =>{
    var d = new Date(new Date().toISOString().slice(0,10)+'T20:00:00')
    // d.setDate(d.getDate() - 1)
    const endDate  = d.toISOString().slice(0,10)+' 20:00:00'
    d.setDate(d.getDate() - 1)
    const startDate = d.toISOString().slice(0,10)+' 20:00:00'
    // console.log(startDate)
    // console.log(endDate)
    try{
        let farms = await Farm.findAll({
            attributes:['name', 'warmingValue'],
            include: [
            {
            model: db.blocks,
            as: "blocks",
            attributes:['name', 'vegetable'],
            include: [{
                model: db.smallBlocks,
                as: "smallBlocks",
                attributes:['name'],
                include: [
                { 
                    model: db.healthDatas,
                    as: "healthDatas",
                    attributes:['value', 'createdAt'],
                    where : { 
                        createdAt: { 
                            [Op.between]: [startDate, endDate],
                            [Op.not]: -1       
                        }
                    }
                }, 

                {
                    model: db.humidityDatas,
                    as: "humidityDatas",
                    attributes:['value', 'createdAt'],
                    where : { 
                        createdAt: { 
                            [Op.between]: [startDate, endDate],
                        }
                    }
                }, 
                {
                    model: db.temperatureDatas,
                    as: "temperatureDatas",
                    attributes:['value', 'createdAt'],
                    where : { 
                        createdAt: { 
                            [Op.between]: [startDate, endDate],
                        }
                    }
                }] 
            }],
        },
        {
            model: db.users,
            as: "users",
            attributes:['name', 'account', 'id', 'LINE_ID'],
        }]})
        farms.forEach(farm=>{
            let message=farm.name+'健康評估報告\n\n'
            farm.blocks.forEach(block=>{
                message = message + block.name+'，種植'+block.vegetable+'\n\n'
                block.smallBlocks.forEach(smallBlock=>{
                    message = message + smallBlock.name+'\n\n'
                    let item={}
                    let max=0
                    let min=100
                    smallBlock.healthDatas.forEach(data=>{
                        if(data.value>max) {
                            max = data.value
                            item.max = data.dataValues
                        }
                        if(data.value<min) {
                            min = data.value
                            item.min = data.dataValues
                        }
                    })
                    const arrAvg = arr => arr.reduce((a,b) => a + b, 0) / arr.length
                    let healthArray = smallBlock.healthDatas.map(data=>parseInt(data.value))
                    message = message + '最高健康度 '+max+'% 發生在'+item.max.createdAt+'\n'
                    message = message + '最低健康度 '+min+'% 發生在'+item.min.createdAt+'\n'
                    message = message + '平均健康度 '+Math.round(arrAvg(healthArray)*100)/100+'%\n\n'

                    // temperature
                    max=20
                    min=40
                    smallBlock.temperatureDatas.forEach(data=>{
                        if(data.value>max) {
                            max = data.value
                            item.max = data.dataValues
                        }
                        if(data.value<min) {
                            min = data.value
                            item.min = data.dataValues
                        }
                    })
                    let temperatureArray = smallBlock.temperatureDatas.map(data=>parseInt(data.value))
                    message = message + '最高溫度 '+max+'°C 發生在'+item.max.createdAt+'\n'
                    message = message + '最低溫度 '+min+'°C 發生在'+item.min.createdAt+'\n'
                    message = message + '平均溫度 '+Math.round(arrAvg(temperatureArray)*100)/100+'°C\n\n'

                    // humidity
                    max=0
                    min=100
                    smallBlock.humidityDatas.forEach(data=>{
                        if(data.value>max) {
                            max = data.value
                            item.max = data.dataValues
                        }
                        if(data.value<min) {
                            min = data.value
                            item.min = data.dataValues
                        }
                    })
                    let humidityArray = smallBlock.humidityDatas.map(data=>parseInt(data.value))
                    message = message + '最高濕度 '+max+'% 發生在'+item.max.createdAt+'\n'
                    message = message + '最低濕度 '+min+'% 發生在'+item.min.createdAt+'\n'
                    message = message + '平均濕度 '+Math.round(arrAvg(humidityArray)*100)/100+'%\n\n'
                })
                
            })
            message = message + 'Best Wishes\nSmart Farm'
            // console.log(message)
            farm.users.forEach(user=>{
                if(user.account.includes('@')){
                    // console.log(user)
                    let email={
                        message: message,
                        subject: 'Smart Farm - 農場日總結'
                    }
                    sendEmail(user, email)
                }
            })

            var request = require('request');
            let item={
                "message":message,
                "users":farm.users
            }
            // console.log(item)
            // res.status(200).send(item) 

            request.post({ 
                headers: {'content-type' : 'application/json'},
                url: config.line_url+"monthly_report", 
                body: JSON.stringify(item)}, function(error, response, body){
                console.log(body)
            })
        })
    }catch(err){
        console.log(err)
        // res.status(400).send()
    }
}

// 1. create farm

const addFarm = async (req, res) => {
    let info = {
        name: req.body.name,
        key: req.body.key, // auto generalize
        warmingValue: req.body.warmingValue
    }
    
    try{
        const farm = await Farm.create(info)
        res.status(200).send(farm)
        //console.log(farm)
    }catch(err){
        res.status(400).send()
    }
}

// 2. get all farms

const getAllFarms = async (req, res) => {
    try{
        let farms = await Farm.findAll({
            include: [{
                model: db.blocks,
                include: ["smallBlocks"],
                as: "blocks"
            }]
        })
        res.status(200).send(farms)
    }catch(err){
        res.status(400).send()
    }
}

// 3. get single farm by id

const getOneFarm = async (req, res) => {
    try{
        let id = req.params.id
        let farm = await Farm.findByPk(id, {include: [
        {
            model: db.blocks,
            as: "blocks",
            include: [{
                model: db.smallBlocks,
                as: "smallBlocks",
                include: [
                { 
                    model: db.healthDatas,
                    as: "healthDatas",
                    order: [[ 'createdAt', 'DESC' ]],
                    limit:1
                }, 
                {
                    model: db.humidityDatas,
                    as: "humidityDatas",
                    order: [[ 'createdAt', 'DESC' ]],
                    limit:1
                }, 
                {
                    model: db.temperatureDatas,
                    as: "temperatureDatas",
                    order: [[ 'createdAt', 'DESC' ]],
                    limit:1
                }] 
            }],
        },
        {
            model: db.users,
            as: "users"
        },
        {
            model: db.notes,
            as: "notes",
            order: [[ 'createdAt', 'DESC' ]],
            limit:10,
            include: [{
                model: db.smallBlocks,
                as: "smallBlock",
                include: [
                { 
                    model: db.blocks,
                    as: "block",
                }]
            }],
        }]})
        res.status(200).send(farm)
    }catch(err){
        res.status(400).send()
    }
}

// 4. update farm by id

const updateFarm = async (req, res) => {
    try{
        let id = req.params.id
        let farm = await Farm.update(req.body, {where: { id: id }})
        res.status(200).send(farm)
    }catch(err){
        res.status(400).send()
    }
}

// 5. delete farm by id

const deleteFarm = async (req, res) => {
    try{
        let id = req.params.id
        await Farm.destroy({where: { id: id }})
        res.status(200).send('Farm is deleted!')
    }catch(err){
        res.status(400).send()
    }
}

module.exports = {
    addFarm,
    getAllFarms,
    getOneFarm,
    updateFarm,
    deleteFarm,
    sendEmailToFarmEveryday
}