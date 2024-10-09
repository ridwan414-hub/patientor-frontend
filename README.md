# Patientor Frontend

[Link to the deployed app](https://patientor-frontend-2nso.onrender.com/)

Patientor is a medical record application for doctors who handle diagnoses and basic health information of their patients. This repository contains the frontend part of the application.

## Repository Structure

```
patientor-frontend/
├── src/
│   ├── components/
│   │   ├── AddPatientModal/
│   │   ├── PatientListPage/
│   │   ├── SinglePatientPage/
│   │   ├── HealthRatingBar.tsx
│   │   └── ...
│   ├── services/
│   │   ├── diagnosesService.ts
│   │   └── patientService.ts
│   ├── types.ts
│   ├── constants.ts
│   ├── App.tsx
│   └── main.tsx
├── public/
├── package.json
├── tsconfig.json
├── vite.config.ts
└── README.md
```

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```
   npm install
   ```
3. Start the development server:
   ```
   npm run dev
   ```

The app should work without a backend, but make sure that the request made to `/api/ping` on startup is successful before continuing.

## Key Features

- Patient list view
- Individual patient view
- Add new patients
- Add new entries for patients (Health Check, Hospital, Occupational Healthcare)
- Diagnosis codes integration

## Technologies Used

- React
- TypeScript
- Material-UI
- Axios
- Vite (for build tooling)

## Main Components

- `App.tsx`: The main application component
- `PatientListPage`: Displays the list of patients
- `SinglePatientPage`: Shows detailed information for a single patient
- `AddPatientModal`: Form for adding a new patient
- `AddEntryForm`: Form for adding new entries to a patient's record

## Data Models

The application uses the following main data models:

1. Patient
2. Entry (with subtypes: HealthCheckEntry, HospitalEntry, OccupationalHealthcareEntry)
3. Diagnosis

For detailed type definitions, refer to the `src/types.ts` file.

## API Integration

The frontend communicates with a backend API. The base URL for the API is defined in `src/constants.ts`. API calls are managed through service modules in the `src/services/` directory.

## Scripts

- `npm run dev`: Start the development server
- `npm run build`: Build the production-ready application
- `npm run lint`: Run ESLint for code linting
- `npm run preview`: Preview the built application

## Contributing

Contributions to Patientor frontend are welcome. Please ensure that you update tests as appropriate and adhere to the existing coding style.

## License

[MIT License](https://opensource.org/licenses/MIT)
