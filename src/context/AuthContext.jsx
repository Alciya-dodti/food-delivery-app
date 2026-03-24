import { createContext, useContext, useState } from "react";
 
// 1. Create the context object
const AuthContext = createContext();
 
// 2. Provider component — wraps the app, holds the state
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null); // null = not logged in
 
  // Simulate login — in real app this would call an API
  const login = (name, email) => {
    setUser({ name, email });
  };
 
  const logout = () => {
    setUser(null);
  };
 
  // Everything inside "value" is available to any child component
  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
 
// 3. Custom hook — makes using context cleaner
// Instead of: const { user } = useContext(AuthContext)
// You write:   const { user } = useAuth()
export function useAuth() {
  return useContext(AuthContext);
}
