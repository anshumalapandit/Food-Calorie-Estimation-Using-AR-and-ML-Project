import { useState } from "react";
import { Link } from "react-router-dom";
import NutritionCard from "@/components/NutritionCard";
import BottomNavigation from "@/components/BottomNavigation";
import { Camera, Upload, Utensils, TrendingUp, Calendar, User, Zap, Target, Award } from "lucide-react";

interface NutritionData {
  carb: number;
  protein: number;
  fat: number;
  carbohydrates: number;
}

export default function Index() {
  const [currentView, setCurrentView] = useState<'home' | 'analysis'>('home');
  const [nutritionData] = useState<NutritionData>({
    carb: 80,
    protein: 70,
    fat: 50,
    carbohydrates: 60
  });

  const handleAnalyzeFood = () => {
    setCurrentView('analysis');
  };

  const handleBack = () => {
    setCurrentView('home');
  };

  if (currentView === 'analysis') {
    return (
      <NutritionCard 
        nutritionData={nutritionData}
        onBack={handleBack}
      />
    );
  }

  return (
    <div className="min-h-screen bg-nutrition-bg">
      {/* Status Bar */}
      <div className="flex justify-between items-center px-6 py-4 text-text-primary font-medium">
        <span>9:41</span>
        <div className="flex items-center space-x-1">
          <div className="flex space-x-1">
            <div className="w-1 h-1 bg-text-primary rounded-full"></div>
            <div className="w-1 h-1 bg-text-primary rounded-full"></div>
            <div className="w-1 h-1 bg-text-primary rounded-full"></div>
            <div className="w-1 h-1 bg-text-primary rounded-full"></div>
          </div>
          <svg className="w-6 h-4" viewBox="0 0 24 12" fill="currentColor">
            <path d="M2 3h16v6H2V3zm18-1v8a1 1 0 01-1 1H1a1 1 0 01-1-1V2a1 1 0 011-1h18a1 1 0 011 1z"/>
            <path d="M23 4v4h1V4h-1z"/>
          </svg>
        </div>
      </div>

      {/* Beautiful Hero Section */}
      <div className="relative bg-gradient-to-br from-primary via-protein to-carb px-6 py-8 text-white overflow-hidden">
        {/* Background Food Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-4 left-4 text-4xl animate-bounce delay-100">🍎</div>
          <div className="absolute top-12 right-8 text-3xl animate-bounce delay-300">🥗</div>
          <div className="absolute bottom-8 left-12 text-3xl animate-bounce delay-500">🥑</div>
          <div className="absolute bottom-4 right-4 text-4xl animate-bounce delay-700">🍊</div>
        </div>

        <div className="relative z-10">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-3xl font-bold mb-2">calARieScan</h1>
              <p className="text-white/80">AR-powered calorie estimation</p>
            </div>
            <Link to="/profile" className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-sm">
              <User className="w-6 h-6" />
            </Link>
          </div>

          {/* Featured Food Image */}
          <div className="bg-white/10 rounded-3xl p-6 backdrop-blur-sm border border-white/20 mb-6">
            <div className="text-center">
              <img
                src="https://images.unsplash.com/photo-1546554137-f86b9593a222?w=400&h=200&fit=crop&crop=center"
                alt="Healthy Food Bowl"
                className="w-full h-32 object-cover rounded-2xl mb-3"
              />
              <p className="text-white/90 font-medium">Start your healthy journey today!</p>
            </div>
          </div>
        </div>
      </div>

      <div className="px-6 py-6">

        {/* Quick Stats with beautiful cards */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          <div className="bg-gradient-to-br from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20 rounded-2xl p-4 border border-orange-200 dark:border-orange-800">
            <div className="text-2xl mb-2">🔥</div>
            <p className="text-2xl font-bold text-text-primary">1,847</p>
            <p className="text-xs text-text-secondary">Today's Calories</p>
          </div>
          <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-2xl p-4 border border-green-200 dark:border-green-800">
            <div className="text-2xl mb-2">🍽️</div>
            <p className="text-2xl font-bold text-text-primary">3</p>
            <p className="text-xs text-text-secondary">Meals Logged</p>
          </div>
          <div className="bg-gradient-to-br from-purple-50 to-indigo-50 dark:from-purple-900/20 dark:to-indigo-900/20 rounded-2xl p-4 border border-purple-200 dark:border-purple-800">
            <div className="text-2xl mb-2">⚡</div>
            <p className="text-2xl font-bold text-text-primary">7</p>
            <p className="text-xs text-text-secondary">Day Streak</p>
          </div>
        </div>

        {/* Main Action Buttons with beautiful food images */}
        <div className="space-y-4">
          <Link
            to="/ar-scanner"
            className="block w-full bg-gradient-to-r from-primary to-protein hover:from-primary/90 hover:to-protein/90 text-white rounded-2xl p-6 transition-all shadow-xl hover:shadow-2xl transform hover:-translate-y-1"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm">
                  <Camera className="w-8 h-8" />
                </div>
                <div className="text-left">
                  <h3 className="text-xl font-bold">AR Food Scanner</h3>
                  <p className="text-white/90 text-sm">Real-time AR calorie detection</p>
                  <div className="flex items-center space-x-2 mt-2">
                    <span className="text-xs bg-white/20 px-2 py-1 rounded-full">🎯 94% Accurate</span>
                    <span className="text-xs bg-white/20 px-2 py-1 rounded-full">⚡ Instant</span>
                  </div>
                </div>
              </div>
            </div>
          </Link>

          <div className="grid grid-cols-2 gap-4">
            <Link
              to="/portion-estimator"
              className="bg-card hover:bg-muted border border-nutrition-border rounded-2xl p-4 transition-all hover:shadow-lg group"
            >
              <div className="text-center">
                <div className="w-12 h-12 bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400 rounded-xl flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform">
                  <Target className="w-6 h-6" />
                </div>
                <h3 className="font-semibold text-text-primary mb-1">Portion Size</h3>
                <p className="text-text-secondary text-xs">AR measurement</p>
              </div>
            </Link>

            <Link
              to="/meal-planner"
              className="bg-card hover:bg-muted border border-nutrition-border rounded-2xl p-4 transition-all hover:shadow-lg group"
            >
              <div className="text-center">
                <div className="w-12 h-12 bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400 rounded-xl flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform">
                  <Utensils className="w-6 h-6" />
                </div>
                <h3 className="font-semibold text-text-primary mb-1">Meal Plans</h3>
                <p className="text-text-secondary text-xs">AI + AR powered</p>
              </div>
            </Link>
          </div>
        </div>

        {/* Recent Analysis with beautiful food cards */}
        <div className="mt-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-text-primary">Recent Analysis</h2>
            <Link to="/history" className="text-primary font-medium text-sm">View All</Link>
          </div>
          <div className="space-y-4">
            <div
              onClick={handleAnalyzeFood}
              className="bg-card rounded-2xl border border-nutrition-border overflow-hidden cursor-pointer hover:shadow-lg transition-all group"
            >
              <div className="relative">
                <img
                  src="https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=400&h=150&fit=crop"
                  alt="South Indian Idli"
                  className="w-full h-24 object-cover group-hover:scale-105 transition-transform"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                <div className="absolute bottom-2 left-3 right-3">
                  <h3 className="font-semibold text-white text-sm">South Indian Idli</h3>
                  <p className="text-white/80 text-xs">2 hours ago • 156 calories</p>
                </div>
              </div>
              <div className="p-4">
                <div className="flex space-x-2">
                  <span className="text-xs bg-carb/20 text-carb px-2 py-1 rounded-lg">🌾 Carb 80%</span>
                  <span className="text-xs bg-protein/20 text-protein px-2 py-1 rounded-lg">🥩 Protein 70%</span>
                  <span className="text-xs bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400 px-2 py-1 rounded-lg">📱 AR Scan</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <BottomNavigation />

      {/* Add bottom padding to account for fixed navigation */}
      <div className="h-20"></div>
    </div>
  );
}
