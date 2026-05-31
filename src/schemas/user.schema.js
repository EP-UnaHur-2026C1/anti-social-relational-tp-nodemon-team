const Joi = require("joi")
const userSchema = Joi.object({
    NickName: Joi.string().required().min(3).max(20).messages({
        "string.empty": "el nickname no puede estar vacio",
        "any.required": "nickname es requerido",
        "string.min" : "el atributo nickname debe tener minimo 3 caracteres",
        "string.max": "el atributo nickname debe tener maximo 20 caracteres "
    })
})
module.exports= userSchema