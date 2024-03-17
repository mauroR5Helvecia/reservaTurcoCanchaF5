import { Global } from "../../helpers/Global";

export const Announcement = () => {
  const uploadAnnouncement = async (e) => {
    const advertisement = {
      advertisement: e.target.announce.value,
    };

    console.log("se envia este anuncio" + advertisement);
    const request = await fetch(Global.url + "advertisement/save", {
      method: "POST",
      body: JSON.stringify(advertisement),
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    });

    console.log(request);
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
