import { LOCAL_STORAGE } from "../contant/localStorage";

export const checkAuthen = () => {
  return !!localStorage.getItem(LOCAL_STORAGE.token);
};
