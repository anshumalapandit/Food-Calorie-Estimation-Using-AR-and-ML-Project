import { useState } from "react";
import { ArrowLeft, Plus, Clock, Users, Target, Eye, Calendar } from "lucide-react";
import { Link } from "react-router-dom";

interface MealPlan {
  id: string;
  name: string;
  time: string;
  calories: number;
  foods: Array<{
    name: string;
    portion: string;
    calories: number;
    image: string;
  }>;
  completed: boolean;
}

const todayMeals: MealPlan[] = [
  {
    id: "breakfast",
    name: "Breakfast",
    time: "8:00 AM",
    calories: 320,
    foods: [
      { name: "Idli", portion: "2 pieces", calories: 156, image: "🥟" },
      { name: "Coconut Chutney", portion: "2 tbsp", calories: 45, image: "🥥" },
      { name: "Sambar", portion: "1 bowl", calories: 119, image: "🍲" }
    ],
    completed: true
  },
  {
    id: "lunch",
    name: "Lunch",
    time: "1:00 PM",
    calories: 485,
    foods: [
      { name: "Brown Rice", portion: "1 cup", calories: 216, image: "🍚" },
      { name: "Dal Tadka", portion: "1 bowl", calories: 150, image: "🟡" },
      { name: "Mixed Vegetables", portion: "1 serving", calories: 119, image: "🥬" }
    ],
    completed: false
  },
  {
    id: "snack",
    name: "Evening Snack",
    time: "5:00 PM",
    calories: 180,
    foods: [
      { name: "Almonds", portion: "10 pieces", calories: 69, image: "🌰" },
      { name: "Green Tea", portion: "1 cup", calories: 2, image: "🍵" },
      { name: "Apple", portion: "1 medium", calories: 95, image: "🍎" }
    ],
    completed: false
  },
  {
    id: "dinner",
    name: "Dinner",
    time: "8:00 PM",
    calories: 420,
    foods: [
      { name: "Roti", portion: "2 pieces", calories: 150, image: "🫓" },
      { name: "Paneer Curry", portion: "1 serving", calories: 200, image: "🧀" },
      { name: "Salad", portion: "1 bowl", calories: 70, image: "🥗" }
    ],
    completed: false
  }
];

export default function MealPlanner() {
  const [selectedMeal, setSelectedMeal] = useState<MealPlan | null>(null);
  const [isARPreview, setIsARPreview] = useState(false);
  const [targetCalories] = useState(2100);
  const totalPlannedCalories = todayMeals.reduce((sum, meal) => sum + meal.calories, 0);
  const completedCalories = todayMeals.filter(m => m.completed).reduce((sum, meal) => sum + meal.calories, 0);

  const handleARPreview = (meal: MealPlan) => {
    setSelectedMeal(meal);
    setIsARPreview(true);
  };

  if (isARPreview && selectedMeal) {
    return (
      <div className="min-h-screen bg-black relative">
        {/* AR Preview */}
        <div className="absolute inset-0">
          <div className="h-full bg-gradient-to-b from-black/20 via-transparent to-black/40 flex items-center justify-center">
            <div className="text-center text-white">
              <div className="w-64 h-64 bg-white/10 rounded-2xl border border-white/20 mb-4 flex items-center justify-center backdrop-blur-sm">
                <div className="text-6xl">{selectedMeal.foods[0]?.image}</div>
              </div>
              <h3 className="text-xl font-semibold mb-2">{selectedMeal.name} Preview</h3>
              <p className="text-white/80">Visualizing your planned meal</p>
            </div>
          </div>
        </div>
        
        {/* AR UI Overlay */}
        <div className="relative z-10 p-6">
          <div className="flex justify-between items-center mb-6">
            <button 
              onClick={() => setIsARPreview(false)}
              className="w-10 h-10 bg-black/50 rounded-full flex items-center justify-center backdrop-blur-sm"
            >
              <ArrowLeft className="w-5 h-5 text-white" />
            </button>
            <div className="text-center">
              <h1 className="text-white font-semibold">AR Meal Preview</h1>
              <p className="text-white/80 text-sm">{selectedMeal.calories} calories</p>
            </div>
            <div className="w-10 h-10"></div>
          </div>
        </div>

        {/* Bottom overlay with meal details */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black via-black/80 to-transparent p-6">
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4">
            <h3 className="text-white font-semibold mb-3">{selectedMeal.name} Contents</h3>
            {selectedMeal.foods.map((food, index) => (
              <div key={index} className="flex justify-between items-center text-white/90 mb-2">
                <span>{food.image} {food.name} ({food.portion})</span>
                <span className="font-semibold">{food.calories} cal</span>
              </div>
            ))}
            <button className="w-full bg-primary text-white py-3 rounded-xl font-semibold mt-4">
              Start Cooking with AR Guide
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-nutrition-bg">
      {/* Header */}
      <div className="flex items-center justify-between p-6 bg-card border-b border-nutrition-border">
        <Link to="/" className="w-10 h-10 bg-muted rounded-full flex items-center justify-center">
          <ArrowLeft className="w-5 h-5 text-text-primary" />
        </Link>
        <div className="text-center">
          <h1 className="text-lg font-semibold text-text-primary">Smart Meal Planner</h1>
          <p className="text-sm text-text-secondary">AI + AR powered nutrition</p>
        </div>
        <button className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
          <Calendar className="w-5 h-5 text-white" />
        </button>
      </div>

      {/* Daily Summary */}
      <div className="p-6">
        <div className="bg-card rounded-2xl p-6 border border-nutrition-border mb-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-text-primary">Today's Plan</h2>
            <div className="flex items-center space-x-2">
              <Target className="w-5 h-5 text-primary" />
              <span className="text-primary font-semibold">{targetCalories} cal goal</span>
            </div>
          </div>
          
          <div className="grid grid-cols-3 gap-4 mb-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-carb">{completedCalories}</p>
              <p className="text-xs text-text-secondary">Consumed</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-protein">{totalPlannedCalories}</p>
              <p className="text-xs text-text-secondary">Planned</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-fat">{targetCalories - completedCalories}</p>
              <p className="text-xs text-text-secondary">Remaining</p>
            </div>
          </div>

          <div className="w-full bg-muted rounded-full h-3 overflow-hidden mb-2">
            <div 
              className="h-full bg-primary rounded-full transition-all duration-500"
              style={{ width: `${(completedCalories / targetCalories) * 100}%` }}
            />
          </div>
          <p className="text-xs text-text-secondary text-center">
            {Math.round((completedCalories / targetCalories) * 100)}% of daily goal
          </p>
        </div>

        {/* Meal Timeline */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-text-primary">Meal Timeline</h3>
          
          {todayMeals.map((meal) => (
            <div 
              key={meal.id}
              className={`bg-card rounded-xl p-4 border ${
                meal.completed ? 'border-primary/30 bg-primary/5' : 'border-nutrition-border'
              }`}
            >
              <div className="flex justify-between items-start mb-3">
                <div className="flex items-center space-x-3">
                  <div className={`w-3 h-3 rounded-full ${
                    meal.completed ? 'bg-primary' : 'bg-muted'
                  }`}></div>
                  <div>
                    <h4 className="font-semibold text-text-primary">{meal.name}</h4>
                    <div className="flex items-center space-x-2 mt-1">
                      <Clock className="w-4 h-4 text-text-secondary" />
                      <span className="text-sm text-text-secondary">{meal.time}</span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold text-carb">{meal.calories}</p>
                  <p className="text-xs text-text-secondary">calories</p>
                </div>
              </div>

              <div className="space-y-2 mb-3">
                {meal.foods.map((food, index) => (
                  <div key={index} className="flex justify-between items-center text-sm">
                    <span className="text-text-secondary">
                      {food.image} {food.name} ({food.portion})
                    </span>
                    <span className="font-medium text-text-primary">{food.calories} cal</span>
                  </div>
                ))}
              </div>

              <div className="flex space-x-2">
                <button 
                  onClick={() => handleARPreview(meal)}
                  className="flex-1 bg-primary/10 text-primary py-2 px-4 rounded-lg text-sm font-medium flex items-center justify-center space-x-2"
                >
                  <Eye className="w-4 h-4" />
                  <span>AR Preview</span>
                </button>
                {!meal.completed && (
                  <button className="flex-1 bg-muted text-text-primary py-2 px-4 rounded-lg text-sm font-medium">
                    Mark Complete
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Add Meal Button */}
        <button className="w-full mt-6 bg-primary text-white py-4 rounded-xl font-semibold flex items-center justify-center space-x-2">
          <Plus className="w-5 h-5" />
          <span>Add Custom Meal</span>
        </button>

        {/* Recommendations */}
        <div className="mt-6 bg-muted/50 rounded-xl p-4">
          <h4 className="font-semibold text-text-primary mb-2">🤖 AI Recommendations</h4>
          <div className="text-sm text-text-secondary space-y-1">
            <p>• Add 200 cal healthy snack to reach your goal</p>
            <p>• Consider more protein for better muscle recovery</p>
            <p>• Great job staying within your carb limits!</p>
          </div>
        </div>
      </div>
    </div>
  );
}
