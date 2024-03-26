import { useLayoutEffect, useEffect, useState } from "react";
import Calendario from "./Calendario";
import { CourtSelector } from "./CourtSelector";
import { Global } from "../../helpers/Global";
import { FormatHour } from "../../helpers/FormatHour";
import { toast } from "sonner";

export const Edit = () => {
  const [canchas, setCanchas] = useState([]);

  const [SelectedCancha, setSelectedCancha] = useState({ listShift: [] });

  const [startDate, setStartDate] = useState(new Date());

  const [shiftList, setShiftList] = useState([]);

  //Para sub menu, editar turnos y editar anuncios y galeria.

  const [editAnnoucement, setEditAnoucement] = useState(false);
  const [editGallery, setEditGallery] = useState(false);
  const [editShifts, setEditShifts] = useState(true);

  useLayoutEffect(() => {
    if (editShifts) {
      getCanchas();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editShifts]);
  useEffect(() => {
    setShiftList(SelectedCancha.listShift);
  }, [SelectedCancha.listShift]);

  let formaTime = () => {
    let day = startDate.getDate();
    if (day <= 9) day = "0" + day;
    let month = startDate.getMonth();
    if (month <= 9) month = "0" + (month + 1);
    let year = startDate.getFullYear();

    return `${year}-${month}-${day}`;
  };

  let fechaFormateada = formaTime();

  const [lastCourtSelector, setLastCourtSelector] = useState(1);

  const getCanchas = async () => {
    const request = await fetch(Global.url + "court/all", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await request.json();

    setCanchas(data.response);

    // Aca deberia pasarle la ultima seleccionada
    setSelectedCancha(data.response[lastCourtSelector]);
    setShiftList(data.response[lastCourtSelector].listShift);
  };

  const cancelShift = async (idShift) => {
    const token = JSON.parse(localStorage.getItem("token"));
    const request = await fetch(Global.url + "reservation/delete/" + idShift, {
      method: "DELETE",
      headers: {
        Authorization: token,
      },
    });

    const data = await request.json();

    if (data.status == "success delete") {
      toast.error("Turno cancelado correctamente");
      getCanchas();
    } else {
      toast.warning("No se ha podido cancelar el turno");
    }
  };

  const deleteShift = async (idShift) => {
    const request = await fetch(Global.url + "shift/delete/" + idShift, {
      method: "DELETE",
    });

    if (request.status == 200) {
      toast.success("Turno eliminado correctamente");
      getCanchas();
    } else if (request.status == 500) {
      toast.warning("Primero debe cancelar la reserva activa");
    } else {
      toast.error("No se ha podido eliminar el turno");
    }
  };

  //para activar la edicion de turnos
  const handleEditShift = () => {
    setEditShifts(true);
    setEditAnoucement(false);
    setEditGallery(false);
  };
  //----------------------------------------------------------------------------------
  // Logica edicion de anuncios

  const [listAnnoucement, setListAnnoucement] = useState([]);

  useEffect(() => {
    if (editAnnoucement) {
      getAnnoucement();
    }
  }, [editAnnoucement]);

  const getAnnoucement = async () => {
    const request = await fetch(Global.url + "advertisement/all", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await request.json();

    setListAnnoucement(data.response);
  };

  const deleteAnnoucement = async (idAdvertisement) => {
    const token = JSON.parse(localStorage.getItem("token"));
    const request = await fetch(
      Global.url + "advertisement/delete/" + idAdvertisement,
      {
        method: "DELETE",
        headers: {
          Authorization: token,
        },
      }
    );

    const data = await request.json();

    if (data.status == "success") {
      getAnnoucement();
      toast.error("Anuncio eliminado correctamente");
    } else {
      toast.warning("No se ha podido eliminar el turno");
    }
  };

  //para activar la edicion de anuncios

  const handleEditAnnoucement = () => {
    setEditShifts(false);
    setEditAnoucement(true);
    setEditGallery(false);
  };

  //Logica para edicion de fotografias de la galeria

  //----------------------------------------------------------------------------------
  // Logica edicion de anuncios

  const [listPhoto, setListPhoto] = useState([]);

  useEffect(() => {
    if (editGallery) {
      getPhotos();
    }
  }, [editGallery]);

  const getPhotos = async () => {
    const request = await fetch(Global.url + "photogalery/all", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await request.json();

    setListPhoto(data.response);
  };

  const deletePhoto = async (idPhotoGalery) => {
    const token = JSON.parse(localStorage.getItem("token"));
    const request = await fetch(
      Global.url + "photogalery/delete/" + idPhotoGalery,
      {
        method: "DELETE",
        headers: {
          Authorization: token,
        },
      }
    );

    const data = await request.json();

    if (data.status == "success") {
      getPhotos();
      toast.error("Imagen eliminada correctamente");
    } else {
      toast.warning("No se ha podido eliminar la fotografia");
    }
  };

  const handleEditPhotoGalery = () => {
    setEditShifts(false);
    setEditAnoucement(false);
    setEditGallery(true);
  };

  return (
    <>
      <div className="list__container__edit__sub__menu">
        <div className="conteiner__sub__menu">
        <span
          onClick={handleEditShift} // Agrego el evento onClick
          className={`edit__button__selected__admin${
            editShifts ? " edit__button__selected__admin-active" : ""
          }`}
        >
          <span>EDITAR TURNOS</span>
        </span>
        <span
          onClick={handleEditAnnoucement} // Agrego el evento onClick
          className={`edit__button__selected__admin${
            editAnnoucement ? " edit__button__selected__admin-active" : ""
          }`}
        >
          <span>EDITAR ANUNCIOS</span>
        </span>

        <span
          onClick={handleEditPhotoGalery} // Agrego el evento onClick
          className={`edit__button__selected__admin${
            editGallery ? " edit__button__selected__admin-active" : ""
          }`}
        >
          <span>EDITAR GALERIA</span>
        </span>
        </div>
        {/* El main segun la eleccion */}
        {/* Edicion de turnos */}
        {editShifts ? (
          <main className="edit__container">
            <header className="list__shifts__header">
              <div className="calendary__handler">
                <Calendario
                  startDate={startDate}
                  setStartDate={setStartDate}
                  limit={35}
                />
              </div>
              <div>
              <CourtSelector
                canchas={canchas}
                setSelectedCancha={setSelectedCancha}
                setLastCourtSelector={setLastCourtSelector}
              />
              </div>
              
            </header>
            <h2 className="list__shifts-title">Turnos definidos</h2>
            <div className="shifts__extra-info">
              <span>
                Capacidad : {SelectedCancha.capacity}{" "}
                <i className="bx bx-group shifts__extra-icon"></i>
              </span>
              <span>
                Precio x turno : {SelectedCancha.price}
                <i className="bx bx-dollar shifts__extra-icon"></i>
              </span>
            </div>
            <div className="admin__list-shifts">
              {shiftList.length >= 1
                ? shiftList.map((turno) => {
                    return (
                      turno.dateShift == fechaFormateada && (
                        <div className="shifts__shift" key={turno.idShift}>
                          <h3 className="shift__info">
                            {SelectedCancha.nameCourt}
                          </h3>
                          <span className="shift__schedule">
                            {" "}
                            <i className="bx bx-time-five"></i>{" "}
                            {turno.hourShift}hs a {<FormatHour turno={turno} />}
                            hs
                          </span>

                          <div className="shift__status">
                            <p>
                              <strong>Estado</strong>:{" "}
                              {!turno.shiftReserved
                                ? "No reservado"
                                : "Reservado"}
                            </p>
                            {turno.shiftReserved ? (
                              <button
                                className="shift__submit"
                                onClick={() => {
                                  cancelShift(turno.reservation.idReservation);
                                }}
                              >
                                Cancelar
                              </button>
                            ) : (
                              ""
                            )}
                          </div>
                          <button
                            className="shift__submit"
                            onClick={() => {
                              deleteShift(turno.idShift);
                            }}
                          >
                            Eliminar
                          </button>
                        </div>
                      )
                    );
                  })
                : "No hay turnos"}
            </div>
          </main>
        ) : null}

        {/* Edicion anuncios*/}
        {editAnnoucement ? (
          <div className="conteiner__edit__announcement">
            {listAnnoucement ? (
              listAnnoucement.map((anuncio) => (
                <div
                  className="shifts__shift"
                  style={{ marginTop: "30px" }}
                  key={anuncio.idAdvertisement}
                >
                  <p
                    className="shift__info"
                    style={{
                      flex: "80%",
                      color: "white",
                      textAlign: "center",
                      textTransform: "uppercase",
                    }}
                  >
                    {anuncio.advertisement}
                  </p>
                  <button
                    className="shift__submit"
                    style={{ flex: "20%" }}
                    onClick={() => {
                      deleteAnnoucement(anuncio.idAdvertisement);
                    }}
                  >
                    ELIMINAR
                  </button>
                </div>
              ))
            ) : (
              <p>No hay anuncios disponibles</p>
            )}
          </div>
        ) : null}

        {/* eDICION DE GALERIA */}

        {editGallery ? (
          <div className="conteiner__edit__announcement">
            {Array.isArray(listPhoto) &&
              listPhoto.map((imagen) => (
                <div
                  className="shifts__shift"
                  style={{ marginTop: "30px" }}
                  key={imagen.idPhotoGalery}
                >
                  <p
                    className="shift__info"
                    style={{
                      flex: "80%",
                      color: "white",
                      textAlign: "center",
                      textTransform: "uppercase",
                    }}
                  >
                    {imagen.photo}
                  </p>
                  <button
                    className="shift__submit"
                    style={{ flex: "20%" }}
                    onClick={() => {
                      deletePhoto(imagen.idPhotoGalery); // Corregido para usar imagen.idPhotoGalery
                    }}
                  >
                    ELIMINAR
                  </button>
                </div>
              ))}
          </div>
        ) : null}
      </div>
    </>
  );
};
