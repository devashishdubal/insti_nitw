import React, { createContext, useEffect, useState } from "react";
import axios from "axios";

const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [userDetails, setUserDetails] = useState({});
  const [complete, setComplete] = useState(false);

  useEffect(() => {
    const authenticateWithPassport = async () => {
      try {
        const response = await axios.get("http://localhost:8000/user", {withCredentials: true,});
        setUserDetails(response.data === "" ? null : response.data.user)
        setCurrentUser(response.data === "" ? null : response.data.role)
        setComplete(true);
      } catch (error) {
        console.error("Error checking Passport.js session:", error);
        setComplete(true);
      }
    };

    authenticateWithPassport();
  }, []);

  return (
    complete && (
      <AuthContext.Provider value={{ currentUser, userDetails, setUserDetails, setCurrentUser}}>
        {children}
      </AuthContext.Provider>
    )
  );
};

export { AuthContextProvider, AuthContext };
