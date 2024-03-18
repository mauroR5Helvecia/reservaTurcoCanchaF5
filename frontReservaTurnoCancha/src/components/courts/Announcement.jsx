import { Global } from "../../helpers/Global";
import { toast } from "sonner";
export const Announcement = () => {
  const uploadAnnouncement = async (e) => {
    e.preventDefault();
    const advertisement = {
      advertisement: e.target.announce.value,
    };

    const token = JSON.parse(localStorage.getItem("token"));

    const request = await fetch(Global.url + "advertisement/save", {
      method: "POST",
      body: JSON.stringify(advertisement),
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    });

    if (request.status == 200) toast.success("Mensaje publicado correctamente");
    else toast.error("Error al publicar mensaje");
  };
  return (
    <form className="announcement__form-text" onSubmit={uploadAnnouncement}>
      <h2> Haz un anuncio</h2>
      <label htmlFor="message">
        <textarea
          name="announce"
          id="message"
          placeholder="Anuncio a realizar"
        ></textarea>
      </label>
      <button type="submit">Enviar</button>
    </form>
  );
};
