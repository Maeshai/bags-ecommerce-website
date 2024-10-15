import { useState } from "react";
import { storeData } from "../../assets/data/dummyData";
import ProductSectionItem from "./ProductSectionItem";
import { useEffect } from "react";
import axios from "axios";

const ProductSection = () => {
  const [apiData, setApiData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get("http://localhost:4000/products");
        setApiData(data.data);
        console.log("Data: ", data);
      } catch (error) {
        console.error("Error fetching data:", error.message);
      }
    };
    fetchData();
  }, []);

  console.log("apiData", apiData);

  return (
    <div>
      <div className="bg-black p-1 w-[50%] mx-auto rounded-md">
        {/* <h2 className="text-red-600 text-center text-lg font-inter font-bold tracking-normal leading-none">
          SUMMER T-Shirt SALE 30%
        </h2> */}
      </div>
      <div className="grid grid-cols-3 justify-items-center py-8 gap-4 mx-auto max-w-7xl">
        {apiData?.map((product, index) => {
          return (
            <div key={index}>
              <ProductSectionItem
                id={product.id}
                name={product.name}
                img={product.img}
                text={product.text}
                price={product.price}
                totalPrice={product.totalPrice}
                color={product.color}
                size={product.size}
              ></ProductSectionItem>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ProductSection;
