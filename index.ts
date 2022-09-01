import * as dotenv from 'dotenv'; 
dotenv.config();
import express from 'express';
import calculateExercises from './exerciseCalculator';
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

app.post('/exercises', (req, res)=>{
    // eslint-disable-next-line
    const {daily_exercises, target} = req.body;

    if(!daily_exercises || !target) res.json({
        "error": "parameters missing"
      });


    try {
        // eslint-disable-next-line
        const result  = calculateExercises(daily_exercises, Number(target));
        res.status(201).json(result).end();

    } catch (e) {
        res.json({
            "error": "malformatted parameters"
          }).end();
    }
    
    
});

app.listen(PORT, () =>{
    console.log(`Server running on port ${PORT}`);
});