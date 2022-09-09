/* eslint-disable @typescript-eslint/no-unsafe-call */
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { getIndividualPatient } from "../services/patients";
import { addIndividualPatient, useStateValue } from "../state";

const IndividualPatientPage = () => {
  const [
    {
      individualPatient,
       diagnosis
    },
    dispatch,
  ] = useStateValue();

  const { id } = useParams<{ id: string }>();
  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-return
    if (!(individualPatient?.id === id)) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-argument
      getIndividualPatient(id)
        .then(({ data }) => {
          // console.log(data);
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-argument
          dispatch(addIndividualPatient(data));
        })
        .catch((e) => console.error(e));
      // diagnosis?.filter(diag=> diag.code.includes(listOfDiagnosis?.map(diag=> diag.code)))
      // const diagnosisWithDesc = diagnosis?.filter(el=> listOfDiagnosis?.includes(el.code))
      // console.log(diagnosis?.filter(el=> listOfDiagnosis?.includes(el.code)))
      // console.log(diagnosis?.filter(el=> listOfDiagnosis?.includes(el.name)))
    }
  }, []);
  //     const listOfDiagnosis = individualPatient?.entries
  //     .flatMap(entry=> entry.diagnosisCodes
  //         ?.flatMap(d=> d)).filter(diag=> diagnosis?.includes(diag))
  //     // const patientDiags = (diagnosis?.map(d=> d.code));
  //     // const p = (listOfDiagnosis?.filter((element => patientDiags?.includes(element))));

  const patientDiagnosisList = (individualPatient?.entries.flatMap(entry=> entry.diagnosisCodes));
  const diagnosesList = (patientDiagnosisList?.flatMap(diagnoseCode=>(diagnosis?.filter(diagnose=> diagnose?.code === diagnoseCode ))));
  // console.log(patientDiagnosisList?.flatMap(diagnoseCode=> (diagnoseCode)));


  // console.log(diagnosis?.filter(diagnose=> diagnosisList?.includes(diagnose.code)));

  // console.log(diagnosis?.find(diag=> individualPatient?.entries.map(entry=> entry.diagnosisCodes).includes( diag.code)));
  return (
    <>
      {individualPatient ? (
        <div>
          <h1>
            {individualPatient.name}
          </h1>
          <p>SSN: {individualPatient.ssn}</p>
          <p>Occupation: {individualPatient.occupation}</p>
          <h2>Entries</h2>
          {individualPatient.entries.length > 0 ? (
            individualPatient.entries.map((entry) => {
              return (
                  <div key={entry.id}>
                    <p>
                      {entry.date} {entry.description}
                    </p>
                    <ul>
                      {/* {diagnosis?.map(diagnose=> diagnose.code === listOfDiagnosis )} */}

                      {diagnosesList?.map((diagnose, index)=> <li key={index} >{diagnose?.code} {diagnose?.name}</li>)}
                    </ul>
                  </div>
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
