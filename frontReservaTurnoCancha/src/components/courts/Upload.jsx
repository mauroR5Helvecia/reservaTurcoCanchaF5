import { Global } from "../../helpers/Global";
import { toast } from "sonner";
export const Upload = () => {
  const UploadImage = async (e) => {
    e.preventDefault();
    const fileInput = document.querySelector("#file");

    const formData = new FormData();
    formData.append("photo", fileInput.files[0]);

    const fileRequest = await fetch(Global.url + "photogalery/save", {
      method: "POST",
      body: formData,
    });
    const imageData = await fileRequest.json();

    if (imageData.status == "success") {
      toast.success("Imagen publicada correctamente");
    } else {
      toast.error("Hubo un error al subir la imagen");
    }
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
