const {Post,Tag,PostImages,Comment} = require("../db/models")
const { Op } = require("sequelize")

const createPost = async (req, res) => {
    const data = req.body;
     const post = await Post.create(data);
     res.status(201).json(post);
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
    const promises = data.tags.map(async(e) => {
        return  await Tag.findOrCreate({
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
    const limiteDeMeses = parseInt(process.env.LIMITE_MESES_COMMENT, 10) || 6;
    const fechaLimite = new Date();
    fechaLimite.setMonth(fechaLimite.getMonth() - limiteDeMeses)
    const data = await Post.findAll({include:[
        {
        model: Comment,
        as: "Comments",
        where: {
            date: {
              [Op.gte]: fechaLimite
            }
          },
          required: false 
        
    },
        {
        model: Tag,
        as: "tags"
        } ,
        {
        model:PostImages,
        as: "images"
        }
    ]})
    res.status(200).json(data)
}
const findByPk = async(req,res)=>{
    const limiteDeMeses = parseInt(process.env.LIMITE_MESES_COMMENT, 10) || 6;
    const fechaLimite = new Date();
    fechaLimite.setMonth(fechaLimite.getMonth() - limiteDeMeses)
    const fechaLimiteString = fechaLimite.toISOString().replace('T', ' ').replace('Z', '');
    const id = req.params.id
    try { const post = await Post.findByPk(id,{include:[
        {
        model: Comment,
        as: "Comments",
        where: {
            date: {
              [Op.gte]: fechaLimiteString
            }
          },
          required: false 
    },
        {
        model: Tag,
        as: "tags"
        } ,
        {
        model:PostImages,
        as: "images"
        }
    ]})
    res.status(200).json(post)
}
catch(error){
console.error(error.message)
res.status(400).json({error: error.message})
}
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