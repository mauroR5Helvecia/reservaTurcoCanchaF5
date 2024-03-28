import { Roulette } from "../layout/admin/Roulette";

export const Contact = () => {


  

  const enlacewsap = `https://wa.me/543405405315?text=Contactame%20por%20WhatsApp`;

  return (
    <div className="contact__container">
      <section className="contact__advices">
        <h1 className="advices__title">Galeria de fotos</h1>
        <Roulette />
       
          <a
            href={enlacewsap}
            target="blank"
            rel="noreferrer"
            className="contact__whatsapp"
          >
            Whatsapp{" "}
            <i className="bx bxl-whatsapp contact__whatsapp-icon"></i>
          </a>
        
      </section>
      <section className="contact__map">
        <h1 className="map__title">Ubicación</h1>
        <h3 className="contact__map-title">Podés encontrarnos en...</h3>

        <p>Francislo Portela 1637, Lomas de zamora</p>
        <iframe
  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3278.0468047018007!2d-58.421848387667325!3d-34.75441377278772!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95bcd27daf476449%3A0xd264c90ea074cdb7!2sCancha%20Los%20Andes!5e0!3m2!1ses-419!2sar!4v1708792446991!5m2!1ses-419!2sar"
  width="500"
  height="400"
  allowFullScreen="" // Cambia allowfullscreen a allowFullScreen
  loading="lazy"
  referrerPolicy="no-referrer-when-downgrade"
  className="contact__map-iframe"
></iframe>

      </section>
    </div>
  );
};
