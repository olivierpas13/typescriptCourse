import express from 'express';
import patientsService from '../services/patientsService';

const router = express.Router();

router.get('/:id',(req, res)=>{
    try {
        const {params} = req;
        const patients = patientsService.getAllPatients();
        const patient = patients.find(patient=> patient.id === params.id);
        // console.log(JSON.parse(patient));

        res.json(patient).end();

    } catch (error) {
        throw new Error;
    }
});

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
        /*eslint-disable-next-line */
    } catch (error) {
        let errorMessage = 'Something went wrong.';
        if (error instanceof Error) {
          errorMessage += ' Error: ' + error.message;
        }
        res.status(400).send(errorMessage);  
    }
});


export default router;