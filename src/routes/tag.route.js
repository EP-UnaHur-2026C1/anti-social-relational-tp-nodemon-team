const {Router} = require("express")
const route = Router()
const {createTag, findByPk, findAll, editTag, deleteTag} = require ("../controllers/tag.controller")
const {validarTagById} = require("../middlewares/tag.middleware")

route.get("/:id",validarTagById, findByPk)
route.get("/", findAll)

route.post("/:nombre", createTag)

route.put("/:id",validarTagById, editTag)

route.delete("/:id",validarTagById, deleteTag)

module.exports = route