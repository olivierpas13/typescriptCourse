import * as dotenv from 'dotenv'; 
dotenv.config();
import express from 'express';
import diagnosesRouter from './routes/diagnosesRouter';
const app = express();

app.use(express.json());

const PORT = process.env.PORT;

app.use('/api/diagnoses' ,diagnosesRouter);

app.get('/api/ping', (_req, res)=>{
    res.send('Pong').end();
});

app.listen(PORT, () =>{
    console.log(`Server running on port ${PORT}`);
});