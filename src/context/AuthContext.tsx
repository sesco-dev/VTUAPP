import { createContext, useContext, useState, ReactNode } from 'react';

type Role = 'USER' | 'TENANT_ADMIN' | 'SUPER_ADMIN';

interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
  walletBalance: number;
  tenantName?: string;
}

interface AuthContextType {
  user: User | null;
  login: (role: Role) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  const login = (role: Role) => {
    // Mock login
    const mockUser: User = {
      id: '1',
      name: role === 'SUPER_ADMIN' ? 'Global Admin' : role === 'TENANT_ADMIN' ? 'Tenant Manager' : 'John Doe',
      email: 'user@example.com',
      role,
      walletBalance: 25000,
      tenantName: role === 'TENANT_ADMIN' ? 'SwiftVtu' : undefined,
    };
    setUser(mockUser);
  };

  const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
