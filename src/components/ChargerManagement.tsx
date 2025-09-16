import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Badge } from './ui/badge'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select'
import { Progress } from './ui/progress'
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs'
import { 
  Zap, 
  Battery, 
  Power, 
  Settings, 
  AlertTriangle, 
  CheckCircle, 
  Clock,
  TrendingUp,
  Activity,
  Search,
  RefreshCw,
  Wrench,
  MoreHorizontal,
  Eye,
  Edit,
  PlayCircle,
  StopCircle
} from 'lucide-react'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from './ui/dropdown-menu'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog'

export function ChargerManagement() {
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [stationFilter, setStationFilter] = useState('all')
  const [selectedCharger, setSelectedCharger] = useState<any>(null)
  const [isDetailsOpen, setIsDetailsOpen] = useState(false)

  const chargersData = [
    {
      id: 'CH001A',
      station: 'Phoenix Mall Station',
      stationId: 'ST001',
      location: 'Bangalore, Koramangala',
      connectorType: 'DC Fast (CCS)',
      maxPower: 150,
      currentPower: 75,
      voltage: 400,
      current: 187.5,
      status: 'charging',
      sessionId: 'SS001',
      user: 'Rahul Sharma',
      sessionDuration: '45 min',
      energyDelivered: 25.4,
      temperature: 32,
      efficiency: 96.8,
      uptime: 99.2,
      totalSessions: 1247,
      lastMaintenance: '2024-01-15',
      nextMaintenance: '2024-02-15'
    },
    {
      id: 'CH001B',
      station: 'Phoenix Mall Station',
      stationId: 'ST001',
      location: 'Bangalore, Koramangala',
      connectorType: 'DC Fast (CCS)',
      maxPower: 150,
      currentPower: 0,
      voltage: 400,
      current: 0,
      status: 'available',
      sessionId: null,
      user: null,
      sessionDuration: null,
      energyDelivered: 0,
      temperature: 28,
      efficiency: 97.2,
      uptime: 98.8,
      totalSessions: 1156,
      lastMaintenance: '2024-01-10',
      nextMaintenance: '2024-02-10'
    },
    {
      id: 'CH002A',
      station: 'Tech Park Hub',
      stationId: 'ST002',
      location: 'Mumbai, Bandra',
      connectorType: 'AC Type 2',
      maxPower: 22,
      currentPower: 18,
      voltage: 240,
      current: 75,
      status: 'charging',
      sessionId: 'SS002',
      user: 'Priya Patel',
      sessionDuration: '32 min',
      energyDelivered: 18.7,
      temperature: 30,
      efficiency: 95.5,
      uptime: 97.8,
      totalSessions: 892,
      lastMaintenance: '2024-01-08',
      nextMaintenance: '2024-02-08'
    },
    {
      id: 'CH003C',
      station: 'Airport Terminal 3',
      stationId: 'ST003',
      location: 'Delhi, IGI Airport',
      connectorType: 'DC Ultra Fast',
      maxPower: 350,
      currentPower: 0,
      voltage: 800,
      current: 0,
      status: 'offline',
      sessionId: null,
      user: null,
      sessionDuration: null,
      energyDelivered: 0,
      temperature: 35,
      efficiency: 0,
      uptime: 85.3,
      totalSessions: 2341,
      lastMaintenance: '2024-01-20',
      nextMaintenance: '2024-02-20'
    },
    {
      id: 'CH004A',
      station: 'City Center Mall',
      stationId: 'ST004',
      location: 'Pune, Deccan',
      connectorType: 'DC Fast (CCS)',
      maxPower: 120,
      currentPower: 0,
      voltage: 400,
      current: 0,
      status: 'maintenance',
      sessionId: null,
      user: null,
      sessionDuration: null,
      energyDelivered: 0,
      temperature: 25,
      efficiency: 0,
      uptime: 78.5,
      totalSessions: 654,
      lastMaintenance: '2024-01-25',
      nextMaintenance: '2024-02-25'
    }
  ]

  const filteredChargers = chargersData.filter(charger => {
    const matchesSearch = charger.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         charger.station.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         charger.location.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === 'all' || charger.status === statusFilter
    const matchesStation = stationFilter === 'all' || charger.stationId === stationFilter
    return matchesSearch && matchesStatus && matchesStation
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'charging': return 'bg-blue-100 text-blue-800'
      case 'available': return 'bg-green-100 text-green-800'
      case 'offline': return 'bg-red-100 text-red-800'
      case 'maintenance': return 'bg-yellow-100 text-yellow-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'charging': return <Zap className="h-4 w-4" />
      case 'available': return <CheckCircle className="h-4 w-4" />
      case 'offline': return <AlertTriangle className="h-4 w-4" />
      case 'maintenance': return <Wrench className="h-4 w-4" />
      default: return <Activity className="h-4 w-4" />
    }
  }

  const resetCharger = (chargerId: string) => {
    console.log(`Resetting charger ${chargerId}`)
  }

  const startMaintenance = (chargerId: string) => {
    console.log(`Starting maintenance for charger ${chargerId}`)
  }

  const enableCharger = (chargerId: string) => {
    console.log(`Enabling charger ${chargerId}`)
  }

  const disableCharger = (chargerId: string) => {
    console.log(`Disabling charger ${chargerId}`)
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1>Charger Management</h1>
          <p className="text-muted-foreground">
            Monitor and control individual charging units across your network
          </p>
        </div>
        <Button>
          <RefreshCw className="h-4 w-4 mr-2" />
          Refresh All
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Chargers</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">245</div>
            <div className="text-xs text-muted-foreground flex items-center">
              <TrendingUp className="h-3 w-3 mr-1" />
              +12 this month
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Active Charging</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">87</div>
            <div className="text-xs text-muted-foreground">35% utilization</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Available</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">142</div>
            <div className="text-xs text-muted-foreground">58% of total</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Offline/Maintenance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">16</div>
            <div className="text-xs text-muted-foreground">6.5% of total</div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Filters & Search</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-4">
            <div className="flex-1 min-w-[200px]">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input 
                  placeholder="Search charger ID, station, or location..."
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
                <SelectItem value="charging">Charging</SelectItem>
                <SelectItem value="available">Available</SelectItem>
                <SelectItem value="offline">Offline</SelectItem>
                <SelectItem value="maintenance">Maintenance</SelectItem>
              </SelectContent>
            </Select>
            <Select value={stationFilter} onValueChange={setStationFilter}>
              <SelectTrigger className="w-48">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Stations</SelectItem>
                <SelectItem value="ST001">Phoenix Mall Station</SelectItem>
                <SelectItem value="ST002">Tech Park Hub</SelectItem>
                <SelectItem value="ST003">Airport Terminal 3</SelectItem>
                <SelectItem value="ST004">City Center Mall</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Chargers List */}
      <div className="grid gap-4">
        {filteredChargers.map((charger) => (
          <Card key={charger.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="font-semibold text-lg">{charger.id}</h3>
                    <Badge className={getStatusColor(charger.status)}>
                      {getStatusIcon(charger.status)}
                      <span className="ml-1">{charger.status}</span>
                    </Badge>
                  </div>
                  <p className="text-muted-foreground mb-1">{charger.station}</p>
                  <p className="text-sm text-muted-foreground">{charger.location}</p>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => {
                      setSelectedCharger(charger)
                      setIsDetailsOpen(true)
                    }}>
                      <Eye className="h-4 w-4 mr-2" />
                      View Details
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Edit className="h-4 w-4 mr-2" />
                      Edit Configuration
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => resetCharger(charger.id)}>
                      <RefreshCw className="h-4 w-4 mr-2" />
                      Reset Charger
                    </DropdownMenuItem>
                    {charger.status === 'available' || charger.status === 'charging' ? (
                      <DropdownMenuItem onClick={() => disableCharger(charger.id)}>
                        <StopCircle className="h-4 w-4 mr-2" />
                        Disable
                      </DropdownMenuItem>
                    ) : (
                      <DropdownMenuItem onClick={() => enableCharger(charger.id)}>
                        <PlayCircle className="h-4 w-4 mr-2" />
                        Enable
                      </DropdownMenuItem>
                    )}
                    <DropdownMenuItem onClick={() => startMaintenance(charger.id)}>
                      <Wrench className="h-4 w-4 mr-2" />
                      Start Maintenance
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                <div className="text-center p-3 bg-muted rounded-lg">
                  <div className="text-lg font-bold">{charger.connectorType}</div>
                  <div className="text-sm text-muted-foreground">Connector</div>
                </div>
                <div className="text-center p-3 bg-muted rounded-lg">
                  <div className="text-lg font-bold">{charger.maxPower} kW</div>
                  <div className="text-sm text-muted-foreground">Max Power</div>
                </div>
                <div className="text-center p-3 bg-muted rounded-lg">
                  <div className="text-lg font-bold text-blue-600">{charger.currentPower} kW</div>
                  <div className="text-sm text-muted-foreground">Current Power</div>
                </div>
                <div className="text-center p-3 bg-muted rounded-lg">
                  <div className="text-lg font-bold">{charger.uptime}%</div>
                  <div className="text-sm text-muted-foreground">Uptime</div>
                </div>
              </div>

              {charger.status === 'charging' && (
                <div className="mb-4 p-4 bg-blue-50 rounded-lg">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium">Active Session</span>
                    <Badge variant="default">{charger.sessionDuration}</Badge>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>User: {charger.user}</span>
                    <span>Energy: {charger.energyDelivered} kWh</span>
                  </div>
                  <Progress 
                    value={(charger.currentPower / charger.maxPower) * 100} 
                    className="mt-2" 
                  />
                </div>
              )}

              <div className="flex items-center justify-between text-sm text-muted-foreground">
                <div className="flex items-center gap-4">
                  <span className="flex items-center gap-1">
                    <Battery className="h-4 w-4" />
                    {charger.efficiency}% efficient
                  </span>
                  <span className="flex items-center gap-1">
                    <Activity className="h-4 w-4" />
                    {charger.totalSessions} total sessions
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    {charger.temperature}°C
                  </span>
                </div>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => {
                    setSelectedCharger(charger)
                    setIsDetailsOpen(true)
                  }}
                >
                  View Details
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charger Details Dialog */}
      <Dialog open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{selectedCharger?.id} - Charger Details</DialogTitle>
            <DialogDescription>
              Complete diagnostics and control for this charging unit
            </DialogDescription>
          </DialogHeader>
          
          {selectedCharger && (
            <Tabs defaultValue="overview" className="mt-4">
              <TabsList>
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="diagnostics">Diagnostics</TabsTrigger>
                <TabsTrigger value="sessions">Sessions</TabsTrigger>
                <TabsTrigger value="maintenance">Maintenance</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base">Basic Information</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      <div><strong>Charger ID:</strong> {selectedCharger.id}</div>
                      <div><strong>Station:</strong> {selectedCharger.station}</div>
                      <div><strong>Location:</strong> {selectedCharger.location}</div>
                      <div><strong>Connector:</strong> {selectedCharger.connectorType}</div>
                      <div><strong>Max Power:</strong> {selectedCharger.maxPower} kW</div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base">Current Status</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      <div className="flex items-center gap-2">
                        <strong>Status:</strong> 
                        <Badge className={getStatusColor(selectedCharger.status)}>
                          {selectedCharger.status}
                        </Badge>
                      </div>
                      <div><strong>Current Power:</strong> {selectedCharger.currentPower} kW</div>
                      <div><strong>Voltage:</strong> {selectedCharger.voltage} V</div>
                      <div><strong>Current:</strong> {selectedCharger.current} A</div>
                      <div><strong>Temperature:</strong> {selectedCharger.temperature}°C</div>
                    </CardContent>
                  </Card>
                </div>

                {selectedCharger.status === 'charging' && (
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base">Active Session</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-3 gap-4">
                        <div>
                          <div><strong>User:</strong> {selectedCharger.user}</div>
                          <div><strong>Session ID:</strong> {selectedCharger.sessionId}</div>
                        </div>
                        <div>
                          <div><strong>Duration:</strong> {selectedCharger.sessionDuration}</div>
                          <div><strong>Energy:</strong> {selectedCharger.energyDelivered} kWh</div>
                        </div>
                        <div>
                          <div><strong>Power:</strong> {selectedCharger.currentPower} kW</div>
                          <div><strong>Efficiency:</strong> {selectedCharger.efficiency}%</div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </TabsContent>

              <TabsContent value="diagnostics" className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base">Performance Metrics</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <div className="flex justify-between mb-1">
                          <span>Uptime</span>
                          <span>{selectedCharger.uptime}%</span>
                        </div>
                        <Progress value={selectedCharger.uptime} />
                      </div>
                      <div>
                        <div className="flex justify-between mb-1">
                          <span>Efficiency</span>
                          <span>{selectedCharger.efficiency}%</span>
                        </div>
                        <Progress value={selectedCharger.efficiency} />
                      </div>
                      <div>
                        <div className="flex justify-between mb-1">
                          <span>Power Usage</span>
                          <span>{Math.round((selectedCharger.currentPower / selectedCharger.maxPower) * 100)}%</span>
                        </div>
                        <Progress value={(selectedCharger.currentPower / selectedCharger.maxPower) * 100} />
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base">System Health</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      <div className="flex justify-between">
                        <span>Temperature</span>
                        <span className={selectedCharger.temperature > 40 ? 'text-red-600' : 'text-green-600'}>
                          {selectedCharger.temperature}°C
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span>Voltage Stability</span>
                        <span className="text-green-600">Normal</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Connection Status</span>
                        <span className="text-green-600">Stable</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Last Sync</span>
                        <span>2 minutes ago</span>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="sessions">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Session History</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div><strong>Total Sessions:</strong> {selectedCharger.totalSessions}</div>
                      <div><strong>Average Session Duration:</strong> 42 minutes</div>
                      <div><strong>Total Energy Delivered:</strong> 15,234 kWh</div>
                      <div><strong>Success Rate:</strong> 98.5%</div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="maintenance">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Maintenance Information</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <div><strong>Last Maintenance:</strong> {selectedCharger.lastMaintenance}</div>
                        <div><strong>Next Scheduled:</strong> {selectedCharger.nextMaintenance}</div>
                      </div>
                      <div>
                        <div><strong>Maintenance Status:</strong> Up to date</div>
                        <div><strong>Service Technician:</strong> Tech Team A</div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" onClick={() => resetCharger(selectedCharger.id)}>
                        <RefreshCw className="h-4 w-4 mr-2" />
                        Reset Charger
                      </Button>
                      <Button variant="outline" onClick={() => startMaintenance(selectedCharger.id)}>
                        <Wrench className="h-4 w-4 mr-2" />
                        Schedule Maintenance
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}