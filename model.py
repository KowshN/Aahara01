import pandas as pd
import numpy as np
from sklearn.preprocessing import StandardScaler
from sklearn.neighbors import NearestNeighbors
import joblib
import requests
import os
from dotenv import load_dotenv

load_dotenv()

class MealRecommender:
    def __init__(self):
        self.food_db = self._fetch_food_database()
        self.scaler = StandardScaler()
        self.model = NearestNeighbors(n_neighbors=4, algorithm='ball_tree')
        
    def _fetch_food_database(self):
        EDAMAM_APP_ID = os.getenv('EDAMAM_APP_ID')
        EDAMAM_APP_KEY = os.getenv('EDAMAM_APP_KEY')
        API_URL = "https://api.edamam.com/api/food-database/v2/parser"
        
        # Common food items for different meal types
        meal_queries = {
            'breakfast': ['oatmeal', 'eggs', 'pancakes', 'yogurt', 'cereal'],
            'lunch': ['sandwich', 'salad', 'soup', 'rice bowl', 'pasta'],
            'dinner': ['chicken', 'fish', 'steak', 'vegetarian curry', 'stir fry'],
            'snacks': ['fruits', 'nuts', 'smoothie', 'protein bar', 'vegetables']
        }
        
        food_data = []
        
        for meal_type, queries in meal_queries.items():
            for query in queries:
                params = {
                    'app_id': EDAMAM_APP_ID,
                    'app_key': EDAMAM_APP_KEY,
                    'ingr': query,
                    'nutrition-type': 'cooking'
                }
                
                response = requests.get(API_URL, params=params)
                if response.status_code == 200:
                    data = response.json()
                    if data.get('hints'):
                        for hint in data['hints'][:2]:  # Get top 2 results for each query
                            food = hint['food']
                            food_data.append({
                                'name': food['label'],
                                'meal_type': meal_type,
                                'calories': food['nutrients'].get('ENERC_KCAL', 0),
                                'protein': food['nutrients'].get('PROCNT', 0),
                                'carbs': food['nutrients'].get('CHOCDF', 0),
                                'fats': food['nutrients'].get('FAT', 0),
                                'sugar': food['nutrients'].get('SUGAR', 0),
                                'ingredients': query,
                                'preparation': f"Prepare {food['label']} according to recipe"
                            })
        
        return pd.DataFrame(food_data)
    
    def preprocess_user_data(self, user_data):
        features = ['age', 'blood_sugar', 'health_condition']
        condition_map = {
            'diabetes': 1,
            'hypertension': 2,
            'normal': 0,
            'heart_disease': 3
        }
        user_data['health_condition'] = user_data['health_condition'].map(condition_map)
        return self.scaler.fit_transform(user_data[features])
    
    def train_model(self):
        features = ['calories', 'protein', 'carbs', 'fats', 'sugar']
        X = self.food_db[features]
        X_scaled = self.scaler.fit_transform(X)
        self.model.fit(X_scaled)
        
    def get_recommendations(self, user_features, meal_type):
        meal_foods = self.food_db[self.food_db['meal_type'] == meal_type]
        
        if len(meal_foods) == 0:
            return []
            
        features = ['calories', 'protein', 'carbs', 'fats', 'sugar']
        X = meal_foods[features]
        X_scaled = self.scaler.transform(X)
        
        distances, indices = self.model.kneighbors(user_features)
        
        recommendations = []
        for idx in indices[0]:
            if idx < len(meal_foods):
                recommendations.append(meal_foods.iloc[idx])
        
        return recommendations

    def save_model(self):
        joblib.dump(self.model, 'meal_recommender_model.pkl')
        joblib.dump(self.scaler, 'scaler.pkl')
        self.food_db.to_csv('data/cached_food_database.csv', index=False)