import dayjs from 'dayjs/esm';

import { Devise } from 'app/entities/enumerations/devise.model';

import { ITransaction, NewTransaction } from './transaction.model';

export const sampleWithRequiredData: ITransaction = {
  id: 73739,
  numeroMtn: 'wireless',
  montant: 52022,
  devise: Devise['DOLLAR'],
  dateTransaction: dayjs('2022-08-15'),
};

export const sampleWithPartialData: ITransaction = {
  id: 73379,
  numeroMtn: 'Borders',
  montant: 1828,
  devise: Devise['FCFA'],
  dateTransaction: dayjs('2022-08-15'),
};

export const sampleWithFullData: ITransaction = {
  id: 90439,
  numeroMtn: 'open olive',
  montant: 29096,
  devise: Devise['YEN'],
  dateTransaction: dayjs('2022-08-16'),
};

export const sampleWithNewData: NewTransaction = {
  numeroMtn: 'Computers clear-thinking Movies',
  montant: 90765,
  devise: Devise['LEONE'],
  dateTransaction: dayjs('2022-08-16'),
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
