import * as dotenv from 'dotenv'; 
dotenv.config();
import express from 'express';
import calculateBmi from './bmiCalculator';
const app = express();

app.use(express.json());

const PORT = process.env.PORT;

app.get('/hello', (_req, res)=>{
    
    res.send('Hello Full Stack');
});

app.get('/bmi', (req, res)=>{

    const height = req.query.height;
    const weight = req.query.weight;

    if(!height || !weight) res.json({"error":"malformatted parameters"});

    let result;

    try {
        result = calculateBmi(Number(height),Number(weight));
    } catch (error) {
        res.json({"error":"malformatted parameters"});
    }
    
    res.json({
        weight,
        height,
        result,
    });

});

app.listen(PORT, () =>{
    console.log(`Server running on port ${PORT}`);
});