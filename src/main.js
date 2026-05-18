
const express = require('express')
const app = express()
const PORT = process.env.PORT | 3001
const userRoute = require("./routes/user.route")
const db = require("./db/models")


app.use(express.json())
app.use("/user",userRoute)

app.listen(PORT, async(err) =>{
    if(err){
        console.error(err.message)
        process.exit(1)
    }
     await db.sequelize.sync({force:true})
    console.log(`Aplicación iniciada en puerto ${PORT}`)
} )

