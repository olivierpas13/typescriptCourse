/* eslint-disable*/
// import { EntryFormValues } from "../AddEntryModal/AddEntryForm";
import { EntryFormValues } from "./AddEntryModal/AddEntryForm";
import { HealthCheckEntry, HospitalEntry, OccupationalHealthcareEntry, HealthCheckRating } from "./types";

export const dateIsValid = (dateStr: string)=> {
    const regex = /^\d{4}-\d{2}-\d{2}$/;
  
    if (!(dateStr.match(regex))) {
      return false;
    }
    return true;
}
export const isValidHealthCheckValue = (value: any): boolean => {
    return (
      value === HealthCheckRating.Healthy ||
      value === HealthCheckRating.LowRisk ||
      value === HealthCheckRating.HighRisk ||
      value === HealthCheckRating.CriticalRisk
    );
  };

const isValidHealthCheckEntry = (entry: any): entry is HealthCheckEntry =>{
    const {healthCheckRating} = entry;
    if(healthCheckRating > -1 && healthCheckRating < 4){
        return true;}
    return false;
};

const isValidHospitalEntry = (entry: any): entry is HospitalEntry =>{
    const {discharge} = entry;
    const {date, criteria} = discharge;

    if(!discharge || !date || !criteria){return false;}
    return true;
};

const isValidOccupationalHealthcareEntry = (entry: any): entry is OccupationalHealthcareEntry =>{
    const {employerName} = entry;
    if(!employerName){return false;}
    return true;
};

export const assingType = (entry: EntryFormValues) =>{
    const {date, specialist, description} = entry;
    if(!date || !specialist || !description){throw new Error('Invalid Entry, necessary fields missing');}

    if(isValidHealthCheckEntry(entry)){
        return {
            ...entry,
            type: "HealthCheck"
        };
    }
    if(isValidHospitalEntry(entry)){
        return {
            ...entry,
            type: "Hospital"
        };
    }
    if(isValidOccupationalHealthcareEntry(entry)){
        return {
            ...entry,
            type: "OccupationalHealthcare"
        };
    }
    return null;
};