const {Router} = require('express')
const route = Router()
const {findAll,findByPk, createComment, deleteComment, editComment} = require('../controllers/comment.controller')


route.get('/', findAll)
route.get('/:id', findByPk)

route.post('/', createComment)

route.put('/:id', editComment)

route.delete('/:id', deleteComment)

module.exports = route