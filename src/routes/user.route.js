const {Router} = require("express")
const route = Router()
const {
    findAll,
    findByPk,
    findbyNickname,
    createUser,
    deleteUser
} = require("../controllers/user.controller")

route.get("/",findAll)
route.get("/id/:id",findByPk)
route.get("/nick/:nickname", findbyNickname)

route.post("/",createUser)
route.delete("/:nickname", deleteUser)
module.exports = route