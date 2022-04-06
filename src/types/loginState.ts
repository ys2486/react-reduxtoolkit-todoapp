export type LoginState = {
  authen: {
    username: string;
    password: string;
  };
  isLoginView: boolean;
  profile: {
    id: number;
    username: string;
  };
};
