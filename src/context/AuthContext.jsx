import { createContext, useContext, useMemo, useState } from "react";
import { loginRequest } from "../services/api.js";

const AuthContext = createContext(null);
const storageKey = "biblioteca-lacostera-auth";

const getStoredAuth = () => {
  try {
    return JSON.parse(localStorage.getItem(storageKey)) || { user: null, token: null };
  } catch {
    return { user: null, token: null };
  }
};

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(getStoredAuth);

  const login = async (credentials) => {
    const data = await loginRequest(credentials);
    localStorage.setItem(storageKey, JSON.stringify(data));
    setAuth(data);
  };

  const logout = () => {
    localStorage.removeItem(storageKey);
    setAuth({ user: null, token: null });
  };

  const value = useMemo(
    () => ({
      ...auth,
      isAuthenticated: Boolean(auth.token),
      isAdmin: auth.user?.role === "admin",
      login,
      logout
    }),
    [auth]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
