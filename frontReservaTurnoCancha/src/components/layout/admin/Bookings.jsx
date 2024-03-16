import { Announcement } from "../../courts/Announcement";
import { Upload } from "../../courts/Upload";
import { ReservedShifts } from "../../shifts/ReservedShifts";

export const Bookings = () => {
  return (
    <div className="Bookings__container">
      <ReservedShifts endpoint={"alldays"} />

      <section className="Bookings__announcement">
        <Announcement />

        <Upload />
      </section>
    </div>
  );
};
