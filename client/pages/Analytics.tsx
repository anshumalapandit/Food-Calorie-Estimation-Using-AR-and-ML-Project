import { useState } from "react";
import { TrendingUp, Calendar, Target, Award, ChevronRight, Utensils, Zap } from "lucide-react";

interface NutritionTrend {
  date: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  water: number;
  meals: number;
}

const weeklyData: NutritionTrend[] = [
  { date: "Mon", calories: 1850, protein: 65, carbs: 220, fat: 62, water: 2.1, meals: 4 },
  { date: "Tue", calories: 1920, protein: 72, carbs: 235, fat: 58, water: 2.3, meals: 5 },
  { date: "Wed", calories: 1780, protein: 68, carbs: 200, fat: 65, water: 1.9, meals: 3 },
  { date: "Thu", calories: 2050, protein: 75, carbs: 250, fat: 70, water: 2.5, meals: 5 },
  { date: "Fri", calories: 1890, protein: 70, carbs: 225, fat: 60, water: 2.2, meals: 4 },
  { date: "Sat", calories: 2150, protein: 80, carbs: 260, fat: 75, water: 2.4, meals: 6 },
  { date: "Today", calories: 1540, protein: 55, carbs: 180, fat: 48, water: 1.8, meals: 3 }
];

const foodInsights = [
  {
    category: "Most Consumed",
    item: "South Indian Idli",
    count: 12,
    image: "🥟",
    trend: "+15%",
    color: "text-green-600"
  },
  {
    category: "Healthiest Choice",
    item: "Mixed Vegetable Salad",
    count: 8,
    image: "🥗",
    trend: "+22%",
    color: "text-green-600"
  },
  {
    category: "Protein Source",
    item: "Grilled Chicken",
    count: 6,
    image: "🍗",
    trend: "+8%",
    color: "text-blue-600"
  },
  {
    category: "Snack Favorite",
    item: "Mixed Nuts",
    count: 15,
    image: "🌰",
    trend: "-5%",
    color: "text-orange-600"
  }
];

export default function Analytics() {
  const [activeTab, setActiveTab] = useState<'week' | 'month' | 'year'>('week');
  const [selectedMetric, setSelectedMetric] = useState<'calories' | 'protein' | 'carbs' | 'fat'>('calories');

  const maxValue = Math.max(...weeklyData.map(d => d[selectedMetric]));
  const avgCalories = Math.round(weeklyData.reduce((sum, day) => sum + day.calories, 0) / weeklyData.length);
  const totalMeals = weeklyData.reduce((sum, day) => sum + day.meals, 0);

  return (
    <div className="min-h-screen bg-nutrition-bg pb-20">
      {/* Header with beautiful gradient */}
      <div className="bg-gradient-to-br from-primary via-protein to-carb p-6 text-white">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold">Analytics Dashboard</h1>
            <p className="text-white/80">Your nutrition insights</p>
          </div>
          <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
            <TrendingUp className="w-6 h-6" />
          </div>
        </div>

        {/* Quick Stats with food emojis */}
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-white/10 rounded-2xl p-4 backdrop-blur-sm">
            <div className="text-2xl mb-1">📊</div>
            <p className="text-2xl font-bold">{avgCalories}</p>
            <p className="text-white/80 text-sm">Avg Calories</p>
          </div>
          <div className="bg-white/10 rounded-2xl p-4 backdrop-blur-sm">
            <div className="text-2xl mb-1">🍽️</div>
            <p className="text-2xl font-bold">{totalMeals}</p>
            <p className="text-white/80 text-sm">Total Meals</p>
          </div>
          <div className="bg-white/10 rounded-2xl p-4 backdrop-blur-sm">
            <div className="text-2xl mb-1">🎯</div>
            <p className="text-2xl font-bold">89%</p>
            <p className="text-white/80 text-sm">Goal Success</p>
          </div>
        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* Time Period Selector */}
        <div className="flex bg-card rounded-xl p-1 border border-nutrition-border">
          {['week', 'month', 'year'].map((period) => (
            <button
              key={period}
              onClick={() => setActiveTab(period as typeof activeTab)}
              className={`flex-1 py-3 px-4 rounded-lg text-sm font-medium transition-all ${
                activeTab === period
                  ? 'bg-primary text-white shadow-sm'
                  : 'text-text-secondary hover:text-text-primary'
              }`}
            >
              {period.charAt(0).toUpperCase() + period.slice(1)}
            </button>
          ))}
        </div>

        {/* Interactive Chart */}
        <div className="bg-card rounded-2xl p-6 border border-nutrition-border">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-semibold text-text-primary">Nutrition Trends</h3>
            <div className="flex bg-muted rounded-lg p-1">
              {(['calories', 'protein', 'carbs', 'fat'] as const).map((metric) => (
                <button
                  key={metric}
                  onClick={() => setSelectedMetric(metric)}
                  className={`px-3 py-1 rounded text-xs font-medium transition-all ${
                    selectedMetric === metric
                      ? 'bg-primary text-white'
                      : 'text-text-secondary hover:text-text-primary'
                  }`}
                >
                  {metric.charAt(0).toUpperCase() + metric.slice(1)}
                </button>
              ))}
            </div>
          </div>

          {/* Beautiful Chart Visualization */}
          <div className="space-y-3">
            {weeklyData.map((day, index) => (
              <div key={index} className="flex items-center space-x-4">
                <span className="w-12 text-sm font-medium text-text-secondary">{day.date}</span>
                <div className="flex-1 bg-muted rounded-full h-8 overflow-hidden relative group cursor-pointer hover:shadow-md transition-all">
                  <div 
                    className={`h-full rounded-full transition-all duration-500 ${
                      selectedMetric === 'calories' ? 'bg-gradient-to-r from-carb to-carb/80' :
                      selectedMetric === 'protein' ? 'bg-gradient-to-r from-protein to-protein/80' :
                      selectedMetric === 'carbs' ? 'bg-gradient-to-r from-yellow-500 to-yellow-400' :
                      'bg-gradient-to-r from-fat to-fat/80'
                    } flex items-center justify-end pr-3`}
                    style={{ width: `${(day[selectedMetric] / maxValue) * 100}%` }}
                  >
                    <span className="text-white text-sm font-semibold">
                      {day[selectedMetric]}{selectedMetric === 'calories' ? ' cal' : 'g'}
                    </span>
                  </div>
                  {/* Hover tooltip */}
                  <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Food Insights with Images */}
        <div className="bg-card rounded-2xl p-6 border border-nutrition-border">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-text-primary">Food Insights</h3>
            <button className="text-primary text-sm font-medium flex items-center space-x-1">
              <span>View All</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {foodInsights.map((insight, index) => (
              <div key={index} className="bg-muted/30 rounded-xl p-4 hover:bg-muted/50 transition-colors cursor-pointer">
                <div className="flex items-center space-x-3 mb-3">
                  <div className="text-3xl">{insight.image}</div>
                  <div className="flex-1">
                    <p className="text-xs text-text-secondary font-medium">{insight.category}</p>
                    <p className="font-semibold text-text-primary text-sm">{insight.item}</p>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-lg font-bold text-text-primary">{insight.count}x</span>
                  <span className={`text-sm font-medium ${insight.color}`}>{insight.trend}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Macro Distribution */}
        <div className="bg-card rounded-2xl p-6 border border-nutrition-border">
          <h3 className="text-lg font-semibold text-text-primary mb-4">Macro Distribution</h3>
          <div className="space-y-4">
            {[
              { name: 'Carbohydrates', value: 45, color: 'bg-carb', emoji: '🌾' },
              { name: 'Protein', value: 25, color: 'bg-protein', emoji: '🥩' },
              { name: 'Fats', value: 30, color: 'bg-fat', emoji: '🥑' }
            ].map((macro) => (
              <div key={macro.name} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="text-xl">{macro.emoji}</span>
                    <span className="text-text-secondary">{macro.name}</span>
                  </div>
                  <span className="font-semibold text-text-primary">{macro.value}%</span>
                </div>
                <div className="w-full bg-muted rounded-full h-3 overflow-hidden">
                  <div 
                    className={`h-full ${macro.color} rounded-full transition-all duration-1000`}
                    style={{ width: `${macro.value}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Achievement Section */}
        <div className="bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 rounded-2xl p-6 border border-nutrition-border">
          <div className="flex items-center space-x-3 mb-4">
            <Award className="w-6 h-6 text-yellow-500" />
            <h3 className="text-lg font-semibold text-text-primary">Weekly Achievements</h3>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-white/50 dark:bg-black/20 rounded-lg p-3 text-center">
              <div className="text-2xl mb-1">🎯</div>
              <p className="text-sm font-medium text-text-primary">Goal Streak</p>
              <p className="text-lg font-bold text-primary">7 days</p>
            </div>
            <div className="bg-white/50 dark:bg-black/20 rounded-lg p-3 text-center">
              <div className="text-2xl mb-1">📱</div>
              <p className="text-sm font-medium text-text-primary">AR Scans</p>
              <p className="text-lg font-bold text-protein">24 times</p>
            </div>
          </div>
        </div>

        {/* AI Insights */}
        <div className="bg-card rounded-2xl p-6 border border-nutrition-border">
          <div className="flex items-center space-x-3 mb-4">
            <Zap className="w-6 h-6 text-yellow-500" />
            <h3 className="text-lg font-semibold text-text-primary">AI Insights</h3>
          </div>
          <div className="space-y-3">
            <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-3 border border-blue-200 dark:border-blue-800">
              <p className="text-sm text-blue-800 dark:text-blue-200">
                💡 <strong>Protein Timing:</strong> You tend to eat more protein in the evening. Try spreading it throughout the day for better absorption.
              </p>
            </div>
            <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-3 border border-green-200 dark:border-green-800">
              <p className="text-sm text-green-800 dark:text-green-200">
                🌟 <strong>Great Progress:</strong> Your vegetable intake increased by 35% this week! Keep up the excellent work.
              </p>
            </div>
            <div className="bg-orange-50 dark:bg-orange-900/20 rounded-lg p-3 border border-orange-200 dark:border-orange-800">
              <p className="text-sm text-orange-800 dark:text-orange-200">
                ⚠️ <strong>Hydration Alert:</strong> Consider increasing water intake on workout days for optimal performance.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
