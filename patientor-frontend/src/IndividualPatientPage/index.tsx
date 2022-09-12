/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { apiBaseUrl } from "../constants";

import EntryDetails from "../entries/EntryDetails";
import AddEntryModal from "../AddEntryModal/AddEntryModal";
import { Patient } from "../types";

import { getIndividualPatient } from "../services/patients";
import { assingType } from "../utils";
import { addEntry, addIndividualPatient, useStateValue } from "../state";

import { EntryFormValues } from "../AddEntryModal/AddEntryForm";

import FemaleIcon from '@mui/icons-material/Female';
import MaleIcon from '@mui/icons-material/Male';

const IndividualPatientPage = () => {

  const [modalOpen, setModalOpen] = useState<boolean>(false);

  const openModal = (): void => setModalOpen(true);

  const closeModal = (): void => {
    setModalOpen(false);
  };

  const submitNewEntry = async (values: EntryFormValues) => {
    try {
      /*eslint-disable-next-line*/
      const newEntry = assingType(values);
      const { data: newPatient } = await axios.post<Patient>(
        `${apiBaseUrl}/patients/${individualPatient? individualPatient.id : 0}/entries`,
        newEntry
        );
      dispatch(addEntry(newPatient));
      closeModal();
    } catch (e: unknown) {
      if (axios.isAxiosError(e)) {
        console.error(e?.response?.data || "Unrecognized axios error");
      } else {
        console.error("Unknown error", e);
      }
    }
  };

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
              );
            })
          ) : (
            <h2>No entries found</h2>
          )}
        </div>
      ) : null}
      <button onClick={()=>openModal()} >Add Entry</button>
      <AddEntryModal
        modalOpen={modalOpen}
        onSubmit={submitNewEntry}
        onClose={closeModal}
      />
    </>
  );
};

export default IndividualPatientPage;
