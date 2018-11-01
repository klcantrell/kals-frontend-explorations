import { API_KEY } from 'react-native-dotenv';
import { TRY_AUTH } from './actionTypes';

export const tryAuth = authData => {
  return dispatch => {
    dispatch(signUp(authData));
  };
};

export const signUp = authData => {
  const url = `https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=${API_KEY}`;
  return dispatch => {
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
        console.log(data);
      })
      .catch(err => {
        console.log(err);
        alert('Something went wrong, please try again');
      });
  };
};
