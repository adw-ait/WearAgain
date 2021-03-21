import ClothList from "../ClothList/ClothList";
import Filters from "../Filters/Filters";

const Collections = () => {
  return (
    <div className="flex gap-5">
      <Filters />
      <ClothList />
    </div>
  );
};

export default Collections;
