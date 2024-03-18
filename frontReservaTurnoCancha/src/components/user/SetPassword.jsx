import { toast } from "sonner";
import { Global } from "../../helpers/Global";
import { useForm } from "../../hooks/useForm";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import imgOpen from "../../assets/img/eye-open.svg";
import imgClosed from "../../assets/img/eye-closed.svg";
export const SetPassword = () => {
  const navigate = useNavigate();
  const { form, changed } = useForm();
  const [password, setPassword] = useState("");
  const [pass1, setPass1] = useState(true);
  const [pass2, setPass2] = useState(false);
  const [pass3, setPass3] = useState(false);
  const [showPassword, setShowPassword] = useState();
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  //Verifica que la contrasena sea segura
  const verifyPassword = (e) => {
    let newPassword = e.target.value;

    const passwordRegex = /^(?=.*[A-Z])(?=.*\d).{8,}$/;

    if (!passwordRegex.test(newPassword)) {
      e.target.setCustomValidity(
        "La contraseña debe contener al menos una letra mayúscula, un número y tener una longitud mínima de 8 caracteres."
      );
    } else {
      e.target.setCustomValidity("");
    }

    setPassword(newPassword);
  };

  //Funcion para primer metodo de restablecimiento de password
  const setPassword1 = async (e) => {
    e.preventDefault();

    let setPasswordForm = form;

    // Mostrar el mensaje de carga
    const loadingToast = toast.loading("Procesando...", { duration: 4000 });

    const request = await fetch(Global.url + "auth/setpassword1", {
      method: "POST",
      body: JSON.stringify(setPasswordForm),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (request.status == 200) {
      // Ocultar el mensaje de carga
      toast.dismiss(loadingToast);
      localStorage.setItem("emailVerify", form.email);
      toast.success(
        "Revise su email, hemos enviado un codigo para continuar el proceso"
      );
      setTimeout(() => {
        setPass1(false);
        setPass2(true);
      }, 3000);
    } else {
      toast.error("Usuario o contraseña incorrecta");
    }
  };

  //Funcion para segundo metodo de restablecimiento de password
  const setPassword2 = async (e) => {
    e.preventDefault();

    const emailFromLocalStorage = localStorage.getItem("emailVerify");

    let setPasswordForm = {
      ...form,
      email: emailFromLocalStorage, // Agregar el email recuperado del localStorage al objeto setPasswordForm
    };

    const request = await fetch(Global.url + "auth/setpassword2", {
      method: "POST",
      body: JSON.stringify(setPasswordForm),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (request.status == 200) {
      toast.success("Ultimo paso");
      setTimeout(() => {
        setPass2(false);
        setPass3(true);
      }, 3000);
    } else {
      toast.error("Intente nuevamente mas tarde");
    }
  };

  //Funcion para tercer metodo de restablecimiento de password

  const setPassword3 = async (e) => {
    e.preventDefault();

    const emailFromLocalStorage = localStorage.getItem("emailVerify");

    let setPasswordForm = {
      ...form,
      email: emailFromLocalStorage, // Agregar el email recuperado del localStorage, este
      //email se utiliza para buscar el usuario en base a lo ingresado al sistema. Luego de continuado el proceso
      //de restablecimiento, se elimina de localStorage
    };

    const request = await fetch(Global.url + "auth/setpassword3", {
      method: "POST",
      body: JSON.stringify(setPasswordForm),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (request.status == 200) {
      localStorage.removeItem("emailVerify");

      toast.success("La contraseña fue restablecida exitosamente");
      setTimeout(() => {
        navigate("/login");
      }, 3000);
    } else {
      toast.error("Hubo un error vuelva a intentarlo mas tarde.");
    }
  };

  return (
    <>
      {/* El paso 1 para el seteo de password */}
      {pass1 ? (
        <main className="layout__login">
          <form className="login__form" onSubmit={setPassword1}>
            <header className="login__header">
              <p className="login__title">Restablecer contraseña.</p>
              <span className="login__subtitle">
                Ingrese el email con el que se ha registrado, tenga en cuenta
                que enviaremos un correo electrónico con un código al mismo.
              </span>
            </header>

            <section className="login__form-group">
              <label className="login__form-label" htmlFor="username_field">
                Email
              </label>
              <i className="bx bx-user-pin login__form-icon"></i>
              <input
                placeholder="tuemaildeusuario@email.com"
                name="email"
                type="text"
                className="login__form-input"
                id="username_email"
                onChange={changed}
              />
            </section>

            <button type="submit" className="login__form-submit">
              Enviar
            </button>
          </form>
        </main>
      ) : null}

      {/* El paso 2 para el seteo de password */}

      {pass2 ? (
        <main className="layout__login">
          <form className="login__form" onSubmit={setPassword2}>
            <header className="login__header">
              <p className="login__title">Solo falta un paso.</p>
              <span className="login__subtitle">
                Enviamos un email con un código de 4 dígitos, por favor ingrese
                el mismo para continuar el proceso.
              </span>
            </header>

            <section className="login__form-group">
              <label className="login__form-label" htmlFor="codigo_field">
                Código
              </label>
              <i className="bx bx-user-pin login__form-icon"></i>
              <input
                placeholder="Ingrese el código de 4 dígitos"
                name="codigo"
                type="text"
                className="login__form-input"
                id="codigo_field"
                onChange={changed}
              />
            </section>

            <button type="submit" className="login__form-submit">
              Enviar
            </button>
          </form>
        </main>
      ) : null}

      {/* El paso 3 para el seteo de password */}

      {pass3 ? (
        <main className="layout__login">
          <form className="login__form" onSubmit={setPassword3}>
            <header className="login__header">
              <p className="login__title">Ingrese la nueva contraseña.</p>
              <span className="login__subtitle">
                La contraseña debe contener al menos una letra mayúscula, un
                número y tener una longitud mínima de 8 caracteres.
              </span>
            </header>

            <section className="register__form-group">
              <label className="register__form-label" htmlFor="password_field">
                Contraseña
              </label>
              <i className="bx bx-lock-open register__form-icon"></i>
              <input
                placeholder="Contraseña"
                name="password"
                type={showPassword ? "text" : "password"}
                required
                value={password}
                className="register__form-input"
                id="password_field"
                onChange={(e) => {
                  changed(e);
                  verifyPassword(e);
                }}
              />
              <span
                className="show-password-toggle"
                onClick={togglePasswordVisibility}
              >
                <img src={showPassword ? imgOpen : imgClosed} />
              </span>
            </section>

            <button type="submit" className="login__form-submit">
              Enviar
            </button>
          </form>
        </main>
      ) : null}
    </>
  );
};
