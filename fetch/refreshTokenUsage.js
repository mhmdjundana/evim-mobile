import axios from 'axios';
import * as Keychain from 'react-native-keychain';

const api = axios.create({
  baseURL: 'YOUR_API_BASE_URL',
});

api.interceptors.request.use(
  async (config) => {
    try {
      const credentials = await Keychain.getGenericPassword({ service: 'YOUR_APP_NAME' }); // Use a service name
      if (credentials) {
        config.headers.Authorization = `Bearer ${credentials.password}`; // credentials.password contains the access token
      }
      return config;
    } catch (error) {
      console.error('Error adding token to request:', error);
      return config;
    }
  },
  async (error) => {
    const originalRequest = error.config;

    if (error.response && error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshCredentials = await Keychain.getGenericPassword({ service: 'YOUR_APP_NAME_REFRESH' }); // Get refresh token
        if (!refreshCredentials) {
          throw new Error("No refresh token found"); // Handle cases where refresh token is not available
        }
        const refreshResponse = await api.post('/api/refresh-token', {
          refreshToken: refreshCredentials.password, // refreshCredentials.password contains the refresh token
        });

        const newAccessToken = refreshResponse.data.accessToken;
        const newRefreshToken = refreshResponse.data.refreshToken;

        // Store new tokens securely
        await Keychain.setGenericPassword('YOUR_APP_NAME', 'YOUR_USERNAME', newAccessToken);
        await Keychain.setGenericPassword('YOUR_APP_NAME_REFRESH', 'YOUR_USERNAME', newRefreshToken);


        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return api(originalRequest);

      } catch (refreshError) {
        console.error('Error refreshing token:', refreshError);
        // Clear tokens from keychain and redirect to login
        await Keychain.resetGenericPassword({ service: 'YOUR_APP_NAME' });
        await Keychain.resetGenericPassword({ service: 'YOUR_APP_NAME_REFRESH' });
        // Redirect to login screen
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default api;


// Example of storing tokens after login:

const storeTokens = async (accessToken, refreshToken) => {
    try {
      await Keychain.setGenericPassword('YOUR_APP_NAME', 'YOUR_USERNAME', accessToken); // Store access token
      await Keychain.setGenericPassword('YOUR_APP_NAME_REFRESH', 'YOUR_USERNAME', refreshToken); // Store refresh token
    } catch (error) {
      console.error("Error storing tokens:", error);
    }
  };


// Example of retrieving tokens:

const retrieveTokens = async () => {
    try {
      const accessTokenCredentials = await Keychain.getGenericPassword({ service: 'YOUR_APP_NAME' });
      const refreshTokenCredentials = await Keychain.getGenericPassword({ service: 'YOUR_APP_NAME_REFRESH' });

      const accessToken = accessTokenCredentials ? accessTokenCredentials.password : null;
      const refreshToken = refreshTokenCredentials ? refreshTokenCredentials.password : null;

      return { accessToken, refreshToken };
    } catch (error) {
      console.error("Error retrieving tokens:", error);
      return { accessToken: null, refreshToken: null };
    }
  };