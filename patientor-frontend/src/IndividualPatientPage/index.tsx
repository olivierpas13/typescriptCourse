import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { getIndividualPatient } from "../services/individualPatient";
// import { Patient } from "../types";
import { addIndividualPatient, useStateValue } from "../state";
// import FemaleIcon from '@mui/icons-material/Female';
// import MaleIcon from '@mui/icons-material/Male';


const IndividualPatientPage = () =>{

    const [ {individualPatient} , dispatch] = useStateValue();

    const { id } = useParams<{ id: string}>();
    useEffect(()=>{
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-return
        if(!(individualPatient?.id === id)){
            // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-argument
            getIndividualPatient(id)
            .then(({data })=> {
                // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-argument
                dispatch(addIndividualPatient(data));}).catch(e=> console.error(e));
        }
    }, []);
    console.log(individualPatient);
    return(
        <>
        {
            individualPatient
            ?
            <div>
                <h1>{individualPatient.name} 
                {/* {individualPatient.gender === 'male'
                                        ? <MaleIcon/>
                                        : <FemaleIcon/>} */}
                </h1>
                <p>SSN: {individualPatient.ssn}</p>
                <p>Occupation: {individualPatient.occupation}</p>
                {individualPatient.entries.length > 0
                ? individualPatient.entries.map(entry=> {
                    return(
                    <div key={entry.id}>
                        <h2>Entries</h2>
                        <p>{entry.date} {entry.description}</p>
                        <ul>
                            {entry.diagnosisCodes?.map((diagnose, index)=> <li key={index} >{diagnose}</li>)}
                        </ul>
                    </div>
                );}):<h2>No entries found</h2>}
                                
            </div>
            :null
        }
        </>

    );
};

export default IndividualPatientPage;