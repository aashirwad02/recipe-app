import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const RecipeDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [meal, setMeal] = useState(null);

  useEffect(() => {
    const fetchMeal = async () => {
      const response = await fetch(
        `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
      );
      const data = await response.json();
      setMeal(data.meals[0]);
    };
    fetchMeal();
  }, [id]);

  if (!meal) return <h2>Loading...</h2>;

  return (
    <div>
      <button onClick={() => navigate("/")}>Back</button>
      <h1>{meal.strMeal}</h1>
      <img src={meal.strMealThumb} width="300" />
      <h3>Category: {meal.strCategory}</h3>
      <h3>Instructions:</h3>
      <p>{meal.strInstructions}</p>
    </div>
  );
};

export default RecipeDetail;