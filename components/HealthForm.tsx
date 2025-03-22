import React from 'react';
import { UserHealth } from '../types';
import { ChevronDown } from 'lucide-react';

interface HealthFormProps {
  onSubmit: (data: UserHealth) => void;
}

const healthConditions = [
  'Diabetes',
  'Hypertension',
  'Heart Disease',
  'Obesity',
  'None'
];

const dietaryPreferences = [
  'Vegetarian',
  'Vegan',
  'Non-vegetarian',
  'Gluten-free',
  'Lactose-free'
];

export default function HealthForm({ onSubmit }: HealthFormProps) {
  const [formData, setFormData] = React.useState<UserHealth>({
    age: 34,
    weight: 72,
    bloodSugar: 100,
    bloodPressure: {
      systolic: 120,
      diastolic: 80
    },
    healthConditions: [],
    dietaryPreferences: []
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl mx-auto">
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">Personal Health Information</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">Age</label>
            <input
              type="number"
              value={formData.age}
              onChange={(e) => setFormData({...formData, age: Number(e.target.value)})}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Weight (kg)</label>
            <input
              type="number"
              value={formData.weight}
              onChange={(e) => setFormData({...formData, weight: Number(e.target.value)})}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Blood Sugar (mg/dL)</label>
            <input
              type="number"
              value={formData.bloodSugar}
              onChange={(e) => setFormData({...formData, bloodSugar: Number(e.target.value)})}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Blood Pressure</label>
            <div className="grid grid-cols-2 gap-2">
              <input
                type="number"
                placeholder="Systolic"
                value={formData.bloodPressure.systolic}
                onChange={(e) => setFormData({
                  ...formData,
                  bloodPressure: {
                    ...formData.bloodPressure,
                    systolic: Number(e.target.value)
                  }
                })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
              <input
                type="number"
                placeholder="Diastolic"
                value={formData.bloodPressure.diastolic}
                onChange={(e) => setFormData({
                  ...formData,
                  bloodPressure: {
                    ...formData.bloodPressure,
                    diastolic: Number(e.target.value)
                  }
                })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>
          </div>
        </div>

        <div className="mt-6">
          <label className="block text-sm font-medium text-gray-700">Health Conditions</label>
          <div className="mt-2 grid grid-cols-2 md:grid-cols-3 gap-3">
            {healthConditions.map((condition) => (
              <label key={condition} className="inline-flex items-center">
                <input
                  type="checkbox"
                  checked={formData.healthConditions.includes(condition)}
                  onChange={(e) => {
                    const newConditions = e.target.checked
                      ? [...formData.healthConditions, condition]
                      : formData.healthConditions.filter(c => c !== condition);
                    setFormData({...formData, healthConditions: newConditions});
                  }}
                  className="rounded border-gray-300 text-indigo-600 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                />
                <span className="ml-2 text-sm text-gray-600">{condition}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="mt-6">
          <label className="block text-sm font-medium text-gray-700">Dietary Preferences</label>
          <div className="mt-2 grid grid-cols-2 md:grid-cols-3 gap-3">
            {dietaryPreferences.map((preference) => (
              <label key={preference} className="inline-flex items-center">
                <input
                  type="checkbox"
                  checked={formData.dietaryPreferences.includes(preference)}
                  onChange={(e) => {
                    const newPreferences = e.target.checked
                      ? [...formData.dietaryPreferences, preference]
                      : formData.dietaryPreferences.filter(p => p !== preference);
                    setFormData({...formData, dietaryPreferences: newPreferences});
                  }}
                  className="rounded border-gray-300 text-indigo-600 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                />
                <span className="ml-2 text-sm text-gray-600">{preference}</span>
              </label>
            ))}
          </div>
        </div>
        <button
          type="submit"
          className="mt-6 w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          Generate Meal Plan
        </button>
      </div>
    </form>
  );
}