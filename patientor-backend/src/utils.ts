import { Entry, Gender, NewPatient } from "./types";

type Fields = {name:unknown, dateOfBirth:unknown, ssn:unknown, gender:unknown, occupation:unknown, entries: Entry[]};

const isString = (text: unknown): text is string => {
    return typeof text === 'string' || text instanceof String;
  };

const parseName = (name: unknown): string => {
    if (!name || !isString(name)) {
      throw new Error('Incorrect or missing name');
    }
  
    return name;
  };

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const parseDate = (date: unknown): string => {
  if (!date || !isString(date) || !isDate(date)) {
      throw new Error('Incorrect or missing date: ' + date);
  }
  return date;
};

const parseSSN = (ssn: unknown): string =>{
    if(!ssn || !isString(ssn)){
        throw new Error('Incorrect or missing ssn');
      }
    
      return ssn;
};

const parseOccupation = (occupation: unknown): string =>{
    if(!occupation || !isString(occupation)){
        throw new Error('Incorrect or missing occupation');
      }
    
      return occupation;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isGender = (param: any): param is Gender => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    return Object.values(Gender).includes(param);
  };

const parseGender = (gender: unknown): Gender =>{
    if (!gender || !isGender(gender)) {
        throw new Error('Incorrect or missing gender: ' + gender);
    }
    return gender;
};

export const toNewDiaryEntry = ({name, dateOfBirth, ssn, gender, occupation, entries}: Fields): NewPatient => {
    const newEntry: NewPatient = {
      name: parseName(name),
      dateOfBirth: parseDate(dateOfBirth),
      ssn: parseSSN(ssn),
      gender: parseGender(gender),
      occupation: parseOccupation(occupation),
      /* eslint-disable */
      entries: entries
    };
    return newEntry;
  };