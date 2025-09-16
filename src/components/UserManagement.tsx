import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Badge } from './ui/badge'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from './ui/dropdown-menu'
import { Label } from './ui/label'
import { Avatar, AvatarFallback } from './ui/avatar'
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs'
import { 
  Users, 
  Plus, 
  Search,
  Filter,
  Download,
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Zap,
  CreditCard,
  Star,
  MoreHorizontal,
  Eye,
  Edit,
  Ban,
  MessageSquare,
  Gift,
  Trash2,
  UserCheck,
  TrendingUp,
  Clock
} from 'lucide-react'
import { toast } from 'sonner@2.0.3'

interface UserData {
  id: string
  name: string
  email: string
  phone: string
  location: string
  status: 'active' | 'inactive' | 'suspended'
  joinDate: string
  lastActive: string
  totalSessions: number
  totalSpent: number
  rating: number
  vehicleModel?: string
  membershipTier: 'basic' | 'premium' | 'enterprise'
  paymentMethod: string
}

export function UserManagement() {
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [tierFilter, setTierFilter] = useState('all')
  const [selectedUser, setSelectedUser] = useState<UserData | null>(null)
  const [isDetailsOpen, setIsDetailsOpen] = useState(false)
  const [isCreateOpen, setIsCreateOpen] = useState(false)

  const userData: UserData[] = [
    {
      id: 'U001',
      name: 'Rajesh Kumar',
      email: 'rajesh.kumar@email.com',
      phone: '+91 98765 43210',
      location: 'Bangalore, Karnataka',
      status: 'active',
      joinDate: '2023-06-15',
      lastActive: '2 hours ago',
      totalSessions: 156,
      totalSpent: 23450,
      rating: 4.8,
      vehicleModel: 'Tata Nexon EV',
      membershipTier: 'premium',
      paymentMethod: 'Credit Card'
    },
    {
      id: 'U002',
      name: 'Priya Sharma',
      email: 'priya.sharma@email.com',
      phone: '+91 98765 43211',
      location: 'Mumbai, Maharashtra',
      status: 'active',
      joinDate: '2023-08-20',
      lastActive: '1 day ago',
      totalSessions: 89,
      totalSpent: 12780,
      rating: 4.6,
      vehicleModel: 'MG ZS EV',
      membershipTier: 'basic',
      paymentMethod: 'UPI'
    },
    {
      id: 'U003',
      name: 'Amit Patel',
      email: 'amit.patel@email.com',
      phone: '+91 98765 43212',
      location: 'Delhi, Delhi',
      status: 'suspended',
      joinDate: '2023-04-10',
      lastActive: '1 week ago',
      totalSessions: 234,
      totalSpent: 45600,
      rating: 3.2,
      vehicleModel: 'Hyundai Kona',
      membershipTier: 'enterprise',
      paymentMethod: 'Corporate Card'
    },
    {
      id: 'U004',
      name: 'Sneha Reddy',
      email: 'sneha.reddy@email.com',
      phone: '+91 98765 43213',
      location: 'Chennai, Tamil Nadu',
      status: 'active',
      joinDate: '2023-09-05',
      lastActive: '30 mins ago',
      totalSessions: 67,
      totalSpent: 8950,
      rating: 4.9,
      vehicleModel: 'Mahindra eXUV300',
      membershipTier: 'premium',
      paymentMethod: 'Debit Card'
    },
    {
      id: 'U005',
      name: 'Vikram Singh',
      email: 'vikram.singh@email.com',
      phone: '+91 98765 43214',
      location: 'Pune, Maharashtra',
      status: 'inactive',
      joinDate: '2023-11-12',
      lastActive: '2 weeks ago',
      totalSessions: 23,
      totalSpent: 2340,
      rating: 4.1,
      vehicleModel: 'Ather 450X',
      membershipTier: 'basic',
      paymentMethod: 'Wallet'
    }
  ]

  const filteredUsers = userData.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.phone.includes(searchTerm)
    const matchesStatus = statusFilter === 'all' || user.status === statusFilter
    const matchesTier = tierFilter === 'all' || user.membershipTier === tierFilter
    return matchesSearch && matchesStatus && matchesTier
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-emerald-100 text-emerald-800 border-emerald-200'
      case 'inactive': return 'bg-gray-100 text-gray-800 border-gray-200'
      case 'suspended': return 'bg-red-100 text-red-800 border-red-200'
      default: return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  const getTierColor = (tier: string) => {
    switch (tier) {
      case 'basic': return 'bg-blue-100 text-blue-800 border-blue-200'
      case 'premium': return 'bg-purple-100 text-purple-800 border-purple-200'
      case 'enterprise': return 'bg-amber-100 text-amber-800 border-amber-200'
      default: return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  const handleUserAction = (userId: string, action: string) => {
    const user = userData.find(u => u.id === userId)
    if (!user) return

    switch (action) {
      case 'view':
        setSelectedUser(user)
        setIsDetailsOpen(true)
        break
      case 'edit':
        toast.info(`Editing user: ${user.name}`)
        break
      case 'contact':
        toast.info(`Contacting ${user.name} via ${user.email}`)
        break
      case 'suspend':
        toast.warning(`Suspending user: ${user.name}`)
        break
      case 'activate':
        toast.success(`Activating user: ${user.name}`)
        break
      case 'reward':
        toast.success(`Sending reward to ${user.name}`)
        break
      case 'delete':
        toast.error(`Deletion request for user: ${user.name}`)
        break
      default:
        console.log(`${action} action for user ${userId}`)
    }
  }

  const handleExport = () => {
    toast.success('Exporting user data...')
  }

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase()
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="p-8 max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex flex-col space-y-6 md:flex-row md:items-start md:justify-between md:space-y-0">
          <div className="space-y-2">
            <h1 className="text-3xl font-semibold text-foreground tracking-tight">User Management</h1>
            <p className="text-muted-foreground text-lg">
              Manage users, monitor activity, and provide customer support
            </p>
          </div>
          <div className="flex items-center space-x-4">
            <Button variant="outline" onClick={handleExport} className="modern-btn px-6 py-3 rounded-2xl">
              <Download className="h-4 w-4 mr-2" />
              Export Data
            </Button>
            <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
              <DialogTrigger asChild>
                <Button className="modern-btn px-6 py-3 rounded-2xl">
                  <Plus className="h-4 w-4 mr-2" />
                  Add User
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl border-0 shadow-xl">
                <DialogHeader>
                  <DialogTitle className="text-xl">Add New User</DialogTitle>
                  <DialogDescription className="text-muted-foreground">
                    Create a new user account in the system
                  </DialogDescription>
                </DialogHeader>
                <CreateUserForm onClose={() => setIsCreateOpen(false)} />
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="stat-card group">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-blue-100 border border-blue-200 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
                <Users className="h-6 w-6 text-blue-600" />
              </div>
              <TrendingUp className="h-4 w-4 text-emerald-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground mb-1">Total Users</p>
              <p className="text-3xl font-semibold text-foreground mb-2">{userData.length}</p>
              <p className="text-sm text-emerald-600 font-medium">+12% this month</p>
            </div>
          </div>

          <div className="stat-card group">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-emerald-100 border border-emerald-200 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
                <UserCheck className="h-6 w-6 text-emerald-600" />
              </div>
              <UserCheck className="h-4 w-4 text-emerald-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground mb-1">Active Users</p>
              <p className="text-3xl font-semibold text-foreground mb-2">
                {userData.filter(u => u.status === 'active').length}
              </p>
              <p className="text-sm text-emerald-600 font-medium">
                {((userData.filter(u => u.status === 'active').length / userData.length) * 100).toFixed(1)}% active
              </p>
            </div>
          </div>

          <div className="stat-card group">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-purple-100 border border-purple-200 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
                <Star className="h-6 w-6 text-purple-600" />
              </div>
              <Star className="h-4 w-4 text-purple-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground mb-1">Premium Users</p>
              <p className="text-3xl font-semibold text-foreground mb-2">
                {userData.filter(u => u.membershipTier === 'premium').length}
              </p>
              <p className="text-sm text-purple-600 font-medium">High value segment</p>
            </div>
          </div>

          <div className="stat-card group">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-orange-100 border border-orange-200 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
                <Zap className="h-6 w-6 text-orange-600" />
              </div>
              <Zap className="h-4 w-4 text-orange-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground mb-1">Avg. Sessions</p>
              <p className="text-3xl font-semibold text-foreground mb-2">
                {Math.round(userData.reduce((sum, u) => sum + u.totalSessions, 0) / userData.length)}
              </p>
              <p className="text-sm text-orange-600 font-medium">Per user</p>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="modern-card p-6">
          <div className="flex flex-col space-y-4 md:flex-row md:items-center md:space-y-0 md:space-x-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="Search users by name, email, or phone..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-12 h-12 rounded-2xl border-border bg-background"
                />
              </div>
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-48 h-12 rounded-2xl border-border">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent className="rounded-2xl border-0 shadow-lg">
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
                <SelectItem value="suspended">Suspended</SelectItem>
              </SelectContent>
            </Select>
            <Select value={tierFilter} onValueChange={setTierFilter}>
              <SelectTrigger className="w-48 h-12 rounded-2xl border-border">
                <SelectValue placeholder="Tier" />
              </SelectTrigger>
              <SelectContent className="rounded-2xl border-0 shadow-lg">
                <SelectItem value="all">All Tiers</SelectItem>
                <SelectItem value="basic">Basic</SelectItem>
                <SelectItem value="premium">Premium</SelectItem>
                <SelectItem value="enterprise">Enterprise</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Users Grid */}
        <div className="modern-card p-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-semibold text-foreground">Users ({filteredUsers.length})</h2>
              <p className="text-muted-foreground">Comprehensive user database with activity monitoring</p>
            </div>
          </div>
          
          <div className="grid gap-6">
            {filteredUsers.map((user) => (
              <div key={user.id} className="p-6 rounded-3xl border border-border bg-card hover:shadow-md transition-all duration-200">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-6">
                    <Avatar className="h-16 w-16 rounded-2xl">
                      <AvatarFallback className="bg-gradient-to-br from-violet-500 to-purple-600 text-white font-semibold text-lg rounded-2xl">
                        {getInitials(user.name)}
                      </AvatarFallback>
                    </Avatar>
                    
                    <div>
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="text-lg font-semibold text-foreground">{user.name}</h3>
                        <Badge className={`${getStatusColor(user.status)} px-3 py-1 rounded-full text-xs font-medium`}>
                          {user.status}
                        </Badge>
                        <Badge className={`${getTierColor(user.membershipTier)} px-3 py-1 rounded-full text-xs font-medium`}>
                          {user.membershipTier}
                        </Badge>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-6 text-sm text-muted-foreground mb-3">
                        <span className="flex items-center">
                          <Mail className="h-4 w-4 mr-2" />
                          {user.email}
                        </span>
                        <span className="flex items-center">
                          <Phone className="h-4 w-4 mr-2" />
                          {user.phone}
                        </span>
                        <span className="flex items-center">
                          <MapPin className="h-4 w-4 mr-2" />
                          {user.location}
                        </span>
                        <span className="flex items-center">
                          <Clock className="h-4 w-4 mr-2" />
                          Active {user.lastActive}
                        </span>
                      </div>
                      
                      <div className="flex items-center space-x-6 text-sm">
                        <span className="flex items-center text-blue-600">
                          <Zap className="h-4 w-4 mr-1" />
                          {user.totalSessions} sessions
                        </span>
                        <span className="flex items-center text-emerald-600">
                          <CreditCard className="h-4 w-4 mr-1" />
                          ₹{user.totalSpent.toLocaleString()} spent
                        </span>
                        <span className="flex items-center text-amber-600">
                          <Star className="h-4 w-4 mr-1" />
                          {user.rating}/5 rating
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm" className="h-10 w-10 p-0 rounded-xl hover:bg-muted">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-48 rounded-2xl border-0 shadow-lg">
                      <DropdownMenuItem onClick={() => handleUserAction(user.id, 'view')} className="rounded-xl">
                        <Eye className="h-4 w-4 mr-2" />
                        View Details
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleUserAction(user.id, 'edit')} className="rounded-xl">
                        <Edit className="h-4 w-4 mr-2" />
                        Edit User
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleUserAction(user.id, 'contact')} className="rounded-xl">
                        <MessageSquare className="h-4 w-4 mr-2" />
                        Send Message
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleUserAction(user.id, 'reward')} className="rounded-xl">
                        <Gift className="h-4 w-4 mr-2" />
                        Send Reward
                      </DropdownMenuItem>
                      {user.status === 'active' ? (
                        <DropdownMenuItem onClick={() => handleUserAction(user.id, 'suspend')} className="text-orange-600 rounded-xl">
                          <Ban className="h-4 w-4 mr-2" />
                          Suspend User
                        </DropdownMenuItem>
                      ) : (
                        <DropdownMenuItem onClick={() => handleUserAction(user.id, 'activate')} className="text-green-600 rounded-xl">
                          <UserCheck className="h-4 w-4 mr-2" />
                          Activate User
                        </DropdownMenuItem>
                      )}
                      <DropdownMenuItem onClick={() => handleUserAction(user.id, 'delete')} className="text-red-600 rounded-xl">
                        <Trash2 className="h-4 w-4 mr-2" />
                        Delete User
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* User Details Dialog */}
        {selectedUser && (
          <Dialog open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
            <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto rounded-3xl border-0 shadow-xl">
              <DialogHeader>
                <DialogTitle className="text-xl">{selectedUser.name}</DialogTitle>
                <DialogDescription className="text-muted-foreground">
                  Complete user profile and activity information
                </DialogDescription>
              </DialogHeader>
              <UserDetailsView user={selectedUser} />
            </DialogContent>
          </Dialog>
        )}
      </div>
    </div>
  )
}

// Create User Form Component
function CreateUserForm({ onClose }: { onClose: () => void }) {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="user-name" className="text-sm font-medium text-foreground">Full Name *</Label>
          <Input id="user-name" placeholder="Enter full name" className="mt-2 h-12 rounded-2xl" />
        </div>
        <div>
          <Label htmlFor="user-email" className="text-sm font-medium text-foreground">Email *</Label>
          <Input id="user-email" type="email" placeholder="Enter email address" className="mt-2 h-12 rounded-2xl" />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="user-phone" className="text-sm font-medium text-foreground">Phone Number *</Label>
          <Input id="user-phone" placeholder="Enter phone number" className="mt-2 h-12 rounded-2xl" />
        </div>
        <div>
          <Label htmlFor="user-tier" className="text-sm font-medium text-foreground">Membership Tier</Label>
          <Select>
            <SelectTrigger className="mt-2 h-12 rounded-2xl">
              <SelectValue placeholder="Select tier" />
            </SelectTrigger>
            <SelectContent className="rounded-2xl">
              <SelectItem value="basic">Basic</SelectItem>
              <SelectItem value="premium">Premium</SelectItem>
              <SelectItem value="enterprise">Enterprise</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div>
        <Label htmlFor="user-location" className="text-sm font-medium text-foreground">Location</Label>
        <Input id="user-location" placeholder="City, State" className="mt-2 h-12 rounded-2xl" />
      </div>

      <div>
        <Label htmlFor="user-vehicle" className="text-sm font-medium text-foreground">Vehicle Model</Label>
        <Input id="user-vehicle" placeholder="e.g., Tata Nexon EV" className="mt-2 h-12 rounded-2xl" />
      </div>

      <div className="flex justify-end space-x-4 pt-4">
        <Button variant="outline" onClick={onClose} className="px-8 py-3 rounded-2xl">
          Cancel
        </Button>
        <Button onClick={() => {
          toast.success('User created successfully!')
          onClose()
        }} className="px-8 py-3 rounded-2xl">
          Create User
        </Button>
      </div>
    </div>
  )
}

// User Details View Component
function UserDetailsView({ user }: { user: UserData }) {
  return (
    <Tabs defaultValue="profile" className="w-full">
      <TabsList className="grid w-full grid-cols-3 rounded-2xl">
        <TabsTrigger value="profile" className="rounded-xl">Profile</TabsTrigger>
        <TabsTrigger value="activity" className="rounded-xl">Activity</TabsTrigger>
        <TabsTrigger value="payments" className="rounded-xl">Payments</TabsTrigger>
      </TabsList>

      <TabsContent value="profile" className="space-y-6 mt-6">
        <div className="grid grid-cols-2 gap-8">
          <div className="space-y-4">
            <h4 className="font-semibold text-foreground text-lg">Personal Information</h4>
            <div className="space-y-4 text-sm">
              <div className="flex justify-between py-3 border-b border-border">
                <span className="text-muted-foreground">Name:</span>
                <span className="font-medium text-foreground">{user.name}</span>
              </div>
              <div className="flex justify-between py-3 border-b border-border">
                <span className="text-muted-foreground">Email:</span>
                <span className="font-medium text-foreground">{user.email}</span>
              </div>
              <div className="flex justify-between py-3 border-b border-border">
                <span className="text-muted-foreground">Phone:</span>
                <span className="font-medium text-foreground">{user.phone}</span>
              </div>
              <div className="flex justify-between py-3">
                <span className="text-muted-foreground">Location:</span>
                <span className="font-medium text-foreground">{user.location}</span>
              </div>
            </div>
          </div>
          
          <div className="space-y-4">
            <h4 className="font-semibold text-foreground text-lg">Account Details</h4>
            <div className="space-y-4 text-sm">
              <div className="flex justify-between py-3 border-b border-border">
                <span className="text-muted-foreground">User ID:</span>
                <span className="font-mono text-xs text-foreground">{user.id}</span>
              </div>
              <div className="flex justify-between py-3 border-b border-border">
                <span className="text-muted-foreground">Join Date:</span>
                <span className="font-medium text-foreground">{user.joinDate}</span>
              </div>
              <div className="flex justify-between py-3 border-b border-border">
                <span className="text-muted-foreground">Status:</span>
                <Badge className={user.status === 'active' ? 'bg-emerald-100 text-emerald-700 border-emerald-200' : 
                                user.status === 'inactive' ? 'bg-gray-100 text-gray-700 border-gray-200' : 
                                'bg-red-100 text-red-700 border-red-200'}>
                  {user.status}
                </Badge>
              </div>
              <div className="flex justify-between py-3">
                <span className="text-muted-foreground">Tier:</span>
                <Badge className={user.membershipTier === 'basic' ? 'bg-blue-100 text-blue-700 border-blue-200' : 
                                user.membershipTier === 'premium' ? 'bg-purple-100 text-purple-700 border-purple-200' : 
                                'bg-amber-100 text-amber-700 border-amber-200'}>
                  {user.membershipTier}
                </Badge>
              </div>
            </div>
          </div>
        </div>
      </TabsContent>

      <TabsContent value="activity" className="space-y-6 mt-6">
        <div className="grid grid-cols-3 gap-6">
          <div className="stat-card text-center">
            <div className="text-3xl font-semibold text-foreground mb-2">{user.totalSessions}</div>
            <div className="text-sm text-muted-foreground">Total Sessions</div>
          </div>
          <div className="stat-card text-center">
            <div className="text-3xl font-semibold text-foreground mb-2">{user.rating}</div>
            <div className="text-sm text-muted-foreground">User Rating</div>
          </div>
          <div className="stat-card text-center">
            <div className="text-3xl font-semibold text-foreground mb-2">{user.lastActive}</div>
            <div className="text-sm text-muted-foreground">Last Active</div>
          </div>
        </div>
      </TabsContent>

      <TabsContent value="payments" className="space-y-6 mt-6">
        <div className="grid grid-cols-2 gap-6">
          <div className="stat-card">
            <div className="text-2xl font-semibold text-foreground mb-2">₹{user.totalSpent.toLocaleString()}</div>
            <div className="text-sm text-muted-foreground">Total Spent</div>
          </div>
          <div className="stat-card">
            <div className="text-2xl font-semibold text-foreground mb-2">{user.paymentMethod}</div>
            <div className="text-sm text-muted-foreground">Preferred Payment</div>
          </div>
        </div>
      </TabsContent>
    </Tabs>
  )
}