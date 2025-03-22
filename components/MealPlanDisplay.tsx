import React from 'react';
import { MealPlan, Meal } from '../types';

interface MealPlanDisplayProps {
  mealPlan: MealPlan;
}

function MealCard({ meal }: { meal: Meal }) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <img src={meal.image} alt={meal.name} className="w-full h-48 object-cover" />
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800">{meal.name}</h3>
        
        <div className="mt-2 grid grid-cols-3 gap-2 text-sm text-gray-600">
          <div>
            <span className="font-medium">Calories:</span> {meal.calories}
          </div>
          <div>
            <span className="font-medium">Protein:</span> {meal.protein}g
          </div>
          <div>
            <span className="font-medium">Carbs:</span> {meal.carbs}g
          </div>
        </div>

        <div className="mt-4">
          <h4 className="font-medium text-gray-700">Ingredients:</h4>
          <ul className="mt-1 list-disc list-inside text-sm text-gray-600">
            {meal.ingredients.map((ingredient, idx) => (
              <li key={idx}>{ingredient}</li>
            ))}
          </ul>
        </div>

        <div className="mt-4">
          <h4 className="font-medium text-gray-700">Instructions:</h4>
          <p className="mt-1 text-sm text-gray-600">{meal.instructions}</p>
        </div>

        <div className="mt-4">
          <h4 className="font-medium text-gray-700">Suitable for:</h4>
          <div className="mt-1 flex flex-wrap gap-2">
            {meal.suitableFor.map((condition, idx) => (
              <span
                key={idx}
                className="px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full"
              >
                {condition}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function MealPlanDisplay({ mealPlan }: MealPlanDisplayProps) {
  return (
    <div className="space-y-8">
      <section>
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Breakfast Options</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {mealPlan.breakfast.map((meal, idx) => (
            <MealCard key={idx} meal={meal} />
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Lunch Options</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {mealPlan.lunch.map((meal, idx) => (
            <MealCard key={idx} meal={meal} />
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Dinner Options</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {mealPlan.dinner.map((meal, idx) => (
            <MealCard key={idx} meal={meal} />
          ))}
        </div>
      </section>
    </div>
  );
}