import patientsData from '../../data/patients.json';

import { WithoutSSNPatient } from '../types';

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

export default {
    getPatients
};