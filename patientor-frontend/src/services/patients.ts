import axios from "axios";
import { apiBaseUrl } from "../constants";

export const getIndividualPatient = async (id: string | undefined) =>{
    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
    const patient = await axios.get(`${apiBaseUrl}/patients/${id}`);
    return patient;
};

export const getAllDiagnosis = async () =>{
    const patients = await axios.get(`${apiBaseUrl}/diagnoses/`);
    return patients;
};
