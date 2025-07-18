import {
  getFirestore,
  collection,
  addDoc,
  query,
  where,
  orderBy,
  getDocs
} from "firebase/firestore";
import { getAuth } from "firebase/auth";
import app from "./firebaseConfig";

const db = getFirestore(app);
const auth = getAuth(app);

export const addMood = async ({ mood, note, teamId }) => {
  const user = auth.currentUser;
  if (!user) throw new Error("User not authenticated");

  await addDoc(collection(db, "moods"), {
    user_id: user.uid,
    mood,
    note,
    team_id: teamId || null,
    timestamp: new Date()
  });
};

export const getMoods = async () => {
  const user = auth.currentUser;
  if (!user) throw new Error("User not authenticated");

  const q = query(
    collection(db, "moods"),
    where("user_id", "==", user.uid),
    orderBy("timestamp", "desc")
  );

  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};
