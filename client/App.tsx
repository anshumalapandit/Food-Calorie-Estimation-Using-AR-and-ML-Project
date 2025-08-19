import "./global.css";

import { Toaster } from "@/components/ui/toaster";
import { createRoot } from "react-dom/client";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Analytics from "./pages/Analytics";
import History from "./pages/History";
import Profile from "./pages/Profile";
import ARScanner from "./pages/ARScanner";
import PortionEstimator from "./pages/PortionEstimator";
import MealPlanner from "./pages/MealPlanner";
import NutritionalInsights from "./pages/NutritionalInsights";
import GroceryScanner from "./pages/GroceryScanner";
import ProgressTracking from "./pages/ProgressTracking";
import SocialShare from "./pages/SocialShare";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/history" element={<History />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/ar-scanner" element={<ARScanner />} />
          <Route path="/portion-estimator" element={<PortionEstimator />} />
          <Route path="/meal-planner" element={<MealPlanner />} />
          <Route path="/nutritional-insights" element={<NutritionalInsights />} />
          <Route path="/grocery-scanner" element={<GroceryScanner />} />
          <Route path="/progress-tracking" element={<ProgressTracking />} />
          <Route path="/social-share" element={<SocialShare />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

createRoot(document.getElementById("root")!).render(<App />);
