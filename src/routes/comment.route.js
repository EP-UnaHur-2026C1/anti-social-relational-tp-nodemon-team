const {Router} = require('express')
const route = Router()
const {findAll,findByPk, createComment, deleteComment, editComment} = require('../controllers/comment.controller')
const {validateComment, existComment} = require("../middlewares/comment.middleware")

route.get('/', findAll)
route.get('/:id', findByPk)

route.post('/', createComment)

route.put('/:id', validateComment, existComment, editComment)

route.delete('/:id', deleteComment)

module.exports = route