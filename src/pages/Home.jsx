import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [query, setQuery] = useState("");
  const [meals, setMeals] = useState([]);
  const navigate = useNavigate();

  const searchRecipes = async () => {
    const response = await fetch(
      `https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`,
    );
    const data = await response.json();
    setMeals(data.meals || []);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <h1 className="text-4xl font-bold text-center text-orange-500 mb-8">
        🍽️ Recipe App
      </h1>
      <div className="flex gap-2 justify-center mb-10">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search recipes..."
          className="border border-gray-300 rounded-lg px-4 py-2 w-72 focus:outline-none focus:ring-2 focus:ring-orange-400"
        />
        <button
          onClick={searchRecipes}
          className="bg-orange-500 text-white px-6 py-2 rounded-lg hover:bg-orange-600"
        >
          Search
        </button>
      </div>
      <div className="grid grid-cols-4 gap-6">
        {meals.map((meal) => (
          <div
            key={meal.idMeal}
            onClick={() => navigate(`/recipe/${meal.idMeal}`)}
            className="bg-white rounded-xl shadow hover:shadow-lg cursor-pointer transition"
          >
            <img
              src={meal.strMealThumb}
              alt={meal.strMeal}
              className="rounded-t-xl w-full h-48 object-cover"
            />
            <p className="p-3 font-semibold text-gray-700">{meal.strMeal}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
