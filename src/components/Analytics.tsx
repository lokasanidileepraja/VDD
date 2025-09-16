import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import { Button } from './ui/button'
import { Badge } from './ui/badge'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select'
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs'
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  Area,
  AreaChart
} from 'recharts'
import { 
  TrendingUp,
  TrendingDown,
  Users,
  Zap,
  DollarSign,
  MapPin,
  Calendar,
  Download,
  Filter,
  RefreshCw,
  Activity,
  Battery,
  Clock,
  Target
} from 'lucide-react'
import { toast } from 'sonner@2.0.3'

export function Analytics() {
  const [timeRange, setTimeRange] = useState('7d')
  const [metric, setMetric] = useState('revenue')
  const [refreshing, setRefreshing] = useState(false)

  // Mock data for charts
  const revenueData = [
    { name: 'Jan', revenue: 45000, sessions: 1240, users: 850 },
    { name: 'Feb', revenue: 52000, sessions: 1456, users: 920 },
    { name: 'Mar', revenue: 48000, sessions: 1320, users: 890 },
    { name: 'Apr', revenue: 61000, sessions: 1680, users: 1050 },
    { name: 'May', revenue: 58000, sessions: 1590, users: 1020 },
    { name: 'Jun', revenue: 67000, sessions: 1820, users: 1180 },
    { name: 'Jul', revenue: 73000, sessions: 1950, users: 1240 },
  ]

  const usageData = [
    { hour: '00:00', sessions: 45 },
    { hour: '04:00', sessions: 28 },
    { hour: '08:00', sessions: 156 },
    { hour: '12:00', sessions: 234 },
    { hour: '16:00', sessions: 189 },
    { hour: '20:00', sessions: 167 },
  ]

  const regionData = [
    { name: 'Mumbai', value: 35, color: '#007aff' },
    { name: 'Delhi', value: 28, color: '#34c759' },
    { name: 'Bangalore', value: 22, color: '#ff9500' },
    { name: 'Chennai', value: 15, color: '#af52de' },
  ]

  const performanceMetrics = [
    {
      title: 'Total Revenue',
      value: '₹4,23,000',
      change: '+12.5%',
      changeValue: '+₹47,000',
      trend: 'up',
      icon: DollarSign,
      color: 'text-success',
      bgColor: 'bg-success/10',
      borderColor: 'border-success/20'
    },
    {
      title: 'Active Sessions',
      value: '8,940',
      change: '+8.3%',
      changeValue: '+686',
      trend: 'up',
      icon: Zap,
      color: 'text-primary',
      bgColor: 'bg-primary/10',
      borderColor: 'border-primary/20'
    },
    {
      title: 'Network Efficiency',
      value: '96.7%',
      change: '+2.1%',
      changeValue: 'Improved',
      trend: 'up',
      icon: Activity,
      color: 'text-info',
      bgColor: 'bg-info/10',
      borderColor: 'border-info/20'
    },
    {
      title: 'Avg Session Time',
      value: '42 min',
      change: '-5.2%',
      changeValue: '-2.8 min',
      trend: 'down',
      icon: Clock,
      color: 'text-warning',
      bgColor: 'bg-warning/10',
      borderColor: 'border-warning/20'
    },
  ]

  const handleRefresh = async () => {
    setRefreshing(true)
    await new Promise(resolve => setTimeout(resolve, 1500))
    setRefreshing(false)
    toast.success('Analytics data refreshed!')
  }

  const handleExport = () => {
    toast.success('Exporting analytics report...')
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="p-8 max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex flex-col space-y-6 md:flex-row md:items-start md:justify-between md:space-y-0">
          <div className="space-y-2">
            <h1 className="text-3xl font-semibold text-foreground tracking-tight">Analytics & Reports</h1>
            <p className="text-muted-foreground text-lg">
              Comprehensive insights into your EV charging network performance
            </p>
          </div>
          <div className="flex items-center space-x-4">
            <Select value={timeRange} onValueChange={setTimeRange}>
              <SelectTrigger className="w-40 h-12 rounded-2xl border-border">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="rounded-2xl border-0 shadow-lg">
                <SelectItem value="24h">Last 24 Hours</SelectItem>
                <SelectItem value="7d">Last 7 Days</SelectItem>
                <SelectItem value="30d">Last 30 Days</SelectItem>
                <SelectItem value="90d">Last 3 Months</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" onClick={handleRefresh} disabled={refreshing} className="modern-btn px-6 py-3 rounded-2xl">
              <RefreshCw className={`h-4 w-4 mr-2 ${refreshing ? 'animate-spin' : ''}`} />
              Refresh
            </Button>
            <Button onClick={handleExport} className="modern-btn px-6 py-3 rounded-2xl">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
          </div>
        </div>

        {/* Performance Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {performanceMetrics.map((metric, index) => (
            <div key={index} className="stat-card group">
              <div className="flex items-start justify-between mb-4">
                <div className={`w-12 h-12 ${metric.bgColor} ${metric.borderColor} border rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-200`}>
                  <metric.icon className={`h-6 w-6 ${metric.color}`} />
                </div>
                <Badge variant="secondary" className="text-xs font-medium px-3 py-1 rounded-full bg-muted/50">
                  {timeRange}
                </Badge>
              </div>
              
              <div className="space-y-3">
                <p className="text-sm font-medium text-muted-foreground">{metric.title}</p>
                <p className="text-3xl font-semibold text-foreground tracking-tight">{metric.value}</p>
                <div className="flex items-center space-x-2">
                  {metric.trend === "up" ? (
                    <TrendingUp className="h-4 w-4 text-success" />
                  ) : (
                    <TrendingDown className="h-4 w-4 text-destructive" />
                  )}
                  <span className={`text-sm font-medium ${
                    metric.trend === "up" ? "text-success" : "text-destructive"
                  }`}>
                    {metric.change}
                  </span>
                  <span className="text-sm text-muted-foreground">{metric.changeValue}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Revenue Trend */}
          <div className="lg:col-span-2">
            <div className="modern-card p-8">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-xl font-semibold text-foreground mb-2">Revenue Trend</h2>
                  <p className="text-muted-foreground">Monthly revenue performance over time</p>
                </div>
                <Select value={metric} onValueChange={setMetric}>
                  <SelectTrigger className="w-40 rounded-xl">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="rounded-xl border-0 shadow-lg">
                    <SelectItem value="revenue">Revenue</SelectItem>
                    <SelectItem value="sessions">Sessions</SelectItem>
                    <SelectItem value="users">Users</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={revenueData}>
                    <defs>
                      <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#007aff" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#007aff" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                    <XAxis 
                      dataKey="name" 
                      axisLine={false} 
                      tickLine={false}
                      tick={{ fill: 'var(--muted-foreground)', fontSize: 12 }}
                    />
                    <YAxis 
                      axisLine={false} 
                      tickLine={false}
                      tick={{ fill: 'var(--muted-foreground)', fontSize: 12 }}
                    />
                    <Tooltip 
                      contentStyle={{
                        backgroundColor: 'var(--card)',
                        border: '1px solid var(--border)',
                        borderRadius: '12px',
                        color: 'var(--foreground)'
                      }}
                    />
                    <Area
                      type="monotone"
                      dataKey={metric}
                      stroke="#007aff"
                      strokeWidth={3}
                      fill="url(#colorRevenue)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* Regional Distribution */}
          <div className="modern-card p-8">
            <div className="mb-6">
              <h3 className="text-xl font-semibold text-foreground mb-2">Regional Usage</h3>
              <p className="text-muted-foreground">Distribution by major cities</p>
            </div>
            
            <div className="h-64 mb-6">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={regionData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={2}
                    dataKey="value"
                  >
                    {regionData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: 'var(--card)',
                      border: '1px solid var(--border)',
                      borderRadius: '12px',
                      color: 'var(--foreground)'
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>

            <div className="space-y-3">
              {regionData.map((region, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div 
                      className="w-3 h-3 rounded-full" 
                      style={{ backgroundColor: region.color }}
                    ></div>
                    <span className="text-sm font-medium text-foreground">{region.name}</span>
                  </div>
                  <span className="text-sm text-muted-foreground">{region.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Usage Patterns */}
        <div className="modern-card p-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-semibold text-foreground mb-2">Daily Usage Patterns</h2>
              <p className="text-muted-foreground">Charging session distribution throughout the day</p>
            </div>
            <Badge className="bg-primary/10 text-primary border-primary/20 px-3 py-1 rounded-full">
              Live Data
            </Badge>
          </div>
          
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={usageData}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                <XAxis 
                  dataKey="hour" 
                  axisLine={false} 
                  tickLine={false}
                  tick={{ fill: 'var(--muted-foreground)', fontSize: 12 }}
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false}
                  tick={{ fill: 'var(--muted-foreground)', fontSize: 12 }}
                />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: 'var(--card)',
                    border: '1px solid var(--border)',
                    borderRadius: '12px',
                    color: 'var(--foreground)'
                  }}
                />
                <Bar 
                  dataKey="sessions" 
                  fill="#007aff" 
                  radius={[8, 8, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Insights & Reports */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Key Insights */}
          <div className="modern-card p-8">
            <div className="mb-6">
              <h3 className="text-xl font-semibold text-foreground mb-2">Key Insights</h3>
              <p className="text-muted-foreground">AI-powered analysis of your network</p>
            </div>
            
            <div className="space-y-6">
              <div className="flex items-start space-x-4 p-4 rounded-2xl bg-success/5 border border-success/20">
                <div className="w-8 h-8 bg-success/20 rounded-xl flex items-center justify-center">
                  <TrendingUp className="h-4 w-4 text-success" />
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-1">Peak Performance</h4>
                  <p className="text-sm text-muted-foreground">
                    Your network achieved 96.7% uptime this month, exceeding industry standards.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4 p-4 rounded-2xl bg-warning/5 border border-warning/20">
                <div className="w-8 h-8 bg-warning/20 rounded-xl flex items-center justify-center">
                  <Target className="h-4 w-4 text-warning" />
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-1">Optimization Opportunity</h4>
                  <p className="text-sm text-muted-foreground">
                    Consider adding more fast chargers during 2-6 PM peak hours.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4 p-4 rounded-2xl bg-info/5 border border-info/20">
                <div className="w-8 h-8 bg-info/20 rounded-xl flex items-center justify-center">
                  <Users className="h-4 w-4 text-info" />
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-1">User Growth</h4>
                  <p className="text-sm text-muted-foreground">
                    Premium user signups increased by 23% this quarter.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Reports */}
          <div className="modern-card p-8">
            <div className="mb-6">
              <h3 className="text-xl font-semibold text-foreground mb-2">Quick Reports</h3>
              <p className="text-muted-foreground">Generate detailed reports instantly</p>
            </div>
            
            <div className="space-y-4">
              <Button variant="outline" className="w-full justify-start rounded-2xl p-4 h-auto">
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center">
                    <BarChart className="h-5 w-5 text-primary" />
                  </div>
                  <div className="text-left">
                    <p className="font-medium text-foreground">Revenue Report</p>
                    <p className="text-xs text-muted-foreground">Detailed financial analytics</p>
                  </div>
                </div>
              </Button>

              <Button variant="outline" className="w-full justify-start rounded-2xl p-4 h-auto">
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-success/10 rounded-xl flex items-center justify-center">
                    <Activity className="h-5 w-5 text-success" />
                  </div>
                  <div className="text-left">
                    <p className="font-medium text-foreground">Performance Report</p>
                    <p className="text-xs text-muted-foreground">Network efficiency metrics</p>
                  </div>
                </div>
              </Button>

              <Button variant="outline" className="w-full justify-start rounded-2xl p-4 h-auto">
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-warning/10 rounded-xl flex items-center justify-center">
                    <Users className="h-5 w-5 text-warning" />
                  </div>
                  <div className="text-left">
                    <p className="font-medium text-foreground">User Report</p>
                    <p className="text-xs text-muted-foreground">Customer behavior insights</p>
                  </div>
                </div>
              </Button>

              <Button variant="outline" className="w-full justify-start rounded-2xl p-4 h-auto">
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-destructive/10 rounded-xl flex items-center justify-center">
                    <MapPin className="h-5 w-5 text-destructive" />
                  </div>
                  <div className="text-left">
                    <p className="font-medium text-foreground">Location Report</p>
                    <p className="text-xs text-muted-foreground">Geographic performance data</p>
                  </div>
                </div>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}