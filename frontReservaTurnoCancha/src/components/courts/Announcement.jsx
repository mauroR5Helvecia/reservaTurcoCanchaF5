import { Global } from "../../helpers/Global";

export const Announcement = () => {
  const uploadAnnouncement = async (e) => {
    let publication = e.target.announce.value;

    const request = await fetch(Global.url + "photoGalery", {
      method: "POST",
      body: JSON.stringify(publication),
      headers: {
        "Content-Type": "application/json",
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
