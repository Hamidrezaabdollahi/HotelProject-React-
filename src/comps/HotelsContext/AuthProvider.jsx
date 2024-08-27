import { createContext, useContext, useReducer } from "react";

const AuthContext = createContext();
const INITIAL_STATE = {
  user: null,
  isAuthenticated: false,
};
const FAKE_USER = {
  name: "Hamidreza",
  email: "user@gmail.com",
  password: "Kr1234!@#$",
};
const authReducer = (state, action) => {
  switch (action.type) {
    case "login":
      return {
        user: action.payload,
        isAuthenticated: true,
      };
    case "logout":
      return {
        user: null,
        isAuthenticated: false,
      };
    default:
      throw new Error("unknown action!");
  }
};

export default function AuthProvider({ children }) {
  const login = (email, password) => {
    if (email === FAKE_USER.email && password === FAKE_USER.password)
      dispatch({ type: "login", payload: FAKE_USER });
  };
  const logout = () => {
    dispatch({ type: "logout" });
  };

  const [{ user, isAuthenticated }, dispatch] = useReducer(
    authReducer,
    INITIAL_STATE
  );
  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
