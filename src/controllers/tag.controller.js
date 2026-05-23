const {Tag} = require("../db/models")

const createTag = async (req, res)=>{
    const data = req.body
    const tag = await Tag.create(data)
    res.status(201).json({message: "Tag creado exitosamente"})
}

const findByPk = async (req, res) =>{
    const id = req.params.id
    const tag = await Tag.findByPk(id)
    res.status(200).json(tag)
}

const findAll = async(req, res) =>{
    const data = await Tag.findAll()
    res.status(200).json(data)
}

const editTag = async(req, res) =>{
    const id = req.params.id
    const data = req.body
    const tag = await Tag.update(data, {
        where: {id : id}
    })
    res.status(200).json({message: "Tag editado"})
}

const deleteTag = async(req, res) =>{
    const id = req.params.id
    const tag = await Tag.destroy({
        where: {id:id}
    })
    res.status(200).json({message:"Tag eliminado"})
}

module.exports = {createTag, findByPk, findAll, editTag, deleteTag}