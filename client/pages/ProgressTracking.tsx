import { useState } from "react";
import { ArrowLeft, TrendingUp, Calendar, Target, Award, Camera, Zap } from "lucide-react";
import { Link } from "react-router-dom";

interface ProgressData {
  date: string;
  weight: number;
  calories: number;
  arScans: number;
  steps: number;
  waterIntake: number;
}

const progressData: ProgressData[] = [
  { date: "Jan 1", weight: 68.5, calories: 1850, arScans: 3, steps: 7500, waterIntake: 2.1 },
  { date: "Jan 2", weight: 68.3, calories: 1920, arScans: 4, steps: 8200, waterIntake: 2.3 },
  { date: "Jan 3", weight: 68.1, calories: 1780, arScans: 2, steps: 6800, waterIntake: 1.9 },
  { date: "Jan 4", weight: 68.0, calories: 2050, arScans: 5, steps: 9100, waterIntake: 2.5 },
  { date: "Jan 5", weight: 67.8, calories: 1890, arScans: 3, steps: 7800, waterIntake: 2.2 },
  { date: "Jan 6", weight: 67.6, calories: 2150, arScans: 6, steps: 8900, waterIntake: 2.4 },
  { date: "Today", weight: 67.4, calories: 1540, arScans: 4, steps: 5200, waterIntake: 1.8 }
];

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  date: string;
  category: 'ar' | 'nutrition' | 'fitness' | 'streak';
}

const achievements: Achievement[] = [
  {
    id: "1",
    title: "AR Scanner Master",
    description: "Used AR scanner 50 times",
    icon: "📱",
    date: "Today",
    category: "ar"
  },
  {
    id: "2",
    title: "Calorie Consistency",
    description: "Stayed within calorie goal for 7 days",
    icon: "🎯",
    date: "Yesterday",
    category: "nutrition"
  },
  {
    id: "3",
    title: "Portion Pro",
    description: "Accurately estimated 100 portions with AR",
    icon: "📏",
    date: "2 days ago",
    category: "ar"
  },
  {
    id: "4",
    title: "Macro Balance",
    description: "Perfect macro distribution for 5 days",
    icon: "⚖️",
    date: "3 days ago",
    category: "nutrition"
  }
];

export default function ProgressTracking() {
  const [activeTab, setActiveTab] = useState<'overview' | 'ar' | 'nutrition' | 'achievements'>('overview');
  const [timeRange, setTimeRange] = useState<'week' | 'month' | '3months'>('week');

  const currentWeight = progressData[progressData.length - 1].weight;
  const startWeight = progressData[0].weight;
  const weightChange = currentWeight - startWeight;
  const avgCalories = Math.round(progressData.reduce((sum, day) => sum + day.calories, 0) / progressData.length);
  const totalArScans = progressData.reduce((sum, day) => sum + day.arScans, 0);

  return (
    <div className="min-h-screen bg-nutrition-bg">
      {/* Header */}
      <div className="flex items-center justify-between p-6 bg-card border-b border-nutrition-border">
        <Link to="/" className="w-10 h-10 bg-muted rounded-full flex items-center justify-center">
          <ArrowLeft className="w-5 h-5 text-text-primary" />
        </Link>
        <div className="text-center">
          <h1 className="text-lg font-semibold text-text-primary">Progress Tracking</h1>
          <p className="text-sm text-text-secondary">Your calARie journey</p>
        </div>
        <button className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
          <TrendingUp className="w-5 h-5 text-white" />
        </button>
      </div>

      {/* Time Range Selector */}
      <div className="flex bg-card border-b border-nutrition-border p-4">
        <div className="flex bg-muted rounded-lg p-1 mx-auto">
          {[
            { id: 'week', label: '7 Days' },
            { id: 'month', label: '30 Days' },
            { id: '3months', label: '3 Months' }
          ].map((range) => (
            <button
              key={range.id}
              onClick={() => setTimeRange(range.id as typeof timeRange)}
              className={`px-4 py-2 rounded text-sm font-medium transition-colors ${
                timeRange === range.id
                  ? 'bg-primary text-white'
                  : 'text-text-secondary'
              }`}
            >
              {range.label}
            </button>
          ))}
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="flex bg-card border-b border-nutrition-border">
        {[
          { id: 'overview', label: 'Overview' },
          { id: 'ar', label: 'AR Data' },
          { id: 'nutrition', label: 'Nutrition' },
          { id: 'achievements', label: 'Badges' }
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
        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* Key Metrics */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-card rounded-2xl p-4 border border-nutrition-border text-center">
                <h3 className="text-sm text-text-secondary mb-2">Weight Change</h3>
                <p className={`text-2xl font-bold ${weightChange < 0 ? 'text-green-600' : 'text-carb'}`}>
                  {weightChange > 0 ? '+' : ''}{weightChange.toFixed(1)} kg
                </p>
                <p className="text-xs text-text-secondary mt-1">This week</p>
              </div>
              <div className="bg-card rounded-2xl p-4 border border-nutrition-border text-center">
                <h3 className="text-sm text-text-secondary mb-2">Avg Calories</h3>
                <p className="text-2xl font-bold text-carb">{avgCalories}</p>
                <p className="text-xs text-text-secondary mt-1">Per day</p>
              </div>
            </div>

            {/* Progress Chart */}
            <div className="bg-card rounded-2xl p-6 border border-nutrition-border">
              <h3 className="text-lg font-semibold text-text-primary mb-4">Weight Progress</h3>
              <div className="space-y-3">
                {progressData.map((day, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <span className="w-16 text-sm text-text-secondary">{day.date}</span>
                    <div className="flex-1 bg-muted rounded-full h-6 overflow-hidden relative">
                      <div 
                        className="h-full bg-primary rounded-full flex items-center justify-end pr-2"
                        style={{ width: `${((day.weight - 67) / (69 - 67)) * 100}%` }}
                      >
                        <span className="text-xs text-white font-medium">{day.weight} kg</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-3 gap-4">
              <div className="bg-card rounded-xl p-4 border border-nutrition-border text-center">
                <Camera className="w-6 h-6 text-primary mx-auto mb-2" />
                <p className="text-lg font-bold text-text-primary">{totalArScans}</p>
                <p className="text-xs text-text-secondary">AR Scans</p>
              </div>
              <div className="bg-card rounded-xl p-4 border border-nutrition-border text-center">
                <Target className="w-6 h-6 text-protein mx-auto mb-2" />
                <p className="text-lg font-bold text-text-primary">6/7</p>
                <p className="text-xs text-text-secondary">Goals Hit</p>
              </div>
              <div className="bg-card rounded-xl p-4 border border-nutrition-border text-center">
                <Zap className="w-6 h-6 text-fat mx-auto mb-2" />
                <p className="text-lg font-bold text-text-primary">92%</p>
                <p className="text-xs text-text-secondary">Accuracy</p>
              </div>
            </div>
          </div>
        )}

        {/* AR Data Tab */}
        {activeTab === 'ar' && (
          <div className="space-y-6">
            {/* AR Usage Stats */}
            <div className="bg-card rounded-2xl p-6 border border-nutrition-border">
              <h3 className="text-lg font-semibold text-text-primary mb-4">AR Scanner Usage</h3>
              <div className="grid grid-cols-2 gap-6 mb-4">
                <div className="text-center">
                  <p className="text-3xl font-bold text-primary">{totalArScans}</p>
                  <p className="text-sm text-text-secondary">Total Scans</p>
                </div>
                <div className="text-center">
                  <p className="text-3xl font-bold text-protein">92%</p>
                  <p className="text-sm text-text-secondary">Accuracy Rate</p>
                </div>
              </div>
              
              <div className="space-y-3">
                <h4 className="font-medium text-text-primary">Daily AR Activity</h4>
                {progressData.map((day, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <span className="text-text-secondary">{day.date}</span>
                    <div className="flex items-center space-x-2">
                      <div className="flex space-x-1">
                        {Array.from({ length: Math.max(day.arScans, 1) }, (_, i) => (
                          <div key={i} className={`w-3 h-3 rounded-full ${
                            i < day.arScans ? 'bg-primary' : 'bg-muted'
                          }`}></div>
                        ))}
                      </div>
                      <span className="text-text-primary font-medium">{day.arScans}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* AR Features Usage */}
            <div className="bg-card rounded-xl p-4 border border-nutrition-border">
              <h4 className="font-semibold text-text-primary mb-3">Feature Usage</h4>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-text-secondary">Food Scanner</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-24 bg-muted rounded-full h-2">
                      <div className="w-4/5 bg-primary h-2 rounded-full"></div>
                    </div>
                    <span className="text-sm font-medium text-text-primary">80%</span>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-text-secondary">Portion Estimator</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-24 bg-muted rounded-full h-2">
                      <div className="w-3/5 bg-protein h-2 rounded-full"></div>
                    </div>
                    <span className="text-sm font-medium text-text-primary">60%</span>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-text-secondary">Grocery Scanner</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-24 bg-muted rounded-full h-2">
                      <div className="w-2/5 bg-fat h-2 rounded-full"></div>
                    </div>
                    <span className="text-sm font-medium text-text-primary">40%</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Accuracy Insights */}
            <div className="bg-muted/50 rounded-xl p-4">
              <h4 className="font-semibold text-text-primary mb-3">📊 AR Insights</h4>
              <div className="text-sm text-text-secondary space-y-1">
                <p>• Best scanning time: Morning (95% accuracy)</p>
                <p>• Most scanned food: South Indian dishes</p>
                <p>• Improvement: Better lighting increases accuracy by 12%</p>
              </div>
            </div>
          </div>
        )}

        {/* Nutrition Tab */}
        {activeTab === 'nutrition' && (
          <div className="space-y-6">
            {/* Macro Trends */}
            <div className="bg-card rounded-2xl p-6 border border-nutrition-border">
              <h3 className="text-lg font-semibold text-text-primary mb-4">Macro Distribution Trends</h3>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-text-secondary">Carbohydrates</span>
                    <span className="font-semibold text-carb">45-50%</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-3">
                    <div className="w-1/2 bg-carb h-3 rounded-full"></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-text-secondary">Protein</span>
                    <span className="font-semibold text-protein">25-30%</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-3">
                    <div className="w-1/4 bg-protein h-3 rounded-full"></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-text-secondary">Fats</span>
                    <span className="font-semibold text-fat">20-25%</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-3">
                    <div className="w-1/5 bg-fat h-3 rounded-full"></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Calorie Tracking */}
            <div className="bg-card rounded-xl p-4 border border-nutrition-border">
              <h4 className="font-semibold text-text-primary mb-3">Calorie Consistency</h4>
              <div className="space-y-3">
                {progressData.slice(-5).map((day, index) => (
                  <div key={index} className="flex justify-between items-center">
                    <span className="text-text-secondary">{day.date}</span>
                    <div className="flex items-center space-x-2">
                      <div className={`w-3 h-3 rounded-full ${
                        day.calories >= 1800 && day.calories <= 2200 ? 'bg-green-500' :
                        day.calories >= 1600 && day.calories <= 2400 ? 'bg-yellow-500' : 'bg-red-500'
                      }`}></div>
                      <span className="font-medium text-text-primary">{day.calories} cal</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Nutrition Score */}
            <div className="bg-card rounded-xl p-4 border border-nutrition-border text-center">
              <h4 className="font-semibold text-text-primary mb-3">Weekly Nutrition Score</h4>
              <div className="relative w-24 h-24 mx-auto mb-3">
                <svg className="w-24 h-24 transform -rotate-90" viewBox="0 0 36 36">
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
                    strokeDasharray="88, 100"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-xl font-bold text-primary">88</span>
                </div>
              </div>
              <p className="text-text-secondary">+3 points from last week</p>
            </div>
          </div>
        )}

        {/* Achievements Tab */}
        {activeTab === 'achievements' && (
          <div className="space-y-6">
            {/* Achievement Stats */}
            <div className="grid grid-cols-3 gap-4">
              <div className="bg-card rounded-xl p-4 border border-nutrition-border text-center">
                <p className="text-2xl font-bold text-primary">12</p>
                <p className="text-xs text-text-secondary">Total Badges</p>
              </div>
              <div className="bg-card rounded-xl p-4 border border-nutrition-border text-center">
                <p className="text-2xl font-bold text-protein">4</p>
                <p className="text-xs text-text-secondary">This Week</p>
              </div>
              <div className="bg-card rounded-xl p-4 border border-nutrition-border text-center">
                <p className="text-2xl font-bold text-fat">7</p>
                <p className="text-xs text-text-secondary">Day Streak</p>
              </div>
            </div>

            {/* Recent Achievements */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-text-primary">Recent Achievements</h3>
              {achievements.map((achievement) => (
                <div key={achievement.id} className="bg-card rounded-xl p-4 border border-nutrition-border">
                  <div className="flex items-center space-x-4">
                    <div className="text-3xl">{achievement.icon}</div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-text-primary">{achievement.title}</h4>
                      <p className="text-text-secondary text-sm">{achievement.description}</p>
                      <p className="text-xs text-text-secondary mt-1">{achievement.date}</p>
                    </div>
                    <Award className="w-6 h-6 text-primary" />
                  </div>
                </div>
              ))}
            </div>

            {/* Next Goals */}
            <div className="bg-muted/50 rounded-xl p-4">
              <h4 className="font-semibold text-text-primary mb-3">🎯 Next Goals</h4>
              <div className="space-y-2 text-sm text-text-secondary">
                <p>• Complete 10 more AR scans for "Scanner Expert" badge</p>
                <p>• Maintain calorie goal for 3 more days for "Consistency King"</p>
                <p>• Try 5 new healthy recipes for "Variety Master"</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
