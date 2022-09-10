import { v1 as uuid } from 'uuid';

// import patientsData from '../../data/patients.json';
import patientsFromDatabase from '../../data/patients';

import { Entry, HealthCheckEntry, HospitalEntry, NewPatient, OccupationalHealthcareEntry, Patient, WithoutSSNPatient } from '../types';
import { toNewDiaryEntry } from '../utils';

const patients: WithoutSSNPatient[] = patientsFromDatabase as WithoutSSNPatient[];
const allPatients: Patient[] = patientsFromDatabase;

const getAllPatients = ():Patient[] =>{
    return allPatients;
};

const getPatients = (): WithoutSSNPatient[] =>{
    const result = patients.map(({id, name, dateOfBirth, gender, occupation})=>({
        id,
        name,
        dateOfBirth,
        gender,
        occupation,
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

const isValidHealthCheckEntry = (entry: HealthCheckEntry) =>{
    const {healthCheckRating} = entry
    if(!healthCheckRating){return false}
    return true;
}

const isValidHospitalEntry = (entry: HospitalEntry) =>{
    const {discharge} = entry
    const {date, criteria} = discharge

    if(!discharge || !date || !criteria){return false}
    return true
}

const isValidOccupationalHealthcareEntry = (entry: OccupationalHealthcareEntry) =>{

    const {employerName} = entry
    if(!employerName){return false}
    return true
}

const isEntry = (entry: Entry) =>{
    const {date, type, specialist, description, id} = entry
    if(!date || !type || !specialist || !description || id){return false}
    if(type === 'HealthCheck'){
        return isValidHealthCheckEntry(entry) ;
    }
    if(type === 'Hospital'){
        return isValidHospitalEntry(entry);
    }
    if(type === 'OccupationalHealthcare'){
        return isValidOccupationalHealthcareEntry(entry);
    }
    return false
}

// const addEntry = (object: Entry, id : string ) =>{
//     const patient = allPatients.find(patient=> patient.id === id)
//     patient.entries = {
//         ...patient?.entries,
//         object
//     }
// }

export default {
    getPatients,
    addPatient,
    getAllPatients,
    isEntry
};