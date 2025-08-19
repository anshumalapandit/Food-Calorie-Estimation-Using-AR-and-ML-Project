import { useState } from "react";
import { ArrowLeft, ShoppingCart, Scan, Plus, Check, X, Filter } from "lucide-react";
import { Link } from "react-router-dom";

interface ScannedProduct {
  id: string;
  name: string;
  brand: string;
  calories: number;
  servingSize: string;
  price: string;
  healthScore: number;
  nutrition: {
    protein: number;
    carbs: number;
    fat: number;
    fiber: number;
    sodium: number;
    sugar: number;
  };
  alternatives?: Array<{
    name: string;
    healthScore: number;
    price: string;
    reason: string;
  }>;
}

const sampleProduct: ScannedProduct = {
  id: "1",
  name: "Instant Noodles",
  brand: "Popular Brand",
  calories: 294,
  servingSize: "1 pack (75g)",
  price: "$0.85",
  healthScore: 35,
  nutrition: {
    protein: 8,
    carbs: 45,
    fat: 12,
    fiber: 2,
    sodium: 1200,
    sugar: 3
  },
  alternatives: [
    { name: "Whole Wheat Pasta", healthScore: 78, price: "$1.20", reason: "Higher fiber, less sodium" },
    { name: "Brown Rice Noodles", healthScore: 72, price: "$1.45", reason: "Gluten-free, better nutrients" },
    { name: "Quinoa Pasta", healthScore: 85, price: "$2.10", reason: "Complete protein, superfood" }
  ]
};

interface ShoppingListItem {
  id: string;
  name: string;
  quantity: number;
  added: boolean;
  healthScore?: number;
}

const shoppingList: ShoppingListItem[] = [
  { id: "1", name: "Whole grain bread", quantity: 1, added: true, healthScore: 82 },
  { id: "2", name: "Greek yogurt", quantity: 2, added: true, healthScore: 88 },
  { id: "3", name: "Spinach", quantity: 1, added: false, healthScore: 95 },
  { id: "4", name: "Almonds", quantity: 1, added: false, healthScore: 91 },
  { id: "5", name: "Salmon fillet", quantity: 1, added: false, healthScore: 93 }
];

export default function GroceryScanner() {
  const [isScanning, setIsScanning] = useState(false);
  const [scannedProduct, setScannedProduct] = useState<ScannedProduct | null>(null);
  const [showAlternatives, setShowAlternatives] = useState(false);
  const [activeTab, setActiveTab] = useState<'scanner' | 'list'>('scanner');

  const handleScan = () => {
    setIsScanning(true);
    setTimeout(() => {
      setScannedProduct(sampleProduct);
      setIsScanning(false);
    }, 2000);
  };

  const getHealthScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600 bg-green-100';
    if (score >= 60) return 'text-yellow-600 bg-yellow-100';
    return 'text-red-600 bg-red-100';
  };

  const getHealthScoreLabel = (score: number) => {
    if (score >= 80) return 'Excellent';
    if (score >= 60) return 'Good';
    if (score >= 40) return 'Fair';
    return 'Poor';
  };

  return (
    <div className="min-h-screen bg-nutrition-bg">
      {/* Header */}
      <div className="flex items-center justify-between p-6 bg-card border-b border-nutrition-border">
        <Link to="/" className="w-10 h-10 bg-muted rounded-full flex items-center justify-center">
          <ArrowLeft className="w-5 h-5 text-text-primary" />
        </Link>
        <div className="text-center">
          <h1 className="text-lg font-semibold text-text-primary">AR Grocery Scanner</h1>
          <p className="text-sm text-text-secondary">Smart shopping assistant</p>
        </div>
        <button className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
          <Filter className="w-5 h-5 text-white" />
        </button>
      </div>

      {/* Tab Navigation */}
      <div className="flex bg-card border-b border-nutrition-border">
        <button
          onClick={() => setActiveTab('scanner')}
          className={`flex-1 py-4 text-sm font-medium flex items-center justify-center space-x-2 ${
            activeTab === 'scanner'
              ? 'text-primary border-b-2 border-primary'
              : 'text-text-secondary'
          }`}
        >
          <Scan className="w-4 h-4" />
          <span>Scanner</span>
        </button>
        <button
          onClick={() => setActiveTab('list')}
          className={`flex-1 py-4 text-sm font-medium flex items-center justify-center space-x-2 ${
            activeTab === 'list'
              ? 'text-primary border-b-2 border-primary'
              : 'text-text-secondary'
          }`}
        >
          <ShoppingCart className="w-4 h-4" />
          <span>Smart List</span>
        </button>
      </div>

      {activeTab === 'scanner' && (
        <div>
          {/* Scanner View */}
          <div className="relative h-80 bg-black overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/40 flex items-center justify-center">
              <div className="w-64 h-48 border-2 border-white/50 rounded-xl relative">
                {/* Scanner frame */}
                <div className="absolute -top-1 -left-1 w-6 h-6 border-l-3 border-t-3 border-primary rounded-tl"></div>
                <div className="absolute -top-1 -right-1 w-6 h-6 border-r-3 border-t-3 border-primary rounded-tr"></div>
                <div className="absolute -bottom-1 -left-1 w-6 h-6 border-l-3 border-b-3 border-primary rounded-bl"></div>
                <div className="absolute -bottom-1 -right-1 w-6 h-6 border-r-3 border-b-3 border-primary rounded-br"></div>
                
                {isScanning && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
                  </div>
                )}
              </div>
            </div>
            
            <div className="absolute bottom-4 left-4 right-4 text-center">
              <p className="text-white text-sm mb-4">
                {isScanning ? "Scanning product..." : "Aim camera at product barcode or label"}
              </p>
              <button
                onClick={handleScan}
                disabled={isScanning}
                className="w-16 h-16 bg-primary rounded-full flex items-center justify-center disabled:opacity-50"
              >
                <Scan className="w-8 h-8 text-white" />
              </button>
            </div>
          </div>

          {/* Product Analysis */}
          {scannedProduct && (
            <div className="p-6 space-y-4">
              <div className="bg-card rounded-2xl p-6 border border-nutrition-border">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-text-primary">{scannedProduct.name}</h3>
                    <p className="text-text-secondary">{scannedProduct.brand}</p>
                    <p className="text-text-secondary text-sm">{scannedProduct.servingSize}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-carb">{scannedProduct.calories}</p>
                    <p className="text-xs text-text-secondary">calories</p>
                    <p className="text-lg font-semibold text-text-primary mt-1">{scannedProduct.price}</p>
                  </div>
                </div>

                {/* Health Score */}
                <div className="flex items-center justify-between mb-4">
                  <span className="text-text-secondary">Health Score</span>
                  <div className="flex items-center space-x-2">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getHealthScoreColor(scannedProduct.healthScore)}`}>
                      {getHealthScoreLabel(scannedProduct.healthScore)}
                    </span>
                    <span className="font-bold text-text-primary">{scannedProduct.healthScore}/100</span>
                  </div>
                </div>

                {/* Nutrition Grid */}
                <div className="grid grid-cols-3 gap-4 mb-4">
                  <div className="text-center">
                    <p className="font-semibold text-protein">{scannedProduct.nutrition.protein}g</p>
                    <p className="text-xs text-text-secondary">Protein</p>
                  </div>
                  <div className="text-center">
                    <p className="font-semibold text-carb">{scannedProduct.nutrition.carbs}g</p>
                    <p className="text-xs text-text-secondary">Carbs</p>
                  </div>
                  <div className="text-center">
                    <p className="font-semibold text-fat">{scannedProduct.nutrition.fat}g</p>
                    <p className="text-xs text-text-secondary">Fat</p>
                  </div>
                </div>

                {/* Warning indicators */}
                <div className="flex space-x-2 mb-4">
                  {scannedProduct.nutrition.sodium > 600 && (
                    <span className="text-xs bg-red-100 text-red-600 px-2 py-1 rounded-lg">High Sodium</span>
                  )}
                  {scannedProduct.nutrition.sugar > 10 && (
                    <span className="text-xs bg-yellow-100 text-yellow-600 px-2 py-1 rounded-lg">High Sugar</span>
                  )}
                  {scannedProduct.nutrition.fiber < 3 && (
                    <span className="text-xs bg-orange-100 text-orange-600 px-2 py-1 rounded-lg">Low Fiber</span>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-3">
                  <button className="flex-1 bg-primary text-white py-3 rounded-xl font-semibold flex items-center justify-center space-x-2">
                    <Plus className="w-4 h-4" />
                    <span>Add to Cart</span>
                  </button>
                  <button 
                    onClick={() => setShowAlternatives(!showAlternatives)}
                    className="flex-1 bg-muted text-text-primary py-3 rounded-xl font-semibold"
                  >
                    See Healthier Options
                  </button>
                </div>
              </div>

              {/* Healthier Alternatives */}
              {showAlternatives && scannedProduct.alternatives && (
                <div className="bg-card rounded-xl p-4 border border-nutrition-border">
                  <h4 className="font-semibold text-text-primary mb-3">🌱 Healthier Alternatives</h4>
                  <div className="space-y-3">
                    {scannedProduct.alternatives.map((alt, index) => (
                      <div key={index} className="flex justify-between items-center p-3 bg-muted/30 rounded-lg">
                        <div className="flex-1">
                          <h5 className="font-medium text-text-primary">{alt.name}</h5>
                          <p className="text-sm text-text-secondary">{alt.reason}</p>
                        </div>
                        <div className="text-right mr-3">
                          <p className="font-semibold text-text-primary">{alt.price}</p>
                          <span className={`text-xs px-2 py-1 rounded ${getHealthScoreColor(alt.healthScore)}`}>
                            {alt.healthScore}
                          </span>
                        </div>
                        <button className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                          <Plus className="w-4 h-4 text-white" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {activeTab === 'list' && (
        <div className="p-6">
          {/* Shopping List Stats */}
          <div className="bg-card rounded-2xl p-6 border border-nutrition-border mb-6">
            <h3 className="text-lg font-semibold text-text-primary mb-4">Smart Shopping List</h3>
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center">
                <p className="text-2xl font-bold text-primary">{shoppingList.filter(item => item.added).length}</p>
                <p className="text-xs text-text-secondary">Items Added</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-green-600">87</p>
                <p className="text-xs text-text-secondary">Avg Health Score</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-carb">$24.50</p>
                <p className="text-xs text-text-secondary">Estimated Total</p>
              </div>
            </div>
          </div>

          {/* Shopping List Items */}
          <div className="space-y-3">
            <h4 className="font-semibold text-text-primary">Your List</h4>
            {shoppingList.map((item) => (
              <div key={item.id} className={`bg-card rounded-xl p-4 border ${
                item.added ? 'border-primary/30 bg-primary/5' : 'border-nutrition-border'
              }`}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <button className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                      item.added ? 'bg-primary border-primary' : 'border-muted'
                    }`}>
                      {item.added && <Check className="w-4 h-4 text-white" />}
                    </button>
                    <div>
                      <h5 className="font-medium text-text-primary">{item.name}</h5>
                      <p className="text-sm text-text-secondary">Qty: {item.quantity}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    {item.healthScore && (
                      <span className={`text-xs px-2 py-1 rounded ${getHealthScoreColor(item.healthScore)}`}>
                        {item.healthScore}
                      </span>
                    )}
                    <button className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
                      <X className="w-4 h-4 text-red-600" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Add Item */}
          <button className="w-full mt-6 bg-primary text-white py-4 rounded-xl font-semibold flex items-center justify-center space-x-2">
            <Plus className="w-5 h-5" />
            <span>Add Item to List</span>
          </button>

          {/* AI Suggestions */}
          <div className="mt-6 bg-muted/50 rounded-xl p-4">
            <h4 className="font-semibold text-text-primary mb-3">🤖 AI Suggestions</h4>
            <div className="text-sm text-text-secondary space-y-1">
              <p>• Add blueberries for antioxidants (based on your goals)</p>
              <p>• Consider quinoa instead of white rice</p>
              <p>• Your protein sources look great this week!</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
