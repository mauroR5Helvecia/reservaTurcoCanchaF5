import { useEffect, useState } from "react";
import { Global } from "../../helpers/Global";
import { CourtEditor } from "../Courts/CourtEditor";
import { FormRegisterCourt } from "../Courts/FormRegisterCourt";
export const CanchasForm = () => {
  const [canchas, setCanchas] = useState([]);
  const [Editing, setEditing] = useState(false);
  const [cancha, setCancha] = useState({});

  useEffect(() => {
    getCanchas();
  }, []);

  const getCanchas = async () => {
    const request = await fetch(Global.url + "court/all", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await request.json();

    console.log("hice la petición");
    setCanchas(data.response);
  };

  const deleteCourt = async (ID) => {
    console.log(ID);
    const request = await fetch(Global.url + "court/delete/" + ID, {
      method: "DELETE",
    });

    if (request.status == 200) {
      getCanchas();
      console.log("Cancha eliminada");
    } else {
      console.log("No se ha podido eliminar");
    }
  };
  return (
    <main className="layout__login">
      {!Editing ? (
        <FormRegisterCourt getCanchas={getCanchas} />
      ) : (
        <CourtEditor getCanchas={getCanchas} cancha={cancha} />
      )}
      <section className="court__list">
        {canchas.map((cancha) => {
          return (
            <article className="court__article" key={cancha.idCourt}>
              <p className="court__name">
                {cancha.nameCourt} <i className="bx bx-football"></i>
              </p>
              <p className="court__info">Precio : ${cancha.price}</p>
              <p className="court__info">
                Capacidad : <i className="bx bxs-group"></i>
                {cancha.capacity}
              </p>
              <p className="court__info">
                Ubicación : <i className="bx bx-current-location"></i>
                {cancha.location}
              </p>
              <p className="court__info">
                Teléfono : <i className="bx bx-phone"></i>
                {cancha.phone}
              </p>
              <div className="court__buttons-container">
                <button
                  className="court__edit"
                  onClick={() => {
                    setEditing(true);
                    setCancha(cancha);
                  }}
                >
                  Editar
                </button>
                <button
                  className="court__delete"
                  onClick={() => {
                    deleteCourt(cancha.idCourt);
                  }}
                >
                  Borrar
                </button>
              </div>
            </article>
          );
        })}
      </section>
    </main>
  );
};
