import axios from 'axios';
import { parseCookies } from 'nookies';

export function getAPIClient(ctx?: any) {
  const { 'academic_maps.auth': token } = parseCookies(ctx);

  const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_URL_API,
  });

  if (token) {
    api.defaults.headers['Authorization'] = token;
  }

  return api;
}
