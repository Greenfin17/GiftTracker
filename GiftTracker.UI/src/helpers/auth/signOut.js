import { getAuth }from 'firebase/auth';

const signOut = async () => {
  const auth = getAuth();
  await auth.signOut();
};

export default signOut;
