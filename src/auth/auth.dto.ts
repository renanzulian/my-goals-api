export type AuthDTO = {
  email: string;
  password: string;
};

export type SignUpResponseDTO = {
  message: string;
};

export type SignInResponseDTO = {
  token: string;
  userId: number;
};
