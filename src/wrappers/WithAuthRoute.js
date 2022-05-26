import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { getAuth } from "firebase/auth";

import Spinner from "../shared-components/Spinner";

export default function WithAuthRoute({ children }) {
  let navigate = useNavigate();
  const [user, loading] = useAuthState(getAuth());

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
