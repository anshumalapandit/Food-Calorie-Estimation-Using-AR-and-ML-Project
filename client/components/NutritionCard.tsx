import { cn } from "@/lib/utils";

interface NutritionBarProps {
  label: string;
  percentage: number;
  color: string;
  className?: string;
}

const NutritionBar = ({ label, percentage, color, className }: NutritionBarProps) => {
  return (
    <div className={cn("mb-3 last:mb-0", className)}>
      <div className="flex justify-between items-center mb-2">
        <span className="text-text-primary font-medium text-lg">{label}</span>
        <span className="text-text-primary font-semibold text-lg">{percentage}%</span>
      </div>
      <div className="w-full bg-muted rounded-full h-3 overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-500 ease-out"
          style={{
            width: `${percentage}%`,
            backgroundColor: color,
          }}
        />
      </div>
    </div>
  );
};

interface NutritionCardProps {
  foodImage?: string;
  nutritionData: {
    carb: number;
    protein: number;
    fat: number;
    carbohydrates: number;
  };
  onBack?: () => void;
}

export default function NutritionCard({ 
  foodImage = "https://cdn.builder.io/api/v1/image/assets%2F48ab03c8fe114dbb857fff77ab3f917f%2Fea610fc150284739b5e0c82e30a03373?format=webp&width=800", 
  nutritionData,
  onBack 
}: NutritionCardProps) {
  return (
    <div className="min-h-screen bg-nutrition-bg flex flex-col">
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

      {/* Food Image */}
      <div className="px-6 mb-8">
        <div className="rounded-3xl overflow-hidden shadow-lg">
          <img
            src={foodImage}
            alt="Food nutrition analysis"
            className="w-full h-64 object-cover"
          />
        </div>
      </div>

      {/* Nutrition Data */}
      <div className="flex-1 px-6 space-y-6">
        <NutritionBar
          label="Carb"
          percentage={nutritionData.carb}
          color="hsl(var(--carb-color))"
        />
        <NutritionBar
          label="Protein"
          percentage={nutritionData.protein}
          color="hsl(var(--protein-color))"
        />
        <NutritionBar
          label="Fat"
          percentage={nutritionData.fat}
          color="hsl(var(--fat-color))"
        />
        <NutritionBar
          label="Carbohydrates"
          percentage={nutritionData.carbohydrates}
          color="hsl(var(--muted-foreground))"
        />
      </div>

      {/* Back Button */}
      <div className="px-6 pb-8 pt-12">
        <button
          onClick={onBack}
          className="w-full text-center text-text-primary font-medium text-lg py-4 rounded-xl bg-card shadow-sm border border-nutrition-border hover:bg-muted transition-colors"
        >
          Back
        </button>
      </div>
    </div>
  );
}
