export type UserSession = {
  token: string;
  user: {
    email: string;
    id: string;
    name: string;
  };
};