const {Router} = require('express')
const route = Router()
const {findAll,findByPk, createComment, deleteComment, editComment} = require('../controllers/comment.controller')
const {validarCommentById} = require("../middlewares/comment.middleware")

route.get('/', findAll)
route.get('/:id',validarCommentById, findByPk)

route.post('/', createComment)

route.put('/:id',validarCommentById, editComment)

route.delete('/:id',validarCommentById, deleteComment)

module.exports = route
