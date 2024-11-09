import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteRecipeAsync,
  fetchRecipesAsync,
} from "../features/recipes/recipes.slice";
import { Link } from "react-router-dom";

const Home = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchRecipesAsync());
  }, [dispatch]);

  const { recipes, status, error } = useSelector((state) => state.recipes);

  const filteredRecipes = searchQuery
    ? recipes.filter((recipe) =>
        recipe.title.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : recipes;

  const deleteRecipeHandler = (recipeId) => {
    dispatch(deleteRecipeAsync(recipeId));
  };

  return (
    <div className="container">
      <div className="input-group my-3 w-50">
        <input
          onChange={(e) => setSearchQuery(e.target.value)}
          type="text"
          className="form-control"
          placeholder="Search by recipe name..."
        />
      </div>
      <div>
        <h4 className="display-4 fw-semibold">All Recipes</h4>
        <div className="mb-5">
          {status === "loading" && (
            <div
              className="spinner-border text-primary text-center"
              role="status"
            >
              <span className="visually-hidden">Loading...</span>
            </div>
          )}
        </div>
        <div className="row">
          {filteredRecipes.length > 0 ? (
            filteredRecipes.map((recipe) => (
              <div key={recipe._id} className="col-3">
                <div className="card mb-3">
                  <img
                    className="card-img-top img-fluid"
                    src={recipe.dishImageUrl}
                    alt={recipe.title}
                    style={{ height: "20rem" }}
                  />
                  <div className="card-body">
                    <h5 className="card-title">{recipe.title}</h5>
                    <p className="card-text">
                      <strong>Cuisine Type: </strong>
                      {recipe.cuisine}
                    </p>
                    <p className="card-text">
                      <strong>
                        Ingredients:
                        <Link state={recipes} to={`/${recipe._id}`}>
                          {" "}
                          See Recipe {">"}
                        </Link>
                      </strong>
                    </p>
                    <p className="card-text">
                      <strong>
                        Instructions:
                        <Link state={recipes} to={`/${recipe._id}`}>
                          {" "}
                          See Recipe {">"}
                        </Link>
                      </strong>
                    </p>
                    <button className="btn btn-danger" onClick={() => deleteRecipeHandler(recipe._id)}>Delete</button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="fs-4 text-center">No Recipes Found!</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
