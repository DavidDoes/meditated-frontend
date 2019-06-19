export const loadAuthToken = () => {
  return localStorage.getItem('authToken');
};

export const saveAuthToken = authToken => {
  try {
    // `try` to avoid Safari's incognito mode exception
    localStorage.setItem('authToken', authToken); // 'authToken' key, authToken value
  } catch (e) {}
};

export const clearAuthToken = () => {
  try {
    localStorage.removeItem('authToken');
  } catch (e) {}
};
