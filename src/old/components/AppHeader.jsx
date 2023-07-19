import Favicon from "@/old/assets/imgs/Favicon.svg";
import CreateEvent from "@/../public/create-event.svg";
import { useRouter } from "next/navigation";

export const AppHeader = () => {
  const router = useRouter();
  const onClick = () => {
    router.replace("/event-settings/create-event");
  };
  return (
    <section className="app-header stretch">
      <div className="main-content">
        <div className="logo">
          <Favicon />
        </div>
        <CreateEvent onClick={onClick} />
      </div>
    </section>
  );
};
