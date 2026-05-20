const {Post} = require("../db/models")
const {Tag} = require("../db/models")

const createPost = async(req,res)=>{
    const data = req.body
    const post = await Post.create(data)
    res.status(201).json(post)
    
}
const createPostTags = async(req,res)=>{
    const data = req.body
    const post = await Post.create({

        NickName: data.NickName,
        contenido: data.contenido
    })
    const promises = []
    data.tags.forEach(async (e) =>{
        promises.push(Tag.findOrCreate({
            where: {nombre: {[Op.eq]:e.nombre}},
            defaults: e
        }))
    })
    result = await Promise.all(promises)
    const tags = result.map(([tag])=> tag)
    await post.addTags(tags)
    res.status(201).json({...post.dataValues,
        tags: await post.getTags({joinTableAttributes:[]})
    })
}
module.exports = {createPost,createPostTags}