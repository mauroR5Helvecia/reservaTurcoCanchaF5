import { toast } from "sonner";
import { Global } from "../../helpers/Global";

export const CourtList = ({ canchas, setEditing, setCancha, getCanchas }) => {
  const deleteCourt = async (ID) => {
    const request = await fetch(Global.url + "court/delete/" + ID, {
      method: "DELETE",
    });

    if (request.status == 200) {
      getCanchas();
      toast.success("Se ha eliminado la cancha");
    } else {
      toast.error("No se ha podido eliminar la cancha");
    }
  };
  return (
    <>
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
    </>
  );
};
