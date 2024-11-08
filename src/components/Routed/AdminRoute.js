import { useState, useEffect } from "react";
import { useAuth } from "../../context/auth";
import axios from "axios";
import Spinner from "../Spinner";
import { Outlet } from "react-router-dom"; //import for nested routing

export default function AdminRoute() {
  const [ok, setOk] = useState(false);
  const [auth] = useAuth();

  useEffect(() => {
    const authCheck = async () => {
      try {
        const res = await axios.get("/api/v1/auth/admin-auth");
        if (res.data.ok) {
          setOk(true);
        } else {
          setOk(false);
        }
      } catch (error) {
        if (error.response && error.response.statua === 401) {
          setOk(false);
        } else {
          console.log(error);
        }
      }
    };

    if (auth?.token) authCheck();
  }, [auth?.token]);

  return ok ? <Outlet /> : <Spinner path="" />;
}
