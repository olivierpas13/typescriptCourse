import * as dotenv from 'dotenv' 
dotenv.config()
import express from 'express';
const app = express()

app.use(express.json())

const PORT = process.env.PORT

app.get('/hello', (_req, res)=>{
    res.send('Hello Full Stack')
})

app.listen(PORT, () =>{
    console.log(`Server running on port ${PORT}`)
})