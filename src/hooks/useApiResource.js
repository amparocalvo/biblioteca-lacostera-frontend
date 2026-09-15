import { useCallback, useEffect, useReducer } from "react";
import { useAuth } from "../context/AuthContext.jsx";

const initialState = {
  data: [],
  loading: true,
  error: ""
};

const reducer = (state, action) => {
  if (action.type === "loading") return { ...state, loading: true, error: "" };
  if (action.type === "success") return { data: action.payload, loading: false, error: "" };
  if (action.type === "error") return { ...state, loading: false, error: action.payload };
  return state;
};

export const useApiResource = (fetcher, params) => {
  const { token } = useAuth();
  const [state, dispatch] = useReducer(reducer, initialState);

  const load = useCallback(async () => {
    if (!token) return;
    dispatch({ type: "loading" });

    try {
      const data = await fetcher(token, params);
      dispatch({ type: "success", payload: data });
    } catch (error) {
      dispatch({ type: "error", payload: error.message });
    }
  }, [fetcher, params, token]);

  useEffect(() => {
    load();
  }, [load]);

  return { ...state, reload: load };
};
