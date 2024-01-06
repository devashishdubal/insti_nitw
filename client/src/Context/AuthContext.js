import { createContext, useEffect, useState, useContext } from "react";
import { auth } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState({});

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      // get request 
    });

    return () => {
      unsub();
    };
  }, []);

  return (
    <AuthContext.Provider value={{ currentUser }}>
      {children}
    </AuthContext.Provider>
  );
};
