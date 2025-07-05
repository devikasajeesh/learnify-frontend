import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8000",
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token"); // ✅ your JWT
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;

export const getCurrentUser = async () => {
  const res = await api.get("/auth/me");
  return res.data;
};

export const getPlanner = async () => {
  const res = await api.get("/auth/planner");
  return res.data.plan;
};

export const askQuestion = async (q: string) => {
  await api.post("/qa/ask", null, { params: { q } });
};

export const getAnswer = async (q: string) => {
  const res = await api.get("/qa/ai-answer", { params: { query: q } });
  return res.data.answer;
};

export const getSimilarQuestions = async (q: string) => {
  const res = await api.get("/qa/similar", { params: { query: q } });
  return res.data.similar; // Array of [question, user_id] pairs
};
