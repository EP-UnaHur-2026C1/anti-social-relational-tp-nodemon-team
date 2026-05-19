const {User} = require("../db/models")


const findAll = async(req,res)=>{
    const data = await User.findAll()
    res.status(200).json(data)
}
const findByPk = async(req,res)=>{
    const id = req.params.id
    const data = await User.findByPk(id)
    res.status(200).json(data)
}

const findbyNickname = async(req,res)=>{
    const nickname = req.params.nickname
    const data = await User.findOne({
        where : {NickName:nickname}
    })
    res.status(200).json(data)
}
const createUser = async(req,res)=>{
    const data = req.body
    const user = await User.create(data)
    res.status(201).json(user)

}
const deleteUser = async (req, res) => {
    const nickname = req.params.nickname
    const user = await User.destroy({
        where: { NickName: nickname }
    })
    if(!user){
        return res.status(404).json({message:"Usuario no encontrado"})
    }
    res.status(200).json({message:"Usuario eliminado"})
}


module.exports = {findAll,findbyNickname,findByPk,createUser,deleteUser}