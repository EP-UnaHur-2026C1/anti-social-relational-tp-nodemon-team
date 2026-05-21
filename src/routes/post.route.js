const {Router} = require("express")
const route = Router()
const {createPost,createPostTags,createPostImages,createPostCompleto,findAll,findByPk,updatePost,deletePost} = require("../controllers/post.controller")

route.post("/",createPost)
route.post("/createPostWithTags",createPostTags)
route.post("/createPostWithImages",createPostImages)
route.post("/createPostCompleto",createPostCompleto)

route.get("/",findAll)
route.get("/:id",findByPk)

route.put("/:id",updatePost)

route.delete("/:id",deletePost)


module.exports = route