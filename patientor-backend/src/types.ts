// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface Entry {
}

export enum Gender{
    Male = 'male',
    Female = 'female'
}

export type Diagnose = {
    code: string
    name: string
    latin?: string
};

export type Patient = {
    id: string
    name: string
    dateOfBirth: string
    ssn: string
    gender: Gender
    occupation: string
    entries: Entry[]

};

export type WithoutSSNPatient = Omit<Patient, 'ssn' | 'entries'>;

export type NewPatient =Omit<Patient, 'id'>;