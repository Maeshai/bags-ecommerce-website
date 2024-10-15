import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios"; // Make sure to install axios if not already
import { storeData } from "../../assets/data/dummyData"; // Keep this as fallback data

// Create an asynchronous thunk for filtering products
export const fetchFilteredProducts = createAsyncThunk(
  "products/fetchFilteredProducts",
  async (categoryId) => {
    try {
      const response = await axios.get(
        `http://localhost:4000/products/category/${categoryId}`
      );
      return response.data.data;
    } catch (error) {
      console.error("Error fetching filtered products:", error);
      throw error;
    }
  }
);

export const productSlice = createSlice({
  name: "products",
  initialState: {
    filteredProducts:
      JSON.parse(sessionStorage.getItem("filteredData")) || storeData,
    singleProduct:
      JSON.parse(sessionStorage.getItem("singleProduct")) || storeData,
    error: false,
    loading: false,
  },
  reducers: {
    filterProducts(state, action) {
      try {
        const filter = storeData.filter(
          (product) => product.type === action.payload
        );
        state.filteredProducts = filter;
        state.error = false;
      } catch (err) {
        console.error("Error filtering products:", err);
      }
    },
    singleProduct(state, action) {
      try {
        const oneProduct = state.filteredProducts.find(
          (product) => product.id === action.payload
        );
        state.singleProduct = oneProduct || null;
      } catch (err) {
        console.error("Error saving single product to session storage:", err);
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchFilteredProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchFilteredProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.filteredProducts = action.payload;
      })
      .addCase(fetchFilteredProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = true;
        console.error("Fetch filtered products failed:", action.error);
      });
  },
});

export const { filterProducts, singleProduct } = productSlice.actions;
export default productSlice.reducer;
