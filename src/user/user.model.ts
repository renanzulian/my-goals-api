export type UserRequest = {
  email: string;
  password: string;
};

export type User = UserRequest & {
  id: number;
};
