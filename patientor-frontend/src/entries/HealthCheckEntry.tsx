import { HealthCheckEntry } from "../types";
import FavoriteIcon from '@mui/icons-material/Favorite';
import MedicalInformationIcon from '@mui/icons-material/MedicalInformation';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import {red, green} from '@mui/material/colors';
import { orange, yellow } from "@material-ui/core/colors";

interface Props{
    entry: HealthCheckEntry
}

const HealthCheckEntryComponent = ({entry}: Props) =>{
    return(
     <Card>
        <CardContent>
        <p>{entry.date} <MedicalInformationIcon/></p>
        <p>{entry.description}</p>
        {
            entry.healthCheckRating === 0 && <FavoriteIcon sx={{ color: green[500]}} />
        }
        {
            entry.healthCheckRating === 1 && <FavoriteIcon sx={{ color: yellow[500]}} />
        }
        {
            entry.healthCheckRating === 2 && <FavoriteIcon sx={{ color: orange[500]}} />
        }
        {
            entry.healthCheckRating === 3 && <FavoriteIcon sx={{ color: red[500]}} />
        }
        <p>Diagnose by {entry.specialist}</p>
        </CardContent>
     </Card>   
    );
};

export default HealthCheckEntryComponent;