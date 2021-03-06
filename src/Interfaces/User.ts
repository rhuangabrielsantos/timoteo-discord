export interface User {
  id?: string;
  name: string;
  cpf: string;
  electronicSignature: string;
  accessPassword: string;
  accountNumber: string;
  token?: string;

  createdAt?: Date;
  updatedAt?: Date;
}
