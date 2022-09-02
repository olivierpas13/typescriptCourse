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

router.post('/', (req, res)=>{
    try {
        /*eslint-disable-next-line */
        const patientObj = req.body;
        /*eslint-disable-next-line */
        const patient = patientsService.addPatient(patientObj);
        res.json(patient);
    } catch (error) {
        throw new Error;
    }
});

export default router;