import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import userContext from "./UserContext";
import { auth } from "../FireBase/fireBase";

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  // console.log(user);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      console.log(user);
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  return (
    <userContext.Provider value={{ user, setUser }}>
      {children}
    </userContext.Provider>
  );
};

export default UserProvider;
