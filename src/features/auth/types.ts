import { UserCredential } from 'firebase/auth';

type TLoginWithEmailAndPasswordResult = UserCredential;

export type TAuthContext = {
  isAuthenticated: boolean | null;
  user?: any;
  loginWithEmailAndPassword: (email: string, password: string) => Promise<TLoginWithEmailAndPasswordResult>;
  logout: () => void;
};
