import { Grid, Button } from "@material-ui/core";
import { Field, Formik, Form } from "formik";
import { isValidHealthCheckValue, dateIsValid } from "../utils";

import {
  TextField,
  DiagnosisSelection,
  SelectField,
} from "../AddPatientModal/FormField";
import { NewEntry, HealthCheckRating } from "../types";
import { useStateValue } from "../state";

export type EntryFormValues = Omit<NewEntry, "id" | "type">;

interface Props {
  onSubmit: (values: EntryFormValues) => void;
  onCancel: () => void;
}

export type healthCheckOption = {
  value: HealthCheckRating;
  label: string;
};

const healthCheckOptions: healthCheckOption[] = [
  {value: -1, label: "None"},
  { value: HealthCheckRating.Healthy, label: "Healthy" },
  { value: HealthCheckRating.LowRisk, label: "LowRisk" },
  { value: HealthCheckRating.HighRisk, label: "HighRisk" },
  { value: HealthCheckRating.CriticalRisk, label: "CriticalRisk" },
];

export const AddEntryForm: React.FC<Props> = ({ onSubmit
  , onCancel
 }) => {
  const [{ diagnosis }] = useStateValue();

  return (
    <Formik
      initialValues={{
        description: "",
        date: "",
        specialist: "",
        diagnosisCodes: [],
        healthCheckRating: -1,
        employerName: "",
        sickLeave: { startDate: "", endDate: "" },
        discharge: { date: "", criteria: "" },
      }}
      onSubmit={onSubmit}
      validate={(values) => {
        const requiredError = "Field is required";
        let errors:
          | { [field: string]: string }
          | {
              [key: string]: {
                [key: string]: string;
              };
            } = {};
        if (!values.description) {
          errors.description = requiredError;
        }
        if (!dateIsValid(values.date)) {
          errors.date =
          "Date format should be YYYY-MM-DD";
        }
        if (!values.date) {
          errors.date = requiredError;
        }
        if (!values.specialist) {
          errors.specialist = requiredError;
        }
        if (
          values.healthCheckRating !== -1 &&
          !isValidHealthCheckValue(values.healthCheckRating)
        ) {
          errors.healthCheckRating =
            "Please provide a valid health check rating between 0 and 3";
        }
        if (
          values.sickLeave?.startDate &&
          values.sickLeave?.endDate &&
          !values.employerName &&
          values.healthCheckRating === -1
        ) {
          errors.employerName = requiredError;
        }

        if (
          values.sickLeave?.startDate &&
          values.sickLeave?.endDate &&
          values.employerName &&
          values.healthCheckRating === -1 &&
          (!dateIsValid(values.sickLeave?.startDate) ||
            !dateIsValid(values.sickLeave?.endDate))
        ) {
          errors = {
            ...errors,
            sickLeave: {
              startDate:
                "Date format should be YYYY-MM-DD",
            },
          };
        }

        if (
          values.discharge?.date &&
          !values.employerName &&
          values.healthCheckRating === -1 &&
          !dateIsValid(values.discharge?.date)
        ) {
          errors = {
            ...errors,
            discharge: {
              date:
              "Date format should be YYYY-MM-DD",
            },
          };
        }

        if (
          (values.employerName && values.discharge?.date) ||
          (values.employerName && values.discharge?.criteria)
        ) {
          errors = {
            ...errors,
            discharge: {
              date: "Invalid input for type of entry: Occupational Healthcare"
            },
          };
        }
        if (
          (values.healthCheckRating !== -1 && values.discharge?.date) ||
          (values.healthCheckRating !== -1 && values.discharge?.criteria)
        ) {
          errors = {
            ...errors,
            discharge: {
              date:
              "Invalid input for type of entry: Healthcheck (discharge date and/or criteria)",
            },
          };
        }
        if (
          (values.healthCheckRating !== -1 && values.sickLeave?.startDate) ||
          (values.healthCheckRating !== -1 && values.sickLeave?.endDate)
        ) {
          errors = {
            ...errors,
            sickLeave: {
              startDate:
              "Invalid input for type of entry: Healthcheck (Sick leave start date and/or end date.)",
            },
          };
        }
        if (
          (values.employerName &&   values.healthCheckRating !== -1)
        ) {
          errors.employerName =
          "Invalid input for type of entry: Healthcheck (Employer name)";
        }
        return errors;
      }}
    >
      {({
         isValid, dirty, 
      setFieldValue, setFieldTouched }) => {
        return (
          <Form className="form ui">
            <Field
              label="Description"
              placeholder="Description"
              name="description"
              component={TextField}
            />
            <Field
              label="Date"
              placeholder="YYYY-MM-DD"
              name="date"
              component={TextField}
            />
            <Field
              label="Specialist"
              placeholder="Specialist"
              name="specialist"
              component={TextField}
            />

            <DiagnosisSelection
              setFieldValue={setFieldValue}
              setFieldTouched={setFieldTouched}
              diagnoses={(diagnosis)}
            />
            <SelectField label="Health Check Rating" name="healthCheckRating" options={healthCheckOptions} />

            <Field
              label="Employer Name"
              placeholder="Employer Name"
              name="employerName"
              component={TextField}
            />

            <div>
              <div>
                <Field
                  label="SickLeave Start Date"
                  placeholder="Start Date"
                  name="sickLeave.startDate"
                  component={TextField}
                />
              </div>
              <Field
                label="SickleaveEnd Date"
                placeholder="SickLeave End Date"
                name="sickLeave.endDate"
                component={TextField}
              />
            </div>

            <div>
              <div>
                <Field
                  label="Discharge Date"
                  placeholder="Discharge Date"
                  name="discharge.date"
                  component={TextField}
                />
              </div>
              <Field
                label="Discharge criteria"
                placeholder="Discharge criteria"
                name="discharge.criteria"
                component={TextField}
              />
            </div>

            <Grid>
              <Grid item>
                <Button
                  color="secondary"
                  variant="contained"
                  style={{ float: "left" }}
                  type="button"
                  onClick={onCancel}
                >
                  Cancel
                </Button>
              </Grid>
              <Grid item>
                <Button
                  style={{
                    float: "right",
                  }}
                  type="submit"
                  variant="contained"
                  disabled={!dirty || !isValid}
                >
                  Add
                </Button>
              </Grid>
            </Grid>
          </Form>
        );
      }}
    </Formik>
  );
};

export default AddEntryForm;