import { v1 as uuid } from 'uuid';

import patientsData from '../../data/patients.json';

import { NewPatient, Patient, WithoutSSNPatient } from '../types';
import { toNewDiaryEntry } from '../utils';

const patients: WithoutSSNPatient[] = patientsData as WithoutSSNPatient[];

const getPatients = (): WithoutSSNPatient[] =>{
    const result = patients.map(({id, name, dateOfBirth, gender, occupation})=>({
        id,
        name,
        dateOfBirth,
        gender,
        occupation
    }));
    console.log(result);
    return result;
};

const addPatient = (object: NewPatient):Patient =>{
    const patient = toNewDiaryEntry(object);
    const newPatient = {
        /*eslint-disable-next-line */
        id: uuid(),
        ...patient
    };

    patients.concat(newPatient);

    return newPatient;
};

export default {
    getPatients,
    addPatient
};