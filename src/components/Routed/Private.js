import { useState, useEffect } from "react";
import { useAuth } from "../../context/auth";
import axios from "axios";
import Spinner from "../Spinner";
import { Outlet } from "react-router-dom"; //import for nested routing

export default function PrivateRoute() {
  const [ok, setOk] = useState(false);
  const [auth] = useAuth();

  useEffect(() => {
    const authCheck = async () => {
      //   const res = await axios.get("/api/v1/auth/user-auth", {
      //     headers: {
      //       Authorization: auth?.token,
      //     },
      //   }); // default axios set in context auth.js
      const res = await axios.get("/api/v1/auth/user-auth");
      if (res.data.ok) {
        setOk(true);
      } else {
        setOk(false);
      }
    };
    if (auth?.token) authCheck();
  }, [auth?.token]);

  return ok ? <Outlet /> : <Spinner />;
}
