import { AuthRoutes } from "./auth.routes";
import { AppRoutes } from "./app.routes";
import { useContext } from "react";
import { AuthContext } from "../contexts/auth";
import { Loading } from "../components/Loading";

export function Routes() {
  const { signed, loading } = useContext(AuthContext)

  if (loading) {
    return <Loading />
  }

  return (
    signed ? <AppRoutes /> : <AuthRoutes />
  )

}