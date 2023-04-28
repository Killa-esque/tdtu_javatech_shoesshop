export const isLoggedIn = () => {
  return localStorage.getItem('accessToken') !== null;
};

export const login = (token) => {
  localStorage.setItem('accessToken', token);
};

export const logout = () => {
  localStorage.removeItem('accessToken');
  localStorage.removeItem('email');
};
