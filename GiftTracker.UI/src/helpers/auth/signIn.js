import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';

const signIn = async () => {
  const auth = getAuth();
  const provider = new GoogleAuthProvider();
  await signInWithPopup(auth, provider).then((result) => {
    console.warn(result);
  })
  .catch((error) =>
    console.warn(error));
};

export default signIn;
