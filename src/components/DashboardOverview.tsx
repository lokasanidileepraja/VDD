import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import { Badge } from './ui/badge'
import { Button } from './ui/button'
import { Progress } from './ui/progress'
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from './ui/dialog'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from './ui/dropdown-menu'
import { 
  Users, 
  Zap, 
  DollarSign, 
  Battery, 
  TrendingUp, 
  Activity,
  MapPin,
  Clock,
  AlertTriangle,
  CheckCircle,
  MoreHorizontal,
  Eye,
  MessageSquare,
  Phone,
  RefreshCw,
  Play,
  Pause,
  Settings,
  ExternalLink,
  ArrowRight,
  Bell,
  Calendar,
  TrendingDown,
  Plus
} from 'lucide-react'
import { toast } from 'sonner@2.0.3'

interface LiveSession {
  id: string
  user: string
  station: string
  duration: string
  energy: string
  cost: string
  status: 'charging' | 'completed' | 'error'
  startTime: string
  vehicleModel?: string
  chargerType: string
}

interface ActivityItem {
  id: number
  action: string
  location: string
  time: string
  type: 'success' | 'warning' | 'error' | 'info'
  description?: string
  severity: 'low' | 'medium' | 'high'
}

export function DashboardOverview() {
  const [currentTime, setCurrentTime] = useState(new Date())
  const [activeSessions, setActiveSessions] = useState(342)
  const [selectedSession, setSelectedSession] = useState<LiveSession | null>(null)
  const [selectedActivity, setSelectedActivity] = useState<ActivityItem | null>(null)
  const [refreshing, setRefreshing] = useState(false)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
      setActiveSessions(prev => {
        const change = Math.floor(Math.random() * 5) - 2
        return Math.max(300, Math.min(400, prev + change))
      })
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  const kpiData = [
    {
      title: "Revenue Today",
      value: "₹2,45,670",
      change: "+12.3%",
      changeValue: "+₹26,890",
      icon: DollarSign,
      color: "text-emerald-600",
      bgColor: "bg-emerald-50",
      borderColor: "border-emerald-200",
      trend: "up"
    },
    {
      title: "Active Users", 
      value: "15,847",
      change: "+5.2%",
      changeValue: "+784",
      icon: Users,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
      borderColor: "border-blue-200",
      trend: "up"
    },
    {
      title: "Live Sessions",
      value: activeSessions.toString(),
      change: "Real-time",
      changeValue: "Live data",
      icon: Zap,
      color: "text-violet-600",
      bgColor: "bg-violet-50",
      borderColor: "border-violet-200",
      trend: "neutral"
    },
    {
      title: "Network Uptime",
      value: "98.7%",
      change: "+0.3%",
      changeValue: "↑ 2.8h avg",
      icon: Battery,
      color: "text-green-600",
      bgColor: "bg-green-50", 
      borderColor: "border-green-200",
      trend: "up"
    }
  ]

  const liveSessionsData: LiveSession[] = [
    {
      id: "SS001",
      user: "Rahul Sharma",
      station: "Phoenix Mall - A1",
      duration: "45 min",
      energy: "25.4 kWh",
      cost: "₹325",
      status: "charging",
      startTime: "2:15 PM",
      vehicleModel: "Tata Nexon EV",
      chargerType: "DC Fast 60kW"
    },
    {
      id: "SS002", 
      user: "Priya Patel",
      station: "Tech Park - B3",
      duration: "32 min",
      energy: "18.7 kWh",
      cost: "₹240",
      status: "charging",
      startTime: "2:30 PM",
      vehicleModel: "MG ZS EV",
      chargerType: "AC Type 2 22kW"
    },
    {
      id: "SS003",
      user: "Amit Kumar",
      station: "City Center - C2", 
      duration: "67 min",
      energy: "42.1 kWh",
      cost: "₹540",
      status: "completed",
      startTime: "1:45 PM",
      vehicleModel: "Hyundai Kona",
      chargerType: "DC Fast 100kW"
    },
    {
      id: "SS004",
      user: "Sneha Reddy",
      station: "Airport Hub - D1",
      duration: "23 min",
      energy: "15.2 kWh",
      cost: "₹195",
      status: "charging",
      startTime: "2:45 PM",
      vehicleModel: "Mahindra eXUV300",
      chargerType: "DC Fast 150kW"
    },
    {
      id: "SS005",
      user: "Vikram Singh",
      station: "Mall of India - E2",
      duration: "8 min",
      energy: "3.2 kWh",
      cost: "₹45",
      status: "error",
      startTime: "3:02 PM",
      vehicleModel: "Ather 450X",
      chargerType: "AC Slow 3kW"
    }
  ]

  const recentActivity: ActivityItem[] = [
    {
      id: 1,
      action: "New station activated",
      location: "Bangalore - Koramangala Tech Hub",
      time: "2 minutes ago",
      type: "success",
      description: "6x DC Fast chargers (150kW) now operational",
      severity: "low"
    },
    {
      id: 2,
      action: "Charger offline alert",
      location: "Mumbai - Bandra Station A3",
      time: "8 minutes ago", 
      type: "warning",
      description: "Communication lost, technician dispatched",
      severity: "high"
    },
    {
      id: 3,
      action: "High demand detected",
      location: "Delhi - Connaught Place",
      time: "12 minutes ago",
      type: "info",
      description: "Queue forming, consider dynamic pricing",
      severity: "medium"
    },
    {
      id: 4,
      action: "Payment failed",
      location: "User: Arjun Singh - ₹450",
      time: "15 minutes ago",
      type: "error",
      description: "Card declined, retry successful",
      severity: "low"
    },
    {
      id: 5,
      action: "Maintenance completed",
      location: "Chennai - Phoenix MarketCity B2",
      time: "25 minutes ago",
      type: "success",
      description: "Preventive maintenance completed on schedule",
      severity: "low"
    }
  ]

  const stationStats = [
    { name: "Online Stations", count: 287, total: 295, percentage: 97.3, color: "bg-emerald-500", lightColor: "bg-emerald-100" },
    { name: "Maintenance", count: 5, total: 295, percentage: 1.7, color: "bg-amber-500", lightColor: "bg-amber-100" },
    { name: "Offline", count: 3, total: 295, percentage: 1.0, color: "bg-red-500", lightColor: "bg-red-100" }
  ]

  const handleRefresh = async () => {
    setRefreshing(true)
    await new Promise(resolve => setTimeout(resolve, 1500))
    setRefreshing(false)
    toast.success('Dashboard refreshed successfully!')
  }

  const handleSessionAction = (sessionId: string, action: string) => {
    const session = liveSessionsData.find(s => s.id === sessionId)
    if (!session) return
    
    switch (action) {
      case 'contact':
        toast.info(`Contacting ${session.user}...`)
        break
      case 'stop':
        toast.warning(`Stopping session ${sessionId}`)
        break
      case 'restart':
        toast.info(`Restarting session ${sessionId}`)
        break
      default:
        console.log(`${action} session ${sessionId}`)
    }
  }

  const handleActivityAction = (activityId: number, action: string) => {
    const activity = recentActivity.find(a => a.id === activityId)
    if (!activity) return
    
    switch (action) {
      case 'acknowledge':
        toast.success(`Activity marked as resolved`)
        break
      case 'escalate':
        toast.info(`Issue escalated to support team`)
        break
      default:
        console.log(`${action} activity ${activityId}`)
    }
  }

  const getSessionStatusColor = (status: string) => {
    switch (status) {
      case 'charging': return 'bg-emerald-100 text-emerald-800 border-emerald-200'
      case 'completed': return 'bg-blue-100 text-blue-800 border-blue-200'
      case 'error': return 'bg-red-100 text-red-800 border-red-200'
      default: return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'success': return <CheckCircle className="h-4 w-4" />
      case 'warning': return <AlertTriangle className="h-4 w-4" />
      case 'error': return <AlertTriangle className="h-4 w-4" />
      default: return <Activity className="h-4 w-4" />
    }
  }

  const getActivityColor = (type: string) => {
    switch (type) {
      case 'success': return 'bg-emerald-100 text-emerald-700'
      case 'warning': return 'bg-amber-100 text-amber-700'
      case 'error': return 'bg-red-100 text-red-700'
      default: return 'bg-blue-100 text-blue-700'
    }
  }

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high': return 'bg-red-100 text-red-800 border-red-200'
      case 'medium': return 'bg-amber-100 text-amber-800 border-amber-200'
      default: return 'bg-blue-100 text-blue-800 border-blue-200'
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="p-8 max-w-7xl mx-auto space-y-8">
        {/* Header Section */}
        <div className="flex flex-col space-y-6 md:flex-row md:items-start md:justify-between md:space-y-0">
          <div className="space-y-2">
            <div className="flex items-center space-x-3">
              <h1 className="text-3xl font-semibold text-foreground tracking-tight">Good morning, Admin! 👋</h1>
            </div>
            <p className="text-muted-foreground text-lg">
              Here's what's happening with your EV charging network today
            </p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2 text-muted-foreground bg-card px-4 py-3 rounded-2xl border border-border shadow-sm">
              <Clock className="h-4 w-4" />
              <span className="text-sm font-medium">{currentTime.toLocaleString()}</span>
            </div>
            <Button
              variant="outline"
              onClick={handleRefresh}
              disabled={refreshing}
              className="modern-btn px-6 py-3 rounded-2xl"
            >
              <RefreshCw className={`h-4 w-4 mr-2 ${refreshing ? 'animate-spin' : ''}`} />
              Refresh
            </Button>
          </div>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {kpiData.map((kpi, index) => (
            <div key={index} className="stat-card group">
              <div className="flex items-start justify-between mb-4">
                <div className={`w-12 h-12 ${kpi.bgColor} ${kpi.borderColor} border rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-200`}>
                  <kpi.icon className={`h-6 w-6 ${kpi.color}`} />
                </div>
                <Badge variant="secondary" className="text-xs font-medium px-3 py-1 rounded-full bg-muted/50">
                  Live
                </Badge>
              </div>
              
              <div className="space-y-3">
                <p className="text-sm font-medium text-muted-foreground">{kpi.title}</p>
                <p className="text-3xl font-semibold text-foreground tracking-tight">{kpi.value}</p>
                <div className="flex items-center space-x-2">
                  {kpi.trend === "up" ? (
                    <TrendingUp className="h-4 w-4 text-emerald-600" />
                  ) : kpi.trend === "down" ? (
                    <TrendingDown className="h-4 w-4 text-red-600" />
                  ) : (
                    <Activity className="h-4 w-4 text-blue-600" />
                  )}
                  <span className={`text-sm font-medium ${
                    kpi.trend === "up" ? "text-emerald-600" : 
                    kpi.trend === "down" ? "text-red-600" : 
                    "text-blue-600"
                  }`}>
                    {kpi.change}
                  </span>
                  <span className="text-sm text-muted-foreground">{kpi.changeValue}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Sessions and Activity */}
          <div className="lg:col-span-2 space-y-8">
            {/* Live Sessions */}
            <div className="modern-card p-0 overflow-hidden">
              <div className="p-6 border-b border-border bg-card">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-xl font-semibold text-foreground mb-2">Live Charging Sessions</h2>
                    <p className="text-muted-foreground">
                      Real-time monitoring of {activeSessions} active sessions
                    </p>
                  </div>
                  <Badge className="bg-emerald-100 text-emerald-800 border-emerald-200 px-3 py-1 rounded-full">
                    <Activity className="h-3 w-3 mr-1" />
                    {activeSessions} Live
                  </Badge>
                </div>
              </div>
              
              <div className="divide-y divide-border">
                {liveSessionsData.slice(0, 4).map((session) => (
                  <div key={session.id} className="p-6 hover:bg-muted/30 transition-all duration-200">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${
                          session.status === 'charging' ? 'bg-emerald-100 border border-emerald-200' :
                          session.status === 'completed' ? 'bg-blue-100 border border-blue-200' : 
                          'bg-red-100 border border-red-200'
                        }`}>
                          <Zap className={`h-5 w-5 ${
                            session.status === 'charging' ? 'text-emerald-600' :
                            session.status === 'completed' ? 'text-blue-600' : 'text-red-600'
                          }`} />
                        </div>
                        <div>
                          <div className="flex items-center space-x-3 mb-2">
                            <h3 className="font-semibold text-foreground">{session.user}</h3>
                            <Badge className={`${getSessionStatusColor(session.status)} px-2 py-1 rounded-lg text-xs font-medium`}>
                              {session.status}
                            </Badge>
                          </div>
                          <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                            <span className="flex items-center">
                              <MapPin className="h-3 w-3 mr-1" />
                              {session.station}
                            </span>
                            <span className="flex items-center">
                              <Clock className="h-3 w-3 mr-1" />
                              {session.startTime}
                            </span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-6">
                        <div className="text-right">
                          <p className="font-semibold text-foreground">{session.cost}</p>
                          <p className="text-xs text-muted-foreground">{session.energy}</p>
                        </div>
                        
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0 rounded-lg hover:bg-muted">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="w-48 rounded-xl border-0 shadow-lg">
                            <DropdownMenuItem onClick={() => setSelectedSession(session)} className="rounded-lg">
                              <Eye className="h-4 w-4 mr-2" />
                              View Details
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleSessionAction(session.id, 'contact')} className="rounded-lg">
                              <Phone className="h-4 w-4 mr-2" />
                              Contact User
                            </DropdownMenuItem>
                            {session.status === 'charging' && (
                              <DropdownMenuItem onClick={() => handleSessionAction(session.id, 'stop')} className="rounded-lg">
                                <Pause className="h-4 w-4 mr-2" />
                                Stop Session
                              </DropdownMenuItem>
                            )}
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="p-6 border-t border-border bg-muted/20">
                <div className="flex items-center justify-between">
                  <p className="text-sm text-muted-foreground">Showing 4 of {activeSessions} active sessions</p>
                  <Button variant="ghost" className="text-primary hover:text-primary/80 p-0 h-auto">
                    View All Sessions
                    <ArrowRight className="h-4 w-4 ml-1" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="modern-card p-0 overflow-hidden">
              <div className="p-6 border-b border-border">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-xl font-semibold text-foreground mb-2">Recent Activity</h2>
                    <p className="text-muted-foreground">Latest system events and alerts</p>
                  </div>
                  <Button variant="outline" size="sm" className="rounded-xl">
                    <Settings className="h-4 w-4 mr-2" />
                    Manage
                  </Button>
                </div>
              </div>
              
              <div className="divide-y divide-border">
                {recentActivity.slice(0, 3).map((activity) => (
                  <div key={activity.id} className="p-6 hover:bg-muted/30 transition-all duration-200">
                    <div className="flex items-start space-x-4">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${getActivityColor(activity.type)}`}>
                        {getActivityIcon(activity.type)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex items-center space-x-3">
                            <p className="font-medium text-foreground">{activity.action}</p>
                            {activity.severity !== 'low' && (
                              <Badge className={`${getSeverityColor(activity.severity)} px-2 py-1 rounded-lg text-xs`}>
                                {activity.severity}
                              </Badge>
                            )}
                          </div>
                          <span className="text-xs text-muted-foreground">{activity.time}</span>
                        </div>
                        <p className="text-sm text-muted-foreground mb-1">{activity.location}</p>
                        {activity.description && (
                          <p className="text-xs text-muted-foreground">{activity.description}</p>
                        )}
                      </div>
                      
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0 rounded-lg">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-44 rounded-xl border-0 shadow-lg">
                          <DropdownMenuItem onClick={() => setSelectedActivity(activity)} className="rounded-lg">
                            <Eye className="h-4 w-4 mr-2" />
                            View Details
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleActivityAction(activity.id, 'acknowledge')} className="rounded-lg">
                            <CheckCircle className="h-4 w-4 mr-2" />
                            Mark Resolved
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="space-y-6">
            {/* Station Network Status */}
            <div className="modern-card p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-foreground">Network Status</h3>
                <Button variant="ghost" size="sm" className="p-0 h-auto text-muted-foreground hover:text-foreground">
                  <ExternalLink className="h-4 w-4" />
                </Button>
              </div>
              
              <div className="space-y-6">
                {stationStats.map((stat, index) => (
                  <div key={index} className="space-y-3">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center space-x-3">
                        <div className={`w-3 h-3 ${stat.color} rounded-full`}></div>
                        <span className="font-medium text-foreground text-sm">{stat.name}</span>
                      </div>
                      <div className="text-right">
                        <span className="font-semibold text-foreground text-sm">{stat.count}</span>
                        <span className="text-muted-foreground text-xs ml-1">of {stat.total}</span>
                      </div>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
                      <div 
                        className={`h-2 ${stat.color} rounded-full transition-all duration-500`}
                        style={{ width: `${stat.percentage}%` }}
                      />
                    </div>
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>{stat.percentage}% of network</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="modern-card p-6">
              <h3 className="text-lg font-semibold text-foreground mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <Button variant="ghost" className="w-full justify-start rounded-xl p-4 h-auto hover:bg-muted/50">
                  <Plus className="h-4 w-4 mr-3" />
                  <div className="text-left">
                    <p className="font-medium">Add New Station</p>
                    <p className="text-xs text-muted-foreground">Deploy charging infrastructure</p>
                  </div>
                </Button>
                <Button variant="ghost" className="w-full justify-start rounded-xl p-4 h-auto hover:bg-muted/50">
                  <Users className="h-4 w-4 mr-3" />
                  <div className="text-left">
                    <p className="font-medium">Manage Users</p>
                    <p className="text-xs text-muted-foreground">View and edit user accounts</p>
                  </div>
                </Button>
                <Button variant="ghost" className="w-full justify-start rounded-xl p-4 h-auto hover:bg-muted/50">
                  <Settings className="h-4 w-4 mr-3" />
                  <div className="text-left">
                    <p className="font-medium">Platform Settings</p>
                    <p className="text-xs text-muted-foreground">Configure system preferences</p>
                  </div>
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Session Details Dialog */}
        {selectedSession && (
          <Dialog open={!!selectedSession} onOpenChange={() => setSelectedSession(null)}>
            <DialogContent className="max-w-2xl rounded-3xl border-0 shadow-xl">
              <DialogHeader>
                <DialogTitle className="text-xl font-semibold">
                  Session Details - {selectedSession.id}
                </DialogTitle>
                <DialogDescription className="text-muted-foreground">
                  Complete information for this charging session
                </DialogDescription>
              </DialogHeader>
              <SessionDetailsView session={selectedSession} />
            </DialogContent>
          </Dialog>
        )}

        {/* Activity Details Dialog */}
        {selectedActivity && (
          <Dialog open={!!selectedActivity} onOpenChange={() => setSelectedActivity(null)}>
            <DialogContent className="max-w-lg rounded-3xl border-0 shadow-xl">
              <DialogHeader>
                <DialogTitle className="text-xl font-semibold">Activity Details</DialogTitle>
                <DialogDescription className="text-muted-foreground">
                  Detailed information about this system event
                </DialogDescription>
              </DialogHeader>
              <ActivityDetailsView activity={selectedActivity} />
            </DialogContent>
          </Dialog>
        )}
      </div>
    </div>
  )
}

// Session Details Component
function SessionDetailsView({ session }: { session: LiveSession }) {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-6">
        <div className="space-y-4">
          <h4 className="font-semibold text-foreground">User Information</h4>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between py-2 border-b border-border">
              <span className="text-muted-foreground">Name:</span>
              <span className="font-medium text-foreground">{session.user}</span>
            </div>
            <div className="flex justify-between py-2 border-b border-border">
              <span className="text-muted-foreground">Vehicle:</span>
              <span className="font-medium text-foreground">{session.vehicleModel}</span>
            </div>
            <div className="flex justify-between py-2 border-b border-border">
              <span className="text-muted-foreground">Session ID:</span>
              <span className="font-mono text-xs text-foreground">{session.id}</span>
            </div>
          </div>
        </div>
        
        <div className="space-y-4">
          <h4 className="font-semibold text-foreground">Charging Details</h4>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between py-2 border-b border-border">
              <span className="text-muted-foreground">Duration:</span>
              <span className="font-medium text-foreground">{session.duration}</span>
            </div>
            <div className="flex justify-between py-2 border-b border-border">
              <span className="text-muted-foreground">Energy:</span>
              <span className="font-medium text-foreground">{session.energy}</span>
            </div>
            <div className="flex justify-between py-2 border-b border-border">
              <span className="text-muted-foreground">Cost:</span>
              <span className="font-medium text-foreground">{session.cost}</span>
            </div>
          </div>
        </div>
      </div>
      
      <div className="pt-4 border-t border-border">
        <h4 className="font-semibold text-foreground mb-4">Station Information</h4>
        <div className="grid grid-cols-1 gap-3 text-sm">
          <div className="flex justify-between py-2 border-b border-border">
            <span className="text-muted-foreground">Location:</span>
            <span className="font-medium text-foreground">{session.station}</span>
          </div>
          <div className="flex justify-between py-2 border-b border-border">
            <span className="text-muted-foreground">Charger Type:</span>
            <span className="font-medium text-foreground">{session.chargerType}</span>
          </div>
          <div className="flex justify-between py-2">
            <span className="text-muted-foreground">Start Time:</span>
            <span className="font-medium text-foreground">{session.startTime}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

// Activity Details Component  
function ActivityDetailsView({ activity }: { activity: ActivityItem }) {
  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <h4 className="font-semibold text-foreground">{activity.action}</h4>
        <p className="text-muted-foreground">{activity.description}</p>
      </div>
      
      <div className="space-y-3 text-sm">
        <div className="flex justify-between py-2 border-b border-border">
          <span className="text-muted-foreground">Location:</span>
          <span className="font-medium text-foreground">{activity.location}</span>
        </div>
        <div className="flex justify-between py-2 border-b border-border">
          <span className="text-muted-foreground">Time:</span>
          <span className="font-medium text-foreground">{activity.time}</span>
        </div>
        <div className="flex justify-between py-2 border-b border-border">
          <span className="text-muted-foreground">Type:</span>
          <Badge className={`${activity.type === 'success' ? 'bg-emerald-100 text-emerald-800' : 
                                activity.type === 'warning' ? 'bg-amber-100 text-amber-800' :
                                activity.type === 'error' ? 'bg-red-100 text-red-800' : 
                                'bg-blue-100 text-blue-800'} px-2 py-1 rounded-lg`}>
            {activity.type}
          </Badge>
        </div>
        <div className="flex justify-between py-2">
          <span className="text-muted-foreground">Severity:</span>
          <Badge className={`${activity.severity === 'high' ? 'bg-red-100 text-red-800' : 
                                activity.severity === 'medium' ? 'bg-amber-100 text-amber-800' : 
                                'bg-blue-100 text-blue-800'} px-2 py-1 rounded-lg`}>
            {activity.severity}
          </Badge>
        </div>
      </div>
    </div>
  )
}