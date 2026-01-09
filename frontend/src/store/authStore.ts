/**
 * Auth Store
 * 
 * Manages player session state using Zustand.
 */

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Session } from '../shared/types';

interface AuthState {
  session: Session | null;
  setSession: (session: Session | null) => void;
  clearSession: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      session: null,
      setSession: (session) => set({ session }),
      clearSession: () => set({ session: null }),
    }),
    {
      name: 'simon-auth-storage', // LocalStorage key
    }
  )
);
