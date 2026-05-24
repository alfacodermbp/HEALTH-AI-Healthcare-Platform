import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

export const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const getSymptomsAnalysis = async (symptoms: string) => {
  const res = await api.post('/symptoms/analyze', { symptoms });
  return res.data;
};

export const getSmartRecommendations = async (data: any) => {
  const res = await api.post('/recommendations', data);
  return res.data;
};

export const getDoctors = async (params: any) => {
  const res = await api.get('/doctors', { params });
  return res.data;
};

export const getHospitals = async (params: any) => {
  const res = await api.get('/hospitals', { params });
  return res.data;
};

export const getGovtVsPrivate = async (params: any) => {
  const res = await api.get('/hospitals/compare', { params });
  return res.data;
};

export const analyzeReportMock = async (data: any) => {
  const res = await api.post('/reports/analyze', data);
  return res.data;
};
