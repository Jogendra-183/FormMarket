import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import DashboardLayout from "../../components/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Badge } from "../../components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/ui/tabs";
import {
  AnimatedPage,
  StaggerContainer,
  StaggerItem,
  ScrollReveal,
  HoverLift,
  SlideIn
} from "../../components/AnimationWrappers";
import { Play, Clock, BookOpen, Award, Search, Sparkles, Trophy, Flame, Target, GraduationCap } from "lucide-react";
import { learningResources } from "../../utils/mockData";

// Animated Progress Bar
function AnimatedProgress({ value, color = "bg-primary", delay = 0 }) {
  return (
    <div className="w-full bg-black/5 dark:bg-white/10 rounded-full h-2.5 overflow-hidden">
      <motion.div
        className={`h-2.5 rounded-full ${color}`}
        initial={{ width: 0 }}
        animate={{ width: `${value}%` }}
        transition={{ duration: 1, delay, ease: [0.43, 0.13, 0.23, 0.96] }}
      />
    </div>
  );
}

// Animated Counter
function AnimatedCounter({ value, suffix = "" }) {
  return (
    <motion.span
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, type: "spring" }}
      className="text-3xl font-bold"
    >
      {value}{suffix}
    </motion.span>
  );
}

function FarmerLearning() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  
  const categories = ["All", "Farming Techniques", "Organic Farming", "Business", "Marketing"];
  
  const achievements = [
    { id: "1", title: "First Course Completed", description: "Complete your first course", earned: true, icon: GraduationCap },
    { id: "2", title: "Organic Farming Expert", description: "Complete all organic farming courses", earned: true, icon: Award },
    { id: "3", title: "Business Basics", description: "Learn fundamentals of farm business", earned: false, icon: Target },
    { id: "4", title: "Marketing Master", description: "Master all marketing techniques", earned: false, icon: Trophy }
  ];

  const stats = [
    { title: "Courses Completed", value: "12", icon: BookOpen, color: "text-blue-600", bg: "bg-blue-100 dark:bg-blue-900/30" },
    { title: "Hours Learned", value: "48", icon: Clock, color: "text-purple-600", bg: "bg-purple-100 dark:bg-purple-900/30" },
    { title: "Achievements", value: "8", icon: Award, color: "text-amber-600", bg: "bg-amber-100 dark:bg-amber-900/30" },
    { title: "Current Streak", value: "7", suffix: " days", icon: Flame, color: "text-orange-600", bg: "bg-orange-100 dark:bg-orange-900/30" }
  ];

  const filteredResources = learningResources.filter(resource => {
    const matchesSearch = resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         resource.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory === "All" || resource.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <DashboardLayout>
      <AnimatedPage className="space-y-6">
        <StaggerContainer>
          {/* Header */}
          <StaggerItem>
            <div>
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
              >
                <Badge variant="outline" className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 border-purple-500/20 hover-lift">
                  <Sparkles className="h-3 w-3 mr-1" />
                  Learning
                </Badge>
              </motion.div>
              <h1 className="text-3xl md:text-4xl font-bold mt-2">Learning Hub</h1>
              <p className="text-muted-foreground">Expand your knowledge and grow your farm business</p>
            </div>
          </StaggerItem>

          {/* Stats Grid */}
          <StaggerItem>
            <ScrollReveal>
              <StaggerContainer className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {stats.map((stat, index) => {
                  const Icon = stat.icon;
                  return (
                    <StaggerItem key={stat.title}>
                      <HoverLift>
                        <Card className="hover-glow overflow-hidden relative group">
                          <motion.div
                            className="absolute inset-0 bg-gradient-to-br from-transparent to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity"
                          />
                          <CardHeader className="pb-3 flex flex-row items-center justify-between">
                            <CardTitle className="text-sm font-medium text-muted-foreground">
                              {stat.title}
                            </CardTitle>
                            <motion.div
                              className={`p-2 rounded-xl ${stat.bg}`}
                              whileHover={{ rotate: 10, scale: 1.1 }}
                              animate={stat.title === "Current Streak" ? { scale: [1, 1.1, 1] } : {}}
                              transition={stat.title === "Current Streak" ? { duration: 1.5, repeat: Infinity } : {}}
                            >
                              <Icon className={`h-4 w-4 ${stat.color}`} />
                            </motion.div>
                          </CardHeader>
                          <CardContent>
                            <motion.p
                              className={`text-3xl font-bold ${stat.color}`}
                              initial={{ opacity: 0, scale: 0.5 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ delay: 0.3 + index * 0.1, type: "spring" }}
                            >
                              {stat.value}{stat.suffix || ""}
                            </motion.p>
                          </CardContent>
                        </Card>
                      </HoverLift>
                    </StaggerItem>
                  );
                })}
              </StaggerContainer>
            </ScrollReveal>
          </StaggerItem>

          {/* Tabs */}
          <StaggerItem>
            <Tabs defaultValue="courses" className="w-full">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <TabsList className="bg-white/50 dark:bg-black/20 backdrop-blur-sm border">
                  <TabsTrigger value="courses" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                    <BookOpen className="h-4 w-4 mr-2" />
                    Courses
                  </TabsTrigger>
                  <TabsTrigger value="achievements" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                    <Trophy className="h-4 w-4 mr-2" />
                    Achievements
                  </TabsTrigger>
                  <TabsTrigger value="progress" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                    <Target className="h-4 w-4 mr-2" />
                    My Progress
                  </TabsTrigger>
                </TabsList>
              </motion.div>

              <AnimatePresence mode="wait">
                {/* Courses Tab */}
                <TabsContent value="courses" className="mt-6 space-y-6">
                  <motion.div
                    key="courses"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    {/* Search and Filter */}
                    <SlideIn direction="up" delay={0.1}>
                      <div className="flex flex-col md:flex-row gap-4">
                        <div className="relative flex-1">
                          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                          <Input 
                            placeholder="Search courses..." 
                            className="pl-10 rounded-xl"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                          />
                        </div>
                        <div className="flex gap-2 overflow-x-auto pb-2">
                          {categories.map((category) => (
                            <motion.div
                              key={category}
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                            >
                              <Button
                                variant={activeCategory === category ? "default" : "outline"}
                                size="sm"
                                className="whitespace-nowrap rounded-xl"
                                onClick={() => setActiveCategory(category)}
                              >
                                {category}
                              </Button>
                            </motion.div>
                          ))}
                        </div>
                      </div>
                    </SlideIn>

                    {/* Course Grid */}
                    <ScrollReveal>
                      <motion.div 
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                        layout
                      >
                        <AnimatePresence>
                          {filteredResources.map((resource, index) => (
                            <motion.div
                              key={resource.id}
                              layout
                              initial={{ opacity: 0, scale: 0.9, y: 20 }}
                              animate={{ opacity: 1, scale: 1, y: 0 }}
                              exit={{ opacity: 0, scale: 0.9, y: -20 }}
                              transition={{ duration: 0.4, delay: index * 0.05 }}
                            >
                              <HoverLift>
                                <Card className="overflow-hidden group cursor-pointer hover-glow h-full">
                                  <div className="relative overflow-hidden">
                                    <motion.img
                                      src={resource.image}
                                      alt={resource.title}
                                      className="w-full h-48 object-cover"
                                      whileHover={{ scale: 1.1 }}
                                      transition={{ duration: 0.4 }}
                                    />
                                    <motion.div 
                                      className="absolute inset-0 bg-black/50 flex items-center justify-center"
                                      initial={{ opacity: 0 }}
                                      whileHover={{ opacity: 1 }}
                                      transition={{ duration: 0.3 }}
                                    >
                                      <motion.div
                                        initial={{ scale: 0 }}
                                        whileHover={{ scale: 1 }}
                                        transition={{ type: "spring", stiffness: 300 }}
                                      >
                                        <Button size="lg" className="rounded-xl">
                                          <Play className="h-5 w-5 mr-2" />
                                          Start Learning
                                        </Button>
                                      </motion.div>
                                    </motion.div>
                                    <motion.div
                                      initial={{ opacity: 0, x: 20 }}
                                      animate={{ opacity: 1, x: 0 }}
                                      transition={{ delay: 0.2 + index * 0.05 }}
                                    >
                                      <Badge className="absolute top-3 right-3 bg-white/90 dark:bg-black/90 text-foreground">
                                        {resource.category}
                                      </Badge>
                                    </motion.div>
                                  </div>
                                  <CardHeader>
                                    <motion.div
                                      initial={{ opacity: 0 }}
                                      animate={{ opacity: 1 }}
                                      transition={{ delay: 0.3 + index * 0.05 }}
                                    >
                                      <CardTitle className="text-lg line-clamp-1">{resource.title}</CardTitle>
                                      <CardDescription className="line-clamp-2">{resource.description}</CardDescription>
                                    </motion.div>
                                  </CardHeader>
                                  <CardContent>
                                    <motion.div 
                                      className="flex items-center gap-2 text-sm text-muted-foreground"
                                      initial={{ opacity: 0 }}
                                      animate={{ opacity: 1 }}
                                      transition={{ delay: 0.4 + index * 0.05 }}
                                    >
                                      <Clock className="h-4 w-4" />
                                      <span>{resource.duration}</span>
                                    </motion.div>
                                  </CardContent>
                                </Card>
                              </HoverLift>
                            </motion.div>
                          ))}
                        </AnimatePresence>
                      </motion.div>
                    </ScrollReveal>

                    {filteredResources.length === 0 && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="text-center py-12"
                      >
                        <motion.div
                          animate={{ y: [0, -10, 0] }}
                          transition={{ duration: 2, repeat: Infinity }}
                        >
                          <Search className="h-16 w-16 mx-auto text-muted-foreground/50 mb-4" />
                        </motion.div>
                        <h3 className="font-semibold text-lg mb-2">No courses found</h3>
                        <p className="text-muted-foreground">Try adjusting your search or filters</p>
                      </motion.div>
                    )}
                  </motion.div>
                </TabsContent>

                {/* Achievements Tab */}
                <TabsContent value="achievements" className="mt-6">
                  <motion.div
                    key="achievements"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <ScrollReveal>
                      <Card className="hover-glow">
                        <CardHeader>
                          <CardTitle className="flex items-center gap-2">
                            <Trophy className="h-5 w-5 text-amber-500" />
                            Your Achievements
                          </CardTitle>
                          <CardDescription>Milestones you've reached on your learning journey</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-4" staggerDelay={0.1}>
                            {achievements.map((achievement, index) => {
                              const Icon = achievement.icon;
                              return (
                                <StaggerItem key={achievement.id}>
                                  <motion.div
                                    className={`p-6 border rounded-2xl flex items-center gap-4 transition-all ${
                                      achievement.earned 
                                        ? "bg-gradient-to-br from-emerald-50 to-green-50 dark:from-emerald-900/20 dark:to-green-900/20 border-emerald-200 dark:border-emerald-800" 
                                        : "bg-white/70 dark:bg-black/20"
                                    }`}
                                    whileHover={{ scale: 1.02, x: 4 }}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                  >
                                    <motion.div
                                      className={`h-16 w-16 rounded-full flex items-center justify-center ${
                                        achievement.earned 
                                          ? "bg-gradient-to-br from-primary to-emerald-600" 
                                          : "bg-gray-200 dark:bg-gray-700"
                                      }`}
                                      whileHover={{ rotate: 360, scale: 1.1 }}
                                      transition={{ duration: 0.5 }}
                                      animate={achievement.earned ? { 
                                        boxShadow: ["0 0 0 0 rgba(16, 185, 129, 0)", "0 0 0 10px rgba(16, 185, 129, 0.2)", "0 0 0 0 rgba(16, 185, 129, 0)"]
                                      } : {}}
                                    >
                                      <Icon className="h-8 w-8 text-white" />
                                    </motion.div>
                                    <div>
                                      <h3 className="font-semibold">{achievement.title}</h3>
                                      <p className="text-sm text-muted-foreground">{achievement.description}</p>
                                      <motion.p 
                                        className={`text-xs mt-1 font-medium ${achievement.earned ? "text-emerald-600" : "text-muted-foreground"}`}
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ delay: 0.3 + index * 0.1 }}
                                      >
                                        {achievement.earned ? "✓ Earned" : "🔒 Not yet earned"}
                                      </motion.p>
                                    </div>
                                  </motion.div>
                                </StaggerItem>
                              );
                            })}
                          </StaggerContainer>
                        </CardContent>
                      </Card>
                    </ScrollReveal>
                  </motion.div>
                </TabsContent>

                {/* Progress Tab */}
                <TabsContent value="progress" className="mt-6">
                  <motion.div
                    key="progress"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <ScrollReveal>
                      <Card className="hover-glow">
                        <CardHeader>
                          <CardTitle className="flex items-center gap-2">
                            <Target className="h-5 w-5 text-blue-500" />
                            Learning Progress
                          </CardTitle>
                          <CardDescription>Track your educational journey</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <StaggerContainer className="space-y-6" staggerDelay={0.1}>
                            {learningResources.map((resource, index) => {
                              const progress = index === 0 ? 100 : index === 1 ? 45 : 0;
                              return (
                                <StaggerItem key={resource.id}>
                                  <motion.div 
                                    className="space-y-3 p-4 rounded-2xl border bg-white/50 dark:bg-black/20 hover:shadow-md transition-all"
                                    whileHover={{ x: 4 }}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                  >
                                    <div className="flex items-center justify-between">
                                      <div className="flex items-center gap-3">
                                        <motion.div
                                          className={`p-2 rounded-xl ${
                                            progress === 100 
                                              ? "bg-emerald-100 dark:bg-emerald-900/30" 
                                              : progress > 0 
                                                ? "bg-blue-100 dark:bg-blue-900/30" 
                                                : "bg-gray-100 dark:bg-gray-800"
                                          }`}
                                          whileHover={{ rotate: 10 }}
                                        >
                                          <BookOpen className={`h-5 w-5 ${
                                            progress === 100 
                                              ? "text-emerald-600" 
                                              : progress > 0 
                                                ? "text-blue-600" 
                                                : "text-gray-400"
                                          }`} />
                                        </motion.div>
                                        <span className="font-medium">{resource.title}</span>
                                      </div>
                                      <motion.span 
                                        className={`text-sm font-bold ${
                                          progress === 100 
                                            ? "text-emerald-600" 
                                            : progress > 0 
                                              ? "text-blue-600" 
                                              : "text-muted-foreground"
                                        }`}
                                        initial={{ opacity: 0, scale: 0.8 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ delay: 0.3 + index * 0.1 }}
                                      >
                                        {progress}%
                                      </motion.span>
                                    </div>
                                    <AnimatedProgress 
                                      value={progress} 
                                      color={progress === 100 ? "bg-emerald-500" : progress > 0 ? "bg-blue-500" : "bg-gray-300"} 
                                      delay={0.2 + index * 0.1}
                                    />
                                    {progress === 100 && (
                                      <motion.p 
                                        className="text-xs text-emerald-600 flex items-center gap-1"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ delay: 0.5 + index * 0.1 }}
                                      >
                                        <Award className="h-3 w-3" />
                                        Course completed! Certificate earned.
                                      </motion.p>
                                    )}
                                  </motion.div>
                                </StaggerItem>
                              );
                            })}
                          </StaggerContainer>
                        </CardContent>
                      </Card>
                    </ScrollReveal>
                  </motion.div>
                </TabsContent>
              </AnimatePresence>
            </Tabs>
          </StaggerItem>
        </StaggerContainer>
      </AnimatedPage>
    </DashboardLayout>
  );
}
export {
  FarmerLearning
};
