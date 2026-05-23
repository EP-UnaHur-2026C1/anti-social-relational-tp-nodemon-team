const {Comment} = require("../db/models")

const validateComment = (req, res, next) =>{
    const id = req.params.id
    if (!id){
        return res.status(400).json({message: "Se requiere el id"})
    }
    next()
}

const existComment = async (req, res, next) => {
    const comment = await Comment.findByPk(req.params.id)
    if(!comment){
        return res.status(404).json({message: "Comentario no encontrado"})
    }
    next()
}

module.exports = {validateComment, existComment}