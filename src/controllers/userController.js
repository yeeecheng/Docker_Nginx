const db = require('../models')
const User = db.users

const ONE_DAY = 60 * 60 * 24
// const ONE_WEEK = 60 * 60 * 24 * 7


// jwt
const jwt = require('jsonwebtoken')
const config = require('../config/config')

function jwtSignUser(user){
    return jwt.sign(user, config.authentication.ACCESS_TOKEN_SECRET, {
        expiresIn: ONE_DAY
    })
}

// main work

// log out
const logout = async (req, res) => {
    try{
        res.sendStatus(204)
    }catch(err){
        res.status(400).send()
    }
}

// refresh token
const refreshToken = async (req, res) => {
    try{
        const refreshToken = req.body.token
        const id = req.body.userId
        let user = await User.findOne({
            where:{id: id},
            attributes: ['id','refreshToken']
        })
        if(refreshToken == null) return res.sendStatus(401)
        if(user.refreshToken != refreshToken) return res.sendStatus(403)
        jwt.verify(refreshToken, config.authentication.REFRESH_TOKEN_SECRET, async (err, user) => {
            if(err) return res.sendStatus(403)
            const userJson = {
                id: user.id,
                name: user.name
            }
            const accessToken = jwtSignUser(userJson)
            const newRefreshToken = jwt.sign(userJson, config.authentication.REFRESH_TOKEN_SECRET, {
                expiresIn: ONE_DAY*2
            })
            user["refreshToken"]=newRefreshToken
            let new_user = await User.update(user, {where: { id: id }})
            console.log(new_user)
            res.status(200).json({
                accessToken: accessToken,
                refreshToken: newRefreshToken
            })
        })
    }catch(err){
        res.status(400).send()
    }
}
 
// login

const login = async (req, res) => {
    try{
        const {account, password} = req.body
        let user = await User.findOne({where:{account: account}})
        if(!user){
            return res.status(403).send({
                error: 'The account does not exist'
            })
        }
        const isPasswordVaild = await user.comparePassword(password)
        
        if(!isPasswordVaild){
            return res.status(403).send({
                error: 'The login password was incorrect'
            })
        }

        const userJson = {
            id: user.id,
            farmId: user.farmId
        }
        const refreshToken = jwt.sign(userJson, config.authentication.REFRESH_TOKEN_SECRET,{
            expiresIn: ONE_DAY*2
        })

        user = {
            refreshToken: refreshToken
        }

        await User.update(user, {where: { id: userJson.id }})
        res.status(200).send({
            user: userJson,
            accessToken: jwtSignUser(userJson),
            refreshToken: refreshToken
        })
    }catch(err){
        res.status(500).send({
            error: 'An error has occured trying to log in'
        })
    }
}

// 1. create user

const addUser = async (req, res) => {
    let info = {
        name: req.body.name,
        account: req.body.account,
        password: req.body.password,
        LINE_ID: req.body.LINE_ID,
        permission: req.body.permission,
        farmId: req.body.farmId,
        lineSmallBlockId: req.body.lineSmallBlockId
    }
    try{
        const user = await User.create(info)
        res.status(200).send({user,success:'Register successfully'})
    }catch(err){
        res.status(400).send({
            error: 'This is in use.'
        })
    }
}

// 2. get all user

const getAllUsers = async (req, res) => {
    try{
        let users = await User.findAll({})
        res.status(200).send(users)
    } catch(err){
        res.status(400).send()
    }
}

// 3. get single user by id

const getOneUser = async (req, res) => {
    try{
        let id = req.params.id
        let user = await User.findByPk(id,{
            include: {
                model: db.farms,
                as: "farm",
                include: {
                    model: db.users,
                    as: "users",
                    attributes: ['id', 'name', 'permission']
                }
            },
        })
        res.status(200).send(user)
    }catch(err){
        res.status(400).send()
    }
}

// 3. get single user by line id

const getOneUserByLineId = async (req, res) => {
    try{
        let id = req.params.lineId
        let user = await User.findOne({
            where: {
                LINE_ID: id
            }
        })
        console.log(user)
        const userJson = {
            id: user.id,
            farmId: user.farmId,
        }
        userJson.lineSmallBlockId = user.lineSmallBlockId
        const accessToken = jwtSignUser(userJson)
        userJson.accessToken = accessToken
        // console.log(userJson)
        res.status(200).send(userJson)
    }catch(err){
        res.status(400).send()
    }
}

// 4. update user by id

const updateUser = async (req, res) => {
    try{
        let id = req.params.id
        let user = await User.update(req.body, {where: { id: id }})
        // console.log(user)
        res.status(200).send(user)
    }catch(err){
        res.status(400).send()
    }
}

// 5. delete user by id

const deleteUser = async (req, res) => {
    try{
        let id = req.params.id
        await User.destroy({where: { id: id }})
        res.status(200).send('User is deleted!')
    }catch(err){
        res.status(400).send()
    }
}

module.exports = {
    login,
    refreshToken,
    logout,
    addUser,
    getAllUsers,
    getOneUser,
    updateUser,
    deleteUser,
    getOneUserByLineId
}