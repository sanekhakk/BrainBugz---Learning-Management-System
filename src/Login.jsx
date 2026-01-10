import React, { useState } from "react";
import { auth, db } from "./firebase";
import { signInWithEmailAndPassword } from "firebase/auth";

export default function Login({ setUserRole }) {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");

  const login = async () => {
    try {
      const userCred = await signInWithEmailAndPassword(auth, email, pass);
      const user = userCred.user;

      // After login, check user role
      const roleRef = doc(db, "users", user.uid);
      const roleSnap = await getDoc(roleRef);

      if (roleSnap.exists()) {
        const role = roleSnap.data().role;
        setUserRole(role);
      } else {
        alert("User not found in Firestore!");
      }

    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <input placeholder="Email" onChange={e => setEmail(e.target.value)} />
      <input placeholder="Password" type="password" onChange={e => setPass(e.target.value)} />
      <button onClick={login}>Login</button>
    </div>
  );
}
