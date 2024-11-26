import axios from "axios";
import  { createContext, useContext, useEffect, useState } from "react";
import { BASE_URL } from "../config/url";
import { useDispatch } from "react-redux";
import { setUser } from "../redux/slices/authSlice";


const UserContext = createContext<any>(null);

export const UserContextProvider = ({ children }: any) => {
  const [currentUser, setCurrentUserState] = useState(null); 
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { data } = await axios.get(`${BASE_URL}/api/v1/me`, {
          withCredentials: true, 
        });
        setCurrentUserState(data.user);
        dispatch(setUser(data.user)); 
      } catch (err) {
        console.error("Failed to fetch current user", err);
      }
    };

    fetchUser();
  }, [dispatch]);




  return (
    <UserContext.Provider value={{ currentUser }}>
      {children}
    </UserContext.Provider>
  );
};

// Custom hook to access the current user
export const useUser = () => {
  return useContext(UserContext);
};
