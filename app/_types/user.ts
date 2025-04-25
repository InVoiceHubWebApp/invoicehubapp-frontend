export type User = {
  id: number;
  name: string;
  lastname: string;
  username: string;
  email: string;
};

export type UserBase = {
  name: string;
  lastname: string;
  email: string;
  username: string;
  password: string;
}