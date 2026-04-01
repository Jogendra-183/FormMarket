import { useState } from "react";
import DashboardLayout from "../../components/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Textarea } from "../../components/ui/textarea";
import { Badge } from "../../components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "../../components/ui/dialog";
import { Plus, Edit, Trash2, Eye, EyeOff } from "lucide-react";
import { forumPosts, successStories } from "../../utils/mockData";
import { toast } from "sonner";
function AdminContent() {
  const [open, setOpen] = useState(false);
  const handlePublish = () => {
    toast.success("Content published successfully");
    setOpen(false);
  };
  return <DashboardLayout><div className="space-y-6"><div><Badge variant="outline" className="bg-white/70">Content</Badge><h1 className="text-3xl md:text-4xl font-bold mt-2">Content Management</h1><p className="text-muted-foreground">Manage platform content and community posts</p></div><Tabs defaultValue="posts" className="w-full"><TabsList><TabsTrigger value="posts">Forum Posts</TabsTrigger><TabsTrigger value="stories">Success Stories</TabsTrigger><TabsTrigger value="learning">Learning Resources</TabsTrigger></TabsList><TabsContent value="posts" className="mt-6 space-y-6"><div className="flex justify-between items-center"><div><h2 className="text-xl font-semibold">Community Posts</h2><p className="text-sm text-muted-foreground">Moderate and manage forum discussions</p></div><Dialog open={open} onOpenChange={setOpen}><DialogTrigger asChild><Button><Plus className="h-4 w-4 mr-2" />
                    Create Announcement
                  </Button></DialogTrigger><DialogContent><DialogHeader><DialogTitle>Create Announcement</DialogTitle><DialogDescription>
                      Post an official platform announcement
                    </DialogDescription></DialogHeader><div className="space-y-4"><Input placeholder="Title" /><Textarea placeholder="Content" rows={6} /><Button
    onClick={handlePublish}
    className="w-full"
  >
                      Publish
                    </Button></div></DialogContent></Dialog></div><div className="space-y-4">{forumPosts.map((post) => <Card key={post.id}><CardContent className="p-6"><div className="flex gap-4"><img
    src={post.avatar}
    alt={post.author}
    className="h-12 w-12 rounded-full object-cover"
  /><div className="flex-1"><div className="flex items-start justify-between mb-2"><div><h3 className="font-semibold">{post.title}</h3><p className="text-sm text-muted-foreground">
                              by {post.author} - <span className="capitalize">{post.role}</span></p></div><Badge>Published</Badge></div><p className="text-sm text-foreground/80 mb-3">{post.excerpt}</p><div className="flex items-center gap-4 text-sm text-muted-foreground mb-4"><span>{post.replies} replies</span><span>{post.likes} likes</span></div><div className="flex gap-2"><Button variant="outline" size="sm"><Eye className="h-4 w-4 mr-2" />
                            View
                          </Button><Button variant="outline" size="sm"><Edit className="h-4 w-4 mr-2" />
                            Edit
                          </Button><Button variant="outline" size="sm" className="text-red-600 hover:bg-red-50"><EyeOff className="h-4 w-4 mr-2" />
                            Hide
                          </Button></div></div></div></CardContent></Card>)}</div></TabsContent><TabsContent value="stories" className="mt-6 space-y-6"><div className="flex justify-between items-center"><div><h2 className="text-xl font-semibold">Success Stories</h2><p className="text-sm text-muted-foreground">Feature inspiring farmer stories</p></div><Button><Plus className="h-4 w-4 mr-2" />
                Add Story
              </Button></div><div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">{successStories.map((story) => <Card key={story.id} className="overflow-hidden"><img
    src={story.image}
    alt={story.name}
    className="w-full h-48 object-cover"
  /><CardHeader><div className="flex items-start justify-between"><div><CardTitle className="text-lg">{story.name}</CardTitle><p className="text-sm text-muted-foreground">{story.farm}</p></div><Badge className="bg-primary">{story.revenue}</Badge></div></CardHeader><CardContent><p className="text-sm text-foreground/80 italic mb-4">"{story.story}"</p><div className="flex gap-2"><Button variant="outline" size="sm" className="flex-1"><Edit className="h-4 w-4 mr-2" />
                        Edit
                      </Button><Button variant="outline" size="sm" className="text-red-600"><Trash2 className="h-4 w-4" /></Button></div></CardContent></Card>)}</div></TabsContent><TabsContent value="learning" className="mt-6 space-y-6"><div className="flex justify-between items-center"><div><h2 className="text-xl font-semibold">Learning Resources</h2><p className="text-sm text-muted-foreground">Manage educational content</p></div><Button><Plus className="h-4 w-4 mr-2" />
                Add Resource
              </Button></div><div className="space-y-4">{[
    { title: "Sustainable Farming Practices", category: "Farming", views: 1245, status: "Published" },
    { title: "Pest Control Without Chemicals", category: "Organic", views: 987, status: "Published" },
    { title: "Marketing Your Farm Products", category: "Business", views: 2341, status: "Published" },
    { title: "Soil Health Management", category: "Farming", views: 654, status: "Draft" }
  ].map((resource, idx) => <Card key={idx}><CardContent className="p-6"><div className="flex items-center justify-between"><div className="flex-1"><div className="flex items-center gap-3 mb-2"><h3 className="font-semibold">{resource.title}</h3><Badge variant="outline">{resource.category}</Badge><Badge className={resource.status === "Published" ? "bg-primary/10 text-primary" : "bg-gray-100 text-foreground/80"}>{resource.status}</Badge></div><p className="text-sm text-muted-foreground">{resource.views} views</p></div><div className="flex gap-2"><Button variant="outline" size="sm"><Eye className="h-4 w-4 mr-2" />
                          Preview
                        </Button><Button variant="outline" size="sm"><Edit className="h-4 w-4 mr-2" />
                          Edit
                        </Button><Button variant="outline" size="sm" className="text-red-600"><Trash2 className="h-4 w-4" /></Button></div></div></CardContent></Card>)}</div></TabsContent></Tabs></div></DashboardLayout>;
}
export {
  AdminContent
};
