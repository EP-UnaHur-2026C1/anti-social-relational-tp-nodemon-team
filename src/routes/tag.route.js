const {Router} = require("express")
const route = Router()
const {createTag, findByPk, findAll, editTag, deleteTag} = require ("../controllers/tag.controller")
const {validateTag, existTag} = require("../middlewares/tag-middleware")

route.get("/:id",validateTag, existTag, findByPk)
route.get("/", findAll)

route.post("/:nombre", createTag)

route.put("/:id",validateTag, existTag, editTag)

route.delete("/:id",validateTag, existTag, deleteTag)

module.exports = route