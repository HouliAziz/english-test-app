'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/components/providers/AuthProvider';
import Navigation from '@/components/layout/Navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Trophy, 
  Target, 
  TrendingUp, 
  Clock, 
  Star, 
  Brain,
  BookOpen,
  Zap,
  Award,
  Calendar
} from 'lucide-react';

export default function StatisticsPage() {
  const { user, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !user) {
      router.push('/auth/login');
    }
  }, [user, isLoading, router]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600"></div>
      </div>
    );
  }

  if (!user) return null;

  const topicStats = [
    { name: 'Sports', score: 85, attempts: 12, best: 95, icon: '⚽' },
    { name: 'Food', score: 78, attempts: 8, best: 88, icon: '🍕' },
    { name: 'Colors', score: 92, attempts: 15, best: 98, icon: '🎨' },
    { name: 'Money', score: 67, attempts: 6, best: 75, icon: '💰' },
    { name: 'Travel', score: 74, attempts: 9, best: 85, icon: '✈️' },
    { name: 'Animals', score: 89, attempts: 11, best: 95, icon: '🐱' },
  ];

  const achievements = [
    { name: 'First Quiz', description: 'Complete your first quiz', earned: true, icon: Star },
    { name: 'Perfect Score', description: 'Get 100% on any quiz', earned: true, icon: Trophy },
    { name: 'Speed Demon', description: 'Answer 10 questions in under 30 seconds', earned: false, icon: Zap },
    { name: 'Consistent Learner', description: 'Learn for 7 days straight', earned: true, icon: Calendar },
    { name: 'Topic Master', description: 'Complete all topics', earned: false, icon: Brain },
    { name: 'High Achiever', description: 'Reach 1000 total points', earned: true, icon: Award },
  ];

  const recentScores = [
    { date: '2024-01-15', topic: 'Sports', score: 95, level: 'Hard' },
    { date: '2024-01-14', topic: 'Food', score: 88, level: 'Medium' },
    { date: '2024-01-13', topic: 'Colors', score: 92, level: 'Easy' },
    { date: '2024-01-12', topic: 'Money', score: 75, level: 'Medium' },
    { date: '2024-01-11', topic: 'Travel', score: 85, level: 'Hard' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Your Statistics</h1>
          <p className="text-gray-600">Track your progress and achievements</p>
        </div>

        {/* Overall Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="animate-fade-in">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Points</CardTitle>
              <Trophy className="h-4 w-4 text-red-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">{user.totalScore}</div>
              <p className="text-xs text-muted-foreground">+125 from last week</p>
            </CardContent>
          </Card>

          <Card className="animate-fade-in" style={{ animationDelay: '0.1s' }}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Current Streak</CardTitle>
              <Zap className="h-4 w-4 text-yellow-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-yellow-600">{user.streakDays}</div>
              <p className="text-xs text-muted-foreground">days in a row</p>
            </CardContent>
          </Card>

          <Card className="animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Average Score</CardTitle>
              <TrendingUp className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">84%</div>
              <p className="text-xs text-muted-foreground">+3% from last month</p>
            </CardContent>
          </Card>

          <Card className="animate-fade-in" style={{ animationDelay: '0.3s' }}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Time Spent</CardTitle>
              <Clock className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">28h</div>
              <p className="text-xs text-muted-foreground">this month</p>
            </CardContent>
          </Card>
        </div>

        {/* Topic Performance */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <Card className="animate-slide-up">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Brain className="w-5 h-5 text-red-600" />
                <span>Topic Performance</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {topicStats.map((topic, index) => (
                  <div key={topic.name} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <span className="text-lg">{topic.icon}</span>
                        <span className="font-medium">{topic.name}</span>
                      </div>
                      <div className="text-right text-sm text-gray-600">
                        <div>Avg: {topic.score}%</div>
                        <div>Best: {topic.best}%</div>
                      </div>
                    </div>
                    <Progress value={topic.score} className="h-2" />
                    <div className="text-xs text-gray-500">{topic.attempts} attempts</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="animate-slide-up" style={{ animationDelay: '0.1s' }}>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Award className="w-5 h-5 text-red-600" />
                <span>Achievements</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {achievements.map((achievement, index) => {
                  const Icon = achievement.icon;
                  return (
                    <div key={achievement.name} className={`flex items-center space-x-3 p-3 rounded-lg ${
                      achievement.earned ? 'bg-green-50' : 'bg-gray-50'
                    }`}>
                      <Icon className={`w-5 h-5 ${
                        achievement.earned ? 'text-green-600' : 'text-gray-400'
                      }`} />
                      <div className="flex-1">
                        <div className="font-medium">{achievement.name}</div>
                        <div className="text-sm text-gray-600">{achievement.description}</div>
                      </div>
                      {achievement.earned && (
                        <Badge className="bg-green-100 text-green-800">Earned</Badge>
                      )}
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Scores */}
        <Card className="animate-slide-up" style={{ animationDelay: '0.2s' }}>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <BookOpen className="w-5 h-5 text-red-600" />
              <span>Recent Quiz Scores</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentScores.map((score, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-4">
                    <div className="text-sm text-gray-600">{score.date}</div>
                    <div className="font-medium">{score.topic}</div>
                    <Badge variant="outline" className={
                      score.level === 'Easy' ? 'bg-green-100 text-green-800' :
                      score.level === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }>
                      {score.level}
                    </Badge>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-lg">{score.score}%</div>
                    <div className="text-sm text-gray-600">
                      {score.score >= 90 ? 'Excellent' :
                       score.score >= 80 ? 'Good' :
                       score.score >= 70 ? 'Average' : 'Needs Improvement'}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}