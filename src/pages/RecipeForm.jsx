import { useState } from "react";
import { useDispatch } from "react-redux";
import { addRecipeAsync } from "../features/recipes/recipes.slice";

const RecipeForm = () => {
  const [title, setTitle] = useState("");
  const [cuisine, setCuisine] = useState("");
  const [dishImageUrl, setDishImageUrl] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [instructions, setInstructions] = useState("");
  const [success, showSuccess] = useState(false);
  const [alert, showAlert] = useState(false);

  const dispatch = useDispatch();

  const handleRecipeForm = async (e) => {
    e.preventDefault();
    try {
      if (title && cuisine && dishImageUrl && ingredients && instructions) {
        const recipeToAdd = {
          title,
          cuisine,
          dishImageUrl,
          ingredients,
          instructions,
        };
        const resultAction = await dispatch(addRecipeAsync(recipeToAdd));
        if (addRecipeAsync.fulfilled.match(resultAction)) {
          showSuccess(true);
          setTimeout(() => {
            showSuccess(false);
          }, 2000);
        } else {
          showAlert(true);
          setTimeout(() => {
            showAlert(false);
          }, 2000);
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container">
      <h4 className="display-4 fw-semibold my-4">Add Recipe</h4>
      <form onSubmit={handleRecipeForm}>
        <div className="mb-3">
          <label className="form-lable">Title:</label>
          <div className="input-group">
            <input
              onChange={(e) => setTitle(e.target.value)}
              className="form-control"
              type="text"
              required
            />
          </div>
        </div>
        <div className="mb-3">
          <label className="form-lable">Cuisine Type:</label>
          <div className="input-group">
            <input
              onChange={(e) => setCuisine(e.target.value)}
              className="form-control"
              type="text"
              required
            />
          </div>
        </div>
        <div className="mb-3">
          <label className="form-lable">Dish Image Link:</label>
          <div className="input-group">
            <input
              onChange={(e) => setDishImageUrl(e.target.value)}
              className="form-control"
              type="text"
              required
            />
          </div>
        </div>
        <div className="mb-3">
          <label className="form-lable">Ingredients:</label>
          <div className="input-group">
            <textarea
              onChange={(e) => setIngredients(e.target.value)}
              rows={4}
              className="w-100"
              placeholder={`Seperate each one by ", "`}
              required
            ></textarea>
          </div>
        </div>
        <div className="mb-3">
          <label className="form-lable">Instructions:</label>
          <div className="input-group">
            <textarea
              onChange={(e) => setInstructions(e.target.value)}
              rows={4}
              className="w-100"
              placeholder={`Seperate each step by ", "`}
              required
            ></textarea>
          </div>
        </div>
        <button className="btn btn-primary" type="submit">
          Add Recipe
        </button>
      </form>
      {success && (
        <div class="alert alert-success my-3" role="alert">
            Recipe Added Successfully!
      </div>
      )}
      {alert && (
       <div class="alert alert-danger my-3" role="alert">
       Error occured while adding new recipe!
     </div>
      )}
    </div>
  );
};

export default RecipeForm;
