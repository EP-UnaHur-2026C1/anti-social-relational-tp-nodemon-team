const Joi = require("joi")
const postSchema = Joi.object({
   NickName: Joi.string().trim().required().messages({
      'string.empty': 'El nombre de usuario (NickName) no puede estar vacío.',
      'any.required': 'El nombre de usuario (NickName) es un campo obligatorio.'
    }),
    contenido: Joi.string().trim().min(1).max(5000).required().messages({
      'string.empty': 'El contenido del post no puede estar vacío.',
      'string.max': 'El contenido no puede superar los 5000 caracteres.',
      'any.required': 'El contenido es un campo obligatorio.'
    }),
    tags: Joi.array().items(Joi.object({
        nombre: Joi.string().trim().required() 
      })
    ).optional().default([]),
    images: Joi.array().items(Joi.object({
        url: Joi.string().uri().required() 
      })
    ).optional().default([])
})

module.exports= postSchema