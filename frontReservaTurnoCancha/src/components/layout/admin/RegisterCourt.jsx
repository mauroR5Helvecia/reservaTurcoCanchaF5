import { useEffect, useState } from "react";
import { Global } from "../../../helpers/Global";
import { Update } from "../../courts/Update";
import { Register } from "../../courts/Register";
import { CourtList } from "../../courts/CourtList";
export const RegisterCourt = () => {
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

  return (
    <main className="layout__login">
      {!Editing ? (
        <Register getCanchas={getCanchas} />
      ) : (
        <Update getCanchas={getCanchas} cancha={cancha} />
      )}
      <section className="court__list">
        <CourtList
          canchas={canchas}
          setCancha={setCancha}
          setEditing={setEditing}
          getCanchas={getCanchas}
        />
      </section>
    </main>
  );
};
