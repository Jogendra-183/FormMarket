import { useState } from "react";
import { motion } from "motion/react";
import DashboardLayout from "../../components/DashboardLayout";
import { useTheme } from "../../contexts/ThemeContext";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card";
import { Label } from "../../components/ui/label";
import { Switch } from "../../components/ui/switch";
import { Button } from "../../components/ui/button";
import { Separator } from "../../components/ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "../../components/ui/select";
import {
  Palette,
  Globe,
  Eye,
  Save,
  Zap
} from "lucide-react";

function Preferences() {
  const { theme, toggleTheme } = useTheme();
  const [preferences, setPreferences] = useState({
    language: "en",
    currency: "usd",
    timezone: "utc",
    darkMode: theme === 'dark',
    compactView: false,
    animationsEnabled: true
  });

  const handleSave = () => {
    console.log("Saving preferences:", preferences);
  };

  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-4xl font-black mb-2">Preferences</h1>
        <p className="text-muted-foreground">
          Customize your experience
        </p>
      </motion.div>

      {/* Appearance */}
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
              <Palette className="h-5 w-5" />
              Appearance
            </CardTitle>
            <CardDescription>
              Customize how the platform looks
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <Label>Dark Mode</Label>
                <p className="text-sm text-muted-foreground">
                  Use dark theme for better viewing in low light
                </p>
              </div>
              <Switch
                checked={preferences.darkMode}
                onCheckedChange={(checked) => {
                  setPreferences({ ...preferences, darkMode: checked });
                  if ((checked && theme === 'light') || (!checked && theme === 'dark')) {
                    toggleTheme();
                  }
                }}
              />
            </div>

            <Separator />

            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <Label>Animations</Label>
                <p className="text-sm text-muted-foreground">
                  Enable smooth transitions and animations
                </p>
              </div>
              <Switch
                checked={preferences.animationsEnabled}
                onCheckedChange={(checked) =>
                  setPreferences({ ...preferences, animationsEnabled: checked })
                }
              />
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Display */}
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
              <Eye className="h-5 w-5" />
              Display
            </CardTitle>
            <CardDescription>
              Adjust display preferences
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <Label>Compact View</Label>
                <p className="text-sm text-muted-foreground">
                  Show more content with reduced spacing
                </p>
              </div>
              <Switch
                checked={preferences.compactView}
                onCheckedChange={(checked) =>
                  setPreferences({ ...preferences, compactView: checked })
                }
              />
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Localization */}
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
              <Globe className="h-5 w-5" />
              Localization
            </CardTitle>
            <CardDescription>
              Set your region and language preferences
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Language</Label>
              <Select value={preferences.language} onValueChange={(value) =>
                setPreferences({ ...preferences, language: value })
              }>
                <SelectTrigger className="rounded-xl">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="en">English</SelectItem>
                  <SelectItem value="es">Spanish</SelectItem>
                  <SelectItem value="fr">French</SelectItem>
                  <SelectItem value="de">German</SelectItem>
                  <SelectItem value="zh">Chinese</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Currency</Label>
              <Select value={preferences.currency} onValueChange={(value) =>
                setPreferences({ ...preferences, currency: value })
              }>
                <SelectTrigger className="rounded-xl">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="usd">USD ($)</SelectItem>
                  <SelectItem value="eur">EUR (€)</SelectItem>
                  <SelectItem value="gbp">GBP (£)</SelectItem>
                  <SelectItem value="jpy">JPY (¥)</SelectItem>
                  <SelectItem value="inr">INR (₹)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Timezone</Label>
              <Select value={preferences.timezone} onValueChange={(value) =>
                setPreferences({ ...preferences, timezone: value })
              }>
                <SelectTrigger className="rounded-xl">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="utc">UTC</SelectItem>
                  <SelectItem value="est">Eastern Time</SelectItem>
                  <SelectItem value="cst">Central Time</SelectItem>
                  <SelectItem value="mst">Mountain Time</SelectItem>
                  <SelectItem value="pst">Pacific Time</SelectItem>
                </SelectContent>
              </Select>
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
          Reset to Default
        </Button>
        <Button onClick={handleSave} className="rounded-xl">
          <Save className="h-4 w-4 mr-2" />
          Save Preferences
        </Button>
      </motion.div>
    </div>
    </DashboardLayout>
  );
}

export default Preferences;
