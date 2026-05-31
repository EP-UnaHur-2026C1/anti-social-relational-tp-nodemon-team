const validarById = require("./validarById.middleware")
const {Post} = require("../db/models")
const schemaValidator = require("../schemas/schemaValidator")
const postSchema = require("../schemas/post.schema.js")

const validarPostById = validarById(Post)

const validarSchemaPost = (req,res,next)=>{
    const {error} = schemaValidator(postSchema,req.body)
    if(error){
        res.status(400).json({errores: error.details.map((e)=>{
            return {
                atributo: e.path[0],
                detalle: e.message
            }
        })})
        return
    }
    next()
}

module.exports = {validarPostById,validarSchemaPost}