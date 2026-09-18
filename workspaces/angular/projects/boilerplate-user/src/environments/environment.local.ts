import { environment as environmentDev } from './environment.development';

export const environment = {
  ...environmentDev,
  api: {
    url: 'http://localhost:5021'
  },
};
