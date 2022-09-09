/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import EntryDetails from "../entries/EntryDetails";
import { getIndividualPatient } from "../services/patients";
import { addIndividualPatient, useStateValue } from "../state";

import FemaleIcon from '@mui/icons-material/Female';
import MaleIcon from '@mui/icons-material/Male';

const IndividualPatientPage = () => {
  const [
    {
      individualPatient,
    },
    dispatch,
  ] = useStateValue();

  const { id } = useParams<{ id: string }>();
  useEffect(() => {
    if (!(individualPatient?.id === id)) {
      getIndividualPatient(id)
        .then(({ data }) => {
          dispatch(addIndividualPatient(data));
        })
        .catch((e) => console.error(e));
    }
  }, []);

 return (
    <>
      {individualPatient ? (
        <div>
          <h1>
            {individualPatient.name} {individualPatient.gender === "male" && <MaleIcon/>}{individualPatient.gender === "female" && <FemaleIcon/>}
          </h1>
          <p>SSN: {individualPatient.ssn}</p>
          <p>Occupation: {individualPatient.occupation}</p>
          <h2>Entries</h2>
          {individualPatient.entries.length > 0 ? (
            individualPatient.entries.map((entry) => {
              return (
                <EntryDetails key={entry.id} entry={entry}/>
                  // <div key={entry.id}>
                  //   <p>
                  //     {entry.date} {entry.description}
                  //   </p>
                  //   <ul>
                  //     {/* {diagnosis?.map(diagnose=> diagnose.code === listOfDiagnosis )} */}

                  //     {diagnosesList?.map((diagnose, index)=> <li key={index} >{diagnose?.code} {diagnose?.name}</li>)}
                  //   </ul>
                  // </div>
              );
            })
          ) : (
            <h2>No entries found</h2>
          )}
        </div>
      ) : null}
    </>
  );
};

export default IndividualPatientPage;
