import { useState } from "react";

const App = () => {
  const [query, setQuery] = useState("");
  const [meals, setMeals] = useState([]);

  const searchRecipes = async () => {
    const response = await fetch(
      `https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`,
    );
    const data = await response.json();
    setMeals(data.meals || []);
  };

  return (
    <div>
      <h1>Recipe App</h1>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search recipes..."
      />
      <button onClick={searchRecipes}>Search</button>
      <div>
        {meals.map((meal) => (
          <div key={meal.idMeal}>
            <h3>{meal.strMeal}</h3>
            <img src={meal.strMealThumb} width="200" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
