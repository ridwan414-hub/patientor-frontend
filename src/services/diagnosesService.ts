import { apiBaseUrl } from "../constants";
import axios from "axios";
import { DiagnosisEntry } from "../types";

const getAll = async () => {
  const { data } = await axios.get<DiagnosisEntry[]>(
    `${apiBaseUrl}/diagnoses`
  );

  return data;
};

export default {
  getAll
};
    