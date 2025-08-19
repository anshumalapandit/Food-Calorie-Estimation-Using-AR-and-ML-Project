import { useState } from "react";
import { Calendar, Filter, Search, Clock, Utensils, Camera, TrendingUp, Eye, RotateCcw } from "lucide-react";
import BottomNavigation from "@/components/BottomNavigation";

interface FoodEntry {
  id: string;
  name: string;
  image: string;
  calories: number;
  time: string;
  date: string;
  meal: 'breakfast' | 'lunch' | 'dinner' | 'snack';
  nutrition: {
    protein: number;
    carbs: number;
    fat: number;
    fiber: number;
  };
  arData: {
    accuracy: number;
    portion: string;
    scanType: 'ar' | 'manual';
  };
  tags: string[];
}

const foodHistory: FoodEntry[] = [
  {
    id: "1",
    name: "South Indian Idli with Sambar",
    image: "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=400&h=300&fit=crop",
    calories: 275,
    time: "8:30 AM",
    date: "Today",
    meal: "breakfast",
    nutrition: { protein: 8, carbs: 52, fat: 2, fiber: 4 },
    arData: { accuracy: 94, portion: "2 pieces + 1 bowl", scanType: "ar" },
    tags: ["healthy", "traditional", "high-fiber"]
  },
  {
    id: "2", 
    name: "Quinoa Power Bowl",
    image: "https://images.unsplash.com/photo-1546554137-f86b9593a222?w=400&h=300&fit=crop",
    calories: 420,
    time: "1:15 PM",
    date: "Today",
    meal: "lunch",
    nutrition: { protein: 18, carbs: 45, fat: 15, fiber: 8 },
    arData: { accuracy: 91, portion: "1 large bowl", scanType: "ar" },
    tags: ["superfood", "protein-rich", "gluten-free"]
  },
  {
    id: "3",
    name: "Mixed Berry Smoothie",
    image: "https://images.unsplash.com/photo-1553530666-ba11a7da3888?w=400&h=300&fit=crop",
    calories: 180,
    time: "10:45 AM",
    date: "Today",
    meal: "snack",
    nutrition: { protein: 6, carbs: 32, fat: 3, fiber: 6 },
    arData: { accuracy: 88, portion: "1 tall glass", scanType: "ar" },
    tags: ["antioxidants", "vitamin-c", "refreshing"]
  },
  {
    id: "4",
    name: "Grilled Salmon & Vegetables",
    image: "https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=400&h=300&fit=crop",
    calories: 385,
    time: "7:30 PM",
    date: "Yesterday",
    meal: "dinner",
    nutrition: { protein: 32, carbs: 12, fat: 22, fiber: 4 },
    arData: { accuracy: 96, portion: "1 fillet + vegetables", scanType: "ar" },
    tags: ["omega-3", "protein", "low-carb"]
  },
  {
    id: "5",
    name: "Avocado Toast with Egg",
    image: "https://images.unsplash.com/photo-1541519227354-08fa5d50c44d?w=400&h=300&fit=crop",
    calories: 340,
    time: "8:00 AM",
    date: "Yesterday",
    meal: "breakfast",
    nutrition: { protein: 14, carbs: 28, fat: 20, fiber: 12 },
    arData: { accuracy: 92, portion: "2 slices + 1 egg", scanType: "ar" },
    tags: ["healthy-fats", "fiber", "instagram-worthy"]
  },
  {
    id: "6",
    name: "Greek Yogurt Parfait",
    image: "https://images.unsplash.com/photo-1488477181946-6428a0291777?w=400&h=300&fit=crop",
    calories: 220,
    time: "3:30 PM",
    date: "Yesterday", 
    meal: "snack",
    nutrition: { protein: 15, carbs: 25, fat: 8, fiber: 3 },
    arData: { accuracy: 89, portion: "1 cup with toppings", scanType: "ar" },
    tags: ["probiotic", "protein", "calcium"]
  }
];

const mealColors = {
  breakfast: 'bg-yellow-100 text-yellow-800 border-yellow-200',
  lunch: 'bg-green-100 text-green-800 border-green-200',
  dinner: 'bg-blue-100 text-blue-800 border-blue-200',
  snack: 'bg-purple-100 text-purple-800 border-purple-200'
};

const mealEmojis = {
  breakfast: '🌅',
  lunch: '☀️',
  dinner: '🌙',
  snack: '🍪'
};

export default function History() {
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'breakfast' | 'lunch' | 'dinner' | 'snack'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDate, setSelectedDate] = useState('all');
  const [expandedCard, setExpandedCard] = useState<string | null>(null);

  const filteredHistory = foodHistory.filter(entry => {
    const matchesFilter = selectedFilter === 'all' || entry.meal === selectedFilter;
    const matchesSearch = entry.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         entry.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesDate = selectedDate === 'all' || entry.date === selectedDate;
    
    return matchesFilter && matchesSearch && matchesDate;
  });

  const totalCaloriesToday = foodHistory
    .filter(entry => entry.date === 'Today')
    .reduce((sum, entry) => sum + entry.calories, 0);

  const totalMealsToday = foodHistory.filter(entry => entry.date === 'Today').length;

  return (
    <div className="min-h-screen bg-nutrition-bg pb-20">
      {/* Beautiful Header */}
      <div className="bg-gradient-to-br from-purple-600 via-primary to-green-600 p-6 text-white">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold">Food History</h1>
            <p className="text-white/80">Track your nutrition journey</p>
          </div>
          <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
            <Clock className="w-6 h-6" />
          </div>
        </div>

        {/* Today's Summary */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white/10 rounded-2xl p-4 backdrop-blur-sm">
            <div className="text-2xl mb-1">🔥</div>
            <p className="text-2xl font-bold">{totalCaloriesToday}</p>
            <p className="text-white/80 text-sm">Calories Today</p>
          </div>
          <div className="bg-white/10 rounded-2xl p-4 backdrop-blur-sm">
            <div className="text-2xl mb-1">🍽️</div>
            <p className="text-2xl font-bold">{totalMealsToday}</p>
            <p className="text-white/80 text-sm">Meals Logged</p>
          </div>
        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* Search and Filters */}
        <div className="space-y-4">
          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-text-secondary" />
            <input
              type="text"
              placeholder="Search foods, tags, or ingredients..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-card border border-nutrition-border rounded-xl text-text-primary placeholder-text-secondary focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          {/* Meal Filter Buttons */}
          <div className="flex space-x-2 overflow-x-auto pb-2">
            {(['all', 'breakfast', 'lunch', 'dinner', 'snack'] as const).map((filter) => (
              <button
                key={filter}
                onClick={() => setSelectedFilter(filter)}
                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                  selectedFilter === filter
                    ? 'bg-primary text-white shadow-sm'
                    : 'bg-card text-text-secondary border border-nutrition-border hover:bg-muted'
                }`}
              >
                {filter === 'all' ? '��️ All' : `${mealEmojis[filter]} ${filter.charAt(0).toUpperCase() + filter.slice(1)}`}
              </button>
            ))}
          </div>

          {/* Date Filter */}
          <div className="flex items-center space-x-2">
            <Calendar className="w-5 h-5 text-text-secondary" />
            <select
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="bg-card border border-nutrition-border rounded-lg px-3 py-2 text-text-primary focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="all">All Dates</option>
              <option value="Today">Today</option>
              <option value="Yesterday">Yesterday</option>
              <option value="This Week">This Week</option>
            </select>
          </div>
        </div>

        {/* Food History Cards */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-text-primary">
              {filteredHistory.length} {filteredHistory.length === 1 ? 'Entry' : 'Entries'} Found
            </h2>
            <button className="flex items-center space-x-2 text-primary font-medium">
              <Filter className="w-4 h-4" />
              <span>Advanced Filter</span>
            </button>
          </div>

          {filteredHistory.map((entry) => (
            <div key={entry.id} className="bg-card rounded-2xl border border-nutrition-border overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300">
              {/* Card Header */}
              <div className="relative">
                <img
                  src={entry.image}
                  alt={entry.name}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                
                {/* Floating Elements */}
                <div className="absolute top-4 left-4 flex space-x-2">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium border ${mealColors[entry.meal]}`}>
                    {mealEmojis[entry.meal]} {entry.meal.charAt(0).toUpperCase() + entry.meal.slice(1)}
                  </span>
                  {entry.arData.scanType === 'ar' && (
                    <span className="px-3 py-1 bg-primary/20 text-primary rounded-full text-xs font-medium border border-primary/30 backdrop-blur-sm">
                      <Camera className="w-3 h-3 inline mr-1" />
                      AR Scan
                    </span>
                  )}
                </div>

                <div className="absolute top-4 right-4">
                  <span className="bg-black/50 text-white px-3 py-1 rounded-full text-sm font-bold backdrop-blur-sm">
                    {entry.calories} cal
                  </span>
                </div>

                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="text-white text-xl font-bold mb-1">{entry.name}</h3>
                  <div className="flex items-center space-x-4 text-white/80 text-sm">
                    <span className="flex items-center space-x-1">
                      <Clock className="w-4 h-4" />
                      <span>{entry.time}</span>
                    </span>
                    <span className="flex items-center space-x-1">
                      <Calendar className="w-4 h-4" />
                      <span>{entry.date}</span>
                    </span>
                  </div>
                </div>
              </div>

              {/* Card Content */}
              <div className="p-4">
                {/* Quick Nutrition Info */}
                <div className="grid grid-cols-4 gap-3 mb-4">
                  <div className="text-center">
                    <p className="text-sm font-semibold text-protein">{entry.nutrition.protein}g</p>
                    <p className="text-xs text-text-secondary">Protein</p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm font-semibold text-carb">{entry.nutrition.carbs}g</p>
                    <p className="text-xs text-text-secondary">Carbs</p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm font-semibold text-fat">{entry.nutrition.fat}g</p>
                    <p className="text-xs text-text-secondary">Fat</p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm font-semibold text-text-primary">{entry.nutrition.fiber}g</p>
                    <p className="text-xs text-text-secondary">Fiber</p>
                  </div>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {entry.tags.map((tag, index) => (
                    <span key={index} className="bg-muted/50 text-text-secondary px-2 py-1 rounded-lg text-xs">
                      #{tag}
                    </span>
                  ))}
                </div>

                {/* AR Data & Actions */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="text-center">
                      <p className="text-sm font-semibold text-primary">{entry.arData.accuracy}%</p>
                      <p className="text-xs text-text-secondary">Accuracy</p>
                    </div>
                    <div className="text-center">
                      <p className="text-sm font-semibold text-text-primary">{entry.arData.portion}</p>
                      <p className="text-xs text-text-secondary">Portion</p>
                    </div>
                  </div>

                  <div className="flex space-x-2">
                    <button 
                      onClick={() => setExpandedCard(expandedCard === entry.id ? null : entry.id)}
                      className="w-8 h-8 bg-primary/10 text-primary rounded-full flex items-center justify-center hover:bg-primary/20 transition-colors"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                    <button className="w-8 h-8 bg-muted text-text-secondary rounded-full flex items-center justify-center hover:bg-muted/80 transition-colors">
                      <RotateCcw className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Expanded Details */}
                {expandedCard === entry.id && (
                  <div className="mt-4 pt-4 border-t border-nutrition-border space-y-3 animate-in slide-in-from-top duration-300">
                    <div className="bg-muted/30 rounded-lg p-3">
                      <h4 className="font-semibold text-text-primary mb-2">Detailed Nutrition</h4>
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-text-secondary">Calories:</span>
                          <span className="font-medium text-text-primary">{entry.calories} kcal</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-text-secondary">Protein:</span>
                          <span className="font-medium text-protein">{entry.nutrition.protein}g</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-text-secondary">Carbs:</span>
                          <span className="font-medium text-carb">{entry.nutrition.carbs}g</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-text-secondary">Fat:</span>
                          <span className="font-medium text-fat">{entry.nutrition.fat}g</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex space-x-2">
                      <button className="flex-1 bg-primary text-white py-2 rounded-lg font-medium text-sm">
                        Log Again
                      </button>
                      <button className="flex-1 bg-muted text-text-primary py-2 rounded-lg font-medium text-sm">
                        Share
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredHistory.length === 0 && (
          <div className="text-center py-12">
            <div className="w-20 h-20 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
              <Utensils className="w-10 h-10 text-text-secondary" />
            </div>
            <h3 className="text-lg font-semibold text-text-primary mb-2">No food entries found</h3>
            <p className="text-text-secondary mb-4">Try adjusting your search or filters</p>
            <button className="bg-primary text-white px-6 py-3 rounded-xl font-medium">
              Start Scanning Food
            </button>
          </div>
        )}
      </div>
      <BottomNavigation />
    </div>
  );
}
