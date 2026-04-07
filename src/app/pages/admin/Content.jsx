import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import DashboardLayout from "../../components/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Textarea } from "../../components/ui/textarea";
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "../../components/ui/dialog";
import { Plus, Edit, Trash2, Eye, EyeOff, FileText, BookOpen, Award, MessageSquare, Sparkles } from "lucide-react";
import { forumPosts as mockForumPosts, successStories } from "../../utils/mockData";
import { communityApi } from "../../utils/api";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

function AdminContent() {
  const [open, setOpen] = useState(false);
  const [forumPosts, setForumPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setIsLoading(true);
        const data = await communityApi.getPosts();
        if (Array.isArray(data)) {
          setForumPosts(data);
        } else if (data && Array.isArray(data.content)) {
          setForumPosts(data.content);
        } else {
          setForumPosts(mockForumPosts);
        }
      } catch (error) {
        console.error("Failed to fetch community posts:", error);
        toast.error("Could not reach backend. Showing cached posts.");
        setForumPosts(mockForumPosts);
      } finally {
        setIsLoading(false);
      }
    };
    fetchPosts();
  }, []);
  
  const handlePublish = () => {
    toast.success("Content published successfully", {
      description: "The announcement is now live on the platform"
    });
    setOpen(false);
  };

  const learningResources = [
    { title: "Sustainable Farming Practices", category: "Farming", views: 1245, status: "Published" },
    { title: "Pest Control Without Chemicals", category: "Organic", views: 987, status: "Published" },
    { title: "Marketing Your Farm Products", category: "Business", views: 2341, status: "Published" },
    { title: "Soil Health Management", category: "Farming", views: 654, status: "Draft" }
  ];

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
                  <FileText className="h-3 w-3 mr-1" />
                  Content
                </Badge>
              </motion.div>
              <h1 className="text-3xl md:text-4xl font-bold mt-2">Content Management</h1>
              <p className="text-muted-foreground">Manage platform content and community posts</p>
            </div>
          </StaggerItem>

          {/* Tabs */}
          <StaggerItem>
            <Tabs defaultValue="posts" className="w-full">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <TabsList className="bg-white/50 dark:bg-black/20 backdrop-blur-sm border">
                  <TabsTrigger value="posts" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                    <MessageSquare className="h-4 w-4 mr-2" />
                    Forum Posts
                  </TabsTrigger>
                  <TabsTrigger value="stories" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                    <Award className="h-4 w-4 mr-2" />
                    Success Stories
                  </TabsTrigger>
                  <TabsTrigger value="learning" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                    <BookOpen className="h-4 w-4 mr-2" />
                    Learning Resources
                  </TabsTrigger>
                </TabsList>
              </motion.div>

              <AnimatePresence mode="wait">
                {/* Forum Posts */}
                <TabsContent value="posts" className="mt-6 space-y-6">
                  <motion.div
                    key="posts"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <SlideIn direction="up" delay={0.1}>
                      <div className="flex justify-between items-center">
                        <div>
                          <h2 className="text-xl font-semibold">Community Posts</h2>
                          <p className="text-sm text-muted-foreground">Moderate and manage forum discussions</p>
                        </div>
                        <Dialog open={open} onOpenChange={setOpen}>
                          <DialogTrigger asChild>
                            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                              <Button className="rounded-xl">
                                <Plus className="h-4 w-4 mr-2" />
                                Create Announcement
                              </Button>
                            </motion.div>
                          </DialogTrigger>
                          <DialogContent className="sm:max-w-md">
                            <DialogHeader>
                              <DialogTitle className="flex items-center gap-2">
                                <Sparkles className="h-5 w-5 text-primary" />
                                Create Announcement
                              </DialogTitle>
                              <DialogDescription>
                                Post an official platform announcement
                              </DialogDescription>
                            </DialogHeader>
                            <motion.div 
                              className="space-y-4"
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: 0.1 }}
                            >
                              <Input placeholder="Title" className="rounded-xl" />
                              <Textarea placeholder="Content" rows={6} className="rounded-xl" />
                              <motion.div whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }}>
                                <Button onClick={handlePublish} className="w-full rounded-xl">
                                  <Sparkles className="h-4 w-4 mr-2" />
                                  Publish
                                </Button>
                              </motion.div>
                            </motion.div>
                          </DialogContent>
                        </Dialog>
                      </div>
                    </SlideIn>

                    <ScrollReveal>
                      <StaggerContainer className="space-y-4" staggerDelay={0.08}>
                        {isLoading ? (
                           <div className="flex justify-center p-12"><Loader2 className="animate-spin h-8 w-8 text-primary" /></div>
                        ) : (
                        forumPosts.map((post, index) => (
                          <StaggerItem key={post.id}>
                            <HoverLift>
                              <Card className="hover-glow overflow-hidden">
                                <CardContent className="p-6">
                                  <div className="flex gap-4">
                                    <motion.img
                                      src={post.avatar || `https://i.pravatar.cc/150?u=${post.authorId || post.id}`}
                                      alt={post.authorName || post.author}
                                      className="h-12 w-12 rounded-full object-cover ring-2 ring-primary/20"
                                      whileHover={{ scale: 1.1, rotate: 5 }}
                                      transition={{ type: "spring", stiffness: 300 }}
                                    />
                                    <div className="flex-1">
                                      <div className="flex items-start justify-between mb-2">
                                        <div>
                                          <motion.h3 
                                            className="font-semibold hover:text-primary transition-colors cursor-pointer"
                                            whileHover={{ x: 2 }}
                                          >
                                            {post.title}
                                          </motion.h3>
                                          <p className="text-sm text-muted-foreground">
                                            by {post.authorName || post.author} - <span className="capitalize">{post.authorRole || post.role || "user"}</span>
                                          </p>
                                        </div>
                                        <motion.div
                                          initial={{ scale: 0 }}
                                          animate={{ scale: 1 }}
                                          transition={{ delay: 0.2 + index * 0.05 }}
                                        >
                                          <Badge className="bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400">
                                            Published
                                          </Badge>
                                        </motion.div>
                                      </div>
                                      <p className="text-sm text-foreground/80 mb-3">{post.content || post.excerpt}</p>
                                      <motion.div 
                                        className="flex items-center gap-4 text-sm text-muted-foreground mb-4"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ delay: 0.3 + index * 0.05 }}
                                      >
                                        <span className="flex items-center gap-1">
                                          <MessageSquare className="h-4 w-4" />
                                          {post.replies || 0} replies
                                        </span>
                                        <span>❤️ {post.likes || 0} likes</span>
                                      </motion.div>
                                      <motion.div 
                                        className="flex gap-2"
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.4 + index * 0.05 }}
                                      >
                                        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                                          <Button variant="outline" size="sm" className="rounded-xl">
                                            <Eye className="h-4 w-4 mr-2" />
                                            View
                                          </Button>
                                        </motion.div>
                                        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                                          <Button variant="outline" size="sm" className="rounded-xl">
                                            <Edit className="h-4 w-4 mr-2" />
                                            Edit
                                          </Button>
                                        </motion.div>
                                        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                                          <Button variant="outline" size="sm" className="text-red-600 hover:bg-red-50 dark:hover:bg-red-950 rounded-xl" onClick={async () => {
                                             try {
                                               await communityApi.deletePost(post.id);
                                               setForumPosts(prev => prev.filter(p => p.id !== post.id));
                                               toast.success('Post hidden');
                                             } catch {
                                               setForumPosts(prev => prev.filter(p => p.id !== post.id));
                                               toast.success('Post hidden (offline)');
                                             }
                                          }}>
                                            <EyeOff className="h-4 w-4 mr-2" />
                                            Hide
                                          </Button>
                                        </motion.div>
                                      </motion.div>
                                    </div>
                                  </div>
                                </CardContent>
                              </Card>
                            </HoverLift>
                          </StaggerItem>
                        )))}
                      </StaggerContainer>
                    </ScrollReveal>
                  </motion.div>
                </TabsContent>

                {/* Success Stories */}
                <TabsContent value="stories" className="mt-6 space-y-6">
                  <motion.div
                    key="stories"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <SlideIn direction="up" delay={0.1}>
                      <div className="flex justify-between items-center">
                        <div>
                          <h2 className="text-xl font-semibold">Success Stories</h2>
                          <p className="text-sm text-muted-foreground">Feature inspiring farmer stories</p>
                        </div>
                        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                          <Button className="rounded-xl">
                            <Plus className="h-4 w-4 mr-2" />
                            Add Story
                          </Button>
                        </motion.div>
                      </div>
                    </SlideIn>

                    <ScrollReveal>
                      <motion.div 
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                        layout
                      >
                        {successStories.map((story, index) => (
                          <motion.div
                            key={story.id}
                            initial={{ opacity: 0, scale: 0.9, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            transition={{ duration: 0.4, delay: index * 0.1 }}
                          >
                            <HoverLift>
                              <Card className="overflow-hidden hover-glow group h-full">
                                <div className="relative overflow-hidden">
                                  <motion.img
                                    src={story.image}
                                    alt={story.name}
                                    className="w-full h-48 object-cover"
                                    whileHover={{ scale: 1.1 }}
                                    transition={{ duration: 0.4 }}
                                  />
                                  <motion.div
                                    className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                                  />
                                </div>
                                <CardHeader>
                                  <div className="flex items-start justify-between">
                                    <div>
                                      <CardTitle className="text-lg">{story.name}</CardTitle>
                                      <p className="text-sm text-muted-foreground">{story.farm}</p>
                                    </div>
                                    <motion.div
                                      initial={{ scale: 0 }}
                                      animate={{ scale: 1 }}
                                      transition={{ delay: 0.3 + index * 0.1, type: "spring" }}
                                    >
                                      <Badge className="bg-primary hover:bg-primary">
                                        {story.revenue}
                                      </Badge>
                                    </motion.div>
                                  </div>
                                </CardHeader>
                                <CardContent>
                                  <motion.p 
                                    className="text-sm text-foreground/80 italic mb-4"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.4 + index * 0.1 }}
                                  >
                                    "{story.story}"
                                  </motion.p>
                                  <motion.div 
                                    className="flex gap-2"
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.5 + index * 0.1 }}
                                  >
                                    <motion.div className="flex-1" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                                      <Button variant="outline" size="sm" className="w-full rounded-xl">
                                        <Edit className="h-4 w-4 mr-2" />
                                        Edit
                                      </Button>
                                    </motion.div>
                                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                      <Button variant="outline" size="sm" className="text-red-600 hover:bg-red-50 dark:hover:bg-red-950 rounded-xl">
                                        <Trash2 className="h-4 w-4" />
                                      </Button>
                                    </motion.div>
                                  </motion.div>
                                </CardContent>
                              </Card>
                            </HoverLift>
                          </motion.div>
                        ))}
                      </motion.div>
                    </ScrollReveal>
                  </motion.div>
                </TabsContent>

                {/* Learning Resources */}
                <TabsContent value="learning" className="mt-6 space-y-6">
                  <motion.div
                    key="learning"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <SlideIn direction="up" delay={0.1}>
                      <div className="flex justify-between items-center">
                        <div>
                          <h2 className="text-xl font-semibold">Learning Resources</h2>
                          <p className="text-sm text-muted-foreground">Manage educational content</p>
                        </div>
                        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                          <Button className="rounded-xl">
                            <Plus className="h-4 w-4 mr-2" />
                            Add Resource
                          </Button>
                        </motion.div>
                      </div>
                    </SlideIn>

                    <ScrollReveal>
                      <StaggerContainer className="space-y-4" staggerDelay={0.08}>
                        {learningResources.map((resource, idx) => (
                          <StaggerItem key={idx}>
                            <HoverLift>
                              <Card className="hover-glow">
                                <CardContent className="p-6">
                                  <div className="flex items-center justify-between">
                                    <div className="flex-1">
                                      <motion.div 
                                        className="flex items-center gap-3 mb-2 flex-wrap"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ delay: 0.1 + idx * 0.05 }}
                                      >
                                        <motion.h3 
                                          className="font-semibold hover:text-primary transition-colors cursor-pointer"
                                          whileHover={{ x: 2 }}
                                        >
                                          {resource.title}
                                        </motion.h3>
                                        <Badge variant="outline" className="rounded-xl">{resource.category}</Badge>
                                        <motion.div
                                          initial={{ scale: 0 }}
                                          animate={{ scale: 1 }}
                                          transition={{ delay: 0.2 + idx * 0.05, type: "spring" }}
                                        >
                                          <Badge className={resource.status === "Published" 
                                            ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400" 
                                            : "bg-gray-100 text-foreground/80 dark:bg-gray-800"
                                          }>
                                            {resource.status}
                                          </Badge>
                                        </motion.div>
                                      </motion.div>
                                      <motion.p 
                                        className="text-sm text-muted-foreground flex items-center gap-1"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ delay: 0.3 + idx * 0.05 }}
                                      >
                                        <Eye className="h-4 w-4" />
                                        {resource.views.toLocaleString()} views
                                      </motion.p>
                                    </div>
                                    <motion.div 
                                      className="flex gap-2"
                                      initial={{ opacity: 0, x: 10 }}
                                      animate={{ opacity: 1, x: 0 }}
                                      transition={{ delay: 0.4 + idx * 0.05 }}
                                    >
                                      <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                                        <Button variant="outline" size="sm" className="rounded-xl">
                                          <Eye className="h-4 w-4 mr-2" />
                                          Preview
                                        </Button>
                                      </motion.div>
                                      <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                                        <Button variant="outline" size="sm" className="rounded-xl">
                                          <Edit className="h-4 w-4 mr-2" />
                                          Edit
                                        </Button>
                                      </motion.div>
                                      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                        <Button variant="outline" size="sm" className="text-red-600 hover:bg-red-50 dark:hover:bg-red-950 rounded-xl">
                                          <Trash2 className="h-4 w-4" />
                                        </Button>
                                      </motion.div>
                                    </motion.div>
                                  </div>
                                </CardContent>
                              </Card>
                            </HoverLift>
                          </StaggerItem>
                        ))}
                      </StaggerContainer>
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
  AdminContent
};
