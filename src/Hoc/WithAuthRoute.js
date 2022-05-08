import React, { useEffect } from "react";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import OverlayLoader from "../Components/OverlayLoader";
// import { useAuthState } from "react-firebase-hooks/auth";
// import { getAuth } from "firebase/auth";

export default function WithAuthRoute({ children }) {
  let navigate = useNavigate();
  const { user } = useContext(AuthContext);
  // const [, loading] = useAuthState(getAuth());

  useEffect(() => {
    if (user === null) {
      navigate("/");
    }
  }, [user]);
  console.log(user);
  if (user === undefined) return <OverlayLoader />;
  if (user) {
    return children;
  } else return null;
}
