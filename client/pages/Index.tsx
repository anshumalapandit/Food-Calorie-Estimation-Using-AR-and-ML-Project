import { useState } from "react";
import NutritionCard from "@/components/NutritionCard";
import { Camera, Upload, Utensils, TrendingUp, Calendar, User } from "lucide-react";

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

      {/* Header */}
      <div className="px-6 py-6">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-text-primary mb-2">NutriScan</h1>
            <p className="text-text-secondary">Analyze your food nutrition instantly</p>
          </div>
          <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center">
            <User className="w-6 h-6 text-primary-foreground" />
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          <div className="bg-card rounded-2xl p-4 border border-nutrition-border">
            <div className="flex items-center justify-between mb-2">
              <span className="text-text-secondary text-sm">Today's Calories</span>
              <TrendingUp className="w-4 h-4 text-primary" />
            </div>
            <p className="text-2xl font-bold text-text-primary">1,847</p>
            <p className="text-xs text-text-secondary">of 2,100 kcal</p>
          </div>
          <div className="bg-card rounded-2xl p-4 border border-nutrition-border">
            <div className="flex items-center justify-between mb-2">
              <span className="text-text-secondary text-sm">Meals</span>
              <Utensils className="w-4 h-4 text-carb" />
            </div>
            <p className="text-2xl font-bold text-text-primary">3</p>
            <p className="text-xs text-text-secondary">of 5 planned</p>
          </div>
          <div className="bg-card rounded-2xl p-4 border border-nutrition-border">
            <div className="flex items-center justify-between mb-2">
              <span className="text-text-secondary text-sm">Streak</span>
              <Calendar className="w-4 h-4 text-protein" />
            </div>
            <p className="text-2xl font-bold text-text-primary">7</p>
            <p className="text-xs text-text-secondary">days</p>
          </div>
        </div>

        {/* Main Action Buttons */}
        <div className="space-y-4">
          <button
            onClick={handleAnalyzeFood}
            className="w-full bg-primary hover:bg-primary/90 text-primary-foreground rounded-2xl p-6 flex items-center justify-between transition-colors shadow-lg"
          >
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-primary-foreground/20 rounded-xl flex items-center justify-center">
                <Camera className="w-6 h-6" />
              </div>
              <div className="text-left">
                <h3 className="text-lg font-semibold">Scan Food</h3>
                <p className="text-primary-foreground/80 text-sm">Take a photo to analyze nutrition</p>
              </div>
            </div>
            <div className="w-8 h-8 bg-primary-foreground/20 rounded-full flex items-center justify-center">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
              </svg>
            </div>
          </button>

          <button className="w-full bg-card hover:bg-muted text-text-primary rounded-2xl p-6 flex items-center justify-between transition-colors border border-nutrition-border">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-muted rounded-xl flex items-center justify-center">
                <Upload className="w-6 h-6 text-text-secondary" />
              </div>
              <div className="text-left">
                <h3 className="text-lg font-semibold">Upload Image</h3>
                <p className="text-text-secondary text-sm">Choose from your gallery</p>
              </div>
            </div>
            <div className="w-8 h-8 bg-muted rounded-full flex items-center justify-center">
              <svg className="w-4 h-4 text-text-secondary" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
              </svg>
            </div>
          </button>
        </div>

        {/* Recent Analysis */}
        <div className="mt-8">
          <h2 className="text-xl font-semibold text-text-primary mb-4">Recent Analysis</h2>
          <div className="space-y-3">
            <div 
              onClick={handleAnalyzeFood}
              className="bg-card rounded-xl p-4 border border-nutrition-border flex items-center space-x-4 cursor-pointer hover:bg-muted transition-colors"
            >
              <img
                src="https://cdn.builder.io/api/v1/image/assets%2F48ab03c8fe114dbb857fff77ab3f917f%2Fea610fc150284739b5e0c82e30a03373?format=webp&width=200"
                alt="Idli"
                className="w-16 h-16 rounded-xl object-cover"
              />
              <div className="flex-1">
                <h3 className="font-semibold text-text-primary">South Indian Idli</h3>
                <p className="text-text-secondary text-sm">2 hours ago</p>
                <div className="flex space-x-4 mt-1">
                  <span className="text-xs bg-carb/20 text-carb px-2 py-1 rounded-lg">Carb 80%</span>
                  <span className="text-xs bg-protein/20 text-protein px-2 py-1 rounded-lg">Protein 70%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-card border-t border-nutrition-border px-6 py-4">
        <div className="flex justify-around items-center max-w-md mx-auto">
          <button className="flex flex-col items-center space-y-1">
            <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center">
              <div className="w-2 h-2 bg-primary-foreground rounded-full"></div>
            </div>
            <span className="text-xs text-primary font-medium">Home</span>
          </button>
          <button className="flex flex-col items-center space-y-1">
            <TrendingUp className="w-6 h-6 text-text-secondary" />
            <span className="text-xs text-text-secondary">Analytics</span>
          </button>
          <button className="flex flex-col items-center space-y-1">
            <Calendar className="w-6 h-6 text-text-secondary" />
            <span className="text-xs text-text-secondary">History</span>
          </button>
          <button className="flex flex-col items-center space-y-1">
            <User className="w-6 h-6 text-text-secondary" />
            <span className="text-xs text-text-secondary">Profile</span>
          </button>
        </div>
      </div>

      {/* Add bottom padding to account for fixed navigation */}
      <div className="h-20"></div>
    </div>
  );
}
