const {Router} = require("express")
const route = Router()
const {createTag, findByPk, findAll, editTag, deleteTag} = require ("../controllers/tag.controller")

route.get("/", findByPk)
route.get("/:id", findAll)

route.post("/:nombre", createTag)

route.put("/:id", editTag)

route.delete("/:id", deleteTag)

module.exports = route