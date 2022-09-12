import { Diagnosis, Entry } from "../types";
import MonitorHeartIcon from '@mui/icons-material/MonitorHeart';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { useStateValue } from "../state";

interface Props{
    entry: Entry
}

const HospitalEntry = ({entry}: Props) =>{
    const [
        {
          individualPatient,
           diagnosis
        },
      ] = useStateValue();
    
    const patientDiagnosisList = (individualPatient?.entries.flatMap(entry=> entry.diagnosisCodes));
    const diagnosesList = (patientDiagnosisList?.
      flatMap((diagnoseCode: string | undefined)=>(diagnosis?.
        filter((diagnose: Diagnosis) => diagnose?.code === diagnoseCode ))));

    return(
     <Card>
        <CardContent>
        <p>{entry.date}</p><MonitorHeartIcon/>
        <p>{entry.description}</p>
        <ul>{diagnosesList?.map((diag, index)=> <li key={index} >{diag?.code} {diag?.name}</li>)}</ul>
        <p>Diagnose by {entry.specialist}</p>
        </CardContent>
     </Card>   
    );
};

export default HospitalEntry;