import { useState } from "react";
import { motion } from "motion/react";
import DashboardLayout from "../../components/DashboardLayout";
import { useTheme } from "../../contexts/ThemeContext";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card";
import { Label } from "../../components/ui/label";
import { Switch } from "../../components/ui/switch";
import { Separator } from "../../components/ui/separator";
import { Button } from "../../components/ui/button";
import {
  Bell,
  Mail,
  MessageSquare,
  Package,
  TrendingUp,
  ShoppingCart,
  Save
} from "lucide-react";

function NotificationSettings() {
  const { theme } = useTheme();
  const [settings, setSettings] = useState({
    emailNotifications: true,
    pushNotifications: true,
    smsNotifications: false,
    orderUpdates: true,
    newMessages: true,
    productUpdates: true,
    marketingEmails: false,
    weeklyDigest: true,
    salesAlerts: true
  });

  const handleToggle = (key) => {
    setSettings({ ...settings, [key]: !settings[key] });
  };

  const handleSave = () => {
    console.log("Saving notification settings:", settings);
  };

  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-4xl font-black mb-2">Notification Settings</h1>
        <p className="text-muted-foreground">
          Manage how you receive updates and alerts
        </p>
      </motion.div>

      {/* General Notifications */}
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
              <Bell className="h-5 w-5" />
              General Notifications
            </CardTitle>
            <CardDescription>
              Choose how you want to receive notifications
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <Label>Email Notifications</Label>
                <p className="text-sm text-muted-foreground">
                  Receive notifications via email
                </p>
              </div>
              <Switch
                checked={settings.emailNotifications}
                onCheckedChange={() => handleToggle('emailNotifications')}
              />
            </div>

            <Separator />

            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <Label>Push Notifications</Label>
                <p className="text-sm text-muted-foreground">
                  Get instant updates on your device
                </p>
              </div>
              <Switch
                checked={settings.pushNotifications}
                onCheckedChange={() => handleToggle('pushNotifications')}
              />
            </div>

            <Separator />

            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <Label>SMS Notifications</Label>
                <p className="text-sm text-muted-foreground">
                  Receive important alerts via text message
                </p>
              </div>
              <Switch
                checked={settings.smsNotifications}
                onCheckedChange={() => handleToggle('smsNotifications')}
              />
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Activity Notifications */}
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
              <Package className="h-5 w-5" />
              Activity Notifications
            </CardTitle>
            <CardDescription>
              Control what activity you get notified about
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <Label className="flex items-center gap-2">
                  <ShoppingCart className="h-4 w-4" />
                  Order Updates
                </Label>
                <p className="text-sm text-muted-foreground">
                  Get notified about order status changes
                </p>
              </div>
              <Switch
                checked={settings.orderUpdates}
                onCheckedChange={() => handleToggle('orderUpdates')}
              />
            </div>

            <Separator />

            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <Label className="flex items-center gap-2">
                  <MessageSquare className="h-4 w-4" />
                  New Messages
                </Label>
                <p className="text-sm text-muted-foreground">
                  Alerts for new messages and conversations
                </p>
              </div>
              <Switch
                checked={settings.newMessages}
                onCheckedChange={() => handleToggle('newMessages')}
              />
            </div>

            <Separator />

            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <Label className="flex items-center gap-2">
                  <Package className="h-4 w-4" />
                  Product Updates
                </Label>
                <p className="text-sm text-muted-foreground">
                  Notifications about product availability
                </p>
              </div>
              <Switch
                checked={settings.productUpdates}
                onCheckedChange={() => handleToggle('productUpdates')}
              />
            </div>

            <Separator />

            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <Label className="flex items-center gap-2">
                  <TrendingUp className="h-4 w-4" />
                  Sales Alerts
                </Label>
                <p className="text-sm text-muted-foreground">
                  Get notified when you make a sale
                </p>
              </div>
              <Switch
                checked={settings.salesAlerts}
                onCheckedChange={() => handleToggle('salesAlerts')}
              />
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Marketing & Digest */}
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
              <Mail className="h-5 w-5" />
              Marketing & Digest
            </CardTitle>
            <CardDescription>
              Manage promotional and summary emails
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <Label>Marketing Emails</Label>
                <p className="text-sm text-muted-foreground">
                  Receive updates about new features and promotions
                </p>
              </div>
              <Switch
                checked={settings.marketingEmails}
                onCheckedChange={() => handleToggle('marketingEmails')}
              />
            </div>

            <Separator />

            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <Label>Weekly Digest</Label>
                <p className="text-sm text-muted-foreground">
                  Get a weekly summary of your activity
                </p>
              </div>
              <Switch
                checked={settings.weeklyDigest}
                onCheckedChange={() => handleToggle('weeklyDigest')}
              />
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
          Save Preferences
        </Button>
      </motion.div>
    </div>
    </DashboardLayout>
  );
}

export default NotificationSettings;
