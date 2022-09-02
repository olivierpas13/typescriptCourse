import * as dotenv from 'dotenv'; 
dotenv.config();
import cors from 'cors';
import express from 'express';
import diagnosesRouter from './routes/diagnosesRouter';
import patientsRouter from './routes/patientsRouter';
const app = express();

app.use(express.json());
/*eslint-disable-next-line */
app.use(cors());

const PORT = process.env.PORT;

app.use('/api/diagnoses' ,diagnosesRouter);
app.use('/api/patients' ,patientsRouter);

app.get('/api/ping', (_req, res)=>{
    res.send('Pong').end();
});

app.listen(PORT, () =>{
    console.log(`Server running on port ${PORT}`);
});