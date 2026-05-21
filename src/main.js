
const express = require('express')
const app = express()
const PORT = process.env.PORT | 3001
const userRoute = require("./routes/user.route")
const postRoute = require("./routes/post.route")
const commentRoute = require("./routes/comment.route")

const {validateComment, existComment} = require("./middlewares/comment.middleware")
const db = require("./db/models")


app.use(express.json())
app.use("/user",userRoute)
app.use("/post",postRoute)
app.use("/comment", commentRoute)

app.use(validateComment)
app.use(existComment)

app.listen(PORT, async(err) =>{
    if(err){
        console.error(err.message)
        process.exit(1)
    }
     await db.sequelize.sync({force:true})
    console.log(`Aplicación iniciada en puerto ${PORT}`)
} )

