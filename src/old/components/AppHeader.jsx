import Image from "next/image";
import Favicon from "../assets/imgs/Favicon.svg";

export const AppHeader = () => {
  return (
    <section className="app-header stretch">
      <div className="main-content">
        <div className="logo">
          {/* <Image src={Favicon} alt="favicon" /> */}
          <Favicon />
        </div>
      </div>
    </section>
  );
};
