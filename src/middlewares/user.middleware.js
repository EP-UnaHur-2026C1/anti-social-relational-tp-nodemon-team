const validateUser = (req,res,next)=>{
    if(!req.body.NickName){
        return res.status(400).json({
            message:"NickName obligatorio"
        })
    }
    next()
}

module.exports = {validateUser}