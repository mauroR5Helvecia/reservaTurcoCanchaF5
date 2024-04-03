import { useEffect, useState } from "react";
import { Global } from "../../../helpers/Global";

export const Roulette = () => {
  const [images, setImages] = useState([]);

  useEffect(() => {
    let slider = document.getElementById("slider");

    slider.addEventListener("wheel", function (event) {
      event.preventDefault();

      // Normalizamos el valor de deltaY para un desplazamiento suave y consistente
      let normalizedDelta = event.deltaY / 2.5;

      // Actualizamos la posición de desplazamiento horizontalmente
      slider.scrollLeft += normalizedDelta;
    });

    getImages();
  }, []);

  const getImages = async () => {
    const request = await fetch(Global.url + "photogalery/latestfive", {
      method: "GET",
    });
  
    const data = await request.json();
  
    if (Array.isArray(data.response)) {
      setImages(data.response);
    } else {
      console.log("La respuesta no es un array:", data.response);
    }
  };
  
  return (
    <div className="slider" id="slider">
      {images.map((gallery) => (
        <img
          key={gallery.idPhotoGalery}
          src={"../../../../public/galeryPhoto/" + gallery.photo}
          alt={gallery.photo}
        />
      ))}
    </div>
  );
};
