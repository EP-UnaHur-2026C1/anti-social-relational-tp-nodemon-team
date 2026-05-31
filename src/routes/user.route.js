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
const { validateUser,validarSchemaUser, validateUserById, validarUserByNickname} = require("../middlewares/user.middleware")
route.get("/",findAll)
route.get("/id/:id",validateUserById, findByPk)
route.get("/nick/:nickname",validarUserByNickname, findbyNickname)

route.post("/", validarSchemaUser, createUser)
route.delete("/:nickname", deleteUser)
route.put("/:nickname", validarUserByNickname, updateUser)
module.exports = route