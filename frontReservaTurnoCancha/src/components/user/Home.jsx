import { useEffect, useState } from "react";
import { Global } from "../../helpers/Global";
import { Shifts } from "../shifts/Shifts";

export const Home = () => {
  const [advertisements, setAdvertisements] = useState([]);

  useEffect(() => {
    getAnnounces();
  }, []);
  const getAnnounces = async () => {
    const request = await fetch(Global.url + "advertisement/lastthree", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await request.json();

    if (data.status == "success") setAdvertisements(data.response);
    console.log(data);

   
  };
  return (
    <div className="home">
      <section className="home__shifts">
        <Shifts />
      </section>
      <section className="home__announcement">
        <h1 className="announcement__title">Anuncios</h1>
        <ul className="announcement__list">
          {advertisements.map((notice) => {
            return (
              <li className="announcement__item" key={notice.idAdvertisement}>
                <h3 className="announcement__subtitle">
                  {notice.advertisement}.
                </h3>
              </li>
            );
          })}
        </ul>
      </section>
    </div>
  );
};
