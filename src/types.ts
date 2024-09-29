//gender types
export enum Gender {
  Female = "female",
  Male = "male",
  Other = "other",
} 

//health check rating types
export enum HealthCheckRating {
  "Healthy" = 0,
  "LowRisk" = 1,
  "HighRisk" = 2,
  "CriticalRisk" = 3
}

//diagnosis types 
export interface DiagnosisEntry {
  code: string;
  name: string;
  latin?: string;
}

//entry types
export interface BaseEntry {
  id: string;
  description: string;
  date: string;
  specialist: string;
  
  diagnosisCodes?:Array<DiagnosisEntry["code"]>;
}
//entry type enum
export enum EntryType {
  HealthCheck = "HealthCheck",
  OccupationalHealthcare = "OccupationalHealthcare",
  Hospital = "Hospital",
}
//health check entry type
export interface HealthCheckEntry extends BaseEntry {
  type: EntryType.HealthCheck;
  healthCheckRating: HealthCheckRating;
}

//hospital entry type
export interface HospitalEntry extends BaseEntry {
  type: EntryType.Hospital;
  discharge: {
    date: string;
    criteria: string;
  };
}

//occupational healthcare entry type
export interface OccupationalHealthcareEntry extends BaseEntry {
  type: EntryType.OccupationalHealthcare;
  employerName: string;
  sickLeave?: {
    startDate: string;
    endDate: string;
  };
}

//entry type
export type Entry =
  | HospitalEntry
  | OccupationalHealthcareEntry
  | HealthCheckEntry;

//patient types
export interface Patient {
  id: string;
  name: string;
  dateOfBirth: string;
  ssn: string;
  gender: Gender;
  occupation: string;
  entries: Entry[];
}

//new patient entry type
export type NewPatientEntry = Omit<Patient, "id" | "entries">;


//non sensitive patient entry type
export type NonSensitivePatientEntry = Omit<Patient, "ssn" | "entries">;

// Define special omit for unions
type UnionOmit<T, K extends string | number | symbol> = T extends unknown ? Omit<T, K> : never;
// Define Entry without the 'id' property
export type EntryFormValues = UnionOmit<Entry, "id">;

