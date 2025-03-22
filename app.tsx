import React, { useState } from 'react';
import { UserHealth, MealPlan } from './types';
import HealthForm from './components/HealthForm';
import MealPlanDisplay from './components/MealPlanDisplay';
import { generateMealPlan } from './utils/mealRecommendation';
import { Utensils } from 'lucide-react';

function App() {
  const [mealPlan, setMealPlan] = useState<MealPlan | null>(null);

  const handleFormSubmit = (data: UserHealth) => {
    const plan = generateMealPlan(data);
    setMealPlan(plan);
  };
  
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center space-x-3">
            <Utensils className="h-8 w-8 text-indigo-600" />
            <h1 className="text-2xl font-bold text-gray-900">Aahara: WHERE TRADITION MEETS NUTRITION</h1>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="space-y-8">
          <HealthForm onSubmit={handleFormSubmit} />
          
          {mealPlan && (
            <div className="mt-8">
              <MealPlanDisplay mealPlan={mealPlan} />
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default App;