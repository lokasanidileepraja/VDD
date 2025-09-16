import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Badge } from './ui/badge'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from './ui/dropdown-menu'
import { Label } from './ui/label'
import { Textarea } from './ui/textarea'
import { Switch } from './ui/switch'
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs'
import { 
  MapPin, 
  Plus, 
  Search,
  Filter,
  Download,
  Zap,
  Users,
  DollarSign,
  Clock,
  Battery,
  Wifi,
  WifiOff,
  AlertTriangle,
  CheckCircle,
  Settings,
  Edit,
  Trash2,
  MoreHorizontal,
  Eye,
  Power,
  PowerOff,
  Wrench,
  Phone,
  MessageSquare,
  ExternalLink,
  Star,
  Activity,
  TrendingUp,
  Calendar,
  Navigation,
  RefreshCw
} from 'lucide-react'
import { toast } from 'sonner@2.0.3'

interface Station {
  id: string
  name: string
  location: string
  address: string
  status: 'online' | 'offline' | 'maintenance'
  totalChargers: number
  activeChargers: number
  revenue: number
  sessionsToday: number
  rating: number
  lastMaintenance: string
  powerCapacity: string
  connectivity: 'excellent' | 'good' | 'poor'
  operatorName?: string
  installDate: string
}

export function StationManagement() {
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [locationFilter, setLocationFilter] = useState('all')
  const [selectedStation, setSelectedStation] = useState<Station | null>(null)
  const [isDetailsOpen, setIsDetailsOpen] = useState(false)
  const [isCreateOpen, setIsCreateOpen] = useState(false)
  const [refreshing, setRefreshing] = useState(false)

  const stationsData: Station[] = [
    {
      id: 'ST001',
      name: 'Phoenix Mall Hub',
      location: 'Bangalore',
      address: 'Whitefield Main Road, Bangalore 560066',
      status: 'online',
      totalChargers: 8,
      activeChargers: 6,
      revenue: 25400,
      sessionsToday: 34,
      rating: 4.8,
      lastMaintenance: '2024-01-15',
      powerCapacity: '150kW',
      connectivity: 'excellent',
      operatorName: 'ChargePoint India',
      installDate: '2023-08-15'
    },
    {
      id: 'ST002',
      name: 'Tech Park Station',
      location: 'Hyderabad',
      address: 'HITEC City, Hyderabad 500081',
      status: 'online',
      totalChargers: 12,
      activeChargers: 10,
      revenue: 38900,
      sessionsToday: 52,
      rating: 4.6,
      lastMaintenance: '2024-01-10',
      powerCapacity: '300kW',
      connectivity: 'excellent',
      operatorName: 'Tata Power',
      installDate: '2023-06-20'
    },
    {
      id: 'ST003',
      name: 'Airport Express',
      location: 'Delhi',
      address: 'IGI Airport Terminal 3, Delhi 110037',
      status: 'maintenance',
      totalChargers: 6,
      activeChargers: 3,
      revenue: 18200,
      sessionsToday: 15,
      rating: 4.2,
      lastMaintenance: '2024-01-20',
      powerCapacity: '180kW',
      connectivity: 'good',
      operatorName: 'IOCL',
      installDate: '2023-09-12'
    },
    {
      id: 'ST004',
      name: 'Marina Beach Hub',
      location: 'Chennai',
      address: 'Marina Beach Road, Chennai 600006',
      status: 'online',
      totalChargers: 10,
      activeChargers: 8,
      revenue: 31500,
      sessionsToday: 41,
      rating: 4.9,
      lastMaintenance: '2024-01-08',
      powerCapacity: '250kW',
      connectivity: 'excellent',
      operatorName: 'Ather Energy',
      installDate: '2023-07-30'
    },
    {
      id: 'ST005',
      name: 'Connaught Place',
      location: 'Delhi',
      address: 'Central Delhi, New Delhi 110001',
      status: 'offline',
      totalChargers: 4,
      activeChargers: 0,
      revenue: 8900,
      sessionsToday: 0,
      rating: 3.8,
      lastMaintenance: '2024-01-25',
      powerCapacity: '120kW',
      connectivity: 'poor',
      operatorName: 'BPCL',
      installDate: '2023-11-05'
    }
  ]

  const filteredStations = stationsData.filter(station => {
    const matchesSearch = station.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         station.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         station.address.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === 'all' || station.status === statusFilter
    const matchesLocation = locationFilter === 'all' || station.location === locationFilter
    return matchesSearch && matchesStatus && matchesLocation
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online': return 'bg-success/20 text-success border-success/30'
      case 'offline': return 'bg-destructive/20 text-destructive border-destructive/30'
      case 'maintenance': return 'bg-warning/20 text-warning border-warning/30'
      default: return 'bg-muted text-muted-foreground'
    }
  }

  const getConnectivityColor = (connectivity: string) => {
    switch (connectivity) {
      case 'excellent': return 'text-success'
      case 'good': return 'text-warning'
      case 'poor': return 'text-destructive'
      default: return 'text-muted-foreground'
    }
  }

  const getConnectivityIcon = (connectivity: string) => {
    switch (connectivity) {
      case 'excellent': return <Wifi className="h-4 w-4" />
      case 'good': return <Wifi className="h-4 w-4" />
      case 'poor': return <WifiOff className="h-4 w-4" />
      default: return <WifiOff className="h-4 w-4" />
    }
  }

  const handleStationAction = (stationId: string, action: string) => {
    const station = stationsData.find(s => s.id === stationId)
    if (!station) return

    switch (action) {
      case 'view':
        setSelectedStation(station)
        setIsDetailsOpen(true)
        break
      case 'edit':
        toast.info(`Editing station: ${station.name}`)
        break
      case 'maintenance':
        toast.warning(`Scheduling maintenance for ${station.name}`)
        break
      case 'restart':
        toast.info(`Restarting station: ${station.name}`)
        break
      case 'contact':
        toast.info(`Contacting operator for ${station.name}`)
        break
      case 'delete':
        toast.error(`Delete request for station: ${station.name}`)
        break
      default:
        console.log(`${action} action for station ${stationId}`)
    }
  }

  const handleRefresh = async () => {
    setRefreshing(true)
    await new Promise(resolve => setTimeout(resolve, 1500))
    setRefreshing(false)
    toast.success('Station data refreshed!')
  }

  const handleExport = () => {
    toast.success('Exporting station data...')
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="p-8 max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex flex-col space-y-6 md:flex-row md:items-start md:justify-between md:space-y-0">
          <div className="space-y-2">
            <h1 className="text-3xl font-semibold text-foreground tracking-tight">Charging Stations</h1>
            <p className="text-muted-foreground text-lg">
              Monitor and manage your charging station network
            </p>
          </div>
          <div className="flex items-center space-x-4">
            <Button variant="outline" onClick={handleRefresh} disabled={refreshing} className="modern-btn px-6 py-3 rounded-2xl">
              <RefreshCw className={`h-4 w-4 mr-2 ${refreshing ? 'animate-spin' : ''}`} />
              Refresh
            </Button>
            <Button variant="outline" onClick={handleExport} className="modern-btn px-6 py-3 rounded-2xl">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
            <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
              <DialogTrigger asChild>
                <Button className="modern-btn px-6 py-3 rounded-2xl">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Station
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl border-0 shadow-xl">
                <DialogHeader>
                  <DialogTitle className="text-xl">Add New Charging Station</DialogTitle>
                  <DialogDescription className="text-muted-foreground">
                    Deploy a new charging station to your network
                  </DialogDescription>
                </DialogHeader>
                <CreateStationForm onClose={() => setIsCreateOpen(false)} />
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="stat-card group">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-primary/10 border border-primary/20 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
                <MapPin className="h-6 w-6 text-primary" />
              </div>
              <TrendingUp className="h-4 w-4 text-success" />
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground mb-1">Total Stations</p>
              <p className="text-3xl font-semibold text-foreground mb-2">{stationsData.length}</p>
              <p className="text-sm text-success font-medium">+2 this month</p>
            </div>
          </div>

          <div className="stat-card group">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-success/10 border border-success/20 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
                <CheckCircle className="h-6 w-6 text-success" />
              </div>
              <Activity className="h-4 w-4 text-success" />
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground mb-1">Online Stations</p>
              <p className="text-3xl font-semibold text-foreground mb-2">
                {stationsData.filter(s => s.status === 'online').length}
              </p>
              <p className="text-sm text-success font-medium">
                {((stationsData.filter(s => s.status === 'online').length / stationsData.length) * 100).toFixed(1)}% operational
              </p>
            </div>
          </div>

          <div className="stat-card group">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-warning/10 border border-warning/20 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
                <Zap className="h-6 w-6 text-warning" />
              </div>
              <Zap className="h-4 w-4 text-warning" />
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground mb-1">Active Chargers</p>
              <p className="text-3xl font-semibold text-foreground mb-2">
                {stationsData.reduce((sum, station) => sum + station.activeChargers, 0)}
              </p>
              <p className="text-sm text-warning font-medium">
                of {stationsData.reduce((sum, station) => sum + station.totalChargers, 0)} total
              </p>
            </div>
          </div>

          <div className="stat-card group">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-info/10 border border-info/20 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
                <DollarSign className="h-6 w-6 text-info" />
              </div>
              <DollarSign className="h-4 w-4 text-info" />
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground mb-1">Total Revenue</p>
              <p className="text-3xl font-semibold text-foreground mb-2">
                ₹{stationsData.reduce((sum, station) => sum + station.revenue, 0).toLocaleString()}
              </p>
              <p className="text-sm text-info font-medium">Today's earnings</p>
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
                  placeholder="Search stations by name, location, or address..."
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
                <SelectItem value="online">Online</SelectItem>
                <SelectItem value="offline">Offline</SelectItem>
                <SelectItem value="maintenance">Maintenance</SelectItem>
              </SelectContent>
            </Select>
            <Select value={locationFilter} onValueChange={setLocationFilter}>
              <SelectTrigger className="w-48 h-12 rounded-2xl border-border">
                <SelectValue placeholder="Location" />
              </SelectTrigger>
              <SelectContent className="rounded-2xl border-0 shadow-lg">
                <SelectItem value="all">All Locations</SelectItem>
                <SelectItem value="Bangalore">Bangalore</SelectItem>
                <SelectItem value="Delhi">Delhi</SelectItem>
                <SelectItem value="Mumbai">Mumbai</SelectItem>
                <SelectItem value="Chennai">Chennai</SelectItem>
                <SelectItem value="Hyderabad">Hyderabad</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Stations Grid */}
        <div className="modern-card p-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-semibold text-foreground">Stations ({filteredStations.length})</h2>
              <p className="text-muted-foreground">Comprehensive station monitoring and management</p>
            </div>
          </div>
          
          <div className="grid gap-6">
            {filteredStations.map((station) => (
              <div key={station.id} className="p-6 rounded-3xl border border-border bg-card hover:shadow-md transition-all duration-200">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-6">
                    <div className={`w-16 h-16 rounded-2xl flex items-center justify-center ${
                      station.status === 'online' ? 'bg-success/10 border border-success/20' :
                      station.status === 'offline' ? 'bg-destructive/10 border border-destructive/20' :
                      'bg-warning/10 border border-warning/20'
                    }`}>
                      <MapPin className={`h-8 w-8 ${
                        station.status === 'online' ? 'text-success' :
                        station.status === 'offline' ? 'text-destructive' : 'text-warning'
                      }`} />
                    </div>
                    
                    <div>
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="text-lg font-semibold text-foreground">{station.name}</h3>
                        <Badge className={`${getStatusColor(station.status)} px-3 py-1 rounded-full text-xs font-medium`}>
                          {station.status}
                        </Badge>
                        <div className={`flex items-center space-x-1 ${getConnectivityColor(station.connectivity)}`}>
                          {getConnectivityIcon(station.connectivity)}
                          <span className="text-xs font-medium">{station.connectivity}</span>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-6 text-sm text-muted-foreground mb-3">
                        <span className="flex items-center">
                          <MapPin className="h-4 w-4 mr-2" />
                          {station.location}
                        </span>
                        <span className="flex items-center">
                          <Zap className="h-4 w-4 mr-2" />
                          {station.activeChargers}/{station.totalChargers} chargers
                        </span>
                        <span className="flex items-center">
                          <Battery className="h-4 w-4 mr-2" />
                          {station.powerCapacity}
                        </span>
                        <span className="flex items-center">
                          <Users className="h-4 w-4 mr-2" />
                          {station.sessionsToday} sessions today
                        </span>
                      </div>
                      
                      <div className="flex items-center space-x-6 text-sm">
                        <span className="flex items-center text-success">
                          <DollarSign className="h-4 w-4 mr-1" />
                          ₹{station.revenue.toLocaleString()} revenue
                        </span>
                        <span className="flex items-center text-warning">
                          <Star className="h-4 w-4 mr-1" />
                          {station.rating}/5 rating
                        </span>
                        <span className="flex items-center text-info">
                          <Calendar className="h-4 w-4 mr-1" />
                          Installed {station.installDate}
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
                      <DropdownMenuItem onClick={() => handleStationAction(station.id, 'view')} className="rounded-xl">
                        <Eye className="h-4 w-4 mr-2" />
                        View Details
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleStationAction(station.id, 'edit')} className="rounded-xl">
                        <Edit className="h-4 w-4 mr-2" />
                        Edit Station
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleStationAction(station.id, 'maintenance')} className="rounded-xl">
                        <Wrench className="h-4 w-4 mr-2" />
                        Schedule Maintenance
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleStationAction(station.id, 'restart')} className="rounded-xl">
                        <Power className="h-4 w-4 mr-2" />
                        Restart Station
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleStationAction(station.id, 'contact')} className="rounded-xl">
                        <Phone className="h-4 w-4 mr-2" />
                        Contact Operator
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleStationAction(station.id, 'delete')} className="text-destructive rounded-xl">
                        <Trash2 className="h-4 w-4 mr-2" />
                        Delete Station
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Station Details Dialog */}
        {selectedStation && (
          <Dialog open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
            <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto rounded-3xl border-0 shadow-xl">
              <DialogHeader>
                <DialogTitle className="text-xl">{selectedStation.name}</DialogTitle>
                <DialogDescription className="text-muted-foreground">
                  Complete station information and performance metrics
                </DialogDescription>
              </DialogHeader>
              <StationDetailsView station={selectedStation} />
            </DialogContent>
          </Dialog>
        )}
      </div>
    </div>
  )
}

// Create Station Form Component
function CreateStationForm({ onClose }: { onClose: () => void }) {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="station-name" className="text-sm font-medium text-foreground">Station Name *</Label>
          <Input id="station-name" placeholder="Enter station name" className="mt-2 h-12 rounded-2xl" />
        </div>
        <div>
          <Label htmlFor="station-location" className="text-sm font-medium text-foreground">Location *</Label>
          <Select>
            <SelectTrigger className="mt-2 h-12 rounded-2xl">
              <SelectValue placeholder="Select city" />
            </SelectTrigger>
            <SelectContent className="rounded-2xl">
              <SelectItem value="bangalore">Bangalore</SelectItem>
              <SelectItem value="delhi">Delhi</SelectItem>
              <SelectItem value="mumbai">Mumbai</SelectItem>
              <SelectItem value="chennai">Chennai</SelectItem>
              <SelectItem value="hyderabad">Hyderabad</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div>
        <Label htmlFor="station-address" className="text-sm font-medium text-foreground">Complete Address *</Label>
        <Textarea id="station-address" placeholder="Enter full address" className="mt-2 rounded-2xl" />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="total-chargers" className="text-sm font-medium text-foreground">Total Chargers *</Label>
          <Input id="total-chargers" type="number" placeholder="8" className="mt-2 h-12 rounded-2xl" />
        </div>
        <div>
          <Label htmlFor="power-capacity" className="text-sm font-medium text-foreground">Power Capacity</Label>
          <Input id="power-capacity" placeholder="150kW" className="mt-2 h-12 rounded-2xl" />
        </div>
      </div>

      <div>
        <Label htmlFor="operator" className="text-sm font-medium text-foreground">Operator Name</Label>
        <Input id="operator" placeholder="e.g., ChargePoint India" className="mt-2 h-12 rounded-2xl" />
      </div>

      <div className="flex justify-end space-x-4 pt-4">
        <Button variant="outline" onClick={onClose} className="px-8 py-3 rounded-2xl">
          Cancel
        </Button>
        <Button onClick={() => {
          toast.success('Station created successfully!')
          onClose()
        }} className="px-8 py-3 rounded-2xl">
          Create Station
        </Button>
      </div>
    </div>
  )
}

// Station Details View Component
function StationDetailsView({ station }: { station: Station }) {
  return (
    <Tabs defaultValue="overview" className="w-full">
      <TabsList className="grid w-full grid-cols-4 rounded-2xl">
        <TabsTrigger value="overview" className="rounded-xl">Overview</TabsTrigger>
        <TabsTrigger value="chargers" className="rounded-xl">Chargers</TabsTrigger>
        <TabsTrigger value="performance" className="rounded-xl">Performance</TabsTrigger>
        <TabsTrigger value="maintenance" className="rounded-xl">Maintenance</TabsTrigger>
      </TabsList>

      <TabsContent value="overview" className="space-y-6 mt-6">
        <div className="grid grid-cols-2 gap-8">
          <div className="space-y-4">
            <h4 className="font-semibold text-foreground text-lg">Station Information</h4>
            <div className="space-y-4 text-sm">
              <div className="flex justify-between py-3 border-b border-border">
                <span className="text-muted-foreground">Station ID:</span>
                <span className="font-mono text-xs text-foreground">{station.id}</span>
              </div>
              <div className="flex justify-between py-3 border-b border-border">
                <span className="text-muted-foreground">Location:</span>
                <span className="font-medium text-foreground">{station.location}</span>
              </div>
              <div className="flex justify-between py-3 border-b border-border">
                <span className="text-muted-foreground">Address:</span>
                <span className="font-medium text-foreground text-right max-w-[200px]">{station.address}</span>
              </div>
              <div className="flex justify-between py-3 border-b border-border">
                <span className="text-muted-foreground">Operator:</span>
                <span className="font-medium text-foreground">{station.operatorName}</span>
              </div>
              <div className="flex justify-between py-3">
                <span className="text-muted-foreground">Install Date:</span>
                <span className="font-medium text-foreground">{station.installDate}</span>
              </div>
            </div>
          </div>
          
          <div className="space-y-4">
            <h4 className="font-semibold text-foreground text-lg">Technical Details</h4>
            <div className="space-y-4 text-sm">
              <div className="flex justify-between py-3 border-b border-border">
                <span className="text-muted-foreground">Power Capacity:</span>
                <span className="font-medium text-foreground">{station.powerCapacity}</span>
              </div>
              <div className="flex justify-between py-3 border-b border-border">
                <span className="text-muted-foreground">Total Chargers:</span>
                <span className="font-medium text-foreground">{station.totalChargers}</span>
              </div>
              <div className="flex justify-between py-3 border-b border-border">
                <span className="text-muted-foreground">Active Chargers:</span>
                <span className="font-medium text-foreground">{station.activeChargers}</span>
              </div>
              <div className="flex justify-between py-3 border-b border-border">
                <span className="text-muted-foreground">Connectivity:</span>
                <Badge className={`${station.connectivity === 'excellent' ? 'bg-success/20 text-success border-success/30' : 
                                     station.connectivity === 'good' ? 'bg-warning/20 text-warning border-warning/30' : 
                                     'bg-destructive/20 text-destructive border-destructive/30'} px-2 py-1 rounded-lg`}>
                  {station.connectivity}
                </Badge>
              </div>
              <div className="flex justify-between py-3">
                <span className="text-muted-foreground">Last Maintenance:</span>
                <span className="font-medium text-foreground">{station.lastMaintenance}</span>
              </div>
            </div>
          </div>
        </div>
      </TabsContent>

      <TabsContent value="performance" className="space-y-6 mt-6">
        <div className="grid grid-cols-3 gap-6">
          <div className="stat-card text-center">
            <div className="text-3xl font-semibold text-foreground mb-2">₹{station.revenue.toLocaleString()}</div>
            <div className="text-sm text-muted-foreground">Today's Revenue</div>
          </div>
          <div className="stat-card text-center">
            <div className="text-3xl font-semibold text-foreground mb-2">{station.sessionsToday}</div>
            <div className="text-sm text-muted-foreground">Sessions Today</div>
          </div>
          <div className="stat-card text-center">
            <div className="text-3xl font-semibold text-foreground mb-2">{station.rating}</div>
            <div className="text-sm text-muted-foreground">User Rating</div>
          </div>
        </div>
      </TabsContent>

      <TabsContent value="chargers" className="space-y-6 mt-6">
        <div className="grid gap-4">
          {Array.from({ length: station.totalChargers }, (_, i) => (
            <div key={i} className="flex items-center justify-between p-4 rounded-2xl bg-muted/30">
              <div className="flex items-center space-x-3">
                <div className={`w-3 h-3 rounded-full ${i < station.activeChargers ? 'bg-success' : 'bg-destructive'}`}></div>
                <span className="font-medium text-foreground">Charger {i + 1}</span>
              </div>
              <Badge className={i < station.activeChargers ? 'bg-success/20 text-success' : 'bg-destructive/20 text-destructive'}>
                {i < station.activeChargers ? 'Active' : 'Offline'}
              </Badge>
            </div>
          ))}
        </div>
      </TabsContent>

      <TabsContent value="maintenance" className="space-y-6 mt-6">
        <div className="space-y-4">
          <div className="p-4 rounded-2xl bg-success/5 border border-success/20">
            <div className="flex items-center space-x-3 mb-2">
              <CheckCircle className="h-5 w-5 text-success" />
              <span className="font-medium text-foreground">Last Maintenance Completed</span>
            </div>
            <p className="text-sm text-muted-foreground pl-8">{station.lastMaintenance} - Routine inspection and cleaning</p>
          </div>
          <Button className="w-full rounded-2xl h-12">
            <Calendar className="h-4 w-4 mr-2" />
            Schedule Next Maintenance
          </Button>
        </div>
      </TabsContent>
    </Tabs>
  )
}