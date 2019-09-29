import axios from "axios";

export const selectNames = {
  plan: { showName: "Plan your data", objName: "plan" },
  demand: { showName: "Demand scenario", objName: "demand" },
  supply: { showName: "Supply scenario", objName: "supply" },
};

export const fetchAllPlannings = () => axios.get(`/planning/all`);

export const deletePlanning = (id) => axios.delete(`/planning/${id}`);
