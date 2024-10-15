import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import ProductCard from "./ProductCard";
import Error from "../Error/Error";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchFilteredProducts } from "../../features/slices/productsSlice";

const FilteredProducts = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.filteredProducts);
  const error = useSelector((state) => state.products.error);
  const loading = useSelector((state) => state.products.loading);

  const { id, type } = useParams();

  useEffect(() => {
    if (id) {
      dispatch(fetchFilteredProducts(id));
    }
  }, [dispatch, id]);

  useEffect(() => {
    console.log("Fetched products:", products);
  }, [products]);

  return (
    <div className="">
      <div className="pt-16">
        <div className="pl-14">
          <h1 className="text-gray-600 text-4xl font-inter font-bold tracking-normal leading-none">
            {type}
          </h1>
        </div>
        {loading ? (
          <p>Loading products...</p>
        ) : error ? (
          <Error />
        ) : (
          <div className="grid grid-cols-4 justify-items-center py-8 gap-12">
            {products?.length > 0 ? (
              products.map((product) => (
                <div key={product._id} className="">
                  <ProductCard
                    id={product._id}
                    name={product.name}
                    text={product.description}
                    img={product.img}
                    price={product.price}
                    colors={product.color}
                  />
                </div>
              ))
            ) : (
              <p>No products found</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default FilteredProducts;
