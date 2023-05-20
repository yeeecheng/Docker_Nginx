const db = require('../models')

const SmallBlock = db.smallBlocks

// main work

// 1. create smallBlock

const addSmallBlock = async (req, res) => {
    let info = {
        name: req.body.name,
        blockId: req.body.blockId,
    }
    try{
        const smallBlock = await SmallBlock.create(info)
        res.status(200).send(smallBlock)
        //console.log(smallBlock)
    }catch(err){
        res.status(400).send()
    }
}

// 2. get all smallBlocks

const getAllSmallBlocks = async (req, res) => {
    try{
        let smallBlocks = await SmallBlock.findAll({})
        res.status(200).send(smallBlocks)
    }catch(err){
        res.status(400).send()
    }
}

// 3. get single smallBlock by id

const getOneSmallBlock = async (req, res) => {
    try{
        let id = req.params.id
        let smallBlock = await SmallBlock.findByPk(id, { include: [
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
        res.status(200).send(smallBlock)
    }catch(err){
        res.status(400).send()
    }
}

// 3. get single smallBlock by id

const getOneSmallBlockNewest = async (req, res) => {
    try{
        let id = req.params.id
        let smallBlock = await SmallBlock.findByPk(id, { 
            include: [
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
            }] 
        })

        smallBlock.healthDatas.sort((a,b) =>{
            return new Date(a.createdAt) - new Date(b.createdAt)
        })
        smallBlock.humidityDatas.sort((a,b) =>{
            return new Date(a.createdAt) - new Date(b.createdAt)
        })
        smallBlock.temperatureDatas.sort((a,b) =>{
            return new Date(a.createdAt) - new Date(b.createdAt)
        })
        res.status(200).send(smallBlock)
    }catch(err){
        res.status(400).send()
    }
}

const getOneSmallBlockNewestByLine = async (req, res) => {
    try{
        let id = req.params.id
        let smallBlock = await SmallBlock.findByPk(id, { 
            attributes:['id','name'],
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
                attributes:['id','name'],
                include:[
                    { 
                        model: db.farms,
                        as: "farm",
                        attributes:['id','name']
                    }
                ]
            }] 
        })
        res.status(200).send(smallBlock)
    }catch(err){
        res.status(400).send()
    }
}

// 4. update smallBlock by id

const updateSmallBlock = async (req, res) => {
    try{
        let id = req.params.id
        let smallBlock = await SmallBlock.update(req.body, {where: { id: id }})
        res.status(200).send(smallBlock)
    }catch(err){
        res.status(400).send()
    }
}

// 5. delete smallBlock by id

const deleteSmallBlock = async (req, res) => {
    try{
        let id = req.params.id
        await SmallBlock.destroy({where: { id: id }})
        res.status(200).send('SmallBlock is deleted!')
    }catch(err){
        res.status(400).send()
    }
}

module.exports = {
    addSmallBlock,
    getAllSmallBlocks,
    getOneSmallBlock,
    getOneSmallBlockNewest,
    updateSmallBlock,
    deleteSmallBlock,
    getOneSmallBlockNewestByLine
}