import { useLocation, useParams } from "react-router-dom";

const RecipeDetails = () => {
  const location = useLocation();

  const recipes = location.state;

  const { recipeId } = useParams();

  const recipe = recipes.find((recipe) => recipe._id == recipeId);

  return (
    <div className="container">
      <div className="my-4">
        <h5 className="display-5 fw-semibold">{recipe.title}</h5>
        <div className="card mb-3 w-100" style={{maxHeight: "850px"}}>
          <div className="row g-0">
            <div className="col-md-4">
              <img
                src={recipe.dishImageUrl}
                class="img-fluid rounded-start"
                alt={recipe.title}
                style={{height: "100%"}}
              />
            </div>
            <div class="col-md-8">
              <div class="card-body">
                <h1 class="card-title">Cuisine: {recipe.cuisine}</h1>
                <h2 className="card-title">Ingredients:</h2>
                <p class="fs-5">
                  {recipe.ingredients}
                </p>
                <h2 className="card-title">Instructions:</h2>
                <p class="fs-5">
                    <ol>
                    {recipe.instructions.split(", ").map(step => <li>{step}.</li>)}
                    </ol>
                  
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipeDetails;
