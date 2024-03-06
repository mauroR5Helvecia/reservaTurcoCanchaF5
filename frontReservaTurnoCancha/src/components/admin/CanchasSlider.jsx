import { useEffect } from "react";
import img1 from "../../assets/img/canch1.png";
import img2 from "../../assets/img/canch2.png";
import img3 from "../../assets/img/canch3.png";
export const CanchasSlider = () => {
  useEffect(() => {
    let slider = document.getElementById("slider");

    slider.addEventListener("wheel", function (event) {
      event.preventDefault();

      // Normalizamos el valor de deltaY para un desplazamiento suave y consistente
      let normalizedDelta = event.deltaY / 2.5;

      // Actualizamos la posición de desplazamiento horizontalmente
      slider.scrollLeft += normalizedDelta;
    });
  }, []);
  return (
    <div className="slider" id="slider">
      <img src={img1} alt="" className="" />
      <img src={img2} alt="" />
      <img src={img3} alt="" />
    </div>
  );
};
