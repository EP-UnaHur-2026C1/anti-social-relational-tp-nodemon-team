const {Comment,Post,User} = require('../db/models')

const findAll = async (req, res) =>{
    const data = await Comment.findAll()
    res.status(200).json(data)
}

const findByPk = async (req, res) =>{
    const id = req.params.id
    const comment = await Comment.findByPk(id)
    res.status(200).json(comment)
}

const createComment = async (req, res) =>{
    const data = req.body
    const comment = await Comment.create(data)
    res.status(201).json(data)
}

const editComment = async (req, res) =>{
    const id = req.params.id
    const data = req.body
    const editedComment = await Comment.update(data, {
        where: {id: id}
    })
    res.status(200).json({message: "Comentario editado"})
}

const deleteComment = async (req, res) =>{
    const id = req.params.id
    const comment = Comment.destroy({
        where: {id: id}
    })
    if(!comment){
        return res.status(404).json({message: "Comentario no encontrado"})
    }
    res.status(200).json({message: "Comentario eliminado"})
}

module.exports = {findAll,findByPk, createComment, deleteComment, editComment}