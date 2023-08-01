import Favicon from "@/old/assets/imgs/Favicon.svg";
import CreateEvent from "@/../public/create-event.svg";

import Link from "next/link";

export const AppHeader = () => {
  return (
    <section className="app-header stretch">
      <div className="main-content">
        <div className="logo">
          <Favicon />
        </div>
        <Link href="/event-settings/create-event">
          <CreateEvent />
        </Link>
      </div>
    </section>
  );
};
