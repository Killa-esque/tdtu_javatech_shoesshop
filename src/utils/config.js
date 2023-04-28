export const USER_LOGIN = 'email';
export const USER_TOKEN = 'accessToken';

export const { saveStore, saveStoreJson, getStore, getStoreJson, removeStore } = {
  // save data as string
  saveStore: (name, stringValue) => {
    localStorage.setItem(name, stringValue)
  },
  // save data as object
  saveStoreJson: (name, value) => {
    const convertValue = JSON.stringify(value)
    localStorage.setItem(name, convertValue)
    return value
  },
  getStore: (name) => {
    if (localStorage.getItem(name)) {
      return localStorage.getItem(name)
    }
    return null
  },
  getStoreJson: (name) => {
    if (localStorage.getItem(name)) {
      return JSON.parse(localStorage.getItem(name))
    }
    return null
  },
  removeStore: (name) => {
    if (localStorage.getItem(name)) {
      localStorage.removeItem(name);
    }
  },

}
