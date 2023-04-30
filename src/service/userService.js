import { https } from "./configURL";


export const userService = {
  login: (userLogin) => {
    return https.post(`/api/auth/login`, userLogin)
  },
  logout: () => {
    return https.post(`/api/auth/logout`)
  },
  register: (userRegister) => {
    return https.post(`/api/auth/signup`, userRegister)
  },
  getProfile: () => {
    return https.post(`/api/auth/getProfile`)
  },
  updateProfile: (profile) => {
    return https.put(`/api/users/profile`, profile)
  },
  updatePassword: (password) => {
    return https.put(`/api/users/updatePass`, password)
  },


};
