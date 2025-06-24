import { environment as environmentDev } from './environment.development';

export const environment = {
  ...environmentDev,
  baseUrl: 'http://localhost:6021'
};
