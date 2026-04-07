import { useState } from "react";
import { motion } from "motion/react";
import DashboardLayout from "../../components/DashboardLayout";
import { useAuth } from "../../contexts/AuthContext";
import { useTheme } from "../../contexts/ThemeContext";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Badge } from "../../components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "../../components/ui/avatar";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../../components/ui/dialog";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Textarea } from "../../components/ui/textarea";
import {
  User,
  Mail,
  Calendar,
  Award,
  TrendingUp,
  Package,
  Camera,
  Star,
  Save
} from "lucide-react";

function Profile() {
  const { user } = useAuth();
  const { theme } = useTheme();
  
  // Edit profile state
  const [editProfileOpen, setEditProfileOpen] = useState(false);
  const [editBioOpen, setEditBioOpen] = useState(false);
  const [profileData, setProfileData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: "",
    location: ""
  });
  const [bio, setBio] = useState(
    user?.role === 'farmer' 
      ? "Passionate organic farmer dedicated to sustainable agriculture and providing fresh, high-quality produce to local communities."
      : user?.role === 'buyer'
      ? "Food enthusiast who loves supporting local farmers and enjoying fresh, seasonal produce from the farm to my table."
      : "Platform administrator committed to creating the best marketplace experience for farmers and buyers alike."
  );
  const [avatarUrl, setAvatarUrl] = useState("");

  const handleSaveProfile = () => {
    // Save profile data logic here
    console.log("Saving profile:", profileData);
    setEditProfileOpen(false);
  };

  const handleSaveBio = () => {
    // Save bio logic here
    console.log("Saving bio:", bio);
    setEditBioOpen(false);
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarUrl(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const stats = {
    farmer: [
      { label: "Products Listed", value: "24", icon: Package },
      { label: "Total Sales", value: "$12,450", icon: TrendingUp },
      { label: "Rating", value: "4.8", icon: Star },
      { label: "Certifications", value: "3", icon: Award }
    ],
    buyer: [
      { label: "Orders Placed", value: "42", icon: Package },
      { label: "Total Spent", value: "$3,280", icon: TrendingUp },
      { label: "Saved Items", value: "18", icon: Star },
      { label: "Reviews Given", value: "15", icon: Award }
    ],
    admin: [
      { label: "Total Users", value: "1,234", icon: User },
      { label: "Active Products", value: "456", icon: Package },
      { label: "Pending Reviews", value: "23", icon: Award },
      { label: "Platform Rating", value: "4.9", icon: Star }
    ]
  };

  const currentStats = stats[user?.role] || stats.buyer;

  return (
    <DashboardLayout>
      <div className="max-w-5xl mx-auto space-y-6">
      {/* Profile Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card className={`rounded-2xl border ${
          theme === 'dark' ? 'bg-white/5 border-white/10' : 'bg-white border-black/10'
        }`}>
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row items-center gap-6">
              <div className="relative group">
                <Avatar className="h-32 w-32">
                  <AvatarImage src={avatarUrl} />
                  <AvatarFallback className="text-4xl font-bold bg-gradient-to-br from-indigo-500 to-purple-500 text-white">
                    {(profileData.name || user?.name)?.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <label htmlFor="avatar-upload">
                  <Button
                    size="icon"
                    className="absolute bottom-0 right-0 rounded-full h-10 w-10 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                    asChild
                  >
                    <div>
                      <Camera className="h-4 w-4" />
                      <input
                        id="avatar-upload"
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleAvatarChange}
                      />
                    </div>
                  </Button>
                </label>
              </div>
              
              <div className="flex-1 text-center md:text-left">
                <div className="flex items-center justify-center md:justify-start gap-3 mb-2">
                  <h1 className="text-3xl font-black">{profileData.name || user?.name}</h1>
                  <Badge variant="outline" className="capitalize">
                    {user?.role}
                  </Badge>
                </div>
                
                <div className="space-y-2 text-muted-foreground">
                  <div className="flex items-center gap-2 justify-center md:justify-start">
                    <Mail className="h-4 w-4" />
                    <span>{profileData.email || user?.email}</span>
                  </div>
                  <div className="flex items-center gap-2 justify-center md:justify-start">
                    <Calendar className="h-4 w-4" />
                    <span>Member since January 2026</span>
                  </div>
                </div>
              </div>
              
              <Button className="rounded-xl" onClick={() => setEditProfileOpen(true)}>
                Edit Profile
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {currentStats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 + index * 0.05 }}
            >
              <Card className={`rounded-2xl border ${
                theme === 'dark' ? 'bg-white/5 border-white/10' : 'bg-white border-black/10'
              }`}>
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-2">
                    <div className={`p-2 rounded-xl ${
                      theme === 'dark' ? 'bg-indigo-500/20' : 'bg-indigo-100'
                    }`}>
                      <Icon className="h-5 w-5 text-indigo-600" />
                    </div>
                    <span className="text-2xl font-black">{stat.value}</span>
                  </div>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>

      {/* About Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <Card className={`rounded-2xl border ${
          theme === 'dark' ? 'bg-white/5 border-white/10' : 'bg-white border-black/10'
        }`}>
          <CardHeader>
            <CardTitle>About</CardTitle>
            <CardDescription>Tell others about yourself</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground leading-relaxed">
              {bio}
            </p>
            <Button variant="outline" className="mt-4 rounded-xl" onClick={() => setEditBioOpen(true)}>
              Edit Bio
            </Button>
          </CardContent>
        </Card>
      </motion.div>

      {/* Edit Profile Dialog */}
      <Dialog open={editProfileOpen} onOpenChange={setEditProfileOpen}>
        <DialogContent className="sm:max-w-[500px] rounded-2xl">
          <DialogHeader>
            <DialogTitle>Edit Profile</DialogTitle>
            <DialogDescription>
              Update your profile information
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="edit-name">Full Name</Label>
              <Input
                id="edit-name"
                value={profileData.name}
                onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                className="rounded-xl"
                placeholder="Your name"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-email">Email</Label>
              <Input
                id="edit-email"
                type="email"
                value={profileData.email}
                onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                className="rounded-xl"
                placeholder="your.email@example.com"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-phone">Phone Number</Label>
              <Input
                id="edit-phone"
                value={profileData.phone}
                onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
                className="rounded-xl"
                placeholder="+1 (555) 123-4567"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-location">Location</Label>
              <Input
                id="edit-location"
                value={profileData.location}
                onChange={(e) => setProfileData({ ...profileData, location: e.target.value })}
                className="rounded-xl"
                placeholder="City, State"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setEditProfileOpen(false)} className="rounded-xl">
              Cancel
            </Button>
            <Button onClick={handleSaveProfile} className="rounded-xl">
              <Save className="h-4 w-4 mr-2" />
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Bio Dialog */}
      <Dialog open={editBioOpen} onOpenChange={setEditBioOpen}>
        <DialogContent className="sm:max-w-[500px] rounded-2xl">
          <DialogHeader>
            <DialogTitle>Edit Bio</DialogTitle>
            <DialogDescription>
              Tell others about yourself
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <Textarea
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              className="rounded-xl min-h-[150px]"
              placeholder="Write something about yourself..."
            />
            <p className="text-sm text-muted-foreground mt-2">
              {bio.length} characters
            </p>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setEditBioOpen(false)} className="rounded-xl">
              Cancel
            </Button>
            <Button onClick={handleSaveBio} className="rounded-xl">
              <Save className="h-4 w-4 mr-2" />
              Save Bio
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
    </DashboardLayout>
  );
}

export default Profile;
