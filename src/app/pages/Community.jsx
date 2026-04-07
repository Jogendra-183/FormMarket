import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
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
import { MessageSquare, ThumbsUp, Search, Plus, TrendingUp, Users, User, Loader2 } from "lucide-react";
import { forumPosts as mockForumPosts } from "../utils/mockData";
import { communityApi } from "../utils/api";
import { toast } from "sonner";

// PostCard Component
function PostCard({ post, index }) {
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(post.likes);

  const handleLike = async () => {
    if (liked) {
      setLikeCount(likeCount - 1);
      setLiked(false);
    } else {
      setLikeCount(likeCount + 1);
      setLiked(true);
      try {
         await communityApi.likePost(post.id);
      } catch {
         // ignore
      }
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
    >
      <Card className="hover:shadow-lg transition-all cursor-pointer">
        <CardHeader>
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-start gap-3 flex-1">
              <div className="h-10 w-10 rounded-full bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center shrink-0">
                <User className="h-5 w-5 text-indigo-600" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-bold text-lg">{post.title}</h3>
                  {post.featured && (
                    <Badge className="bg-amber-100 text-amber-700 hover:bg-amber-100">
                      Featured
                    </Badge>
                  )}
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                  <span className="font-medium">{post.authorName || post.author}</span>
                  <span>•</span>
                  <span>{post.date || new Date().toLocaleDateString()}</span>
                  <span>•</span>
                  <Badge variant="outline" className="text-xs">
                    {post.category || 'General Discussion'}
                  </Badge>
                </div>
                <p className="text-muted-foreground leading-relaxed">
                  {post.content || post.preview || post.excerpt}
                </p>
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-6 text-sm text-muted-foreground">
            <motion.button
              onClick={handleLike}
              className={`flex items-center gap-2 transition-colors ${
                liked ? 'text-indigo-600' : 'hover:text-indigo-600'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <ThumbsUp className={`h-4 w-4 ${liked ? 'fill-current' : ''}`} />
              <span className="font-medium">{likeCount}</span>
            </motion.button>
            <div className="flex items-center gap-2">
              <MessageSquare className="h-4 w-4" />
              <span className="font-medium">{post.replies} replies</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

function Community() {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [forumPosts, setForumPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

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
      console.error("Fetch posts failed:", error);
      toast.error("Offline mode. Showing cached posts.");
      setForumPosts(mockForumPosts);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleCreatePost = async () => {
    if (!title.trim() || !content.trim()) {
      toast.error("Please fill in all fields");
      return;
    }
    
    try {
      // Map display names to backend enum values
      await communityApi.createPost({ title, content, category: "GENERAL" });
      toast.success("Post created successfully!");
      setTitle("");
      setContent("");
      setOpen(false);
      fetchPosts();
    } catch (error) {
      toast.error("Could not create post. Backend unreachable.");
    }
  };

  const categories = [
    { name: "Farming Tips", value: "FARMING_TIPS", count: 145, icon: TrendingUp },
    { name: "Product Reviews", value: "MARKET_UPDATES", count: 89, icon: MessageSquare },
    { name: "General Discussion", value: "GENERAL", count: 234, icon: Users },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Header */}
        <motion.div
          className="flex flex-col md:flex-row md:items-center justify-between gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div>
            <Badge variant="outline" className="mb-3">
              Community
            </Badge>
            <h1 className="text-4xl font-black mb-2">Community Forum</h1>
            <p className="text-muted-foreground text-lg">
              Connect, share, and learn from the community
            </p>
          </div>
          
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button magnetic size="lg" className="rounded-2xl">
                <Plus className="h-4 w-4" />
                New Post
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle className="text-2xl font-black">Create a Post</DialogTitle>
                <DialogDescription>
                  Share your thoughts with the community
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 mt-4">
                <div>
                  <Input 
                    placeholder="Post title" 
                    className="h-12 rounded-xl text-base"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </div>
                <div>
                  <Textarea 
                    placeholder="What's on your mind?" 
                    rows={6} 
                    className="rounded-xl text-base resize-none"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                  />
                </div>
                <Button 
                  onClick={handleCreatePost} 
                  className="w-full rounded-xl h-12"
                  size="lg"
                >
                  Publish Post
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </motion.div>

        {/* Categories */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {categories.map((category, index) => {
            const Icon = category.icon;
            return (
              <motion.div
                key={category.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
              >
                <Card className="hover:shadow-lg transition-all cursor-pointer hover:-translate-y-1">
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <div className="h-12 w-12 bg-indigo-100 dark:bg-indigo-900/30 rounded-2xl flex items-center justify-center">
                        <Icon className="h-6 w-6 text-indigo-600" />
                      </div>
                      <div>
                        <CardTitle className="text-xl">{category.name}</CardTitle>
                        <p className="text-sm text-muted-foreground">
                          {category.count} discussions
                        </p>
                      </div>
                    </div>
                  </CardHeader>
                </Card>
              </motion.div>
            );
          })}
        </div>

        {/* Posts Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <Tabs defaultValue="all" className="w-full">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
              <TabsList className="rounded-2xl">
                <TabsTrigger value="all" className="rounded-xl">All Posts</TabsTrigger>
                <TabsTrigger value="popular" className="rounded-xl">Popular</TabsTrigger>
                <TabsTrigger value="recent" className="rounded-xl">Recent</TabsTrigger>
              </TabsList>
              <div className="relative flex-1 md:max-w-md">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input 
                  placeholder="Search discussions..." 
                  className="pl-10 rounded-xl h-11" 
                />
              </div>
            </div>

            <TabsContent value="all" className="mt-6">
              {isLoading ? (
                <div className="flex justify-center p-12"><Loader2 className="animate-spin h-8 w-8 text-indigo-600" /></div>
              ) : (
              <div className="space-y-4">
                {forumPosts.map((post, index) => (
                  <PostCard key={post.id} post={post} index={index} />
                ))}
              </div>
              )}
            </TabsContent>

            <TabsContent value="popular" className="mt-6">
              {isLoading ? (
                <div className="flex justify-center p-12"><Loader2 className="animate-spin h-8 w-8 text-indigo-600" /></div>
              ) : (
              <div className="space-y-4">
                {[...forumPosts]
                  .sort((a, b) => (b.likes || 0) - (a.likes || 0))
                  .map((post, index) => (
                    <PostCard key={post.id} post={post} index={index} />
                  ))}
              </div>
              )}
            </TabsContent>

            <TabsContent value="recent" className="mt-6">
              {isLoading ? (
                <div className="flex justify-center p-12"><Loader2 className="animate-spin h-8 w-8 text-indigo-600" /></div>
              ) : (
              <div className="space-y-4">
                {[...forumPosts].reverse().map((post, index) => (
                  <PostCard key={post.id} post={post} index={index} />
                ))}
              </div>
              )}
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>
    </DashboardLayout>
  );
}

export { Community };
