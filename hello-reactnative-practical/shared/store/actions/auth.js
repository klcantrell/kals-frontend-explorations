import { AsyncStorage } from 'react-native';
import { API_KEY } from 'react-native-dotenv';
import App from '../../App';
import { AUTH_SET_TOKEN, AUTH_REMOVE_TOKEN } from './actionTypes';
import { uiStartLoading, uiStopLoading } from './ui';

import startMainTabs from '../../screens/MainTabs/startMainTabs';

export const tryAuth = (authData, authMode) => {
  return dispatch => {
    dispatch(uiStartLoading());
    let url = `https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=${API_KEY}`;
    if (authMode === 'signup') {
      url = `https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=${API_KEY}`;
    }
    fetch(url, {
      method: 'POST',
      body: JSON.stringify({
        email: authData.email,
        password: authData.password,
        returnSecureToken: true,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(res => res.json())
      .then(data => {
        dispatch(uiStopLoading());
        if (!data.idToken) {
          alert('Something went wrong, please try again');
        } else {
          dispatch(
            authStoreToken(data.idToken, data.expiresIn, data.refreshToken)
          );
          startMainTabs();
        }
      })
      .catch(err => {
        console.log(err);
        alert('Something went wrong, please try again');
        dispatch(uiStopLoading());
      });
  };
};

export const authStoreToken = (token, expiresIn, refreshToken) => {
  const expiryDate = Date.now() + expiresIn * 1000;
  return dispatch => {
    dispatch(authSetToken(token, expiryDate));
    AsyncStorage.setItem('places:auth:token', token);
    AsyncStorage.setItem('places:auth:expiryDate', expiryDate.toString());
    AsyncStorage.setItem('places:auth:refreshToken', refreshToken);
  };
};

export const authSetToken = (token, expiryDate) => {
  return {
    type: AUTH_SET_TOKEN,
    payload: { token, expiryDate },
  };
};

export const authGetToken = () => {
  return (dispatch, getState) => {
    return new Promise((resolve, reject) => {
      let asyncStorageToken;
      const { token, tokenExpiryDate } = getState().auth;
      const now = Date.now();
      if (!token || now >= tokenExpiryDate) {
        return AsyncStorage.getItem('places:auth:token')
          .then(tokenFromStorage => {
            asyncStorageToken = tokenFromStorage;
            if (!tokenFromStorage) {
              return reject();
            }
            return AsyncStorage.getItem('places:auth:expiryDate');
          })
          .then(expiryDate => {
            if (!expiryDate || now >= Number(expiryDate)) {
              return reject();
            }
            dispatch(authSetToken(asyncStorageToken, expiryDate));
            resolve(asyncStorageToken);
          })
          .catch(err => reject());
      } else {
        resolve(token);
      }
    })
      .catch(err => {
        return dispatch(authTryRefreshToken());
      })
      .then(token => {
        if (!token) {
          throw Error('No valid token found');
        } else {
          return token;
        }
      });
  };
};

export const authAutoSignIn = () => {
  return dispatch => {
    dispatch(authGetToken())
      .then(token => {
        startMainTabs();
      })
      .catch(err => console.log('Failed to fetch token'));
  };
};

export const authTryRefreshToken = () => {
  return dispatch => {
    return AsyncStorage.getItem('places:auth:refreshToken')
      .then(refreshToken => {
        if (refreshToken) {
          return fetch(
            `https://securetoken.googleapis.com/v1/token?key=${API_KEY}`,
            {
              method: 'POST',
              headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
              },
              body: `grant_type=refresh_token&refresh_token=${refreshToken}`,
            }
          );
        } else {
          return null;
        }
      })
      .then(res => res.json())
      .then(data => {
        if (data.id_token) {
          dispatch(
            authStoreToken(data.id_token, data.expires_in, data.refresh_token)
          );
          return data.id_token;
        } else {
          dispatch(authClearStorage());
        }
      })
      .catch(err => console.log(err));
  };
};

export const authClearStorage = () => {
  return dispatch => {
    return Promise.all([
      AsyncStorage.removeItem('places:auth:token'),
      AsyncStorage.removeItem('places:auth:expiryDate'),
      AsyncStorage.removeItem('places:auth:refreshToken'),
    ]);
  };
};

export const authLogout = () => {
  return dispatch => {
    dispatch(authClearStorage()).then(() => {
      dispatch(authRemoveToken());
      App();
    });
  };
};

export const authRemoveToken = () => {
  return {
    type: AUTH_REMOVE_TOKEN,
  };
};
