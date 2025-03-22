from flask import Flask, render_template, request, jsonify, send_file
import pandas as pd
from model import MealRecommender
import joblib
import requests
import os
from dotenv import load_dotenv
from reportlab.lib import colors
from reportlab.lib.pagesizes import letter
from reportlab.platypus import SimpleDocTemplate, Table, TableStyle, Paragraph
from reportlab.lib.styles import getSampleStyleSheet
from datetime import datetime

load_dotenv()

app = Flask(__name__)

# Load the model
recommender = MealRecommender()

# Edamam API Configuration
EDAMAM_APP_ID = os.getenv('900da95e')
EDAMAM_APP_KEY = os.getenv('7799e4a4faf345108dabf48fddf013ba')
EDAMAM_API_URL = "https://spoonacular.com/food-apiURL_ADDRESS"

def generate_pdf(meal_plan, user_name):
    pdf_path = f"static/meal_plans/{user_name}_meal_plan.pdf"
    doc = SimpleDocTemplate(pdf_path, pagesize=letter)
    styles = getSampleStyleSheet()
    elements = []
    
    # Add title
    elements.append(Paragraph(f"Meal Plan for {user_name}", styles['Title']))
    
    for meal_type, meals in meal_plan.items():
        elements.append(Paragraph(f"\n{meal_type.upper()}", styles['Heading1']))
        
        for meal in meals:
            data = [
                ["Name", meal['name']],
                ["Calories", str(meal['calories'])],
                ["Protein", f"{meal['nutrients']['protein']}g"],
                ["Carbs", f"{meal['nutrients']['carbs']}g"],
                ["Fats", f"{meal['nutrients']['fats']}g"],
                ["Sugar", f"{meal['nutrients']['sugar']}g"],
            ]
            
            table = Table(data)
            table.setStyle(TableStyle([
                ('BACKGROUND', (0, 0), (0, -1), colors.grey),
                ('TEXTCOLOR', (0, 0), (0, -1), colors.whitesmoke),
                ('ALIGN', (0, 0), (-1, -1), 'CENTER'),
                ('FONTNAME', (0, 0), (-1, -1), 'Helvetica-Bold'),
                ('FONTSIZE', (0, 0), (-1, -1), 12),
                ('BOTTOMPADDING', (0, 0), (-1, -1), 12),
                ('BACKGROUND', (1, 0), (-1, -1), colors.beige),
                ('TEXTCOLOR', (1, 0), (-1, -1), colors.black),
                ('GRID', (0, 0), (-1, -1), 1, colors.black)
            ]))
            elements.append(table)
            
            # Add ingredients and preparation
            elements.append(Paragraph("\nIngredients:", styles['Heading3']))
            for ingredient in meal['ingredients']:
                elements.append(Paragraph(f"• {ingredient}", styles['Normal']))
            
            elements.append(Paragraph("\nPreparation:", styles['Heading3']))
            for step in meal['preparation']:
                elements.append(Paragraph(f"• {step}", styles['Normal']))
            
            elements.append(Paragraph("\n", styles['Normal']))
    
    doc.build(elements)
    return pdf_path

def fetch_food_data(food_name):
    params = {
        'app_id': EDAMAM_APP_ID,
        'app_key': EDAMAM_APP_KEY,
        'ingr': food_name
    }
    
    response = requests.get(EDAMAM_API_URL, params=params)
    if response.status_code == 200:
        data = response.json()
        if data['hints']:
            food = data['hints'][0]['food']
            return {
                'name': food['label'],
                'nutrients': food['nutrients']
            }
    return None

@app.route('/', methods=['GET'])
def index():
    return render_template('index.html')

@app.route('/recommend', methods=['POST'])
def recommend():
    data = request.form
    
    user_data = pd.DataFrame({
        'name': [data['name']],
        'age': [int(data['age'])],
        'blood_sugar': [float(data['blood_sugar'])],
        'health_condition': [data['health_condition']]
    })
    
    meal_plan = {
        'breakfast': [],
        'lunch': [],
        'dinner': [],
        'snacks': []
    }
    
    user_features = recommender.preprocess_user_data(user_data)
    
    for meal_type in meal_plan.keys():
        recommendations = recommender.get_recommendations(user_features, meal_type)
        meal_plan[meal_type] = [
            {
                'name': rec['name'],
                'calories': rec['calories'],
                'nutrients': {
                    'protein': rec['protein'],
                    'carbs': rec['carbs'],
                    'fats': rec['fats'],
                    'sugar': rec['sugar']
                },
                'ingredients': rec['ingredients'].split(','),
                'preparation': rec['preparation'].split('\n')
            }
            for rec in recommendations
        ]
        
        # Enrich with API data
        for meal in meal_plan[meal_type]:
            api_data = fetch_food_data(meal['name'])
            if api_data:
                meal.update(api_data)
    
    # Generate PDF
    pdf_path = generate_pdf(meal_plan, data['name'])
    
    return render_template('recommendation.html', 
                         meal_plan=meal_plan, 
                         user_name=data['name'],
                         pdf_path=pdf_path.replace('static/', ''))

@app.route('/download_pdf/<username>')
def download_pdf(username):
    pdf_path = f"static/meal_plans/{username}_meal_plan.pdf"
    return send_file(pdf_path, as_attachment=True)

if __name__ == '__main__':
    # Create directory for meal plans if it doesn't exist
    os.makedirs('static/meal_plans', exist_ok=True)
    app.run(debug=True)