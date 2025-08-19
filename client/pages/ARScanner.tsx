import { useState, useEffect } from "react";
import { ArrowLeft, Camera, Focus, Zap, Target, Volume2 } from "lucide-react";
import { Link } from "react-router-dom";

interface DetectedFood {
  name: string;
  confidence: number;
  calories: number;
  weight: string;
  nutrients: {
    carbs: number;
    protein: number;
    fat: number;
    fiber: number;
  };
}

export default function ARScanner() {
  const [isScanning, setIsScanning] = useState(false);
  const [detectedFood, setDetectedFood] = useState<DetectedFood | null>(null);
  const [scanProgress, setScanProgress] = useState(0);

  useEffect(() => {
    if (isScanning) {
      const interval = setInterval(() => {
        setScanProgress(prev => {
          if (prev >= 100) {
            setDetectedFood({
              name: "South Indian Idli (2 pieces)",
              confidence: 94,
              calories: 156,
              weight: "120g",
              nutrients: {
                carbs: 32,
                protein: 4,
                fat: 1,
                fiber: 2
              }
            });
            setIsScanning(false);
            return 0;
          }
          return prev + 5;
        });
      }, 100);
      return () => clearInterval(interval);
    }
  }, [isScanning]);

  const startScanning = () => {
    setDetectedFood(null);
    setScanProgress(0);
    setIsScanning(true);
  };

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      {/* Camera Viewfinder */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/40">
        <img
          src="https://cdn.builder.io/api/v1/image/assets%2F48ab03c8fe114dbb857fff77ab3f917f%2Fea610fc150284739b5e0c82e30a03373?format=webp&width=800"
          alt="AR Camera View"
          className="w-full h-full object-cover"
        />
      </div>

      {/* AR Overlay UI */}
      <div className="relative z-10 flex flex-col h-full">
        {/* Top Bar */}
        <div className="flex justify-between items-center p-6 text-white">
          <Link to="/" className="w-10 h-10 bg-black/30 rounded-full flex items-center justify-center backdrop-blur-sm">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div className="text-center">
            <h1 className="font-semibold">AR Food Scanner</h1>
            <p className="text-sm text-white/80">Aim at your food</p>
          </div>
          <button className="w-10 h-10 bg-black/30 rounded-full flex items-center justify-center backdrop-blur-sm">
            <Volume2 className="w-5 h-5" />
          </button>
        </div>

        {/* AR Target Overlay */}
        <div className="flex-1 flex items-center justify-center relative">
          <div className="relative">
            {/* Scanning Frame */}
            <div className="w-64 h-64 border-2 border-white/50 rounded-3xl relative">
              {/* Corner indicators */}
              <div className="absolute -top-1 -left-1 w-8 h-8 border-l-4 border-t-4 border-primary rounded-tl-lg"></div>
              <div className="absolute -top-1 -right-1 w-8 h-8 border-r-4 border-t-4 border-primary rounded-tr-lg"></div>
              <div className="absolute -bottom-1 -left-1 w-8 h-8 border-l-4 border-b-4 border-primary rounded-bl-lg"></div>
              <div className="absolute -bottom-1 -right-1 w-8 h-8 border-r-4 border-b-4 border-primary rounded-br-lg"></div>
              
              {/* Center crosshair */}
              <div className="absolute inset-0 flex items-center justify-center">
                <Target className="w-12 h-12 text-primary animate-pulse" />
              </div>

              {/* Scanning progress */}
              {isScanning && (
                <div className="absolute inset-0 rounded-3xl border-4 border-primary animate-pulse">
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="bg-black/50 rounded-full p-2 backdrop-blur-sm">
                      <div className="h-2 bg-white/20 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-primary transition-all duration-100"
                          style={{ width: `${scanProgress}%` }}
                        />
                      </div>
                      <p className="text-white text-xs text-center mt-1">Analyzing... {scanProgress}%</p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Detection Result Popup */}
            {detectedFood && (
              <div className="absolute -bottom-24 left-1/2 transform -translate-x-1/2 w-80 bg-white rounded-2xl p-4 shadow-xl">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-bold text-text-primary">{detectedFood.name}</h3>
                  <span className="text-sm bg-primary/20 text-primary px-2 py-1 rounded-lg">
                    {detectedFood.confidence}% match
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-4 mb-3">
                  <div className="text-center">
                    <p className="text-2xl font-bold text-carb">{detectedFood.calories}</p>
                    <p className="text-xs text-text-secondary">Calories</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-text-primary">{detectedFood.weight}</p>
                    <p className="text-xs text-text-secondary">Weight</p>
                  </div>
                </div>
                <div className="grid grid-cols-4 gap-2">
                  <div className="text-center">
                    <p className="font-semibold text-carb">{detectedFood.nutrients.carbs}g</p>
                    <p className="text-xs text-text-secondary">Carbs</p>
                  </div>
                  <div className="text-center">
                    <p className="font-semibold text-protein">{detectedFood.nutrients.protein}g</p>
                    <p className="text-xs text-text-secondary">Protein</p>
                  </div>
                  <div className="text-center">
                    <p className="font-semibold text-fat">{detectedFood.nutrients.fat}g</p>
                    <p className="text-xs text-text-secondary">Fat</p>
                  </div>
                  <div className="text-center">
                    <p className="font-semibold text-text-primary">{detectedFood.nutrients.fiber}g</p>
                    <p className="text-xs text-text-secondary">Fiber</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Bottom Controls */}
        <div className="p-6 space-y-4">
          {/* Instructions */}
          <div className="text-center text-white/80 text-sm">
            {!detectedFood && !isScanning && "Position food within the frame and tap scan"}
            {isScanning && "Keep device steady while scanning..."}
            {detectedFood && "Food detected! Tap to add to your log"}
          </div>

          {/* Action Buttons */}
          <div className="flex justify-center space-x-4">
            <button className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
              <Focus className="w-6 h-6 text-white" />
            </button>
            
            <button
              onClick={startScanning}
              disabled={isScanning}
              className="w-20 h-20 bg-primary rounded-full flex items-center justify-center shadow-lg disabled:opacity-50"
            >
              {isScanning ? (
                <div className="w-8 h-8 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              ) : (
                <Camera className="w-8 h-8 text-white" />
              )}
            </button>
            
            <button className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
              <Zap className="w-6 h-6 text-white" />
            </button>
          </div>

          {/* Add to Log Button */}
          {detectedFood && (
            <button className="w-full bg-primary text-white py-4 rounded-xl font-semibold">
              Add to Food Log
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
