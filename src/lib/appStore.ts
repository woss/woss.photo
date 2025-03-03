import { MaculaPublicApi } from './maculaApi';

export const licensesList = {
  no: 'No license',
  arr: 'All rights reserved',
  'cc-by': 'Attribution (CC BY)',
  'cc-by-sa': 'ShareAlike (CC BY-SA)',
  'cc-by-nc': 'NonCommercial (CC BY-NC)',
  'cc-by-nc-sa': 'NonCommercial-ShareAlike (CC BY-NC-SA)',
  'cc-by-nd': 'NoDerivs (CC BY-ND)',
  'cc-by-nc-nd': 'NonCommercial-NoDerivs (CC BY-NC-ND)',
  'cc-0': 'Public domain (CC0)'
};

export const maculaInstance = new MaculaPublicApi('woss');
