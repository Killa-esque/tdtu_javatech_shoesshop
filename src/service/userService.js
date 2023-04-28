import { https } from "./configURL";


export const userService = {
  login: (userLogin) => {
    return https.post(`/api/auth/login`, userLogin)
  },
  register: (userRegister) => {
    return https.post(`/api/auth/signup`, userRegister)
  },
};
