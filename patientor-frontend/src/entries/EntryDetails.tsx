import { Entry } from "../types";
import HealthCheckEntryComponent from "./HealthCheckEntry";
import HospitalEntry from "./HospitalEntry";
import OccupationalHealthcareEntryComponent from "./OccupationalHealthcareEntry";

const EntryDetails = ({entry}:{entry: Entry }) =>{
    switch (entry.type) {
        case "Hospital":
            return <HospitalEntry entry={entry} />;
        case "OccupationalHealthcare":
            return <OccupationalHealthcareEntryComponent entry={entry} />;
        case "HealthCheck":
            return <HealthCheckEntryComponent entry={entry} />;
        default:
            return <></>;
    }
};

export default EntryDetails;