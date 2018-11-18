import { AsyncStorage } from 'react-native';
import { API_KEY } from 'react-native-dotenv';
import { AUTH_SET_TOKEN } from './actionTypes';
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
          dispatch(authStoreToken(data.idToken, data.expiresIn));
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

export const authStoreToken = (token, expiresIn) => {
  const expiryDate = Date.now() + expiresIn * 1000;
  return dispatch => {
    dispatch(authSetToken(token));
    AsyncStorage.setItem('places:auth:token', token);
    AsyncStorage.setItem('places:auth:expiryDate', expiryDate.toString());
  };
};

export const authSetToken = token => {
  return {
    type: AUTH_SET_TOKEN,
    payload: token,
  };
};

export const authGetToken = () => {
  return (dispatch, getState) => {
    return new Promise((resolve, reject) => {
      let asyncStorageToken;
      const token = getState().auth.token;
      if (!token) {
        AsyncStorage.getItem('places:auth:token')
          .then(tokenFromStorage => {
            asyncStorageToken = tokenFromStorage;
            if (!tokenFromStorage) {
              return reject();
            }
            return AsyncStorage.getItem('places:auth:expiryDate');
          })
          .then(expiryDate => {
            const now = Date.now();
            if (!expiryDate || now >= Number(expiryDate)) {
              return reject();
            }
            dispatch(authSetToken(asyncStorageToken));
            resolve(asyncStorageToken);
          })
          .catch(err => reject());
      } else {
        resolve(token);
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

export const authClearStorage = () => {
  return dispatch => {
    AsyncStorage.removeItem('places:auth:token');
    AsyncStorage.removeItem('places:auth:expiryDate');
  };
};
