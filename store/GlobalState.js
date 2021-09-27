import { createContext, useEffect, useReducer } from "react";
import { getData } from "../utils/fetchData";
import { ACTIONS } from "./Actions";
import reducers from "./Reducers";

export const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const initialState = { notify: {}, auth: {}, cart: [] };
  const [state, dispatch] = useReducer(reducers, initialState);

  useEffect(() => {
    const login = localStorage.getItem("login");
    if (login) {
      getData("auth/accessToken").then((res) => {
        if (res.err) {
          return localStorage.removeItem("login");
        }
        dispatch({
          type: ACTIONS.AUTH,
          payload: {
            token: res.access_token,
            user: res.user,
          },
        });
      });
    }
  }, []);

  return (
    <DataContext.Provider value={{ state, dispatch }}>
      {children}
    </DataContext.Provider>
  );
};
