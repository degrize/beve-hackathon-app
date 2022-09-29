import dayjs from 'dayjs/esm';
import { ITransaction } from 'app/entities/transaction/transaction.model';
import { ICreateurAfricain } from 'app/entities/createur-africain/createur-africain.model';
import { IDonnateur } from 'app/entities/donnateur/donnateur.model';

export class SDon {
  id!: number;
  description?: string | null;
  dateDon!: string;
  transaction?: Pick<ITransaction, 'id' | 'numeroMtn'> | null;
  createurAfricain?: Pick<ICreateurAfricain, 'id' | 'label'> | null;
  donnateur?: Pick<IDonnateur, 'id' | 'prenom'> | null;
  montant!: number;
}
