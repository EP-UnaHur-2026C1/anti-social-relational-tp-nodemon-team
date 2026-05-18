const {Router} = require("express")
const route = Router()
const {findAll,findByPk,findbyNickname,createUser} = require("../controllers/user.controller")

route.get("/",findAll)
route.get("/id/:id",findByPk)
route.get("/nick/:nickname", findbyNickname)

route.post("/",createUser)

module.exports = route