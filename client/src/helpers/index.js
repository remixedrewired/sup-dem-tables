import axios from "axios";

const URL = "http://localhost:5000";

export const selectNames = {
  plan: { showName: "Plan your data", objName: "plan" },
  demand: { showName: "Demand scenario", objName: "demand" },
  supply: { showName: "Supply scenario", objName: "supply" },
};

export const fetchAllPlannings = () => axios.get(`${URL}/planning/all`);

export const deletePlanning = (id) => axios.delete(`${URL}/planning/${id}`);
