import { useState } from "react";
import { motion } from "motion/react";
import DashboardLayout from "../components/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";
import { Badge } from "../components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "../components/ui/dialog";
import {
  AnimatedPage,
  StaggerContainer,
  StaggerItem,
  ScrollReveal,
  HoverLift,
  FadeIn,
  SlideIn
} from "../components/AnimationWrappers";
import { MessageSquare, ThumbsUp, Search, Plus, TrendingUp, Users } from "lucide-react";
import { forumPosts } from "../utils/mockData";
import { toast } from "sonner";
function Community() {
  const [open, setOpen] = useState(false);

  const handleCreatePost = () => {
    toast.success("Post created successfully!");
    setOpen(false);
  };

  const categories = [
    { name: "Farming Tips", count: 145, icon: TrendingUp },
    { name: "Product Reviews", count: 89, icon: MessageSquare },
    { name: "General Discussion", count: 234, icon: Users },
  ];

  return (
    <DashboardLayout>
      <AnimatedPage className="space-y-6">
        <StaggerContainer>
          <StaggerItem>
            <div className="flex items-center justify-between">
              <div>
                <Badge variant="outline" className="bg-white/70 hover-lift">
                  Community
                </Badge>
                <h1 className="text-3xl md:text-4xl mt-2">Community Forum</h1>
                <p className="text-muted-foreground">
                  Connect, share, and learn from the community
                </p>
              </div>
              
              <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger asChild>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button>
                      <Plus className="h-4 w-4 mr-2" />
                      New Post
                    </Button>
                  </motion.div>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Create a Post</DialogTitle>
                    <DialogDescription>
                      Share your thoughts with the community
                    </DialogDescription>
                  </DialogHeader>
                  <StaggerContainer className="space-y-4">
                    <StaggerItem>
                      <Input placeholder="Title" className="focus-glow" />
                    </StaggerItem>
                    <StaggerItem>
                      <Textarea 
                        placeholder="What's on your mind?" 
                        rows={6} 
                        className="focus-glow"
                      />
                    </StaggerItem>
                    <StaggerItem>
                      <motion.div
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <Button onClick={handleCreatePost} className="w-full">
                          Post
                        </Button>
                      </motion.div>
                    </StaggerItem>
                  </StaggerContainer>
                </DialogContent>
              </Dialog>
            </div>
          </StaggerItem>

          {/* Categories */}
          <StaggerItem>
            <ScrollReveal>
              <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {categories.map((category, index) => {
                  const Icon = category.icon;
                  return (
                    <StaggerItem key={category.name}>
                      <HoverLift>
                        <Card className="hover:shadow-lg transition-all duration-300 cursor-pointer hover-glow">
                          <CardHeader>
                            <div className="flex items-center gap-3">
                              <motion.div 
                                className="h-10 w-10 bg-primary/10 rounded-2xl flex items-center justify-center"
                                whileHover={{ rotate: 360 }}
                                transition={{ duration: 0.5 }}
                              >
                                <Icon className="h-5 w-5 text-primary" />
                              </motion.div>
                              <div>
                                <CardTitle className="text-lg">{category.name}</CardTitle>
                                <motion.p 
                                  className="text-sm text-muted-foreground"
                                  initial={{ opacity: 0 }}
                                  animate={{ opacity: 1 }}
                                  transition={{ delay: index * 0.2 + 0.3 }}
                                >
                                  {category.count} discussions
                                </motion.p>
                              </div>
                            </div>
                          </CardHeader>
                        </Card>
                      </HoverLift>
                    </StaggerItem>
                  );
                })}
              </StaggerContainer>
            </ScrollReveal>
          </StaggerItem>

          <StaggerItem>
            <FadeIn delay={0.6}>
              <Tabs defaultValue="all" className="w-full">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                  <TabsList className="hover-glow">
                    <TabsTrigger value="all">All Posts</TabsTrigger>
                    <TabsTrigger value="popular">Popular</TabsTrigger>
                    <TabsTrigger value="recent">Recent</TabsTrigger>
                  </TabsList>
                  <div className="relative flex-1 md:max-w-md">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input 
                      placeholder="Search discussions..." 
                      className="pl-10 focus-glow" 
                    />
                  </div>
                </div>

                <TabsContent value="all" className="mt-6">
                  <StaggerContainer className="space-y-4">
                    {forumPosts.map((post, index) => (
                      <StaggerItem key={post.id}>
                        <PostCard post={post} index={index} />
                      </StaggerItem>
                    ))}
                  </StaggerContainer>
                </TabsContent>

                <TabsContent value="popular" className="mt-6">
                  <StaggerContainer className="space-y-4">
                    {[...forumPosts]
                      .sort((a, b) => b.likes - a.likes)
                      .map((post, index) => (
                        <StaggerItem key={post.id}>
                          <PostCard post={post} index={index} />
                        </StaggerItem>
                      ))}
                  </StaggerContainer>
                </TabsContent>

                <TabsContent value="recent" className="mt-6">
                  <StaggerContainer className="space-y-4">
                    {[...forumPosts].reverse().map((post, index) => (
                      <StaggerItem key={post.id}>
                        <PostCard post={post} index={index} />
                      </StaggerItem>
                    ))}
                  </StaggerContainer>
                </TabsContent>
              </Tabs>
            </FadeIn>
          </StaggerItem>
        </StaggerContainer>
      </AnimatedPage>
    </DashboardLayout>
  );
}
export {
  Community
};
