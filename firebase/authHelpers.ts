// firebase/authHelpers.ts
import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import firebaseConfig from "./firbaseConfig";

export const signInUser = async (email: string, password: string) => {
  const { auth } = firebaseConfig();
  const userCredential = await signInWithEmailAndPassword(
    auth,
    email,
    password
  );
  const user = userCredential.user;

  if (user) {
    const token = await user.getIdToken();
    document.cookie = `authToken=${token}; path=/;`; // Set auth token cookie
  }

  return user;
};

export const signOutUser = async () => {
  const { auth } = firebaseConfig();
  await signOut(auth);
  document.cookie = "authToken=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT"; // Clear cookie
};
