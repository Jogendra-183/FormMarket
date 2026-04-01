import DashboardLayout from "../../components/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Badge } from "../../components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "../../components/ui/select";
import { Search, UserCheck, UserX, Mail, MoreVertical } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "../../components/ui/dropdown-menu";
import { users } from "../../utils/mockData";
import { toast } from "sonner";
function AdminUsers() {
  const allUsers = [
    ...users,
    ...users.map((u, i) => ({ ...u, id: `${i + 4}`, name: `User ${i + 4}` }))
  ];
  const handleApprove = (userId) => {
    toast.success("User approved successfully");
  };
  const handleSuspend = (userId) => {
    toast.success("User suspended");
  };
  const getStatusColor = (status) => {
    switch (status) {
      case "active":
        return "bg-primary/10 text-primary";
      case "pending":
        return "bg-yellow-100 text-yellow-700";
      case "suspended":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };
  const filterUsers = (role) => {
    if (!role || role === "all") return allUsers;
    return allUsers.filter((user) => user.role === role);
  };
  const UserTable = ({ users: users2 }) => <div className="space-y-3">{users2.map((user) => <Card key={user.id}><CardContent className="p-4"><div className="flex items-center justify-between gap-4"><div className="flex items-center gap-4 flex-1"><div className="h-12 w-12 bg-primary/10 rounded-full flex items-center justify-center font-semibold text-primary">{user.name.charAt(0)}</div><div className="flex-1 min-w-0"><div className="flex items-center gap-2 mb-1"><h3 className="font-semibold truncate">{user.name}</h3><Badge className={getStatusColor(user.status)}>{user.status}</Badge><Badge variant="outline" className="capitalize">{user.role}</Badge></div><p className="text-sm text-muted-foreground truncate">{user.email}</p><p className="text-xs text-muted-foreground">Joined: {user.joinDate}</p></div></div><div className="flex items-center gap-6"><div className="hidden md:block text-right"><p className="text-sm text-muted-foreground">{user.role === "farmer" ? "Products" : "Orders"}</p><p className="font-semibold">{user.role === "farmer" ? user.products : user.orders || 0}</p></div><DropdownMenu><DropdownMenuTrigger asChild><Button variant="ghost" size="icon"><MoreVertical className="h-4 w-4" /></Button></DropdownMenuTrigger><DropdownMenuContent align="end"><DropdownMenuItem><Mail className="h-4 w-4 mr-2" />
                      Send Email
                    </DropdownMenuItem>{user.status === "pending" && <DropdownMenuItem onClick={() => handleApprove(user.id)}><UserCheck className="h-4 w-4 mr-2" />
                        Approve
                      </DropdownMenuItem>}{user.status === "active" && <DropdownMenuItem onClick={() => handleSuspend(user.id)}><UserX className="h-4 w-4 mr-2" />
                        Suspend
                      </DropdownMenuItem>}</DropdownMenuContent></DropdownMenu></div></div></CardContent></Card>)}</div>;
  return <DashboardLayout><div className="space-y-6"><div><Badge variant="outline" className="bg-white/70">Users</Badge><h1 className="text-3xl md:text-4xl font-bold mt-2">User Management</h1><p className="text-muted-foreground">Manage all platform users</p></div>{
    /* Stats */
  }<div className="grid grid-cols-1 md:grid-cols-4 gap-4"><Card><CardHeader className="pb-3"><CardTitle className="text-sm font-medium text-muted-foreground">
                Total Users
              </CardTitle></CardHeader><CardContent><p className="text-3xl font-bold">{allUsers.length}</p></CardContent></Card><Card><CardHeader className="pb-3"><CardTitle className="text-sm font-medium text-muted-foreground">
                Farmers
              </CardTitle></CardHeader><CardContent><p className="text-3xl font-bold text-primary">{filterUsers("farmer").length}</p></CardContent></Card><Card><CardHeader className="pb-3"><CardTitle className="text-sm font-medium text-muted-foreground">
                Buyers
              </CardTitle></CardHeader><CardContent><p className="text-3xl font-bold text-blue-600">{filterUsers("buyer").length}</p></CardContent></Card><Card><CardHeader className="pb-3"><CardTitle className="text-sm font-medium text-muted-foreground">
                Pending Approval
              </CardTitle></CardHeader><CardContent><p className="text-3xl font-bold text-yellow-600">{allUsers.filter((u) => u.status === "pending").length}</p></CardContent></Card></div>{
    /* Filters */
  }<div className="flex flex-col md:flex-row gap-4"><div className="relative flex-1"><Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" /><Input placeholder="Search users..." className="pl-10" /></div><Select defaultValue="all"><SelectTrigger className="w-full md:w-[180px]"><SelectValue placeholder="Status" /></SelectTrigger><SelectContent><SelectItem value="all">All Status</SelectItem><SelectItem value="active">Active</SelectItem><SelectItem value="pending">Pending</SelectItem><SelectItem value="suspended">Suspended</SelectItem></SelectContent></Select></div><Tabs defaultValue="all" className="w-full"><TabsList><TabsTrigger value="all">All Users</TabsTrigger><TabsTrigger value="farmers">Farmers</TabsTrigger><TabsTrigger value="buyers">Buyers</TabsTrigger><TabsTrigger value="pending">Pending</TabsTrigger></TabsList><TabsContent value="all" className="mt-6"><UserTable users={allUsers} /></TabsContent><TabsContent value="farmers" className="mt-6"><UserTable users={filterUsers("farmer")} /></TabsContent><TabsContent value="buyers" className="mt-6"><UserTable users={filterUsers("buyer")} /></TabsContent><TabsContent value="pending" className="mt-6"><UserTable users={allUsers.filter((u) => u.status === "pending")} /></TabsContent></Tabs></div></DashboardLayout>;
}
export {
  AdminUsers
};
