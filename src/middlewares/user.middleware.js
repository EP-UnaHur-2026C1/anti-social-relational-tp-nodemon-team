const userSchema = require("../schemas/user.schema")
const schemaValidator = require("../schemas/schemaValidator")

const validateUser = (req,res,next)=>{
    if(!req.body.NickName){
        return res.status(400).json({
            message:"NickName obligatorio"
        })
    }
    next()
}
const validarSchemaUser = (req,res,next)=>{
    const {error} = schemaValidator(userSchema,req.body)
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

module.exports = {validateUser,validarSchemaUser}