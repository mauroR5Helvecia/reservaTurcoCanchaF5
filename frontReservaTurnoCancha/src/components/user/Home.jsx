import { Shifts } from "../shifts/Shifts";

export const Home = () => {
  return (
    <div className="home">
      <section className="home__shifts">
        <Shifts />
      </section>
      <section className="home__announcement">
        <h1 className="announcement__title">Anuncios</h1>
        <ul className="announcement__list">
          <li className="announcement__item">
            <h3 className="announcement__subtitle">dia martes cerrado</h3>
          </li>
          <li className="announcement__item">
            <h3 className="announcement__subtitle">
              El dia 27/03 se encontró una campera color beige en una de las
              canchas
            </h3>
          </li>
          <li className="announcement__item">
            <h3 className="announcement__subtitle">dia martes cerrado</h3>
          </li>
        </ul>
      </section>
    </div>
  );
};
