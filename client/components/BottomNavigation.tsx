import { TrendingUp, Calendar, User, Home } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

export default function BottomNavigation() {
  const location = useLocation();
  
  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-card/95 backdrop-blur-sm border-t border-nutrition-border px-6 py-3 shadow-lg z-50">
      <div className="flex justify-around items-center max-w-md mx-auto">
        <Link to="/" className="flex flex-col items-center space-y-1 py-2 hover:scale-105 transition-transform">
          <div className={`w-8 h-8 rounded-xl flex items-center justify-center shadow-sm ${
            isActive('/') ? 'bg-primary' : 'bg-muted'
          }`}>
            <Home className={`w-5 h-5 ${isActive('/') ? 'text-white' : 'text-text-secondary'}`} />
          </div>
          <span className={`text-xs font-medium ${isActive('/') ? 'text-primary' : 'text-text-secondary'}`}>
            Home
          </span>
        </Link>
        
        <Link to="/analytics" className="flex flex-col items-center space-y-1 py-2 hover:scale-105 transition-transform">
          <div className={`w-8 h-8 rounded-xl flex items-center justify-center shadow-sm ${
            isActive('/analytics') ? 'bg-primary' : 'bg-muted'
          }`}>
            <TrendingUp className={`w-5 h-5 ${isActive('/analytics') ? 'text-white' : 'text-text-secondary'}`} />
          </div>
          <span className={`text-xs font-medium ${isActive('/analytics') ? 'text-primary' : 'text-text-secondary'}`}>
            Analytics
          </span>
        </Link>
        
        <Link to="/history" className="flex flex-col items-center space-y-1 py-2 hover:scale-105 transition-transform">
          <div className={`w-8 h-8 rounded-xl flex items-center justify-center shadow-sm ${
            isActive('/history') ? 'bg-primary' : 'bg-muted'
          }`}>
            <Calendar className={`w-5 h-5 ${isActive('/history') ? 'text-white' : 'text-text-secondary'}`} />
          </div>
          <span className={`text-xs font-medium ${isActive('/history') ? 'text-primary' : 'text-text-secondary'}`}>
            History
          </span>
        </Link>
        
        <Link to="/profile" className="flex flex-col items-center space-y-1 py-2 hover:scale-105 transition-transform">
          <div className={`w-8 h-8 rounded-xl flex items-center justify-center shadow-sm ${
            isActive('/profile') ? 'bg-primary' : 'bg-muted'
          }`}>
            <User className={`w-5 h-5 ${isActive('/profile') ? 'text-white' : 'text-text-secondary'}`} />
          </div>
          <span className={`text-xs font-medium ${isActive('/profile') ? 'text-primary' : 'text-text-secondary'}`}>
            Profile
          </span>
        </Link>
      </div>
    </div>
  );
}
