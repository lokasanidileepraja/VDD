import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Badge } from './ui/badge'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog'
import { Label } from './ui/label'
import { Textarea } from './ui/textarea'
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs'
import { Avatar, AvatarFallback, AvatarInitials } from './ui/avatar'
import { 
  Headphones, 
  Plus, 
  Search,
  Clock,
  CheckCircle,
  XCircle,
  AlertTriangle,
  MessageCircle,
  Phone,
  Mail,
  User,
  Calendar,
  Filter,
  MoreHorizontal,
  Eye,
  Edit,
  Send,
  Paperclip,
  Star,
  TrendingUp,
  Users
} from 'lucide-react'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from './ui/dropdown-menu'

export function CustomerSupport() {
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [priorityFilter, setPriorityFilter] = useState('all')
  const [selectedTicket, setSelectedTicket] = useState<any>(null)
  const [isDetailsOpen, setIsDetailsOpen] = useState(false)
  const [isCreateOpen, setIsCreateOpen] = useState(false)

  const ticketsData = [
    {
      id: 'TKT001',
      subject: 'Charger not starting session',
      description: 'Unable to start charging session at Phoenix Mall Station, Charger A1. App shows "Connection Error".',
      customer: {
        name: 'Rahul Sharma',
        email: 'rahul.sharma@email.com',
        phone: '+91 9876543210',
        userId: 'USR001'
      },
      priority: 'high',
      status: 'open',
      category: 'technical',
      assignedTo: 'Priya Patel',
      station: 'Phoenix Mall Station - A1',
      createdDate: '2024-01-28 14:30',
      lastUpdated: '2024-01-28 16:45',
      responseTime: '2h 15m',
      messages: [
        {
          sender: 'Rahul Sharma',
          message: 'Hi, I am trying to charge at Phoenix Mall but the charger A1 is not working. Can you help?',
          timestamp: '2024-01-28 14:30',
          type: 'customer'
        },
        {
          sender: 'Priya Patel',
          message: 'Hello Rahul, thank you for contacting us. I can see you tried to start a session. Let me check the charger status and get back to you.',
          timestamp: '2024-01-28 16:45',
          type: 'agent'
        }
      ]
    },
    {
      id: 'TKT002',
      subject: 'Billing discrepancy in last session',
      description: 'Charged ₹450 for 25 kWh but expected around ₹325 based on app pricing.',
      customer: {
        name: 'Priya Patel',
        email: 'priya.patel@email.com',
        phone: '+91 8765432109',
        userId: 'USR002'
      },
      priority: 'medium',
      status: 'in_progress',
      category: 'billing',
      assignedTo: 'Amit Kumar',
      station: 'Tech Park Hub - B3',
      createdDate: '2024-01-27 10:15',
      lastUpdated: '2024-01-28 09:20',
      responseTime: '4h 30m',
      sessionId: 'SS002',
      messages: [
        {
          sender: 'Priya Patel',
          message: 'I noticed a billing discrepancy in my last charging session. The amount seems higher than expected.',
          timestamp: '2024-01-27 10:15',
          type: 'customer'
        },
        {
          sender: 'Amit Kumar',
          message: 'Hello Priya, I will review your session details and the pricing calculation. Let me get back to you with a detailed breakdown.',
          timestamp: '2024-01-27 14:45',
          type: 'agent'
        }
      ]
    },
    {
      id: 'TKT003',
      subject: 'Request for new station location',
      description: 'Would like to request a charging station near Whitefield, Bangalore for better coverage.',
      customer: {
        name: 'Amit Kumar',
        email: 'amit.kumar@email.com',
        phone: '+91 7654321098',
        userId: 'USR003'
      },
      priority: 'low',
      status: 'resolved',
      category: 'feature_request',
      assignedTo: 'Sneha Reddy',
      createdDate: '2024-01-25 16:20',
      lastUpdated: '2024-01-28 11:30',
      responseTime: '1h 45m',
      resolutionTime: '2d 19h',
      rating: 5,
      messages: [
        {
          sender: 'Amit Kumar',
          message: 'Hi, I frequently travel to Whitefield area and would love to have a charging station there. Is this possible?',
          timestamp: '2024-01-25 16:20',
          type: 'customer'
        },
        {
          sender: 'Sneha Reddy',
          message: 'Thank you for your suggestion! I have forwarded this to our expansion team. We are actively looking at the Whitefield area.',
          timestamp: '2024-01-25 18:05',
          type: 'agent'
        }
      ]
    },
    {
      id: 'TKT004',
      subject: 'Mobile app crash during payment',
      description: 'App crashes when trying to add money to wallet. Happens consistently on Android.',
      customer: {
        name: 'Sneha Reddy',
        email: 'sneha.reddy@email.com',
        phone: '+91 6543210987',
        userId: 'USR004'
      },
      priority: 'high',
      status: 'escalated',
      category: 'technical',
      assignedTo: 'Technical Team',
      createdDate: '2024-01-28 08:45',
      lastUpdated: '2024-01-28 12:15',
      responseTime: '30m',
      messages: [
        {
          sender: 'Sneha Reddy',
          message: 'The mobile app keeps crashing whenever I try to add money to my wallet. This is very frustrating.',
          timestamp: '2024-01-28 08:45',
          type: 'customer'
        },
        {
          sender: 'Technical Team',
          message: 'We apologize for the inconvenience. This has been escalated to our development team for immediate resolution.',
          timestamp: '2024-01-28 09:15',
          type: 'agent'
        }
      ]
    }
  ]

  const supportAgents = [
    {
      name: 'Priya Patel',
      role: 'Senior Support Agent',
      activeTickets: 8,
      resolvedToday: 12,
      avgResponseTime: '1h 45m',
      rating: 4.8,
      status: 'online'
    },
    {
      name: 'Amit Kumar',
      role: 'Technical Support',
      activeTickets: 6,
      resolvedToday: 9,
      avgResponseTime: '2h 15m',
      rating: 4.6,
      status: 'online'
    },
    {
      name: 'Sneha Reddy',
      role: 'Billing Specialist',
      activeTickets: 4,
      resolvedToday: 15,
      avgResponseTime: '1h 30m',
      rating: 4.9,
      status: 'away'
    }
  ]

  const filteredTickets = ticketsData.filter(ticket => {
    const matchesSearch = ticket.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         ticket.customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         ticket.id.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === 'all' || ticket.status === statusFilter
    const matchesPriority = priorityFilter === 'all' || ticket.priority === priorityFilter
    return matchesSearch && matchesStatus && matchesPriority
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'open': return 'bg-blue-100 text-blue-800'
      case 'in_progress': return 'bg-yellow-100 text-yellow-800'
      case 'resolved': return 'bg-green-100 text-green-800'
      case 'closed': return 'bg-gray-100 text-gray-800'
      case 'escalated': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800'
      case 'medium': return 'bg-yellow-100 text-yellow-800'
      case 'low': return 'bg-green-100 text-green-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'technical': return 'bg-purple-100 text-purple-800'
      case 'billing': return 'bg-orange-100 text-orange-800'
      case 'feature_request': return 'bg-blue-100 text-blue-800'
      case 'general': return 'bg-gray-100 text-gray-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const assignTicket = (ticketId: string, agent: string) => {
    console.log(`Assigning ticket ${ticketId} to ${agent}`)
  }

  const updateStatus = (ticketId: string, status: string) => {
    console.log(`Updating ticket ${ticketId} status to ${status}`)
  }

  const escalateTicket = (ticketId: string) => {
    console.log(`Escalating ticket ${ticketId}`)
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1>Customer Support Center</h1>
          <p className="text-muted-foreground">
            Manage customer tickets, track resolutions, and monitor team performance
          </p>
        </div>
        <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Create Ticket
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Create New Support Ticket</DialogTitle>
              <DialogDescription>
                Create a support ticket on behalf of a customer
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="customer-name">Customer Name</Label>
                  <Input id="customer-name" placeholder="Enter customer name" />
                </div>
                <div>
                  <Label htmlFor="customer-email">Customer Email</Label>
                  <Input id="customer-email" type="email" placeholder="customer@email.com" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="priority">Priority</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select priority" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">Low</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="high">High</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="category">Category</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="technical">Technical</SelectItem>
                      <SelectItem value="billing">Billing</SelectItem>
                      <SelectItem value="feature_request">Feature Request</SelectItem>
                      <SelectItem value="general">General</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div>
                <Label htmlFor="subject">Subject</Label>
                <Input id="subject" placeholder="Brief description of the issue" />
              </div>
              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea id="description" placeholder="Detailed description of the issue" rows={4} />
              </div>
              <div>
                <Label htmlFor="assign-to">Assign To</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select agent" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="priya">Priya Patel</SelectItem>
                    <SelectItem value="amit">Amit Kumar</SelectItem>
                    <SelectItem value="sneha">Sneha Reddy</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setIsCreateOpen(false)}>Cancel</Button>
              <Button onClick={() => setIsCreateOpen(false)}>Create Ticket</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Open Tickets</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">23</div>
            <div className="text-xs text-muted-foreground">+3 from yesterday</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Avg Response Time</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">1h 45m</div>
            <div className="text-xs text-muted-foreground">-15m improvement</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Resolved Today</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">36</div>
            <div className="text-xs text-muted-foreground">92% satisfaction</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Active Agents</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-600">8</div>
            <div className="text-xs text-muted-foreground">All online</div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Tabs */}
      <Tabs defaultValue="tickets" className="space-y-4">
        <TabsList>
          <TabsTrigger value="tickets">Support Tickets</TabsTrigger>
          <TabsTrigger value="agents">Team Performance</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="knowledge">Knowledge Base</TabsTrigger>
        </TabsList>

        <TabsContent value="tickets" className="space-y-4">
          {/* Filters */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Search & Filter Tickets</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                    <Input 
                      placeholder="Search tickets by ID, subject, or customer..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-40">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="open">Open</SelectItem>
                    <SelectItem value="in_progress">In Progress</SelectItem>
                    <SelectItem value="resolved">Resolved</SelectItem>
                    <SelectItem value="escalated">Escalated</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={priorityFilter} onValueChange={setPriorityFilter}>
                  <SelectTrigger className="w-40">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Priority</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="low">Low</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Tickets List */}
          <div className="space-y-4">
            {filteredTickets.map((ticket) => (
              <Card key={ticket.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="font-semibold">{ticket.subject}</h3>
                        <Badge className={getStatusColor(ticket.status)}>
                          {ticket.status.replace('_', ' ')}
                        </Badge>
                        <Badge className={getPriorityColor(ticket.priority)}>
                          {ticket.priority}
                        </Badge>
                        <Badge className={getCategoryColor(ticket.category)}>
                          {ticket.category.replace('_', ' ')}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">{ticket.description}</p>
                      <div className="flex items-center gap-4 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <User className="h-3 w-3" />
                          {ticket.customer.name}
                        </span>
                        <span className="flex items-center gap-1">
                          <Mail className="h-3 w-3" />
                          {ticket.customer.email}
                        </span>
                        <span className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          {ticket.createdDate}
                        </span>
                        {ticket.station && (
                          <span className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {ticket.station}
                          </span>
                        )}
                      </div>
                    </div>
                    
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => {
                          setSelectedTicket(ticket)
                          setIsDetailsOpen(true)
                        }}>
                          <Eye className="h-4 w-4 mr-2" />
                          View Details
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Edit className="h-4 w-4 mr-2" />
                          Edit Ticket
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => assignTicket(ticket.id, 'agent')}>
                          <User className="h-4 w-4 mr-2" />
                          Assign Agent
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => escalateTicket(ticket.id)}>
                          <AlertTriangle className="h-4 w-4 mr-2" />
                          Escalate
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span>Assigned to: {ticket.assignedTo}</span>
                      <span>Response: {ticket.responseTime}</span>
                      {ticket.rating && (
                        <div className="flex items-center gap-1">
                          <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                          <span>{ticket.rating}/5</span>
                        </div>
                      )}
                    </div>
                    
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" onClick={() => {
                        setSelectedTicket(ticket)
                        setIsDetailsOpen(true)
                      }}>
                        <MessageCircle className="h-4 w-4 mr-1" />
                        Reply
                      </Button>
                      {ticket.status === 'open' && (
                        <Button size="sm" onClick={() => updateStatus(ticket.id, 'in_progress')}>
                          Take Action
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="agents" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Support Team Performance</CardTitle>
              <CardDescription>Monitor individual agent performance and workload</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {supportAgents.map((agent, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-4">
                      <Avatar>
                        <AvatarFallback>
                          <AvatarInitials name={agent.name} />
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="font-medium">{agent.name}</h4>
                          <Badge variant={agent.status === 'online' ? 'default' : 'secondary'}>
                            {agent.status}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">{agent.role}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-8">
                      <div className="text-center">
                        <div className="font-medium">{agent.activeTickets}</div>
                        <div className="text-xs text-muted-foreground">Active</div>
                      </div>
                      <div className="text-center">
                        <div className="font-medium text-green-600">{agent.resolvedToday}</div>
                        <div className="text-xs text-muted-foreground">Resolved Today</div>
                      </div>
                      <div className="text-center">
                        <div className="font-medium">{agent.avgResponseTime}</div>
                        <div className="text-xs text-muted-foreground">Avg Response</div>
                      </div>
                      <div className="text-center">
                        <div className="font-medium flex items-center gap-1">
                          <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                          {agent.rating}
                        </div>
                        <div className="text-xs text-muted-foreground">Rating</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Resolution Rate</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">94.2%</div>
                  <div className="text-sm text-muted-foreground">This month</div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Customer Satisfaction</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">4.7/5</div>
                  <div className="text-sm text-muted-foreground">Average rating</div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-base">First Contact Resolution</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-600">78%</div>
                  <div className="text-sm text-muted-foreground">Resolved on first contact</div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Support Metrics Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span>Total tickets this month</span>
                    <span className="font-medium">287</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Average resolution time</span>
                    <span className="font-medium">4h 32m</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Escalated tickets</span>
                    <span className="font-medium">12 (4.2%)</span>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span>Most common category</span>
                    <span className="font-medium">Technical (45%)</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Peak support hours</span>
                    <span className="font-medium">2PM - 6PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Repeat customers</span>
                    <span className="font-medium">23 (8%)</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="knowledge" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Knowledge Base Management</CardTitle>
              <CardDescription>Manage FAQ and help articles for customer self-service</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex gap-2">
                  <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    Add Article
                  </Button>
                  <Button variant="outline">
                    <Edit className="h-4 w-4 mr-2" />
                    Manage Categories
                  </Button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Card>
                    <CardHeader className="pb-3">
                      <CardTitle className="text-base">Popular Articles</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2 text-sm">
                        <div>How to start charging</div>
                        <div>Payment methods</div>
                        <div>Troubleshooting</div>
                        <div>Account management</div>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader className="pb-3">
                      <CardTitle className="text-base">Categories</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2 text-sm">
                        <div>Getting Started (12 articles)</div>
                        <div>Technical Issues (8 articles)</div>
                        <div>Billing & Payments (6 articles)</div>
                        <div>Account Setup (4 articles)</div>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader className="pb-3">
                      <CardTitle className="text-base">Usage Stats</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2 text-sm">
                        <div>1,245 views this month</div>
                        <div>89% helpful rating</div>
                        <div>23% self-service rate</div>
                        <div>15 articles updated</div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Ticket Details Dialog */}
      <Dialog open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Ticket #{selectedTicket?.id} - {selectedTicket?.subject}</DialogTitle>
          </DialogHeader>
          
          {selectedTicket && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4 p-4 bg-muted rounded-lg">
                <div>
                  <Label>Customer</Label>
                  <p className="font-medium">{selectedTicket.customer.name}</p>
                  <p className="text-sm text-muted-foreground">{selectedTicket.customer.email}</p>
                </div>
                <div>
                  <Label>Status & Priority</Label>
                  <div className="flex gap-2 mt-1">
                    <Badge className={getStatusColor(selectedTicket.status)}>
                      {selectedTicket.status}
                    </Badge>
                    <Badge className={getPriorityColor(selectedTicket.priority)}>
                      {selectedTicket.priority}
                    </Badge>
                  </div>
                </div>
              </div>
              
              <div>
                <Label>Conversation History</Label>
                <div className="mt-2 space-y-3 max-h-60 overflow-y-auto">
                  {selectedTicket.messages.map((message: any, index: number) => (
                    <div key={index} className={`p-3 rounded-lg ${
                      message.type === 'customer' ? 'bg-blue-50 ml-8' : 'bg-gray-50 mr-8'
                    }`}>
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-medium text-sm">{message.sender}</span>
                        <span className="text-xs text-muted-foreground">{message.timestamp}</span>
                      </div>
                      <p className="text-sm">{message.message}</p>
                    </div>
                  ))}
                </div>
              </div>
              
              <div>
                <Label>Reply to Customer</Label>
                <div className="mt-2 space-y-2">
                  <Textarea placeholder="Type your response here..." rows={3} />
                  <div className="flex justify-between">
                    <Button variant="outline" size="sm">
                      <Paperclip className="h-4 w-4 mr-1" />
                      Attach File
                    </Button>
                    <Button size="sm">
                      <Send className="h-4 w-4 mr-1" />
                      Send Reply
                    </Button>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-end gap-2 pt-4 border-t">
                <Button variant="outline" onClick={() => updateStatus(selectedTicket.id, 'resolved')}>
                  Mark Resolved
                </Button>
                <Button variant="outline" onClick={() => escalateTicket(selectedTicket.id)}>
                  Escalate
                </Button>
                <Button onClick={() => setIsDetailsOpen(false)}>
                  Close
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}