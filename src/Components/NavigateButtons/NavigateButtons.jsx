import { Button } from "@material-tailwind/react";
import clothes from "../../assets/images/clothes.jpg";
import { fetchFilteredProducts } from "../../features/slices/productsSlice";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

const NavigateButtons = () => {
  const categoryData = [
    { name: "New Arrivals", id: "6702512b876bd287d34ade52" },
    { name: "Best Sellers", id: "6705a03447178b9569ead392" },
    { name: "Featured Products", id: "6705a04147178b9569ead395" },
    { name: "Sales/Discounts", id: "6705a04c47178b9569ead398" },
  ];

  const dispatch = useDispatch();

  return (
    <div>
      <div className="flex items-center justify-center py-8">
        {categoryData.map((category, index) => {
          return (
            <div key={index} className="mr-4">
              <Link to={`/filteredProducts/${category.name}/${category.id}`}>
                <Button
                  color="gray"
                  size="lg"
                  variant="outlined"
                  ripple={true}
                  className="text-black hover:bg-gray-300 duration-300 ease-in-out"
                  onClick={() => dispatch(fetchFilteredProducts(category.id))}
                >
                  {category.name}
                </Button>
              </Link>
            </div>
          );
        })}
      </div>
      <div className="bg-black p-1 w-[55%] mx-auto rounded-md"></div>
      <div className="flex justify-center item-center py-4">
        <img
          className="h-[600px] w-[70%] rounded-md shadow-lg shadow-gray-600"
          src={clothes}
          alt="clothes"
        ></img>
      </div>
    </div>
  );
};

export default NavigateButtons;
