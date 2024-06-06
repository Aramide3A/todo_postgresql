const express = require('express')
const app = express()
const taskRouter = require('./routes/task.routes')

app.use(express.json())
app.use('/api/task', taskRouter)

app.listen(3000, ()=>{
    console.log("Server listening on port 3000")
})