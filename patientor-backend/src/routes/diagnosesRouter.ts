import express from 'express';
import diagnosesService from '../services/diagnosesService';
const router = express.Router();

router.get('/', (_req, res)=>{
    console.log('get');
    res.send(diagnosesService.getDiagnoses()).end();
});

export default router;