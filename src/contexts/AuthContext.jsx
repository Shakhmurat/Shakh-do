import {
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';
import {
  getCurrentUser,
  loginUser,
  logoutUser,
} from '../utils/auth';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const savedUser = getCurrentUser();
    if (savedUser) {
      setUser(savedUser);
    }
  }, []);

  const login = (userData) => {
    loginUser(userData);
    setUser(userData);
  };

  const logout = () => {
    logoutUser();
    setUser(null);
  };

  return(
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
};

export const useAuth = () => useContext(AuthContext);
