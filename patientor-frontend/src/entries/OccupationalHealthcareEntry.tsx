import { OccupationalHealthcareEntry } from "../types";
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';

interface Props{
    entry: OccupationalHealthcareEntry
}

const OccupationalHealthcareEntryComponent = ({entry}: Props) =>{
    return(
     <Card>
        <CardContent>
        <p>{entry.date}<LocalHospitalIcon/> {entry.employerName} </p>
        <p>{entry.description}</p>
        <p>Diagnose by {entry.specialist}</p>
        </CardContent>
     </Card>   
    );
};

export default OccupationalHealthcareEntryComponent;