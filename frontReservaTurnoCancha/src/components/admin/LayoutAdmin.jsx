import "../../assets/css/pruebas.css";
import { DaysForm } from "./DaysForm";

export const LayoutAdmin = () => {
  return (
    <>
      <header className="admin__header">
        <h1 className="admin__title">La cancha de los pibes</h1>
      </header>
      <main className="admin__content">
        <DaysForm />
      </main>
    </>
  );
};
