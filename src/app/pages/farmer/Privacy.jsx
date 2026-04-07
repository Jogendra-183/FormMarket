import { useState } from "react";
import { motion } from "motion/react";
import DashboardLayout from "../../components/DashboardLayout";
import { useTheme } from "../../contexts/ThemeContext";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card";
import { Label } from "../../components/ui/label";
import { Switch } from "../../components/ui/switch";
import { Button } from "../../components/ui/button";
import { Separator } from "../../components/ui/separator";
import { Badge } from "../../components/ui/badge";
import {
  Lock,
  Eye,
  EyeOff,
  Shield,
  UserCheck,
  Database,
  Download,
  Trash2,
  Save
} from "lucide-react";

function Privacy() {
  const { theme } = useTheme();
  const [privacySettings, setPrivacySettings] = useState({
    profileVisibility: 'public',
    showEmail: false,
    showPhone: false,
    allowMessages: true,
    dataCollection: true,
    personalizedAds: false,
    shareAnalytics: true
  });

  const handleToggle = (key) => {
    setPrivacySettings({ ...privacySettings, [key]: !privacySettings[key] });
  };

  const handleSave = () => {
    console.log("Saving privacy settings:", privacySettings);
  };

  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-4xl font-black mb-2">Privacy & Security</h1>
            <p className="text-muted-foreground">
              Control your privacy and data settings
            </p>
          </div>
          <Badge variant="outline" className="flex items-center gap-2">
            <Shield className="h-3 w-3" />
            Protected
          </Badge>
        </div>
      </motion.div>

      {/* Profile Privacy */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <Card className={`rounded-2xl border ${
          theme === 'dark' ? 'bg-white/5 border-white/10' : 'bg-white border-black/10'
        }`}>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Eye className="h-5 w-5" />
              Profile Visibility
            </CardTitle>
            <CardDescription>
              Control who can see your profile information
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <Label>Show Email Address</Label>
                <p className="text-sm text-muted-foreground">
                  Make your email visible to other users
                </p>
              </div>
              <Switch
                checked={privacySettings.showEmail}
                onCheckedChange={() => handleToggle('showEmail')}
              />
            </div>

            <Separator />

            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <Label>Show Phone Number</Label>
                <p className="text-sm text-muted-foreground">
                  Display your phone number on your profile
                </p>
              </div>
              <Switch
                checked={privacySettings.showPhone}
                onCheckedChange={() => handleToggle('showPhone')}
              />
            </div>

            <Separator />

            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <Label>Allow Direct Messages</Label>
                <p className="text-sm text-muted-foreground">
                  Let other users send you messages
                </p>
              </div>
              <Switch
                checked={privacySettings.allowMessages}
                onCheckedChange={() => handleToggle('allowMessages')}
              />
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Data & Analytics */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <Card className={`rounded-2xl border ${
          theme === 'dark' ? 'bg-white/5 border-white/10' : 'bg-white border-black/10'
        }`}>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Database className="h-5 w-5" />
              Data & Analytics
            </CardTitle>
            <CardDescription>
              Manage how your data is collected and used
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <Label>Data Collection</Label>
                <p className="text-sm text-muted-foreground">
                  Allow us to collect usage data to improve our service
                </p>
              </div>
              <Switch
                checked={privacySettings.dataCollection}
                onCheckedChange={() => handleToggle('dataCollection')}
              />
            </div>

            <Separator />

            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <Label>Personalized Ads</Label>
                <p className="text-sm text-muted-foreground">
                  Show ads based on your interests and activity
                </p>
              </div>
              <Switch
                checked={privacySettings.personalizedAds}
                onCheckedChange={() => handleToggle('personalizedAds')}
              />
            </div>

            <Separator />

            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <Label>Share Analytics</Label>
                <p className="text-sm text-muted-foreground">
                  Help improve the platform by sharing anonymous analytics
                </p>
              </div>
              <Switch
                checked={privacySettings.shareAnalytics}
                onCheckedChange={() => handleToggle('shareAnalytics')}
              />
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Data Management */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <Card className={`rounded-2xl border ${
          theme === 'dark' ? 'bg-white/5 border-white/10' : 'bg-white border-black/10'
        }`}>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <UserCheck className="h-5 w-5" />
              Your Data
            </CardTitle>
            <CardDescription>
              Download or delete your data
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button variant="outline" className="w-full rounded-xl justify-start">
              <Download className="h-4 w-4 mr-2" />
              Download Your Data
            </Button>
            <Button variant="outline" className="w-full rounded-xl justify-start text-destructive hover:text-destructive">
              <Trash2 className="h-4 w-4 mr-2" />
              Request Account Deletion
            </Button>
            
            <div className={`p-4 rounded-xl text-sm ${
              theme === 'dark' ? 'bg-blue-500/10 text-blue-400' : 'bg-blue-100 text-blue-900'
            }`}>
              <p className="font-semibold mb-1">Data Protection</p>
              <p>We take your privacy seriously. Your data is encrypted and stored securely. You have full control over your information.</p>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Save Button */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="flex justify-end gap-3"
      >
        <Button variant="outline" className="rounded-xl">
          Cancel
        </Button>
        <Button onClick={handleSave} className="rounded-xl">
          <Save className="h-4 w-4 mr-2" />
          Save Settings
        </Button>
      </motion.div>
    </div>
    </DashboardLayout>
  );
}

export default Privacy;
