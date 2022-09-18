import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { getFirebase } from "../firebase";

import Spinner from "../shared-components/Spinner";

export default function WithAuthRoute({ children }) {
  let navigate = useNavigate();
  const { auth } = getFirebase();
  const [user, loading] = useAuthState(auth);

  useEffect(() => {
    if (user === null && !loading) {
      navigate("/");
    }
  }, [user, navigate, loading]);

  if (loading) return <Spinner />;
  if (user) {
    return children;
  } else return null;
}
