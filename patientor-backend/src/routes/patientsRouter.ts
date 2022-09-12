import { randomUUID } from 'crypto';
import express from 'express';
import patientsService from '../services/patientsService';
import { Entry, Patient } from '../types';

const router = express.Router();

router.get('/:id',(req, res)=>{
    try {
        const {params} = req;
        const patients = patientsService.getAllPatients();
        const patient = patients.find(patient=> patient.id === params.id);
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
    } catch (error) {
        let errorMessage = 'Something went wrong.';
        if (error instanceof Error) {
          errorMessage += ' Error: ' + error.message;
        }
        res.status(400).send(errorMessage);  
    }
});

router.post('/:id/entries', (req, res)=>{
    try {
        /*eslint-disable-next-line */
        if(patientsService.isEntry(req.body) === false){
            return res.status(400).json('Invalid input');
        }
        const {params: {id}} = req;
        const patients = patientsService.getAllPatients();


        const patient: Patient | undefined = patients.find(patient=> patient.id === id);
        
        /*eslint-disable-next-line */
        const entry: Entry = {
            id: randomUUID(),
            ...req.body,

        };
        /*eslint-disable-next-line */
        const newPatient = {
            ...patient,
            entries: patient?.entries.concat(entry)
            
        };
        return res.json(newPatient);
    } catch (error) {
        console.error(error);
        return error;
    }
});


export default router;