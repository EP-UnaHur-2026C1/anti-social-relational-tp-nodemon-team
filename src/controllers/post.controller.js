const {Post,Tag,PostImages,Comment} = require("../db/models")


const createPost = async (req, res) => {
    try {
        const data = req.body;
        const post = await Post.create(data);
        return res.status(201).json(post);
    } catch (error) {
        // Esto va a imprimir el error real de SQLite en tu terminal (ej: SQLITE_CONSTRAINT)
        console.error("🔴 ERROR REAL DE SQLITE:", error); 
        return res.status(500).json({ 
            message: "Error al crear el post", 
            error: error.message 
        });
    }
};
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
const findAll = async(req,res)=>{
    const data = await Post.findAll({include:[
        {
        model: Comment,
        as: "comments"},
        {
        model: Tag,
        as: "tags"
        } ,
        {
        model:PostImages,
        as: "images"
        }
    ]})
    if(data.comments){
         data.comments = data.comments.filter(c=>comment.estaVisible === true)
    }
    res.status(200).json(data)
}
const findByPk = async(req,res)=>{
    const id = req.params.id
    const post = await Post.findByPk(id,{include:[
        {
        model: Comment,
        as: "comments"},
        {
        model: Tag,
        as: "tags"
        } ,
        {
        model:PostImages,
        as: "images"
        }
    ]})
     if(post.comments){
         post.comments = post.comments.filter(c=>comment.estaVisible === true)
    }
   
    
    res.status(200).json(post)
}
const updatePost = async(req,res)=>{
    const id = req.params.id
    const data = req.body
    const postUpdate = await Post.update(data,{
        where: {id:id}
    })
    const post = await Post.findByPk(id)
    res.status(201).json(post)
}
const deletePost = async(req,res)=>{
    const id = req.params.id
    const postDelete = await Post.destroy({where: {id:id}})
    res.status(200).json({message: "Post eliminado correctamente"})
}
module.exports = {createPost,createPostTags,createPostImages,createPostCompleto,findAll,findByPk,updatePost,deletePost}