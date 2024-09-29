import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  Typography, List, ListItem, ListItemIcon, ListItemText,
  CircularProgress, Chip, Paper, Card, CardContent, Box,
  Button, Menu, MenuItem
} from "@mui/material";
import {
  CalendarToday, Work, Fingerprint, Male, Female, Transgender,
  LocalHospital, Person, HealthAndSafety, MedicalServices,
  Favorite as FavoriteIcon, Work as WorkIcon, Add as AddIcon
} from "@mui/icons-material";
import { Entry, Patient, Gender, HealthCheckRating, EntryType, DiagnosisEntry, EntryFormValues } from "../../types";
import patientsService from "../../services/patientService";
import AddEntryForm from "./AddEntryForm";
import diagnosesService from "../../services/diagnosesService";

// Reusable Components

const GenderIcon: React.FC<{ gender: Gender }> = ({ gender }) => {
  switch (gender) {
    case Gender.Male:
      return <Male />;
    case Gender.Female:
      return <Female />;
    default:
      return <Transgender />;
  }
};

interface EntryTypeDetails {
  color: "error" | "info" | "success" | "default";
  icon: React.ReactElement;
  label: string;
}

const getEntryTypeDetails = (type: Entry['type']): EntryTypeDetails => {
  switch (type) {
    case "Hospital":
      return { color: "error", icon: <LocalHospital />, label: "Hospital" };
    case "OccupationalHealthcare":
      return { color: "info", icon: <WorkIcon />, label: "Occupational Healthcare" };
    case "HealthCheck":
      return { color: "success", icon: <HealthAndSafety />, label: "Health Check" };
    default:
      return { color: "default", icon: <MedicalServices />, label: "Other" };
  }
};

const getHealthCheckRatingColor = (rating: HealthCheckRating): string => {
  switch (rating) {
    case HealthCheckRating.Healthy: return 'green';
    case HealthCheckRating.LowRisk: return 'yellow';
    case HealthCheckRating.HighRisk: return 'orange';
    case HealthCheckRating.CriticalRisk: return 'red';
    default: return 'gray';
  }
};

const EntryDetails: React.FC<{ entry: Entry }> = ({ entry }) => {
  const { color, icon, label } = getEntryTypeDetails(entry.type);

  return (
    <Card sx={{ mb: 2, borderLeft: 6, borderColor: `${color}.main` }}>
      <CardContent>
        <Box display="flex" alignItems="center" justifyContent="space-between" mb={1}>
          <Box display="flex" alignItems="center">
            {icon}
            <Typography variant="h6" component="div" sx={{ ml: 1 }}>
              {entry.date}
            </Typography>
          </Box>
          <Chip label={label} color={color} size="small" icon={icon} />
        </Box>
        <Typography color="text.secondary" gutterBottom>
          {entry.description}
        </Typography>
        <Box display="flex" alignItems="center" mt={1}>
          <Person fontSize="small" />
          <Typography variant="body2" sx={{ ml: 1 }}>
            Diagnosed by: {entry.specialist}
          </Typography>
        </Box>

        {renderEntryTypeDetails(entry)}
      </CardContent>
    </Card>
  );
};

const renderEntryTypeDetails = (entry: Entry) => {
  switch (entry.type) {
    case "Hospital":
      return (
        <Box mt={1}>
          <Typography variant="body2" fontWeight="bold">Discharge:</Typography>
          <Typography variant="body2">Date: {entry.discharge.date}</Typography>
          <Typography variant="body2">Criteria: {entry.discharge.criteria}</Typography>
        </Box>
      );
    case "OccupationalHealthcare":
      return (
        <Box mt={1}>
          <Typography variant="body2" fontWeight="bold">Employer: {entry.employerName}</Typography>
          {entry.sickLeave && (
            <Typography variant="body2">
              Sick Leave: {entry.sickLeave.startDate} - {entry.sickLeave.endDate}
            </Typography>
          )}
        </Box>
      );
    case "HealthCheck":
      return (
        <Box mt={1}>
          <Typography variant="body2" fontWeight="bold">Health Check Rating:</Typography>
          {[0, 1, 2, 3].map((rating) => (
            <FavoriteIcon
              key={rating}
              style={{
                color: rating <= entry.healthCheckRating
                  ? getHealthCheckRatingColor(entry.healthCheckRating)
                  : 'gray'
              }}
            />
          ))}
        </Box>
      );
    default:
      return null;
  }
};

// Main Component
const SinglePatientPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [patient, setPatient] = useState<Patient | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedEntryType, setSelectedEntryType] = useState<EntryType | undefined>(undefined);
  const [diagnoses, setDiagnoses] = useState<DiagnosisEntry[]>([]);
  
  useEffect(() => {
    const fetchPatientData = async () => {
      if (id) {
        try {
          const fetchedPatient = await patientsService.getSinglePatientData(id);
          setPatient(fetchedPatient);
          const fetchedDiagnoses = await diagnosesService.getAll();
          setDiagnoses(fetchedDiagnoses);
        } catch (error) {
          console.error("Error fetching data:", error);
        } finally {
          setLoading(false);
        }
      }
    };
    fetchPatientData();
  }, [id]);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleEntryTypeSelect = (type: EntryType) => {
    setSelectedEntryType(type);
    handleClose();
  };

  const handleAddEntry = async (values: EntryFormValues) => {
    if (id && patient) {
      try {
        const newEntry = await patientsService.addEntry(id, values);
        setPatient((prevPatient) => {
          if (prevPatient) {
            return {
              ...prevPatient,
              entries: [...prevPatient.entries, newEntry]
            };
          }
          return prevPatient;
        });
        setSelectedEntryType(undefined);
        // Force a re-fetch of the patient data
        const updatedPatient = await patientsService.getSinglePatientData(id);
        setPatient(updatedPatient);
      } catch (error) {
        console.error("Error adding new entry:", error);
      }
    }
  };

  if (loading) {
    return <CircularProgress />;
  }

  if (!patient) {
    return <Typography variant="h6">Patient not found</Typography>;
  }

  return (
    <Paper elevation={3} sx={{ p: 3, mt: 3 }}>
      <Typography variant="h4" gutterBottom>
        {patient.name} <GenderIcon gender={patient.gender} />
      </Typography>
      <List>
        <ListItem>
          <ListItemIcon>
            <CalendarToday />
          </ListItemIcon>
          <ListItemText primary="Date of Birth" secondary={patient.dateOfBirth} />
        </ListItem>
        <ListItem>
          <ListItemIcon>
            <Work />
          </ListItemIcon>
          <ListItemText primary="Occupation" secondary={patient.occupation} />
        </ListItem>
        <ListItem>
          <ListItemIcon>
            <Fingerprint />
          </ListItemIcon>
          <ListItemText primary="SSN" secondary={patient.ssn} />
        </ListItem>
      </List>

      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 4, mb: 2 }}>
        <Typography variant="h5">Entries</Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleClick}
        >
          Add New Entry
        </Button>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <MenuItem onClick={() => handleEntryTypeSelect(EntryType.HealthCheck)}>Health Check</MenuItem>
          <MenuItem onClick={() => handleEntryTypeSelect(EntryType.Hospital)}>Hospital</MenuItem>
          <MenuItem onClick={() => handleEntryTypeSelect(EntryType.OccupationalHealthcare)}>Occupational Healthcare</MenuItem>
        </Menu>
      </Box>

      {selectedEntryType && (
        <AddEntryForm
          onSubmit={handleAddEntry}
          onCancel={() => setSelectedEntryType(undefined)}
          entryType={selectedEntryType}
          diagnoses={diagnoses}
        />
      )}

      {patient.entries.map((entry) => (
        <EntryDetails key={entry.id} entry={entry} />
      ))}
    </Paper>
  );
};

export default SinglePatientPage;