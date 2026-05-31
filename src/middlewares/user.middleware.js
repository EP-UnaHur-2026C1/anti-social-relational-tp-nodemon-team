const userSchema = require("../schemas/user.schema")
const schemaValidator = require("../schemas/schemaValidator")
const validarById = require("./validarById.middleware")
const {User} = require("../db/models")

const validateUserById = validarById(User)
const validarUserByNickname = async(req,res,next)=>{
    const nickname = req.params.NickName
    const user = await User.findByNickName(nickname)
    if (!user){
        res.status(400).json({error_message:`El usuario ${nickname} no fue encontrado`})
        return
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

module.exports = {validateUserById,validarUserByNickname,validarSchemaUser}