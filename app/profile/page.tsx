'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/components/providers/AuthProvider';
import Navigation from '@/components/layout/Navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  User, 
  Settings, 
  Bell, 
  Shield, 
  Edit, 
  Save,
  Calendar,
  Trophy,
  Star,
  Volume2,
  VolumeX
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export default function ProfilePage() {
  const { user, isLoading, updateProfile } = useAuth();
  const router = useRouter();
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    level: 'beginner' as 'beginner' | 'intermediate' | 'advanced'
  });
  const [settings, setSettings] = useState({
    notifications: true,
    soundEffects: true,
    dailyReminders: true,
    weeklyReports: false
  });

  useEffect(() => {
    if (!isLoading && !user) {
      router.push('/auth/login');
    }
    if (user) {
      setFormData({
        name: user.name,
        email: user.email,
        level: user.level
      });
    }
  }, [user, isLoading, router]);

  const handleSave = () => {
    if (user) {
      updateProfile(formData);
      setIsEditing(false);
      toast({
        title: "Profile updated",
        description: "Your profile has been successfully updated.",
      });
    }
  };

  const handleSettingChange = (setting: keyof typeof settings) => {
    setSettings(prev => ({
      ...prev,
      [setting]: !prev[setting]
    }));
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600"></div>
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Profile & Settings</h1>
          <p className="text-gray-600">Manage your account and preferences</p>
        </div>

        <Tabs defaultValue="profile" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
            <TabsTrigger value="achievements">Achievements</TabsTrigger>
          </TabsList>

          <TabsContent value="profile" className="mt-6">
            <Card className="animate-fade-in">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center space-x-2">
                    <User className="w-5 h-5 text-red-600" />
                    <span>Profile Information</span>
                  </CardTitle>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => isEditing ? handleSave() : setIsEditing(true)}
                  >
                    {isEditing ? (
                      <>
                        <Save className="w-4 h-4 mr-2" />
                        Save
                      </>
                    ) : (
                      <>
                        <Edit className="w-4 h-4 mr-2" />
                        Edit
                      </>
                    )}
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="flex items-center space-x-6">
                    <Avatar className="w-20 h-20">
                      <AvatarImage src={user.avatar} alt={user.name} />
                      <AvatarFallback className="bg-red-100 text-red-600 text-xl">
                        {user.name.charAt(0).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold">{user.name}</h3>
                      <p className="text-gray-600">{user.email}</p>
                      <div className="flex items-center space-x-2 mt-2">
                        <Badge className="bg-red-100 text-red-800 capitalize">
                          {user.level}
                        </Badge>
                        <Badge variant="outline">
                          <Calendar className="w-3 h-3 mr-1" />
                          Joined {user.joinedDate}
                        </Badge>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="name">Full Name</Label>
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        disabled={!isEditing}
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        disabled={!isEditing}
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="level">English Level</Label>
                      <Select
                        value={formData.level}
                        onValueChange={(value) => setFormData({ ...formData, level: value as any })}
                        disabled={!isEditing}
                      >
                        <SelectTrigger className="mt-1">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="beginner">Beginner</SelectItem>
                          <SelectItem value="intermediate">Intermediate</SelectItem>
                          <SelectItem value="advanced">Advanced</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4 border-t">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-red-600">{user.totalScore}</div>
                      <div className="text-sm text-gray-600">Total Points</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-yellow-600">{user.streakDays}</div>
                      <div className="text-sm text-gray-600">Day Streak</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-green-600">84%</div>
                      <div className="text-sm text-gray-600">Avg Score</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings" className="mt-6">
            <Card className="animate-fade-in">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Settings className="w-5 h-5 text-red-600" />
                  <span>App Settings</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold mb-4 flex items-center space-x-2">
                      <Bell className="w-5 h-5" />
                      <span>Notifications</span>
                    </h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-medium">Push Notifications</div>
                          <div className="text-sm text-gray-600">Receive notifications about your progress</div>
                        </div>
                        <Switch
                          checked={settings.notifications}
                          onCheckedChange={() => handleSettingChange('notifications')}
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-medium">Daily Reminders</div>
                          <div className="text-sm text-gray-600">Get reminded to practice daily</div>
                        </div>
                        <Switch
                          checked={settings.dailyReminders}
                          onCheckedChange={() => handleSettingChange('dailyReminders')}
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-medium">Weekly Reports</div>
                          <div className="text-sm text-gray-600">Receive weekly progress reports</div>
                        </div>
                        <Switch
                          checked={settings.weeklyReports}
                          onCheckedChange={() => handleSettingChange('weeklyReports')}
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold mb-4 flex items-center space-x-2">
                      <Volume2 className="w-5 h-5" />
                      <span>Audio & Sound</span>
                    </h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-medium">Sound Effects</div>
                          <div className="text-sm text-gray-600">Play sounds for correct/incorrect answers</div>
                        </div>
                        <Switch
                          checked={settings.soundEffects}
                          onCheckedChange={() => handleSettingChange('soundEffects')}
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold mb-4 flex items-center space-x-2">
                      <Shield className="w-5 h-5" />
                      <span>Privacy & Security</span>
                    </h3>
                    <div className="space-y-4">
                      <Button variant="outline" className="w-full">
                        Change Password
                      </Button>
                      <Button variant="outline" className="w-full">
                        Download My Data
                      </Button>
                      <Button variant="destructive" className="w-full">
                        Delete Account
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="achievements" className="mt-6">
            <Card className="animate-fade-in">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Trophy className="w-5 h-5 text-red-600" />
                  <span>Achievements & Badges</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    { name: 'First Steps', description: 'Complete your first quiz', earned: true, date: '2024-01-01' },
                    { name: 'Perfect Score', description: 'Get 100% on any quiz', earned: true, date: '2024-01-05' },
                    { name: 'Consistent Learner', description: 'Learn for 7 days straight', earned: true, date: '2024-01-10' },
                    { name: 'High Achiever', description: 'Reach 1000 total points', earned: true, date: '2024-01-12' },
                    { name: 'Speed Demon', description: 'Answer 10 questions in under 30 seconds', earned: false, date: null },
                    { name: 'Topic Master', description: 'Complete all topics with 80%+ average', earned: false, date: null },
                  ].map((achievement, index) => (
                    <div key={index} className={`p-4 rounded-lg border ${
                      achievement.earned ? 'bg-green-50 border-green-200' : 'bg-gray-50 border-gray-200'
                    }`}>
                      <div className="flex items-start space-x-3">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                          achievement.earned ? 'bg-green-100' : 'bg-gray-200'
                        }`}>
                          {achievement.earned ? (
                            <Star className="w-5 h-5 text-green-600" />
                          ) : (
                            <Star className="w-5 h-5 text-gray-400" />
                          )}
                        </div>
                        <div className="flex-1">
                          <div className="font-medium">{achievement.name}</div>
                          <div className="text-sm text-gray-600">{achievement.description}</div>
                          {achievement.earned && achievement.date && (
                            <div className="text-xs text-green-600 mt-1">Earned on {achievement.date}</div>
                          )}
                        </div>
                        {achievement.earned && (
                          <Badge className="bg-green-100 text-green-800">Earned</Badge>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}