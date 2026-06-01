const {Tag} = require("../db/models")
const validarById = require("./validarById.middleware")

/*const validateTag = (req, res, next) =>{
    const id  = req.params.id
    if(!id){
        return res.status(400).json({message: "Debe haber un id"})
    }
    next()
}

const existTag = async (req, res, next) => {
    const tag = await Tag.findByPk(req.params.id)
    if(!tag){
        return res.status(404).json({message: "Tag no encontrado"})
    }
    next()
}
*/
const validarTagById = validarById(Tag)

module.exports = {validarTagById}
