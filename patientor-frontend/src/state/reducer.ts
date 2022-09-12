import { State } from "./state";
import { Diagnosis, Patient } from "../types";
// import { useStateValue } from "./state";

export type Action =
  | {
      type: "SET_PATIENT_LIST";
      payload: Patient[];
    }
  | {
      type: "SET_DIAGNOSIS_LIST";
      payload: Diagnosis[];
    }
  | {
      type: "ADD_PATIENT";
      payload: Patient;
    }
  | {
      type: "ADD_INDIVIDUAL_PATIENT";
      payload: Patient;
    }
  | {
      type: "ADD_ENTRY";
      payload: Patient;
    };

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SET_PATIENT_LIST":
      return {
        ...state,
        patients: {
          ...action.payload.reduce(
            (memo, patient) => ({ ...memo, [patient.id]: patient }),
            {}
          ),
          ...state.patients
        }
      };
    case "SET_DIAGNOSIS_LIST":
      return {
        ...state,
        diagnosis: action.payload
      };
    case "ADD_PATIENT":
      return {
        ...state,
        patients: {
          ...state.patients,
          [action.payload.id]: action.payload
        }
      };     
    case "ADD_INDIVIDUAL_PATIENT":
      return {
        ...state,
        individualPatient: action.payload
      };
    case "ADD_ENTRY":
      return{
        ...state,
        individualPatient: action.payload
      };
      
    default:
      return state;
  }
};

export const setPatientList = (list: Patient[] ):Action =>{

  return {
    type: "SET_PATIENT_LIST",
    payload:list
  };
};

export const setDiagnosisList = (list: Diagnosis[] ):Action =>{
  return {
    type: "SET_DIAGNOSIS_LIST",
    payload:list
  };
};

export const addNewPatient = (patient: Patient): Action =>{
  return{
    type: "ADD_PATIENT",
    payload: patient
  };
};

export const addIndividualPatient = (patient: Patient): Action =>{
  return{ 
    type: "ADD_INDIVIDUAL_PATIENT",
    payload: patient 
  };
};

export const addEntry = (entry: Patient): Action =>{
  return{
    type: "ADD_ENTRY",
    payload: entry
  };
};