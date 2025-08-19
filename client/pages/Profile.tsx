import { useState } from "react";
import { User, Settings, Target, Award, TrendingUp, Bell, Shield, HelpCircle, LogOut, Edit3, Camera, Share2 } from "lucide-react";
import BottomNavigation from "@/components/BottomNavigation";

interface UserStats {
  totalScans: number;
  accuracyRate: number;
  streakDays: number;
  caloriesTracked: number;
  favoriteFood: string;
  joinDate: string;
}

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlocked: boolean;
  progress?: number;
  maxProgress?: number;
}

const userStats: UserStats = {
  totalScans: 324,
  accuracyRate: 92,
  streakDays: 15,
  caloriesTracked: 45650,
  favoriteFood: "South Indian Idli",
  joinDate: "March 2024"
};

const achievements: Achievement[] = [
  {
    id: "1",
    title: "AR Pioneer",
    description: "Complete 100 AR food scans",
    icon: "🚀",
    unlocked: true
  },
  {
    id: "2", 
    title: "Accuracy Master",
    description: "Achieve 95%+ accuracy for 10 scans",
    icon: "🎯",
    unlocked: true
  },
  {
    id: "3",
    title: "Consistency King",
    description: "Log food for 30 consecutive days",
    icon: "👑",
    unlocked: false,
    progress: 15,
    maxProgress: 30
  },
  {
    id: "4",
    title: "Health Explorer",
    description: "Try 50 different healthy foods",
    icon: "🌟",
    unlocked: false,
    progress: 28,
    maxProgress: 50
  },
  {
    id: "5",
    title: "Social Butterfly",
    description: "Share 25 food scans with community",
    icon: "🦋",
    unlocked: true
  },
  {
    id: "6",
    title: "Nutrition Guru",
    description: "Maintain perfect macro balance for 7 days",
    icon: "🧙‍♂️",
    unlocked: false,
    progress: 3,
    maxProgress: 7
  }
];

const menuItems = [
  { icon: Target, title: "Goals & Targets", subtitle: "Set your nutrition goals", color: "text-primary" },
  { icon: Bell, title: "Notifications", subtitle: "Manage your alerts", color: "text-yellow-600" },
  { icon: Shield, title: "Privacy & Security", subtitle: "Control your data", color: "text-green-600" },
  { icon: Share2, title: "Export Data", subtitle: "Download your nutrition data", color: "text-blue-600" },
  { icon: HelpCircle, title: "Help & Support", subtitle: "Get help using calARieScan", color: "text-purple-600" },
  { icon: Settings, title: "App Settings", subtitle: "Customize your experience", color: "text-gray-600" }
];

export default function Profile() {
  const [activeTab, setActiveTab] = useState<'overview' | 'achievements' | 'settings'>('overview');
  const [isEditingProfile, setIsEditingProfile] = useState(false);

  return (
    <div className="min-h-screen bg-nutrition-bg pb-20">
      {/* Beautiful Profile Header */}
      <div className="relative bg-gradient-to-br from-indigo-600 via-primary to-purple-600 pt-12 pb-6">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            backgroundSize: '60px 60px'
          }}></div>
        </div>

        <div className="relative px-6">
          {/* Profile Picture & Basic Info */}
          <div className="text-center mb-6">
            <div className="relative inline-block">
              <div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center text-4xl backdrop-blur-sm border-4 border-white/30">
                👤
              </div>
              <button className="absolute -bottom-1 -right-1 w-8 h-8 bg-primary rounded-full flex items-center justify-center border-2 border-white">
                <Camera className="w-4 h-4 text-white" />
              </button>
            </div>
            <h1 className="text-2xl font-bold text-white mt-4">Anshumala Pandit</h1>
            <p className="text-white/80">Level 12 • Nutrition Explorer</p>
            <p className="text-white/60 text-sm">Member since {userStats.joinDate}</p>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-white/10 rounded-2xl p-4 text-center backdrop-blur-sm">
              <div className="text-2xl mb-1">📱</div>
              <p className="text-2xl font-bold text-white">{userStats.totalScans}</p>
              <p className="text-white/80 text-xs">AR Scans</p>
            </div>
            <div className="bg-white/10 rounded-2xl p-4 text-center backdrop-blur-sm">
              <div className="text-2xl mb-1">🎯</div>
              <p className="text-2xl font-bold text-white">{userStats.accuracyRate}%</p>
              <p className="text-white/80 text-xs">Accuracy</p>
            </div>
            <div className="bg-white/10 rounded-2xl p-4 text-center backdrop-blur-sm">
              <div className="text-2xl mb-1">🔥</div>
              <p className="text-2xl font-bold text-white">{userStats.streakDays}</p>
              <p className="text-white/80 text-xs">Day Streak</p>
            </div>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="flex bg-card border-b border-nutrition-border sticky top-0 z-10">
        {[
          { id: 'overview', label: 'Overview' },
          { id: 'achievements', label: 'Achievements' },
          { id: 'settings', label: 'Settings' }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as typeof activeTab)}
            className={`flex-1 py-4 text-sm font-medium transition-all ${
              activeTab === tab.id
                ? 'text-primary border-b-2 border-primary bg-primary/5'
                : 'text-text-secondary hover:text-text-primary'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="p-6 space-y-6">
        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* Personal Records */}
            <div className="bg-card rounded-2xl p-6 border border-nutrition-border">
              <h3 className="text-lg font-semibold text-text-primary mb-4">Personal Records</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gradient-to-br from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 rounded-xl p-4 border border-yellow-200 dark:border-yellow-800">
                  <div className="text-2xl mb-2">🏆</div>
                  <p className="text-lg font-bold text-text-primary">{userStats.caloriesTracked.toLocaleString()}</p>
                  <p className="text-sm text-text-secondary">Total Calories Tracked</p>
                </div>
                <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-xl p-4 border border-green-200 dark:border-green-800">
                  <div className="text-2xl mb-2">❤️</div>
                  <p className="text-lg font-bold text-text-primary">{userStats.favoriteFood}</p>
                  <p className="text-sm text-text-secondary">Favorite Food</p>
                </div>
              </div>
            </div>

            {/* Weekly Summary */}
            <div className="bg-card rounded-2xl p-6 border border-nutrition-border">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-text-primary">This Week</h3>
                <TrendingUp className="w-5 h-5 text-primary" />
              </div>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-text-secondary">Daily Average Calories</span>
                  <span className="font-semibold text-text-primary">1,847 cal</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-text-secondary">AR Scans Completed</span>
                  <span className="font-semibold text-primary">23 scans</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-text-secondary">Average Accuracy</span>
                  <span className="font-semibold text-protein">94%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-text-secondary">Goals Achieved</span>
                  <span className="font-semibold text-green-600">6/7 days</span>
                </div>
              </div>
            </div>

            {/* Nutrition Insights */}
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-2xl p-6 border border-blue-200 dark:border-blue-800">
              <h3 className="text-lg font-semibold text-text-primary mb-4">💡 Personalized Insights</h3>
              <div className="space-y-3">
                <div className="bg-white/50 dark:bg-black/20 rounded-lg p-3">
                  <p className="text-sm text-text-primary">
                    🌟 <strong>Great progress!</strong> Your protein intake has increased by 18% this month.
                  </p>
                </div>
                <div className="bg-white/50 dark:bg-black/20 rounded-lg p-3">
                  <p className="text-sm text-text-primary">
                    💪 <strong>Consistency rocks!</strong> You've been maintaining your calorie goals excellently.
                  </p>
                </div>
                <div className="bg-white/50 dark:bg-black/20 rounded-lg p-3">
                  <p className="text-sm text-text-primary">
                    🥗 <strong>Tip:</strong> Try adding more colorful vegetables for better micronutrient variety.
                  </p>
                </div>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-card rounded-2xl p-6 border border-nutrition-border">
              <h3 className="text-lg font-semibold text-text-primary mb-4">Recent Activity</h3>
              <div className="space-y-3">
                {[
                  { action: "Completed AR scan", item: "Quinoa Bowl", time: "2 hours ago", emoji: "📱" },
                  { action: "Achieved goal", item: "Daily Protein Target", time: "5 hours ago", emoji: "🎯" },
                  { action: "Shared with community", item: "Healthy Smoothie", time: "1 day ago", emoji: "📸" },
                  { action: "Unlocked achievement", item: "7-Day Streak", time: "2 days ago", emoji: "🏆" }
                ].map((activity, index) => (
                  <div key={index} className="flex items-center space-x-3 p-3 bg-muted/30 rounded-lg">
                    <div className="text-xl">{activity.emoji}</div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-text-primary">{activity.action}</p>
                      <p className="text-sm text-text-secondary">{activity.item}</p>
                    </div>
                    <span className="text-xs text-text-secondary">{activity.time}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Achievements Tab */}
        {activeTab === 'achievements' && (
          <div className="space-y-6">
            {/* Achievement Stats */}
            <div className="bg-gradient-to-r from-yellow-400 via-yellow-500 to-orange-500 rounded-2xl p-6 text-white">
              <div className="flex items-center space-x-3 mb-4">
                <Award className="w-8 h-8" />
                <div>
                  <h3 className="text-xl font-bold">Achievement Center</h3>
                  <p className="text-white/80">Track your nutrition milestones</p>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center">
                  <p className="text-2xl font-bold">{achievements.filter(a => a.unlocked).length}</p>
                  <p className="text-white/80 text-sm">Unlocked</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold">{achievements.length}</p>
                  <p className="text-white/80 text-sm">Total</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold">85%</p>
                  <p className="text-white/80 text-sm">Completion</p>
                </div>
              </div>
            </div>

            {/* Achievement Grid */}
            <div className="grid grid-cols-1 gap-4">
              {achievements.map((achievement) => (
                <div 
                  key={achievement.id} 
                  className={`rounded-2xl p-4 border transition-all ${
                    achievement.unlocked 
                      ? 'bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border-green-200 dark:border-green-800' 
                      : 'bg-card border-nutrition-border'
                  }`}
                >
                  <div className="flex items-center space-x-4">
                    <div className={`text-4xl ${achievement.unlocked ? '' : 'grayscale opacity-50'}`}>
                      {achievement.icon}
                    </div>
                    <div className="flex-1">
                      <h4 className={`font-semibold ${achievement.unlocked ? 'text-green-800 dark:text-green-200' : 'text-text-primary'}`}>
                        {achievement.title}
                      </h4>
                      <p className={`text-sm ${achievement.unlocked ? 'text-green-600 dark:text-green-300' : 'text-text-secondary'}`}>
                        {achievement.description}
                      </p>
                      
                      {/* Progress Bar for locked achievements */}
                      {!achievement.unlocked && achievement.progress && achievement.maxProgress && (
                        <div className="mt-2">
                          <div className="flex justify-between items-center mb-1">
                            <span className="text-xs text-text-secondary">Progress</span>
                            <span className="text-xs font-medium text-text-primary">
                              {achievement.progress}/{achievement.maxProgress}
                            </span>
                          </div>
                          <div className="w-full bg-muted rounded-full h-2">
                            <div 
                              className="bg-primary h-2 rounded-full transition-all duration-300"
                              style={{ width: `${(achievement.progress / achievement.maxProgress) * 100}%` }}
                            />
                          </div>
                        </div>
                      )}
                    </div>
                    
                    {achievement.unlocked && (
                      <div className="text-green-600">
                        <Award className="w-6 h-6" />
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Settings Tab */}
        {activeTab === 'settings' && (
          <div className="space-y-6">
            {/* Account Settings */}
            <div className="bg-card rounded-2xl p-6 border border-nutrition-border">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-text-primary">Account Information</h3>
                <button 
                  onClick={() => setIsEditingProfile(!isEditingProfile)}
                  className="flex items-center space-x-2 text-primary font-medium"
                >
                  <Edit3 className="w-4 h-4" />
                  <span>Edit</span>
                </button>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-text-secondary mb-1">Full Name</label>
                  <input 
                    type="text" 
                    value="Anshumala Pandit"
                    disabled={!isEditingProfile}
                    className="w-full p-3 border border-nutrition-border rounded-xl bg-nutrition-bg text-text-primary disabled:opacity-50"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-text-secondary mb-1">Email</label>
                  <input 
                    type="email" 
                    value="anshumala@email.com"
                    disabled={!isEditingProfile}
                    className="w-full p-3 border border-nutrition-border rounded-xl bg-nutrition-bg text-text-primary disabled:opacity-50"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-text-secondary mb-1">Location</label>
                  <input 
                    type="text" 
                    value="Mumbai, India"
                    disabled={!isEditingProfile}
                    className="w-full p-3 border border-nutrition-border rounded-xl bg-nutrition-bg text-text-primary disabled:opacity-50"
                  />
                </div>
              </div>

              {isEditingProfile && (
                <div className="flex space-x-3 mt-4">
                  <button className="flex-1 bg-primary text-white py-3 rounded-xl font-medium">
                    Save Changes
                  </button>
                  <button 
                    onClick={() => setIsEditingProfile(false)}
                    className="flex-1 bg-muted text-text-primary py-3 rounded-xl font-medium"
                  >
                    Cancel
                  </button>
                </div>
              )}
            </div>

            {/* Menu Items */}
            <div className="space-y-3">
              {menuItems.map((item, index) => (
                <button key={index} className="w-full bg-card rounded-xl p-4 border border-nutrition-border hover:bg-muted/50 transition-colors text-left">
                  <div className="flex items-center space-x-4">
                    <div className={`w-10 h-10 rounded-xl bg-muted flex items-center justify-center ${item.color}`}>
                      <item.icon className="w-5 h-5" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-text-primary">{item.title}</h4>
                      <p className="text-sm text-text-secondary">{item.subtitle}</p>
                    </div>
                    <div className="text-text-secondary">
                      <Edit3 className="w-4 h-4" />
                    </div>
                  </div>
                </button>
              ))}
            </div>

            {/* Logout Button */}
            <button className="w-full bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-xl p-4 border border-red-200 dark:border-red-800 hover:bg-red-100 dark:hover:bg-red-900/30 transition-colors">
              <div className="flex items-center justify-center space-x-2">
                <LogOut className="w-5 h-5" />
                <span className="font-medium">Sign Out</span>
              </div>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
