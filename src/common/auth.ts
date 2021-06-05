const TOKEN_KEY = 'jwtToken';

const parse = JSON.parse;
const stringify = JSON.stringify;

const auth = {
  clear(key: string) {
    if (localStorage && localStorage.getItem(key)) {
      return localStorage.removeItem(key);
    }

    if (sessionStorage && sessionStorage.getItem(key)) {
      return sessionStorage.removeItem(key);
    }

    return null;
  },

  clearAppStorage() {
    if (localStorage) {
      localStorage.clear();
    }

    if (sessionStorage) {
      sessionStorage.clear();
    }
  },

  clearToken(tokenKey = TOKEN_KEY) {
    return auth.clear(tokenKey);
  },

  get(key: string) {
    if (localStorage && localStorage.getItem(key)) {
      return parse(localStorage.getItem(key) || '') || null;
    }

    if (sessionStorage && sessionStorage.getItem(key)) {
      return parse(sessionStorage.getItem(key) || '') || null;
    }

    return null;
  },

  getToken(tokenKey = TOKEN_KEY) {
    return auth.get(tokenKey);
  },

  set(value: string, key: string) {
    if (localStorage) {
      return localStorage.setItem(key, stringify(value));
    }

    if (sessionStorage) {
      return sessionStorage.setItem(key, stringify(value));
    }

    return null;
  },

  setToken(value = '', tokenKey = TOKEN_KEY) {
    return auth.set(value, tokenKey);
  },
};

export default auth;
