import { UserHealth, MealPlan } from '../types';

const meals = {
  breakfast: [
    {
      name: "Masala Dosa",
      calories: 350,
      protein: 8,
      carbs: 52,
      fat: 12,
      ingredients: ["Rice batter", "Urad dal batter", "Potatoes", "Onions", "Spices"],
      instructions: "Prepare dosa batter, make potato filling, cook dosa until crispy",
      suitableFor: ["Vegetarian", "Diabetes-friendly"],
      image: "https://images.unsplash.com/photo-1630383249896-424e482df921"
    },
    {
      name: "Oats Idli",
      calories: 180,
      protein: 6,
      carbs: 30,
      fat: 5,
      ingredients: ["Oats", "Yogurt", "Carrots", "Green chilies", "Mustard seeds"],
      instructions: "Grind oats, mix with vegetables, steam in idli molds",
      suitableFor: ["Diabetes-friendly", "Heart-healthy", "Vegetarian"],
      image: "https://images.unsplash.com/photo-1589301760014-d929f3979dbc"
    },
    {
      name: "Ragi Dosa",
      calories: 200,
      protein: 7,
      carbs: 35,
      fat: 4,
      ingredients: ["Ragi flour", "Rice flour", "Onions", "Curry leaves", "Spices"],
      instructions: "Mix flours, ferment, make thin dosas",
      suitableFor: ["Diabetes-friendly", "Heart-healthy", "Vegetarian"],
      image: "https://images.unsplash.com/photo-1645177628172-a94c1f96e6db"
    },
    {
      name: "Quinoa Upma",
      calories: 220,
      protein: 8,
      carbs: 32,
      fat: 6,
      ingredients: ["Quinoa", "Mixed vegetables", "Mustard seeds", "Curry leaves", "Spices"],
      instructions: "Cook quinoa, prepare tempering, mix with vegetables",
      suitableFor: ["Gluten-free", "High-protein", "Heart-healthy", "Vegetarian"],
      image: "https://images.unsplash.com/photo-1626510531139-51b37003f037"
    },
    {
      name: "Sprouted Moong Chilla",
      calories: 180,
      protein: 10,
      carbs: 25,
      fat: 4,
      ingredients: ["Sprouted moong", "Onions", "Tomatoes", "Green chilies", "Spices"],
      instructions: "Grind sprouted moong, make pancakes with vegetables",
      suitableFor: ["Diabetes-friendly", "High-protein", "Vegetarian"],
      image: "https://images.unsplash.com/photo-1645177628172-a94c1f96e6db"
    },
    {
      name: "Vegetable Daliya",
      calories: 200,
      protein: 7,
      carbs: 35,
      fat: 3,
      ingredients: ["Broken wheat", "Mixed vegetables", "Onions", "Spices"],
      instructions: "Cook daliya with vegetables and spices",
      suitableFor: ["Heart-healthy", "Diabetes-friendly", "Vegetarian"],
      image: "https://images.unsplash.com/photo-1626510531139-51b37003f037"
    },
    {
      name: "Methi Thepla",
      calories: 230,
      protein: 8,
      carbs: 38,
      fat: 5,
      ingredients: ["Whole wheat flour", "Fenugreek leaves", "Yogurt", "Spices"],
      instructions: "Make dough, roll theplas, cook on griddle",
      suitableFor: ["Diabetes-friendly", "Heart-healthy", "Vegetarian"],
      image: "https://images.unsplash.com/photo-1505576399279-565b52d4ac71"
    },
    {
      name: "Steamed Sprouts Salad",
      calories: 150,
      protein: 9,
      carbs: 20,
      fat: 2,
      ingredients: ["Mixed sprouts", "Onions", "Tomatoes", "Lemon juice", "Spices"],
      instructions: "Steam sprouts, mix with vegetables and seasoning",
      suitableFor: ["Diabetes-friendly", "Heart-healthy", "Weight-loss", "Vegetarian"],
      image: "https://images.unsplash.com/photo-1626510531139-51b37003f037"
    }
  ],
  lunch: [
    {
      name: "Dal Tadka with Brown Rice",
      calories: 400,
      protein: 15,
      carbs: 65,
      fat: 8,
      ingredients: ["Yellow dal", "Brown rice", "Tomatoes", "Onions", "Spices"],
      instructions: "Cook dal and rice separately, prepare tempering, combine",
      suitableFor: ["Vegetarian", "Heart-healthy", "Diabetes-friendly"],
      image: "https://images.unsplash.com/photo-1585937421612-70a008356fbe"
    },
    {
      name: "Quinoa Pulao",
      calories: 320,
      protein: 12,
      carbs: 45,
      fat: 7,
      ingredients: ["Quinoa", "Mixed vegetables", "Spices", "Ghee"],
      instructions: "Cook quinoa with vegetables and spices",
      suitableFor: ["Gluten-free", "Heart-healthy", "Diabetes-friendly", "Vegetarian"],
      image: "https://images.unsplash.com/photo-1631452180519-c014fe946bc7"
    },
    {
      name: "Palak Paneer with Millet Roti",
      calories: 380,
      protein: 18,
      carbs: 40,
      fat: 12,
      ingredients: ["Spinach", "Paneer", "Millet flour", "Spices"],
      instructions: "Prepare spinach gravy, cook paneer, make rotis",
      suitableFor: ["Vegetarian", "High-protein", "Heart-healthy"],
      image: "https://images.unsplash.com/photo-1645177628307-5d38a35cc76f"
    },
    {
      name: "Mixed Dal Khichdi",
      calories: 350,
      protein: 14,
      carbs: 55,
      fat: 6,
      ingredients: ["Mixed dals", "Rice", "Vegetables", "Ghee", "Spices"],
      instructions: "Cook all ingredients together until soft",
      suitableFor: ["Easy-digestion", "Heart-healthy", "Vegetarian"],
      image: ""
    },
    {
      name: "Rajma Masala with Cauliflower Rice",
      calories: 320,
      protein: 16,
      carbs: 40,
      fat: 8,
      ingredients: ["Kidney beans", "Cauliflower", "Onions", "Tomatoes", "Spices"],
      instructions: "Cook rajma, prepare gravy, serve with cauliflower rice",
      suitableFor: ["Low-carb", "High-protein", "Vegetarian"],
      image: "https://images.unsplash.com/photo-1631452180519-c014fe946bc7"
    }
  ],
  dinner: [
    {
      name: "Ragi Roti with Palak Curry",
      calories: 320,
      protein: 12,
      carbs: 45,
      fat: 7,
      ingredients: ["Ragi flour", "Spinach", "Onions", "Tomatoes", "Spices"],
      instructions: "Prepare ragi dough, make rotis, cook spinach curry",
      suitableFor: ["Vegetarian", "Diabetes-friendly", "Heart-healthy"],
      image: "https://images.unsplash.com/photo-1505576399279-565b52d4ac71"
    },
    {
      name: "Quinoa Biryani",
      calories: 380,
      protein: 14,
      carbs: 50,
      fat: 10,
      ingredients: ["Quinoa", "Mixed vegetables", "Biryani masala", "Mint", "Yogurt"],
      instructions: "Cook quinoa with vegetables and spices, layer and steam",
      suitableFor: ["Vegetarian", "High-protein", "Gluten-free"],
      image: "https://images.unsplash.com/photo-1619531038896-deaff53d151a"
    },
    {
      name: "Jowar Bhakri with Mixed Veg Curry",
      calories: 340,
      protein: 10,
      carbs: 48,
      fat: 8,
      ingredients: ["Jowar flour", "Mixed vegetables", "Spices", "Coconut"],
      instructions: "Make bhakri, prepare vegetable curry",
      suitableFor: ["Diabetes-friendly", "Heart-healthy", "Vegetarian"],
      image: "https://images.unsplash.com/photo-1505576399279-565b52d4ac71"
    },
    {
      name: "Moong Dal Cheela",
      calories: 250,
      protein: 12,
      carbs: 35,
      fat: 5,
      ingredients: ["Moong dal", "Onions", "Tomatoes", "Green chilies", "Spices"],
      instructions: "Grind dal, make pancakes with vegetables",
      suitableFor: ["High-protein", "Diabetes-friendly", "Vegetarian"],
      image: "https://images.unsplash.com/photo-1645177628172-a94c1f96e6db"
    },
    {
      name: "Vegetable Oats Khichdi",
      calories: 280,
      protein: 10,
      carbs: 42,
      fat: 6,
      ingredients: ["Oats", "Mixed vegetables", "Spices", "Ghee"],
      instructions: "Cook oats with vegetables and spices",
      suitableFor: ["Heart-healthy", "Diabetes-friendly", "Vegetarian"],
      image: "https://images.unsplash.com/photo-1631452180775-7c5d27efa8b6"
    }
  ]
};

// Add more categories of meals for different health conditions
const healthyMeals = {
  diabetesFriendly: [
    "Ragi Dosa",
    "Oats Idli",
    "Quinoa Upma",
    "Methi Thepla",
    "Dal Tadka with Brown Rice",
    "Mixed Dal Khichdi",
    "Jowar Bhakri",
    "Moong Dal Cheela"
  ],
  heartHealthy: [
    "Steamed Sprouts Salad",
    "Vegetable Daliya",
    "Quinoa Pulao",
    "Palak Paneer with Millet Roti",
    "Ragi Roti with Palak Curry",
    "Vegetable Oats Khichdi"
  ],
  highProtein: [
    "Sprouted Moong Chilla",
    "Quinoa Biryani",
    "Rajma Masala with Cauliflower Rice",
    "Palak Paneer with Millet Roti",
    "Moong Dal Cheela"
  ],
  lowCarb: [
    "Sprouted Moong Chilla",
    "Steamed Sprouts Salad",
    "Rajma Masala with Cauliflower Rice",
    "Palak Paneer with Millet Roti"
  ],
  weightLoss: [
    "Steamed Sprouts Salad",
    "Vegetable Daliya",
    "Quinoa Upma",
    "Moong Dal Cheela",
    "Mixed Dal Khichdi"
  ]
};

export function generateMealPlan(userHealth: UserHealth): MealPlan {
  // Enhanced filtering based on health conditions and preferences
  const filterMeals = (mealList: any[]) => {
    return mealList.filter(meal => {
      // Check dietary preferences
      const matchesDiet = userHealth.dietaryPreferences.every(pref =>
        meal.suitableFor.includes(pref)
      );

      // Check health conditions
      const suitableForConditions = userHealth.healthConditions.every(condition => {
        // Map health conditions to meal categories
        const conditionMap: { [key: string]: string[] } = {
          'Diabetes': healthyMeals.diabetesFriendly,
          'Heart Disease': healthyMeals.heartHealthy,
          'Obesity': healthyMeals.weightLoss,
          'Hypertension': healthyMeals.heartHealthy
        };

        const recommendedMeals = conditionMap[condition] || [];
        return recommendedMeals.includes(meal.name) || meal.suitableFor.includes(`${condition}-friendly`);
      });

      // Additional health checks based on blood sugar and blood pressure
      const suitableForBloodSugar = userHealth.bloodSugar > 140 
        ? healthyMeals.diabetesFriendly.includes(meal.name)
        : true;

      const suitableForBloodPressure = (userHealth.bloodPressure.systolic > 140 || userHealth.bloodPressure.diastolic > 90)
        ? healthyMeals.heartHealthy.includes(meal.name)
        : true;

      return matchesDiet && suitableForConditions && suitableForBloodSugar && suitableForBloodPressure;
    });
  };

  // Get random meals with enhanced variety
  const getRandomMeals = (mealList: any[], count: number) => {
    const filtered = filterMeals(mealList);
    const shuffled = [...filtered].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, count);
  };

  // Generate meal plan with backup options if filtered list is too small
  const generateMealsWithBackup = (mealList: any[], count: number) => {
    let filtered = filterMeals(mealList);
    if (filtered.length < count) {
      // Add some generally healthy options as backup
      filtered = [...filtered, ...mealList.filter(meal => 
        meal.suitableFor.includes('Heart-healthy') || 
        meal.suitableFor.includes('Diabetes-friendly')
      )];
    }
    const shuffled = [...new Set(filtered)].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, count);
  };

  return {
    breakfast: generateMealsWithBackup(meals.breakfast, 4),
    lunch: generateMealsWithBackup(meals.lunch, 4),
    dinner: generateMealsWithBackup(meals.dinner, 4)
  };
}