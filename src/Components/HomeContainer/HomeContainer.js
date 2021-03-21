import Collections from "../Collections/Collections";
import Slider from "../Slider/Slider";

const HomeContainer = () => {
  return (
    <div className="px-44 py-10">
      <div className="MainContainer flex flex-col  w-full min-h-screen gap-5">
        <Slider />
        <Collections />
      </div>
    </div>
  );
};

export default HomeContainer;
