import { useState } from "react";
import { ArrowLeft, TrendingUp, Award, AlertTriangle, Brain, Target, Zap } from "lucide-react";
import { Link } from "react-router-dom";

interface Insight {
  id: string;
  type: 'success' | 'warning' | 'info';
  title: string;
  description: string;
  icon: any;
  action?: string;
}

const insights: Insight[] = [
  {
    id: "1",
    type: "success",
    title: "Excellent Protein Intake",
    description: "You've maintained optimal protein levels for 5 consecutive days. This supports muscle recovery and metabolism.",
    icon: Award,
    action: "Keep it up!"
  },
  {
    id: "2",
    type: "warning",
    title: "Low Fiber Detection",
    description: "Your fiber intake has been below recommended levels. Consider adding more vegetables and whole grains.",
    icon: AlertTriangle,
    action: "Add fiber foods"
  },
  {
    id: "3",
    type: "info",
    title: "Meal Timing Optimization",
    description: "Based on your activity patterns, eating lunch 30 minutes earlier could improve energy levels.",
    icon: Target,
    action: "Adjust timing"
  },
  {
    id: "4",
    type: "success",
    title: "Perfect Hydration",
    description: "Your water intake correlates well with your calorie consumption. Great job staying hydrated!",
    icon: Zap,
    action: "Continue routine"
  }
];

const nutritionTrends = [
  { day: "Mon", calories: 1850, protein: 65, carbs: 220, fat: 62 },
  { day: "Tue", calories: 1920, protein: 72, carbs: 235, fat: 58 },
  { day: "Wed", calories: 1780, protein: 68, carbs: 200, fat: 65 },
  { day: "Thu", calories: 2050, protein: 75, carbs: 250, fat: 70 },
  { day: "Fri", calories: 1890, protein: 70, carbs: 225, fat: 60 },
  { day: "Sat", calories: 2150, protein: 80, carbs: 260, fat: 75 },
  { day: "Today", calories: 1540, protein: 55, carbs: 180, fat: 48 }
];

export default function NutritionalInsights() {
  const [activeTab, setActiveTab] = useState<'insights' | 'trends' | 'goals'>('insights');

  const maxCalories = Math.max(...nutritionTrends.map(d => d.calories));

  return (
    <div className="min-h-screen bg-nutrition-bg">
      {/* Header */}
      <div className="flex items-center justify-between p-6 bg-card border-b border-nutrition-border">
        <Link to="/" className="w-10 h-10 bg-muted rounded-full flex items-center justify-center">
          <ArrowLeft className="w-5 h-5 text-text-primary" />
        </Link>
        <div className="text-center">
          <h1 className="text-lg font-semibold text-text-primary">AI Nutritional Insights</h1>
          <p className="text-sm text-text-secondary">Personalized recommendations</p>
        </div>
        <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
          <Brain className="w-5 h-5 text-white" />
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="flex bg-card border-b border-nutrition-border">
        {[
          { id: 'insights', label: 'AI Insights' },
          { id: 'trends', label: 'Trends' },
          { id: 'goals', label: 'Goals' }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as typeof activeTab)}
            className={`flex-1 py-4 text-sm font-medium ${
              activeTab === tab.id
                ? 'text-primary border-b-2 border-primary'
                : 'text-text-secondary'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="p-6">
        {/* AI Insights Tab */}
        {activeTab === 'insights' && (
          <div className="space-y-6">
            {/* Overall Score */}
            <div className="bg-card rounded-2xl p-6 border border-nutrition-border">
              <div className="text-center mb-4">
                <h2 className="text-2xl font-bold text-text-primary mb-2">Nutrition Score</h2>
                <div className="relative w-32 h-32 mx-auto">
                  <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 36 36">
                    <path
                      d="m18,2.0845 a 15.9155,15.9155 0 0,1 0,31.831 a 15.9155,15.9155 0 0,1 0,-31.831"
                      fill="none"
                      stroke="hsl(var(--muted))"
                      strokeWidth="3"
                    />
                    <path
                      d="m18,2.0845 a 15.9155,15.9155 0 0,1 0,31.831 a 15.9155,15.9155 0 0,1 0,-31.831"
                      fill="none"
                      stroke="hsl(var(--primary))"
                      strokeWidth="3"
                      strokeDasharray="85, 100"
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-3xl font-bold text-primary">85</span>
                  </div>
                </div>
                <p className="text-text-secondary mt-2">Excellent nutrition habits!</p>
              </div>
            </div>

            {/* Insights List */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-text-primary">Personalized Insights</h3>
              {insights.map((insight) => (
                <div key={insight.id} className="bg-card rounded-xl p-4 border border-nutrition-border">
                  <div className="flex items-start space-x-3">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      insight.type === 'success' ? 'bg-primary/20' :
                      insight.type === 'warning' ? 'bg-yellow-500/20' :
                      'bg-blue-500/20'
                    }`}>
                      <insight.icon className={`w-5 h-5 ${
                        insight.type === 'success' ? 'text-primary' :
                        insight.type === 'warning' ? 'text-yellow-600' :
                        'text-blue-600'
                      }`} />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-text-primary mb-1">{insight.title}</h4>
                      <p className="text-text-secondary text-sm mb-3">{insight.description}</p>
                      {insight.action && (
                        <button className={`text-sm font-medium px-3 py-1 rounded-lg ${
                          insight.type === 'success' ? 'bg-primary/10 text-primary' :
                          insight.type === 'warning' ? 'bg-yellow-500/10 text-yellow-600' :
                          'bg-blue-500/10 text-blue-600'
                        }`}>
                          {insight.action}
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Quick Recommendations */}
            <div className="bg-muted/50 rounded-xl p-4">
              <h4 className="font-semibold text-text-primary mb-3">🎯 Today's Recommendations</h4>
              <div className="space-y-2 text-sm text-text-secondary">
                <p>• Add a handful of berries to boost antioxidants</p>
                <p>• Include 150ml milk to reach calcium goals</p>
                <p>• Consider a post-workout protein snack</p>
              </div>
            </div>
          </div>
        )}

        {/* Trends Tab */}
        {activeTab === 'trends' && (
          <div className="space-y-6">
            {/* Weekly Chart */}
            <div className="bg-card rounded-2xl p-6 border border-nutrition-border">
              <h3 className="text-lg font-semibold text-text-primary mb-4">Weekly Calorie Trends</h3>
              <div className="space-y-3">
                {nutritionTrends.map((day, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <span className="w-12 text-sm text-text-secondary">{day.day}</span>
                    <div className="flex-1 bg-muted rounded-full h-6 overflow-hidden">
                      <div 
                        className="h-full bg-primary rounded-full flex items-center justify-end pr-2"
                        style={{ width: `${(day.calories / maxCalories) * 100}%` }}
                      >
                        <span className="text-xs text-white font-medium">{day.calories}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Macro Trends */}
            <div className="grid grid-cols-3 gap-4">
              <div className="bg-card rounded-xl p-4 border border-nutrition-border text-center">
                <TrendingUp className="w-6 h-6 text-carb mx-auto mb-2" />
                <p className="text-2xl font-bold text-carb">205g</p>
                <p className="text-sm text-text-secondary">Avg Carbs</p>
                <p className="text-xs text-green-600 mt-1">↗ +5% this week</p>
              </div>
              <div className="bg-card rounded-xl p-4 border border-nutrition-border text-center">
                <TrendingUp className="w-6 h-6 text-protein mx-auto mb-2" />
                <p className="text-2xl font-bold text-protein">69g</p>
                <p className="text-sm text-text-secondary">Avg Protein</p>
                <p className="text-xs text-green-600 mt-1">↗ +8% this week</p>
              </div>
              <div className="bg-card rounded-xl p-4 border border-nutrition-border text-center">
                <TrendingUp className="w-6 h-6 text-fat mx-auto mb-2" />
                <p className="text-2xl font-bold text-fat">62g</p>
                <p className="text-sm text-text-secondary">Avg Fat</p>
                <p className="text-xs text-red-600 mt-1">↘ -2% this week</p>
              </div>
            </div>

            {/* Pattern Recognition */}
            <div className="bg-card rounded-xl p-4 border border-nutrition-border">
              <h4 className="font-semibold text-text-primary mb-3">📊 Pattern Analysis</h4>
              <div className="space-y-2 text-sm text-text-secondary">
                <p>• You consume 15% more calories on weekends</p>
                <p>• Protein intake peaks on workout days (Tue, Thu, Sat)</p>
                <p>• Best consistency: Wednesday eating patterns</p>
                <p>• Opportunity: More balanced weekend nutrition</p>
              </div>
            </div>
          </div>
        )}

        {/* Goals Tab */}
        {activeTab === 'goals' && (
          <div className="space-y-6">
            {/* Current Goals */}
            <div className="bg-card rounded-2xl p-6 border border-nutrition-border">
              <h3 className="text-lg font-semibold text-text-primary mb-4">Current Goals</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-text-secondary">Daily Calories</span>
                  <div className="text-right">
                    <span className="font-bold text-text-primary">1540 / 2100</span>
                    <div className="w-32 bg-muted rounded-full h-2 mt-1">
                      <div className="w-3/4 bg-primary h-2 rounded-full"></div>
                    </div>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-text-secondary">Protein</span>
                  <div className="text-right">
                    <span className="font-bold text-protein">55 / 105g</span>
                    <div className="w-32 bg-muted rounded-full h-2 mt-1">
                      <div className="w-1/2 bg-protein h-2 rounded-full"></div>
                    </div>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-text-secondary">Fiber</span>
                  <div className="text-right">
                    <span className="font-bold text-fat">18 / 25g</span>
                    <div className="w-32 bg-muted rounded-full h-2 mt-1">
                      <div className="w-4/5 bg-fat h-2 rounded-full"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Achievement Badges */}
            <div className="bg-card rounded-xl p-4 border border-nutrition-border">
              <h4 className="font-semibold text-text-primary mb-3">🏆 Recent Achievements</h4>
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-primary/10 rounded-lg p-3 text-center">
                  <div className="text-2xl mb-1">🥇</div>
                  <p className="text-xs font-medium text-primary">7-Day Streak</p>
                </div>
                <div className="bg-green-500/10 rounded-lg p-3 text-center">
                  <div className="text-2xl mb-1">💪</div>
                  <p className="text-xs font-medium text-green-600">Protein Goal</p>
                </div>
                <div className="bg-blue-500/10 rounded-lg p-3 text-center">
                  <div className="text-2xl mb-1">💧</div>
                  <p className="text-xs font-medium text-blue-600">Hydration Master</p>
                </div>
                <div className="bg-purple-500/10 rounded-lg p-3 text-center">
                  <div className="text-2xl mb-1">📱</div>
                  <p className="text-xs font-medium text-purple-600">AR Explorer</p>
                </div>
              </div>
            </div>

            {/* Goal Suggestions */}
            <div className="bg-muted/50 rounded-xl p-4">
              <h4 className="font-semibold text-text-primary mb-3">💡 Suggested Goals</h4>
              <div className="space-y-2">
                <button className="w-full text-left p-3 bg-card rounded-lg border border-nutrition-border">
                  <p className="font-medium text-text-primary">Increase daily steps to 8,000</p>
                  <p className="text-sm text-text-secondary">Based on your activity patterns</p>
                </button>
                <button className="w-full text-left p-3 bg-card rounded-lg border border-nutrition-border">
                  <p className="font-medium text-text-primary">Add 2 servings of vegetables daily</p>
                  <p className="text-sm text-text-secondary">To boost fiber and micronutrients</p>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
