const {Router} = require("express")
const route = Router()
const {createPost,createPostTags,createPostImages,createPostCompleto} = require("../controllers/post.controller")

route.post("/",createPost)
route.post("/createPostWithTags",createPostTags)
route.post("/createPostWithImages",createPostImages)
route.post("/createPostCompleto",createPostCompleto)

module.exports = route