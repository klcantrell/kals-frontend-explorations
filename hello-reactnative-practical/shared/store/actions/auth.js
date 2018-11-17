import { API_KEY } from 'react-native-dotenv';
import { uiStartLoading, uiStopLoading } from './ui';

import startMainTabs from '../../screens/MainTabs/startMainTabs';

export const tryAuth = authData => {
  return dispatch => {
    dispatch(signUp(authData));
  };
};

export const signUp = authData => {
  const url = `https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=${API_KEY}`;
  return dispatch => {
    dispatch(uiStartLoading());
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
        if (data.error) {
          alert('Something went wrong, please try again');
          dispatch(uiStopLoading());
        } else {
          dispatch(uiStopLoading());
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
