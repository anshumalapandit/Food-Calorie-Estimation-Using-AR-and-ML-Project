import { useState } from "react";
import { ArrowLeft, Ruler, RefreshCw, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";

interface PortionData {
  size: string;
  calories: number;
  weight: string;
  servingType: string;
}

const portionSizes: PortionData[] = [
  { size: "Small", calories: 78, weight: "60g", servingType: "1 piece" },
  { size: "Medium", calories: 156, weight: "120g", servingType: "2 pieces" },
  { size: "Large", calories: 234, weight: "180g", servingType: "3 pieces" },
  { size: "Extra Large", calories: 312, weight: "240g", servingType: "4 pieces" }
];

export default function PortionEstimator() {
  const [selectedPortion, setSelectedPortion] = useState<PortionData>(portionSizes[1]);
  const [isCalibrating, setIsCalibrating] = useState(false);
  const [calibrationStep, setCalibrationStep] = useState(1);

  const handleCalibrate = () => {
    setIsCalibrating(true);
    setCalibrationStep(1);
    
    // Simulate calibration steps
    setTimeout(() => setCalibrationStep(2), 1500);
    setTimeout(() => setCalibrationStep(3), 3000);
    setTimeout(() => {
      setIsCalibrating(false);
      setCalibrationStep(1);
    }, 4500);
  };

  return (
    <div className="min-h-screen bg-nutrition-bg">
      {/* Header */}
      <div className="flex items-center justify-between p-6 bg-card border-b border-nutrition-border">
        <Link to="/" className="w-10 h-10 bg-muted rounded-full flex items-center justify-center">
          <ArrowLeft className="w-5 h-5 text-text-primary" />
        </Link>
        <div className="text-center">
          <h1 className="text-lg font-semibold text-text-primary">AR Portion Estimator</h1>
          <p className="text-sm text-text-secondary">Size matters for calories</p>
        </div>
        <button 
          onClick={handleCalibrate}
          className="w-10 h-10 bg-primary rounded-full flex items-center justify-center"
        >
          <Ruler className="w-5 h-5 text-white" />
        </button>
      </div>

      {/* AR View */}
      <div className="relative h-96 bg-black overflow-hidden">
        <img
          src="https://cdn.builder.io/api/v1/image/assets%2F48ab03c8fe114dbb857fff77ab3f917f%2Fea610fc150284739b5e0c82e30a03373?format=webp&width=800"
          alt="Portion estimation view"
          className="w-full h-full object-cover"
        />
        
        {/* AR Measurement Overlay */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="relative">
            {/* Measurement Grid */}
            <div className="w-64 h-64 border border-primary/50 rounded-lg relative">
              {/* Grid lines */}
              <div className="absolute inset-0 grid grid-cols-4 grid-rows-4 gap-0">
                {Array.from({ length: 16 }).map((_, i) => (
                  <div key={i} className="border border-white/20"></div>
                ))}
              </div>
              
              {/* Size indicator */}
              <div className="absolute top-2 left-2 bg-black/70 text-white px-2 py-1 rounded text-xs backdrop-blur-sm">
                {selectedPortion.weight} • {selectedPortion.servingType}
              </div>
              
              {/* Calibration overlay */}
              {isCalibrating && (
                <div className="absolute inset-0 bg-primary/20 rounded-lg flex items-center justify-center">
                  <div className="text-center text-white">
                    <RefreshCw className="w-8 h-8 mx-auto mb-2 animate-spin" />
                    <p className="text-sm">
                      Step {calibrationStep}/3: 
                      {calibrationStep === 1 && " Place reference object"}
                      {calibrationStep === 2 && " Measuring dimensions"}
                      {calibrationStep === 3 && " Calibrating complete"}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Corner measurements */}
        <div className="absolute top-4 left-4 bg-black/70 text-white px-3 py-2 rounded-lg backdrop-blur-sm">
          <div className="flex items-center space-x-2">
            <Ruler className="w-4 h-4" />
            <span className="text-sm">12.5 cm</span>
          </div>
        </div>
        <div className="absolute top-4 right-4 bg-black/70 text-white px-3 py-2 rounded-lg backdrop-blur-sm">
          <div className="flex items-center space-x-2">
            <span className="text-sm">2.3 cm</span>
            <span className="text-xs text-green-400">Height</span>
          </div>
        </div>
      </div>

      {/* Portion Size Selection */}
      <div className="p-6">
        <h2 className="text-xl font-semibold text-text-primary mb-4">Estimated Portion Size</h2>
        
        <div className="grid grid-cols-2 gap-3 mb-6">
          {portionSizes.map((portion) => (
            <button
              key={portion.size}
              onClick={() => setSelectedPortion(portion)}
              className={`p-4 rounded-xl border-2 transition-all ${
                selectedPortion.size === portion.size
                  ? 'border-primary bg-primary/10'
                  : 'border-nutrition-border bg-card'
              }`}
            >
              <div className="text-center">
                <h3 className={`font-semibold mb-1 ${
                  selectedPortion.size === portion.size ? 'text-primary' : 'text-text-primary'
                }`}>
                  {portion.size}
                </h3>
                <p className="text-2xl font-bold text-carb mb-1">{portion.calories}</p>
                <p className="text-xs text-text-secondary">calories</p>
                <p className="text-sm text-text-secondary mt-1">{portion.servingType}</p>
              </div>
              {selectedPortion.size === portion.size && (
                <CheckCircle className="w-5 h-5 text-primary mx-auto mt-2" />
              )}
            </button>
          ))}
        </div>

        {/* Nutrition Breakdown */}
        <div className="bg-card rounded-xl p-4 border border-nutrition-border mb-6">
          <h3 className="font-semibold text-text-primary mb-3">Nutrition Breakdown</h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-text-secondary">Carbohydrates</span>
              <span className="font-semibold text-carb">32g</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-text-secondary">Protein</span>
              <span className="font-semibold text-protein">4g</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-text-secondary">Fat</span>
              <span className="font-semibold text-fat">1g</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-text-secondary">Fiber</span>
              <span className="font-semibold text-text-primary">2g</span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3">
          <button className="w-full bg-primary text-white py-4 rounded-xl font-semibold">
            Add {selectedPortion.servingType} to Log
          </button>
          <button className="w-full bg-card text-text-primary py-4 rounded-xl font-semibold border border-nutrition-border">
            Adjust Portion Manually
          </button>
        </div>

        {/* Tips */}
        <div className="mt-6 bg-muted/50 rounded-xl p-4">
          <h4 className="font-semibold text-text-primary mb-2">💡 Pro Tips</h4>
          <ul className="text-sm text-text-secondary space-y-1">
            <li>• Place a coin nearby for better size reference</li>
            <li>• Ensure good lighting for accurate measurement</li>
            <li>• Calibrate with the ruler tool for precision</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
