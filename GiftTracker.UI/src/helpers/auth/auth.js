/* eslint-disable arrow-body-style */
// import axios from 'axios';
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
/*
axios.interceptors.request.use((request) => {
  debugger;
  const token = sessionStorage.getItem('token');

  if (token != null) {
    request.headers.Authorization = `Bearer ${token}`;
  }
  return request;
}, (error) => {
  return Promise.reject(error);
});
*/
const signInUser = async () => {
  const auth = getAuth();
  const provider = new GoogleAuthProvider();
  await signInWithPopup(auth, provider).then((result) => {
    console.warn(result);
  })
  .catch((error) =>
    console.warn(error));
};

const signOutUser = async () => {
  const auth = getAuth();
  await auth.signOut();
};

export { signInUser, signOutUser }
