import { createContext, useEffect, useReducer } from "react";
import { getData } from "../utils/fetchData";
import { ACTIONS } from "./Actions";
import reducers from "./Reducers";

export const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const initialState = { notify: {}, auth: {}, cart: [], modal: [] };
  const [state, dispatch] = useReducer(reducers, initialState);
  const { cart } = state;

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

  useEffect(() => {
    const __next__cart = JSON.parse(localStorage.getItem("__next__cart"));

    if (__next__cart)
      dispatch({ type: ACTIONS.ADD_CART, payload: __next__cart });
  }, []);

  useEffect(() => {
    localStorage.setItem("__next__cart", JSON.stringify(cart));
  }, [cart]);

  return (
    <DataContext.Provider value={{ state, dispatch }}>
      {children}
    </DataContext.Provider>
  );
};
