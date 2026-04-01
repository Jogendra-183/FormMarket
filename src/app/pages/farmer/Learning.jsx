import DashboardLayout from "../../components/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Badge } from "../../components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/ui/tabs";
import { Play, Clock, BookOpen, Award, Search } from "lucide-react";
import { learningResources } from "../../utils/mockData";
function FarmerLearning() {
  const categories = ["All", "Farming Techniques", "Organic Farming", "Business", "Marketing"];
  const achievements = [
    { id: "1", title: "First Course Completed", earned: true },
    { id: "2", title: "Organic Farming Expert", earned: true },
    { id: "3", title: "Business Basics", earned: false },
    { id: "4", title: "Marketing Master", earned: false }
  ];
  return <DashboardLayout><div className="space-y-6"><div><Badge variant="outline" className="bg-white/70">Learning</Badge><h1 className="text-3xl md:text-4xl font-bold mt-2">Learning Hub</h1><p className="text-muted-foreground">Expand your knowledge and grow your farm business</p></div>{
    /* Stats */
  }<div className="grid grid-cols-1 md:grid-cols-4 gap-4"><Card><CardHeader className="pb-3"><CardTitle className="text-sm font-medium text-muted-foreground">
                Courses Completed
              </CardTitle></CardHeader><CardContent><p className="text-3xl font-bold">12</p></CardContent></Card><Card><CardHeader className="pb-3"><CardTitle className="text-sm font-medium text-muted-foreground">
                Hours Learned
              </CardTitle></CardHeader><CardContent><p className="text-3xl font-bold">48</p></CardContent></Card><Card><CardHeader className="pb-3"><CardTitle className="text-sm font-medium text-muted-foreground">
                Achievements
              </CardTitle></CardHeader><CardContent><p className="text-3xl font-bold">8</p></CardContent></Card><Card><CardHeader className="pb-3"><CardTitle className="text-sm font-medium text-muted-foreground">
                Current Streak
              </CardTitle></CardHeader><CardContent><p className="text-3xl font-bold">7 days</p></CardContent></Card></div><Tabs defaultValue="courses" className="w-full"><TabsList><TabsTrigger value="courses">Courses</TabsTrigger><TabsTrigger value="achievements">Achievements</TabsTrigger><TabsTrigger value="progress">My Progress</TabsTrigger></TabsList><TabsContent value="courses" className="mt-6 space-y-6"><div className="flex flex-col md:flex-row gap-4"><div className="relative flex-1"><Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" /><Input placeholder="Search courses..." className="pl-10" /></div><div className="flex gap-2 overflow-x-auto">{categories.map((category) => <Button
    key={category}
    variant="outline"
    size="sm"
    className="whitespace-nowrap"
  >{category}</Button>)}</div></div><div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">{learningResources.map((resource) => <Card key={resource.id} className="overflow-hidden group cursor-pointer hover:shadow-lg transition-shadow"><div className="relative"><img
    src={resource.image}
    alt={resource.title}
    className="w-full h-48 object-cover"
  /><div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"><Button size="lg"><Play className="h-5 w-5 mr-2" />
                        Start Learning
                      </Button></div><Badge className="absolute top-3 right-3 bg-white/90 text-gray-900">{resource.category}</Badge></div><CardHeader><CardTitle className="text-lg">{resource.title}</CardTitle><CardDescription>{resource.description}</CardDescription></CardHeader><CardContent><div className="flex items-center gap-2 text-sm text-muted-foreground"><Clock className="h-4 w-4" /><span>{resource.duration}</span></div></CardContent></Card>)}</div></TabsContent><TabsContent value="achievements" className="mt-6"><Card><CardHeader><CardTitle>Your Achievements</CardTitle><CardDescription>Milestones you've reached on your learning journey</CardDescription></CardHeader><CardContent><div className="grid grid-cols-1 md:grid-cols-2 gap-4">{achievements.map((achievement) => <div
                          key={achievement.id}
                          className={`p-6 border rounded-2xl flex items-center gap-4 ${achievement.earned ? "bg-emerald-50 border-emerald-200" : "bg-white/70"}`}
                        ><div
                          className={`h-16 w-16 rounded-full flex items-center justify-center ${achievement.earned ? "bg-primary" : "bg-gray-300"}`}
                        ><Award className="h-8 w-8 text-white" /></div><div><h3 className="font-semibold">{achievement.title}</h3><p className="text-sm text-muted-foreground">{achievement.earned ? "Earned" : "Not yet earned"}</p></div></div>)}</div></CardContent></Card></TabsContent><TabsContent value="progress" className="mt-6"><Card><CardHeader><CardTitle>Learning Progress</CardTitle><CardDescription>Track your educational journey</CardDescription></CardHeader><CardContent><div className="space-y-6">{learningResources.map((resource, index) => <div key={resource.id} className="space-y-2"><div className="flex items-center justify-between"><div className="flex items-center gap-3"><BookOpen className="h-5 w-5 text-primary" /><span className="font-medium">{resource.title}</span></div><span className="text-sm text-muted-foreground">{index === 0 ? "100%" : index === 1 ? "45%" : "0%"}</span></div><div className="w-full bg-black/5 rounded-full h-2"><div
                          className="bg-primary h-2 rounded-full"
                          style={{
                            width: index === 0 ? "100%" : index === 1 ? "45%" : "0%"
                          }}
                        /></div></div>)}</div></CardContent></Card></TabsContent></Tabs></div></DashboardLayout>;
}
export {
  FarmerLearning
};
