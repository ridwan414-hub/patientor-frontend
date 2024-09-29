# Patientor

Patientor is a medical record application for doctors who handle diagnoses and basic health information of their patients.

## Frontend

### Getting started
- To get the frontend app running, install its dependencies with `npm install` and run it with `npm run dev`.
- The app should work without a backend, but make sure that the request made to `/api/ping` on startup is successful before continuing.

## Backend

### Getting started
- Navigate to the backend directory: `cd backend`
- Install dependencies: `npm install`
- Start the development server: `npm run dev`

### Folder Structure

backend/
├── src/
│ ├── routes/
│ │ ├── patients.ts
│ │ └── diagnoses.ts
│ ├── services/
│ │ ├── patientService.ts
│ │ └── diagnoseService.ts
│ ├── types.ts
│ ├── utils.ts
│ └── index.ts
├── data/
│ ├── patients.ts
│ └── diagnoses.ts
├── build/
├── node_modules/
├── package.json
└── tsconfig.json

### API Endpoints

The backend provides the following API endpoints:

#### Patients

- `GET /api/patients`: Get all patients
- `POST /api/patients`: Add a new patient
- `GET /api/patients/:id`: Get a specific patient by ID
- `POST /api/patients/:id/entries`: Add a medical entry to a specific patient

#### Diagnoses

- `GET /api/diagnoses`: Get all diagnoses

#### Ping

- `GET /api/ping`: Check if the server is running

## Running the Full Stack Application

1. Start the backend server (instructions above)
2. Start the frontend development server (instructions above)
3. The frontend should now be able to communicate with the backend

Make sure both the frontend and backend are running simultaneously for the full functionality of the Patientor application.

