import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Global } from "../../../helpers/Global";

export const VerifyCode = () => {
  const navigate = useNavigate();
  // Para manejar el envio del codigo a verificar

  // si el codigo es correcto
  const [verificadoCorrectamente, setVerificadoCorrectamente] = useState(false);
  // si el codigo es incorrecto
  const [codigoIncorrecto, setCodigoIncorrecto] = useState(false);

  const manejarVerificacion = async (e) => {
    e.preventDefault();
    const emailAEnviar = localStorage.getItem("email");
    let firstLetter = e.target.in.value;
    let secondLetter = e.target.inp.value;
    let thirdLetter = e.target.inpu.value;
    let fourthLetter = e.target.input.value;

    let CodeToVerify = firstLetter + secondLetter + thirdLetter + fourthLetter;

    const datos = {
      emailAEnviar: emailAEnviar,
      codigoVerificacionIngresado: CodeToVerify,
    };

    try {
      const response = await fetch(Global.url + "auth/verifycode", {
        method: "POST",
        body: JSON.stringify(datos),
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
    <>
      <form className="form__verify" onSubmit={manejarVerificacion}>
        <div className="verify__title">Verifica tu cuenta</div>
        <p className="verify__message">
          Te hemos enviado un código de verificación a tu email
        </p>
        <div className="verify__inputs-container">
          <input id="input1" type="text" maxLength="1" name="in" />
          <input id="input2" type="text" maxLength="1" name="inp" />
          <input id="input3" type="text" maxLength="1" name="inpu" />
          <input id="input4" type="text" maxLength="1" name="input" />
        </div>

        <button className="verify__submit">Verificar</button>
      </form>
    </>
  );
};
