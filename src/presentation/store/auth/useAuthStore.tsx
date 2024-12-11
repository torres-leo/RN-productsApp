import {authCheckStatus, authLogin} from '@app/actions/auth/auth';
import {StorageAdapter} from '@app/config/adapters/storage-adapter';
import {User} from '@app/domain/entities/user';
import {AuthStatus} from '@app/infrastructure/interfaces/auth.status';
import {create} from 'zustand';

export interface AuthState {
  status: AuthStatus;
  token?: string;
  user?: User;

  login: (email: string, password: string) => Promise<boolean>;
  logout: () => Promise<void>;
  checkStatus: () => Promise<void>;
}

export const useAuthStore = create<AuthState>()((set, get) => ({
  status: 'checking',
  token: undefined,
  user: undefined,

  login: async (email: string, password: string) => {
    const response = await authLogin(email, password);

    if (!response) {
      set({status: 'unauthenticated', token: undefined, user: undefined});
      return false;
    }

    await StorageAdapter.setItem('token', response.token);

    set({status: 'authenticated', token: response.token, user: response.user});
    return true;
  },

  checkStatus: async () => {
    const response = await authCheckStatus();

    if (!response) {
      set({status: 'unauthenticated', token: undefined, user: undefined});
      return;
    }

    set({status: 'authenticated', token: response.token, user: response.user});
  },
  logout: async () => {
    await StorageAdapter.removeItem('token');
    set({status: 'unauthenticated', token: undefined, user: undefined});
  },
}));
