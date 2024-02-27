import { Shifts } from "../shifts/Shifts";

export const Home = () => {
  return (
    <div className="home">
      <section className="home__shifts">
        <Shifts />
      </section>
    </div>
  );
};
