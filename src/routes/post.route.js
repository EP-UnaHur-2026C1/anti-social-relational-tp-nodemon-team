const {Router} = require("express")
const route = Router()
const {createPost,createPostTags} = require("../controllers/post.controller")

route.post("/",createPost)

module.exports = route