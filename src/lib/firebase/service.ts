import { addDoc, collection, doc, getDoc, getDocs, getFirestore, query, where } from "firebase/firestore";
import app from "./init";
import bcrypt from "bcrypt";

const firestore = getFirestore(app);

export async function retrieveData(colletionName: string) {
  const snapshot = await getDocs(collection(firestore, colletionName));

  const data = snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));

  return data;
}

export async function retrieveDataById(colletionName: string, id: string) {
  const snapshot = await getDoc(doc(firestore, colletionName, id));

  const data = snapshot.data();

  return data;
}

export async function signUp(userData: { email: string; password: string; fullName: string; role?: string }) {
  try {
    const { email } = userData;

    const q = query(collection(firestore, "users"), where("email", "==", email));
    const snapshot = await getDocs(q);

    if (!snapshot.empty) {
      return { status: 400, message: "User already exists" };
    }

    const hashedPassword = await bcrypt.hash(userData.password, 10);

    const newUser = {
      ...userData,
      password: hashedPassword,
      role: "member",
    };

    await addDoc(collection(firestore, "users"), newUser);

    return { status: 200, message: "User registered successfully" };
  } catch (error: any) {
    return { status: 500, message: error.message };
  }
}

export async function signIn(userData: { email: string }) {
  try {
    const { email } = userData;
    const q = query(collection(firestore, "users"), where("email", "==", email));
    const snapshot = await getDocs(q);

    const data = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    if (data) {
      return data[0];
    } else {
      return null;
    }
  } catch (error: any) {
    return null;
  }
}
