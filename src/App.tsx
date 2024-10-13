import { useState, useEffect } from "react";
import axios from "axios";
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import { Button, Divider, Container, Typography } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import HomeIcon from "@mui/icons-material/Home";

import { apiBaseUrl } from "./constants";
import { Patient } from "./types";

import patientService from "./services/patientService";
import PatientListPage from "./components/PatientListPage";
import SinglePatientDataPage from "./components/SinglePatientPage";

const theme = createTheme({
  palette: {
    primary: {
      main: "#3f51b5",
    },
    secondary: {
      main: "#f50057",
    },
    background: {
      default: "#f5f5f5",
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          textTransform: "none",
          transition: "all 0.3s ease",
          "&:hover": {
            transform: "translateY(-2px)",
            boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
          transition: "all 0.3s ease",
          "&:hover": {
            transform: "translateY(-4px)",
            boxShadow: "0 8px 16px rgba(0,0,0,0.1)",
          },
        },
      },
    },
  },
});

const App = () => {
  const [patients, setPatients] = useState<Patient[]>([]);

  useEffect(() => {
    void axios.get<void>(`${apiBaseUrl}/ping`);

    const fetchPatientList = async () => {
      const patients = await patientService.getAll();
      setPatients(patients);
    };
    void fetchPatientList();
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div className="App">
        <Router>
          <Container maxWidth="lg">
            <Typography
              variant="h3"
              style={{
                marginBottom: "0.5em",
                color: theme.palette.primary.main,
              }}
            >
              Patientor
            </Typography>
            <Button
              component={Link}
              to="/"
              variant="contained"
              color="primary"
              startIcon={<HomeIcon />}
              style={{ marginBottom: "1em" }}
            >
              Home
            </Button>
            <Divider style={{ margin: "1em 0" }} />
            <Routes>
              <Route
                path="/"
                element={
                  <PatientListPage
                    patients={patients}
                    setPatients={setPatients}
                  />
                }
              />
              <Route path="/patients/:id" element={<SinglePatientDataPage />} />
            </Routes>
          </Container>
        </Router>
      </div>
    </ThemeProvider>
  );
};

export default App;
