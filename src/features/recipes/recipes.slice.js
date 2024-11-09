import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Async function to fetch recipes
export const fetchRecipesAsync = createAsyncThunk("fetch/recipes", async () => {
  const response = await axios.get(
    "https://recipe-app-backend-eta.vercel.app/recipes"
  );
  return response.data;
});

// Async function to add recipe
export const addRecipeAsync = createAsyncThunk("add/recipe", async (recipe) => {
  const response = await axios.post(
    "https://recipe-app-backend-eta.vercel.app/recipes",
    recipe
  );
  return response.data;
});

// Async function to delete recipe
export const deleteRecipeAsync = createAsyncThunk(
  "delete/recipe",
  async (recipeId) => {
    const response = await axios.delete(
      `https://recipe-app-backend-eta.vercel.app/recipes/${recipeId}`
    );
    return response.data;
  }
);

// Defining the posts slice
export const recipesSlice = createSlice({
  name: "recipes",
  initialState: {
    recipes: [],
    status: "idle",
    error: null,
  },
  extraReducers: (builder) => {
    builder.addCase(fetchRecipesAsync.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(fetchRecipesAsync.fulfilled, (state, action) => {
      (state.status = "success"), (state.recipes = action.payload.recipes);
    });
    builder.addCase(fetchRecipesAsync.rejected, (state, action) => {
      (state.status = "error"), (state.error = action.payload.error);
    });
    builder.addCase(addRecipeAsync.fulfilled, (state, action) => {
      state.recipes.push(action.payload.savedRecipe);
    });
    builder.addCase(deleteRecipeAsync.fulfilled, (state, action) => {
      state.recipes = state.recipes.filter(
        (recipe) => recipe._id !== action.payload.deletedRecipe._id
      );
    });
  },
});

export default recipesSlice.reducer;
