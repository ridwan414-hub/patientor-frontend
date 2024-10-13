import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Box,
  Button,
  Typography,
  Grid,
  Card,
  CardContent,
  IconButton,
  Tooltip,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import AddIcon from "@mui/icons-material/Add";
import axios from "axios";

import { Patient, NewPatientEntry } from "../../types";
import AddPatientModal from "../AddPatientModal";

import HealthRatingBar from "../HealthRatingBar";

import patientService from "../../services/patientService";

interface Props {
  patients: Patient[];
  setPatients: React.Dispatch<React.SetStateAction<Patient[]>>;
}

const PatientListPage = ({ patients, setPatients }: Props) => {
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [error, setError] = useState<string>();

  const openModal = (): void => setModalOpen(true);

  const closeModal = (): void => {
    setModalOpen(false);
    setError(undefined);
  };

  const submitNewPatient = async (values: NewPatientEntry) => {
    try {
      const patient = await patientService.create(values);
      setPatients(patients.concat(patient));
      setModalOpen(false);
    } catch (e: unknown) {
      if (axios.isAxiosError(e)) {
        if (e?.response?.data && typeof e?.response?.data === "string") {
          const message = e.response.data.replace(
            "Something went wrong. Error: ",
            ""
          );
          console.error(message);
          setError(message);
        } else {
          setError("Unrecognized axios error");
        }
      } else {
        console.error("Unknown error", e);
        setError("Unknown error");
      }
    }
  };
  return (
    <div className="App">
      <Box mb={4}>
        <Typography variant="h4" align="center" gutterBottom>
          Patient List
        </Typography>
      </Box>
      <Grid container spacing={3}>
        {Object.values(patients).map((patient: Patient) => (
          <Grid item xs={12} sm={6} md={4} key={patient.id}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  {patient.name}
                </Typography>
                <Typography color="textSecondary">
                  Gender: {patient.gender}
                </Typography>
                <Typography color="textSecondary">
                  Occupation: {patient.occupation}
                </Typography>
                <Box
                  mt={2}
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <HealthRatingBar showText={false} rating={1} />
                  <Tooltip title="View Patient">
                    <IconButton
                      component={Link}
                      to={`/patients/${patient.id}`}
                      color="primary"
                    >
                      <VisibilityIcon />
                    </IconButton>
                  </Tooltip>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
      <Box mt={4} display="flex" justifyContent="center">
        <Button
          variant="contained"
          color="secondary"
          startIcon={<AddIcon />}
          onClick={() => openModal()}
        >
          Add New Patient
        </Button>
      </Box>
      <AddPatientModal
        modalOpen={modalOpen}
        onSubmit={submitNewPatient}
        error={error}
        onClose={closeModal}
      />
    </div>
  );
};

export default PatientListPage;
