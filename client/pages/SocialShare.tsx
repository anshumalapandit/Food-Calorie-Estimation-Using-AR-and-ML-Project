import { useState } from "react";
import {
  ArrowLeft,
  Share2,
  Heart,
  MessageCircle,
  Send,
  Users,
  Camera,
  Trophy,
  Plus,
} from "lucide-react";
import { Link } from "react-router-dom";
import BottomNavigation from "@/components/BottomNavigation";

interface Post {
  id: string;
  user: {
    name: string;
    avatar: string;
    level: number;
  };
  image: string;
  food: string;
  calories: number;
  timestamp: string;
  likes: number;
  comments: number;
  isLiked: boolean;
  caption: string;
  arData: {
    accuracy: number;
    nutritionScore: number;
    portion: string;
  };
}

const socialPosts: Post[] = [
  {
    id: "1",
    user: { name: "Priya K", avatar: "👩🏻", level: 15 },
    image:
      "https://cdn.builder.io/api/v1/image/assets%2F48ab03c8fe114dbb857fff77ab3f917f%2Fea610fc150284739b5e0c82e30a03373?format=webp&width=400",
    food: "South Indian Idli",
    calories: 156,
    timestamp: "2 hours ago",
    likes: 24,
    comments: 8,
    isLiked: false,
    caption: "Perfect breakfast! AR scanner nailed the portion size 🎯",
    arData: { accuracy: 94, nutritionScore: 82, portion: "2 pieces" },
  },
  {
    id: "2",
    user: { name: "Arjun M", avatar: "👨🏽", level: 22 },
    image: "🍎",
    food: "Green Apple",
    calories: 95,
    timestamp: "4 hours ago",
    likes: 16,
    comments: 3,
    isLiked: true,
    caption:
      "Post-workout snack! Love how calARieScan tracks everything automatically 🍎",
    arData: { accuracy: 98, nutritionScore: 95, portion: "1 medium" },
  },
  {
    id: "3",
    user: { name: "Sneha R", avatar: "👩🏾", level: 8 },
    image: "🥗",
    food: "Mixed Salad Bowl",
    calories: 245,
    timestamp: "6 hours ago",
    likes: 31,
    comments: 12,
    isLiked: true,
    caption: "Lunch prep done right! AR portion estimator is so accurate 📏",
    arData: { accuracy: 91, nutritionScore: 88, portion: "1 large bowl" },
  },
];

interface Challenge {
  id: string;
  title: string;
  description: string;
  emoji: string;
  participants: number;
  daysLeft: number;
  userProgress: number;
  maxProgress: number;
}

const challenges: Challenge[] = [
  {
    id: "1",
    title: "AR Scanner Challenge",
    description: "Use AR scanner 30 times this week",
    emoji: "📱",
    participants: 156,
    daysLeft: 3,
    userProgress: 18,
    maxProgress: 30,
  },
  {
    id: "2",
    title: "Portion Perfect",
    description: "Achieve 95% accuracy for 5 days",
    emoji: "🎯",
    participants: 89,
    daysLeft: 5,
    userProgress: 3,
    maxProgress: 5,
  },
  {
    id: "3",
    title: "Healthy Choices",
    description: "Scan 20 fruits & vegetables",
    emoji: "🥬",
    participants: 203,
    daysLeft: 7,
    userProgress: 12,
    maxProgress: 20,
  },
];

export default function SocialShare() {
  const [activeTab, setActiveTab] = useState<"feed" | "challenges" | "share">(
    "feed",
  );
  const [newPost, setNewPost] = useState("");

  const handleLike = (postId: string) => {
    // Handle like functionality
    console.log("Liked post:", postId);
  };

  const handleShare = () => {
    // Handle new post sharing
    console.log("Sharing new post:", newPost);
    setNewPost("");
  };

  return (
    <div className="min-h-screen bg-nutrition-bg pb-20">
      {/* Header */}
      <div className="flex items-center justify-between p-6 bg-card border-b border-nutrition-border">
        <Link
          to="/"
          className="w-10 h-10 bg-muted rounded-full flex items-center justify-center"
        >
          <ArrowLeft className="w-5 h-5 text-text-primary" />
        </Link>
        <div className="text-center">
          <h1 className="text-lg font-semibold text-text-primary">
            calARie Community
          </h1>
          <p className="text-sm text-text-secondary">
            Share your AR nutrition journey
          </p>
        </div>
        <button className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
          <Users className="w-5 h-5 text-white" />
        </button>
      </div>

      {/* Tab Navigation */}
      <div className="flex bg-card border-b border-nutrition-border">
        {[
          { id: "feed", label: "Feed", icon: Share2 },
          { id: "challenges", label: "Challenges", icon: Trophy },
          { id: "share", label: "Share", icon: Camera },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as typeof activeTab)}
            className={`flex-1 py-4 text-sm font-medium flex items-center justify-center space-x-2 ${
              activeTab === tab.id
                ? "text-primary border-b-2 border-primary"
                : "text-text-secondary"
            }`}
          >
            <tab.icon className="w-4 h-4" />
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      <div className="p-6">
        {/* Feed Tab */}
        {activeTab === "feed" && (
          <div className="space-y-6">
            {/* User Stats */}
            <div className="bg-card rounded-2xl p-6 border border-nutrition-border">
              <div className="flex items-center space-x-4 mb-4">
                <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center text-2xl">
                  👤
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-text-primary">
                    Your Profile
                  </h3>
                  <p className="text-text-secondary">
                    Level 12 • AR Nutrition Explorer
                  </p>
                </div>
                <div className="text-center">
                  <p className="text-xl font-bold text-primary">147</p>
                  <p className="text-xs text-text-secondary">AR Scans</p>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="text-center">
                  <p className="text-lg font-bold text-text-primary">28</p>
                  <p className="text-xs text-text-secondary">Posts</p>
                </div>
                <div className="text-center">
                  <p className="text-lg font-bold text-text-primary">156</p>
                  <p className="text-xs text-text-secondary">Followers</p>
                </div>
                <div className="text-center">
                  <p className="text-lg font-bold text-text-primary">203</p>
                  <p className="text-xs text-text-secondary">Following</p>
                </div>
              </div>
            </div>

            {/* Social Feed */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-text-primary">
                Community Feed
              </h3>

              {socialPosts.map((post) => (
                <div
                  key={post.id}
                  className="bg-card rounded-2xl border border-nutrition-border overflow-hidden"
                >
                  {/* Post Header */}
                  <div className="p-4 flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                        {post.user.avatar}
                      </div>
                      <div>
                        <h4 className="font-semibold text-text-primary">
                          {post.user.name}
                        </h4>
                        <p className="text-xs text-text-secondary">
                          Level {post.user.level} • {post.timestamp}
                        </p>
                      </div>
                    </div>
                    <button className="w-8 h-8 bg-muted rounded-full flex items-center justify-center">
                      <Share2 className="w-4 h-4 text-text-secondary" />
                    </button>
                  </div>

                  {/* Post Content */}
                  <div className="px-4 pb-3">
                    <p className="text-text-primary mb-3">{post.caption}</p>

                    {/* Food Image/Emoji */}
                    <div className="bg-muted/30 rounded-xl p-8 text-center mb-3">
                      {post.image.startsWith("http") ? (
                        <img
                          src={post.image}
                          alt={post.food}
                          className="w-full h-32 object-cover rounded-lg"
                        />
                      ) : (
                        <div className="text-6xl">{post.image}</div>
                      )}
                    </div>

                    {/* Food Info */}
                    <div className="bg-muted/50 rounded-xl p-3 mb-3">
                      <div className="flex justify-between items-center mb-2">
                        <h5 className="font-semibold text-text-primary">
                          {post.food}
                        </h5>
                        <span className="font-bold text-carb">
                          {post.calories} cal
                        </span>
                      </div>

                      <div className="grid grid-cols-3 gap-2 text-center text-xs">
                        <div>
                          <p className="font-medium text-primary">
                            {post.arData.accuracy}%
                          </p>
                          <p className="text-text-secondary">AR Accuracy</p>
                        </div>
                        <div>
                          <p className="font-medium text-protein">
                            {post.arData.nutritionScore}
                          </p>
                          <p className="text-text-secondary">Health Score</p>
                        </div>
                        <div>
                          <p className="font-medium text-text-primary">
                            {post.arData.portion}
                          </p>
                          <p className="text-text-secondary">Portion</p>
                        </div>
                      </div>
                    </div>

                    {/* Post Actions */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <button
                          onClick={() => handleLike(post.id)}
                          className={`flex items-center space-x-2 ${
                            post.isLiked
                              ? "text-red-500"
                              : "text-text-secondary"
                          }`}
                        >
                          <Heart
                            className={`w-5 h-5 ${post.isLiked ? "fill-current" : ""}`}
                          />
                          <span className="text-sm font-medium">
                            {post.likes}
                          </span>
                        </button>
                        <button className="flex items-center space-x-2 text-text-secondary">
                          <MessageCircle className="w-5 h-5" />
                          <span className="text-sm font-medium">
                            {post.comments}
                          </span>
                        </button>
                      </div>
                      <button className="text-sm text-primary font-medium">
                        View Details
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Challenges Tab */}
        {activeTab === "challenges" && (
          <div className="space-y-6">
            {/* Weekly Challenge Banner */}
            <div className="bg-gradient-to-r from-primary to-protein rounded-2xl p-6 text-white">
              <h3 className="text-xl font-bold mb-2">Weekly AR Challenge</h3>
              <p className="text-white/90 mb-3">
                Complete challenges to earn exclusive badges and rewards!
              </p>
              <div className="flex items-center space-x-2">
                <Trophy className="w-5 h-5" />
                <span className="font-semibold">
                  Top 10 get premium features
                </span>
              </div>
            </div>

            {/* Active Challenges */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-text-primary">
                Active Challenges
              </h3>

              {challenges.map((challenge) => (
                <div
                  key={challenge.id}
                  className="bg-card rounded-xl p-4 border border-nutrition-border"
                >
                  <div className="flex items-center space-x-4 mb-3">
                    <div className="text-3xl">{challenge.emoji}</div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-text-primary">
                        {challenge.title}
                      </h4>
                      <p className="text-text-secondary text-sm">
                        {challenge.description}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-text-secondary">
                        {challenge.daysLeft} days left
                      </p>
                      <p className="text-xs text-text-secondary">
                        {challenge.participants} participants
                      </p>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="mb-3">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm text-text-secondary">
                        Progress
                      </span>
                      <span className="text-sm font-medium text-text-primary">
                        {challenge.userProgress}/{challenge.maxProgress}
                      </span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div
                        className="bg-primary h-2 rounded-full transition-all duration-300"
                        style={{
                          width: `${(challenge.userProgress / challenge.maxProgress) * 100}%`,
                        }}
                      />
                    </div>
                  </div>

                  {/* Join/View Button */}
                  <button className="w-full bg-primary/10 text-primary py-2 rounded-lg font-medium">
                    Continue Challenge
                  </button>
                </div>
              ))}
            </div>

            {/* Leaderboard Preview */}
            <div className="bg-card rounded-xl p-4 border border-nutrition-border">
              <div className="flex justify-between items-center mb-3">
                <h4 className="font-semibold text-text-primary">
                  This Week's Leaders
                </h4>
                <button className="text-sm text-primary font-medium">
                  View All
                </button>
              </div>

              <div className="space-y-2">
                {[
                  { rank: 1, name: "Alex Kumar", score: 2847, emoji: "🥇" },
                  { rank: 2, name: "Maya Singh", score: 2651, emoji: "🥈" },
                  { rank: 3, name: "Raj Patel", score: 2439, emoji: "🥉" },
                  { rank: 4, name: "You", score: 2156, emoji: "📱" },
                ].map((user) => (
                  <div
                    key={user.rank}
                    className="flex items-center justify-between p-2 rounded-lg bg-muted/30"
                  >
                    <div className="flex items-center space-x-3">
                      <span className="text-lg">{user.emoji}</span>
                      <span
                        className={`font-medium ${user.name === "You" ? "text-primary" : "text-text-primary"}`}
                      >
                        {user.name}
                      </span>
                    </div>
                    <span className="font-bold text-text-primary">
                      {user.score}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Share Tab */}
        {activeTab === "share" && (
          <div className="space-y-6">
            {/* Create New Post */}
            <div className="bg-card rounded-2xl p-6 border border-nutrition-border">
              <h3 className="text-lg font-semibold text-text-primary mb-4">
                Share Your AR Scan
              </h3>

              {/* Upload Area */}
              <div className="border-2 border-dashed border-nutrition-border rounded-xl p-8 text-center mb-4">
                <Camera className="w-12 h-12 text-text-secondary mx-auto mb-3" />
                <p className="text-text-secondary mb-2">
                  Take a new AR scan or upload from gallery
                </p>
                <button className="bg-primary text-white px-6 py-2 rounded-lg font-medium">
                  Start AR Scan
                </button>
              </div>

              {/* Caption Input */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-text-primary mb-2">
                  Caption
                </label>
                <textarea
                  value={newPost}
                  onChange={(e) => setNewPost(e.target.value)}
                  placeholder="Share your nutrition journey..."
                  className="w-full p-3 border border-nutrition-border rounded-xl bg-nutrition-bg text-text-primary resize-none h-20"
                />
              </div>

              {/* Privacy Settings */}
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm text-text-secondary">
                  Share with community
                </span>
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="public"
                    className="rounded"
                    defaultChecked
                  />
                  <label htmlFor="public" className="text-sm text-text-primary">
                    Public post
                  </label>
                </div>
              </div>

              {/* Share Button */}
              <button
                onClick={handleShare}
                className="w-full bg-primary text-white py-3 rounded-xl font-semibold flex items-center justify-center space-x-2"
              >
                <Send className="w-5 h-5" />
                <span>Share with Community</span>
              </button>
            </div>

            {/* Quick Share Options */}
            <div className="bg-card rounded-xl p-4 border border-nutrition-border">
              <h4 className="font-semibold text-text-primary mb-3">
                Quick Share
              </h4>
              <div className="grid grid-cols-2 gap-3">
                <button className="bg-muted/50 text-text-primary py-3 rounded-lg font-medium flex items-center justify-center space-x-2">
                  <Trophy className="w-4 h-4" />
                  <span>Share Achievement</span>
                </button>
                <button className="bg-muted/50 text-text-primary py-3 rounded-lg font-medium flex items-center justify-center space-x-2">
                  <Share2 className="w-4 h-4" />
                  <span>Share Progress</span>
                </button>
              </div>
            </div>

            {/* Recent Shares */}
            <div className="bg-muted/50 rounded-xl p-4">
              <h4 className="font-semibold text-text-primary mb-3">
                📈 Sharing Tips
              </h4>
              <div className="text-sm text-text-secondary space-y-1">
                <p>• Posts with AR accuracy over 90% get 2x more likes</p>
                <p>• Include portion details for better engagement</p>
                <p>• Share during meal times for maximum reach</p>
                <p>• Use challenge hashtags to join trending topics</p>
              </div>
            </div>
          </div>
        )}
      </div>

      <BottomNavigation />
    </div>
  );
}
