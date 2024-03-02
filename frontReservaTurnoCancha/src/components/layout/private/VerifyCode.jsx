import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const VerifyCode = () => {
  const navigate = useNavigate();
  // Para manejar el envio del codigo a verificar
  const [codigoVerificacionIngresado, setCodigoVerificacionIngresado] =
    useState("");
  // si el codigo es correcto
  const [verificadoCorrectamente, setVerificadoCorrectamente] = useState(false);
  // si el codigo es incorrecto
  const [codigoIncorrecto, setCodigoIncorrecto] = useState(false);

  const manejarVerificacion = async (e) => {
    e.preventDefault();
    const emailAEnviar = localStorage.getItem("email");
    try {
      const response = await fetch("/reservaturno/auth/verifycode", {
        method: "POST",
        body: JSON.stringify(emailAEnviar, codigoVerificacionIngresado),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const verificado = response.data;
      console.log(verificado);
      setTimeout(() => {
        setVerificadoCorrectamente(true);
      }, 4500);
      navigate("/");
    } catch (error) {
      console.error("Error en el servidor:", error.response.data);
      // Si el error es un BAD Request, establecer codigoIncorrecto a true
      if (error.response && error.response.status === 400) {
        setCodigoIncorrecto(true);
      }

      setTimeout(() => {
        setCodigoIncorrecto(false);
      }, 3000);
    }
  };

  return (
    <form onSubmit={manejarVerificacion}>
      <input
        id="codigoVerificacion"
        type="string"
        placeholder="ingrese los cuatro digitos que han llegado a su email"
        value={codigoVerificacionIngresado}
        onChange={(e) => setCodigoVerificacionIngresado(e.target.value)}
        className="input-moderno"
      />
      <button type="submit">Verificar</button>
    </form>
  );
};
