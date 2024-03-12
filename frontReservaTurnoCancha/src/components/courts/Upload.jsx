import { Global } from "../../helpers/Global";

export const Upload = () => {
  const UploadImage = async () => {
    const fileInput = document.querySelector("#file");

    const formData = new FormData();
    formData.append("file0", fileInput.files[0]);

    const fileRequest = await fetch(Global.url + "court/upload/", {
      method: "POST",
      body: formData,
      headers: {
        "Content-Type": "form-data",
      },
    });
    const imageData = await fileRequest.json();

    console.log(imageData);
  };

  return (
    <form className="announcement__form-photos" onSubmit={UploadImage}>
      <h2>Sube tus fotos</h2>
      <label className="announcement__file-upload" htmlFor="file">
        <div className="announcement__icon-container">
          <i className="bx bx-cloud-upload upload__icon"></i>
        </div>
        <div className="text">
          <span>Click to upload image</span>
        </div>
        <input type="file" id="file" />
      </label>

      <button type="submit">Enviar</button>
    </form>
  );
};
