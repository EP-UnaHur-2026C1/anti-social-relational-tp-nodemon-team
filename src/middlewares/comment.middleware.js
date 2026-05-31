const {Comment} = require("../db/models")
const validarById = require("./validarById.middleware")

const validateComment = (req, res, next) =>{
    const id = req.params.id
    if (!id){
        return res.status(400).json({message: "Se requiere el id"})
    }
    next()
}

const validarCommentById = validarById(Comment)

module.exports = {validateComment, validarCommentById}