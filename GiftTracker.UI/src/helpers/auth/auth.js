/* eslint-disable arrow-body-style */
import axios from 'axios';
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { getUserByFirebaseUId,  addUserWithGoogleObject }  from '../data/userData';

axios.interceptors.request.use((request) => {
  const token = sessionStorage.getItem('token');
  if (token != null) {
    request.headers.Authorization = `Bearer ${token}`;
  }
  return request;
}, (error) => {
  return Promise.reject(error);
});

const signInUser = async (setUser) => {
  const auth = getAuth();
  const provider = new GoogleAuthProvider();
  await signInWithPopup(auth, provider).then((result) => {
    if (result.user) {
      result.user.getIdToken().then((token) => sessionStorage.setItem('token', token))
        .then(() => {
          getUserByFirebaseUId(result.user.uid).then((response) => {
          if (response !== '')
          setUser(response);
          else {
            console.warn('User not found');
          }
      })
      .catch(() => {
        addUserWithGoogleObject(result.user).then(() => {
          getUserByFirebaseUId(result.user.uid).then((response) => {
            if (response !== '')
            setUser(response);
          })
        });
      });
    });
    }
  })
  .catch((error) =>
    console.warn(error));
};

const signOutUser = async (setUser) => {
  const auth = getAuth();
  await auth.signOut().then(() => {
    sessionStorage.removeItem('token');
    setUser(false);
  });
};

export { signInUser, signOutUser }
