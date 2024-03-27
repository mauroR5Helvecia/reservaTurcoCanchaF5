import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const Logout = () => {
  const navigate = useNavigate();
  useEffect(() => {
    localStorage.clear();

    navigate("/");
  });
  return <h1>Estás cerrando sesión</h1>;
};
