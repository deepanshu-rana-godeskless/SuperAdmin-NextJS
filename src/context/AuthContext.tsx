import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode
} from 'react';
import {
  getCurrentUser,
  login,
  logout
} from '@/app/auth/sign-in/services/auth';

interface AuthContextType {
  user: any;
  isLoading: boolean;
  isLoggedIn: boolean;
  login: (credentials: { email: string; password: string }) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getCurrentUser()
      .then((res) => {
        setUser(res.data);
      })
      .catch(() => {
        setUser(null);
      })
      .finally(() => setIsLoading(false));
  }, []);

  const handleLogin = async (credentials: {
    email: string;
    password: string;
  }) => {
    setIsLoading(true);
    await login(credentials);
    const res = await getCurrentUser();
    setUser(res.data);
    setIsLoading(false);
  };

  const handleLogout = async () => {
    setIsLoading(true);
    await logout();
    setUser(null);
    setIsLoading(false);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        isLoggedIn: !!user,
        login: handleLogin,
        logout: handleLogout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
}
