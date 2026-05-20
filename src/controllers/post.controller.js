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
    const promises =  data.tags.map(async (e) =>{
        return await Tag.findOrCreate({
            where: {nombre: {[Op.eq]:e.nombre}},
            defaults: e
        })
    })
    result = await Promise.all(promises)
    const tags = result.map(([tag])=> tag)
    await post.addTags(tags)
    res.status(201).json({...post.dataValues,
        tags: await post.getTags({joinTableAttributes:[]})
    })
}
const createPostImages = async(req,res)=>{
    const data = req.body
    const post = await Post.create(data,{
        include: [{
            model: PostImages,
            as: "images"
        }]
    })
    res.status(201).json(post)

}
const createPostCompleto = async(req,res)=>{
    const data = req.body
    const post = await Post.create({
            NickName: data.NickName,
            contenido: data.contenido,
            images: data.images 
        }, {
            include: [{ model: PostImages, as: 'images' }]
        })
    const promises = data.tags.map((e) => {
        return Tag.findOrCreate({
           where: { nombre: { [Op.eq]: e.nombre } },
           defaults: e
                })
    })
    const result = await Promise.all(promises);
    const tags = result.map(([tag]) => tag);
    await post.addTags(tags);
    res.status(201).json(post, {
        include: [
            {model:PostImages , as :"images"} ,
            {model: Tag, as: "tags", through: {attributes:[]}}
        ]
    })
}
module.exports = {createPost,createPostTags,createPostImages,createPostCompleto}