const {Router} = require("express")
const route = Router()
const {createPost,createPostTags,createPostImages,createPostCompleto,findAll,findByPk,updatePost,deletePost} = require("../controllers/post.controller")
const {validarPostById} = require("../middlewares/post.middleware")
const validarSchemaPost = require("../schemas/post.schema")

route.post("/",validarSchemaPost, createPost)
route.post("/createPostWithTags", validarSchemaPost, createPostTags)
route.post("/createPostWithImages", validarSchemaPost, createPostImages)
route.post("/createPostCompleto", validarSchemaPost, createPostCompleto)

route.get("/",findAll)
route.get("/:id",validarPostById,findByPk)

route.put("/:id", validarPostById, updatePost)

route.delete("/:id", validarPostById,deletePost)


module.exports = route