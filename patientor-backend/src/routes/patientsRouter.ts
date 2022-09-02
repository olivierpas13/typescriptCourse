import express from 'express';
import patientsService from '../services/patientsService';

const router = express.Router();

router.get('/', (_req, res)=>{
    try {
        
        res.json(patientsService.getPatients()).end();
    } catch (error) {
        throw new Error;
    }
});

export default router;