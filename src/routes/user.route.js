const {Router} = require("express")
const route = Router()
const {
    findAll,
    findByPk,
    findbyNickname,
    createUser,
    deleteUser,
    updateUser
} = require("../controllers/user.controller")
const { validateUser,validarSchemaUser } = require("../middlewares/user.middleware")
route.get("/",findAll)
route.get("/id/:id",findByPk)
route.get("/nick/:nickname", findbyNickname)

route.post("/", validarSchemaUser, createUser)
route.delete("/:nickname", deleteUser)
route.put("/:nickname", validateUser, updateUser)
module.exports = route