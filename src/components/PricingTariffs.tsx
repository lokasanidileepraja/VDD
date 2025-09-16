import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Badge } from './ui/badge'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog'
import { Label } from './ui/label'
import { Switch } from './ui/switch'
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs'
import { Textarea } from './ui/textarea'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from './ui/dropdown-menu'
import { 
  DollarSign, 
  Plus, 
  Search,
  Clock,
  Zap,
  MapPin,
  Edit,
  Trash2,
  Copy,
  TrendingUp,
  Calendar,
  Tag,
  Users,
  MoreHorizontal,
  Eye,
  Play,
  Pause,
  Settings,
  Download,
  Upload,
  Filter,
  BarChart3,
  Target,
  Percent,
  Timer,
  Building2
} from 'lucide-react'
import { toast } from 'sonner@2.0.3'

interface TariffStructure {
  id: string
  name: string
  type: 'connector_based' | 'station_specific' | 'time_based' | 'user_group' | 'dynamic'
  connectorType: string
  baseRate: number
  currency: string
  unit: 'kWh' | 'minute' | 'session'
  timeBasedRates?: Array<{
    period: string
    rate: number
    startTime?: string
    endTime?: string
  }>
  applicableStations: string[]
  status: 'active' | 'draft' | 'scheduled' | 'expired'
  createdDate: string
  lastModified: string
  usageCount: number
  totalRevenue: number
  discountPercentage?: number
  minimumVehicles?: number
  validDays?: string[]
  description?: string
  dynamicPricing?: {
    enabled: boolean
    demandMultiplier: number
    maxRate: number
    minRate: number
  }
}

interface PromotionalCampaign {
  id: string
  name: string
  type: 'discount' | 'cashback' | 'free_sessions' | 'loyalty_points'
  value: number
  valueType: 'percentage' | 'fixed' | 'sessions' | 'points'
  targetGroup: 'new_users' | 'frequent_users' | 'all_users' | 'premium_users'
  maxUsage: number
  currentUsage: number
  startDate: string
  endDate: string
  status: 'active' | 'draft' | 'scheduled' | 'expired'
  description?: string
  conditions?: {
    minimumAmount?: number
    validStations?: string[]
    validDays?: string[]
  }
}

export function PricingTariffs() {
  const [searchTerm, setSearchTerm] = useState('')
  const [filterType, setFilterType] = useState('all')
  const [filterStatus, setFilterStatus] = useState('all')
  const [selectedTariff, setSelectedTariff] = useState<TariffStructure | null>(null)
  const [selectedPromo, setSelectedPromo] = useState<PromotionalCampaign | null>(null)
  const [isDetailsOpen, setIsDetailsOpen] = useState(false)
  const [isPromoDetailsOpen, setIsPromoDetailsOpen] = useState(false)
  const [isCreateOpen, setIsCreateOpen] = useState(false)
  const [isCreatePromoOpen, setIsCreatePromoOpen] = useState(false)

  const tariffData: TariffStructure[] = [
    {
      id: 'TAR001',
      name: 'Standard DC Fast Charging',
      type: 'connector_based',
      connectorType: 'DC Fast (CCS)',
      baseRate: 12.5,
      currency: 'INR',
      unit: 'kWh',
      timeBasedRates: [
        { period: 'Peak (6PM - 10PM)', rate: 15.0, startTime: '18:00', endTime: '22:00' },
        { period: 'Off-Peak (10PM - 6AM)', rate: 8.5, startTime: '22:00', endTime: '06:00' },
        { period: 'Standard (6AM - 6PM)', rate: 12.5, startTime: '06:00', endTime: '18:00' }
      ],
      applicableStations: ['Phoenix Mall Station', 'Tech Park Hub'],
      status: 'active',
      createdDate: '2023-12-01',
      lastModified: '2024-01-15',
      usageCount: 1247,
      totalRevenue: 2456780,
      description: 'Primary DC fast charging tariff with time-based pricing',
      dynamicPricing: {
        enabled: true,
        demandMultiplier: 1.5,
        maxRate: 20.0,
        minRate: 8.0
      }
    },
    {
      id: 'TAR002',
      name: 'AC Charging - Mall Locations',
      type: 'station_specific',
      connectorType: 'AC Type 2',
      baseRate: 8.0,
      currency: 'INR',
      unit: 'kWh',
      timeBasedRates: [
        { period: 'All Day', rate: 8.0 }
      ],
      applicableStations: ['City Center Mall'],
      status: 'active',
      createdDate: '2023-11-15',
      lastModified: '2024-01-10',
      usageCount: 892,
      totalRevenue: 567890,
      description: 'Fixed rate for mall AC charging stations'
    },
    {
      id: 'TAR003',
      name: 'Premium Ultra Fast Charging',
      type: 'connector_based',
      connectorType: 'DC Ultra Fast (350kW)',
      baseRate: 18.0,
      currency: 'INR',
      unit: 'kWh',
      timeBasedRates: [
        { period: 'Peak (6PM - 10PM)', rate: 22.0, startTime: '18:00', endTime: '22:00' },
        { period: 'Off-Peak (10PM - 6AM)', rate: 14.0, startTime: '22:00', endTime: '06:00' },
        { period: 'Standard (6AM - 6PM)', rate: 18.0, startTime: '06:00', endTime: '18:00' }
      ],
      applicableStations: ['Airport Terminal 3'],
      status: 'active',
      createdDate: '2024-01-01',
      lastModified: '2024-01-20',
      usageCount: 456,
      totalRevenue: 823560,
      description: 'Premium pricing for ultra-fast 350kW chargers'
    },
    {
      id: 'TAR004',
      name: 'Fleet Discount Pricing',
      type: 'user_group',
      connectorType: 'All Connectors',
      baseRate: 10.0,
      currency: 'INR',
      unit: 'kWh',
      discountPercentage: 20,
      minimumVehicles: 5,
      applicableStations: ['All Stations'],
      status: 'active',
      createdDate: '2023-10-20',
      lastModified: '2024-01-18',
      usageCount: 234,
      totalRevenue: 187200,
      description: 'Bulk pricing for fleet operators with 5+ vehicles'
    },
    {
      id: 'TAR005',
      name: 'Weekend Special Offer',
      type: 'time_based',
      connectorType: 'DC Fast (CCS)',
      baseRate: 11.0,
      currency: 'INR',
      unit: 'kWh',
      validDays: ['Saturday', 'Sunday'],
      applicableStations: ['Phoenix Mall Station', 'City Center Mall'],
      status: 'scheduled',
      createdDate: '2024-01-25',
      lastModified: '2024-01-28',
      usageCount: 0,
      totalRevenue: 0,
      description: 'Special weekend pricing to boost utilization'
    }
  ]

  const promotionalCampaigns: PromotionalCampaign[] = [
    {
      id: 'PROMO001',
      name: 'New User Welcome Offer',
      type: 'discount',
      value: 50,
      valueType: 'percentage',
      targetGroup: 'new_users',
      maxUsage: 1000,
      currentUsage: 234,
      startDate: '2024-01-01',
      endDate: '2024-02-29',
      status: 'active',
      description: '50% off first charging session for new users',
      conditions: {
        minimumAmount: 100,
        validStations: ['All Stations']
      }
    },
    {
      id: 'PROMO002',
      name: 'Loyalty Cashback Program',
      type: 'cashback',
      value: 200,
      valueType: 'fixed',
      targetGroup: 'frequent_users',
      maxUsage: 500,
      currentUsage: 89,
      startDate: '2024-01-15',
      endDate: '2024-03-15',
      status: 'active',
      description: '₹200 cashback after completing 10 sessions',
      conditions: {
        minimumAmount: 1000,
        validStations: ['Phoenix Mall Station', 'Tech Park Hub']
      }
    },
    {
      id: 'PROMO003',
      name: 'Free Weekend Charging',
      type: 'free_sessions',
      value: 2,
      valueType: 'sessions',
      targetGroup: 'all_users',
      maxUsage: 2000,
      currentUsage: 1456,
      startDate: '2024-02-01',
      endDate: '2024-02-28',
      status: 'active',
      description: '2 free charging sessions every weekend',
      conditions: {
        validDays: ['Saturday', 'Sunday'],
        validStations: ['City Center Mall']
      }
    }
  ]

  const analyticsData = {
    totalRevenue: 4035430,
    avgRate: 12.8,
    mostPopular: 'Standard DC Fast Charging',
    revenueGrowth: 15.3,
    totalTransactions: 2829,
    avgSessionValue: 142.5
  }

  const filteredTariffs = tariffData.filter(tariff => {
    const matchesSearch = tariff.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         tariff.connectorType.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesType = filterType === 'all' || tariff.type === filterType
    const matchesStatus = filterStatus === 'all' || tariff.status === filterStatus
    return matchesSearch && matchesType && matchesStatus
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-50 text-green-700 border-green-200'
      case 'draft': return 'bg-gray-50 text-gray-700 border-gray-200'
      case 'scheduled': return 'bg-blue-50 text-blue-700 border-blue-200'
      case 'expired': return 'bg-red-50 text-red-700 border-red-200'
      default: return 'bg-gray-50 text-gray-700 border-gray-200'
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'connector_based': return 'bg-blue-50 text-blue-700 border-blue-200'
      case 'station_specific': return 'bg-purple-50 text-purple-700 border-purple-200'
      case 'time_based': return 'bg-orange-50 text-orange-700 border-orange-200'
      case 'user_group': return 'bg-green-50 text-green-700 border-green-200'
      case 'dynamic': return 'bg-red-50 text-red-700 border-red-200'
      default: return 'bg-gray-50 text-gray-700 border-gray-200'
    }
  }

  const handleTariffAction = (tariffId: string, action: string) => {
    const tariff = tariffData.find(t => t.id === tariffId)
    if (!tariff) return

    switch (action) {
      case 'edit':
        toast.info(`Editing tariff: ${tariff.name}`)
        break
      case 'duplicate':
        toast.success(`Duplicated tariff: ${tariff.name}`)
        break
      case 'activate':
        toast.success(`Activated tariff: ${tariff.name}`)
        break
      case 'deactivate':
        toast.warning(`Deactivated tariff: ${tariff.name}`)
        break
      case 'delete':
        toast.error(`Deleted tariff: ${tariff.name}`)
        break
      default:
        console.log(`${action} tariff ${tariffId}`)
    }
  }

  const handlePromoAction = (promoId: string, action: string) => {
    const promo = promotionalCampaigns.find(p => p.id === promoId)
    if (!promo) return

    switch (action) {
      case 'edit':
        toast.info(`Editing campaign: ${promo.name}`)
        break
      case 'duplicate':
        toast.success(`Duplicated campaign: ${promo.name}`)
        break
      case 'activate':
        toast.success(`Activated campaign: ${promo.name}`)
        break
      case 'pause':
        toast.warning(`Paused campaign: ${promo.name}`)
        break
      default:
        console.log(`${action} promotion ${promoId}`)
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="p-6 max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
          <div>
            <h1 className="text-2xl font-semibold text-foreground">Pricing & Tariffs</h1>
            <p className="text-muted-foreground mt-1">
              Configure dynamic pricing strategies and promotional campaigns
            </p>
          </div>
          <div className="flex items-center space-x-3">
            <Button variant="outline" className="bg-white shadow-sm border-gray-200 hover:bg-gray-50">
              <Download className="h-4 w-4 mr-2" />
              Export Data
            </Button>
            <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
              <DialogTrigger asChild>
                <Button className="bg-blue-600 hover:bg-blue-700 shadow-sm">
                  <Plus className="h-4 w-4 mr-2" />
                  Create Tariff
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle className="text-xl font-semibold">Create New Pricing Tariff</DialogTitle>
                  <DialogDescription className="text-gray-600">
                    Set up a new pricing structure for your charging network
                  </DialogDescription>
                </DialogHeader>
                <CreateTariffForm onClose={() => setIsCreateOpen(false)} />
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {/* Analytics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="bg-white border-0 shadow-sm hover:shadow-md transition-shadow duration-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 mb-2">Total Revenue</p>
                  <p className="text-2xl font-semibold text-gray-900">₹{(analyticsData.totalRevenue / 100000).toFixed(1)}L</p>
                  <p className="text-xs text-green-600 mt-1 flex items-center">
                    <TrendingUp className="h-3 w-3 mr-1" />
                    +{analyticsData.revenueGrowth}% this month
                  </p>
                </div>
                <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center">
                  <DollarSign className="h-6 w-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-white border-0 shadow-sm hover:shadow-md transition-shadow duration-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 mb-2">Average Rate</p>
                  <p className="text-2xl font-semibold text-gray-900">₹{analyticsData.avgRate}</p>
                  <p className="text-xs text-gray-500 mt-1">per kWh</p>
                </div>
                <div className="w-12 h-12 bg-green-50 rounded-full flex items-center justify-center">
                  <BarChart3 className="h-6 w-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white border-0 shadow-sm hover:shadow-md transition-shadow duration-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 mb-2">Active Tariffs</p>
                  <p className="text-2xl font-semibold text-gray-900">{tariffData.filter(t => t.status === 'active').length}</p>
                  <p className="text-xs text-gray-500 mt-1">Out of {tariffData.length} total</p>
                </div>
                <div className="w-12 h-12 bg-orange-50 rounded-full flex items-center justify-center">
                  <Target className="h-6 w-6 text-orange-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white border-0 shadow-sm hover:shadow-md transition-shadow duration-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 mb-2">Avg Session Value</p>
                  <p className="text-2xl font-semibold text-gray-900">₹{analyticsData.avgSessionValue}</p>
                  <p className="text-xs text-gray-500 mt-1">per transaction</p>
                </div>
                <div className="w-12 h-12 bg-purple-50 rounded-full flex items-center justify-center">
                  <TrendingUp className="h-6 w-6 text-purple-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="tariffs" className="space-y-6">
          <TabsList className="bg-white border border-gray-200 p-1">
            <TabsTrigger value="tariffs" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">
              Pricing Tariffs
            </TabsTrigger>
            <TabsTrigger value="time_based" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">
              Time-Based Pricing
            </TabsTrigger>
            <TabsTrigger value="promotions" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">
              Promotions
            </TabsTrigger>
            <TabsTrigger value="analytics" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">
              Analytics
            </TabsTrigger>
          </TabsList>

          <TabsContent value="tariffs" className="space-y-6">
            {/* Filters */}
            <Card className="bg-white border-0 shadow-sm">
              <CardContent className="p-6">
                <div className="flex flex-col space-y-4 md:flex-row md:items-center md:space-y-0 md:space-x-4">
                  <div className="flex-1">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                      <Input 
                        placeholder="Search tariffs, connector types..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10 border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                  <Select value={filterType} onValueChange={setFilterType}>
                    <SelectTrigger className="w-48 border-gray-200">
                      <SelectValue placeholder="Tariff Type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Types</SelectItem>
                      <SelectItem value="connector_based">Connector Based</SelectItem>
                      <SelectItem value="station_specific">Station Specific</SelectItem>
                      <SelectItem value="time_based">Time Based</SelectItem>
                      <SelectItem value="user_group">User Group</SelectItem>
                      <SelectItem value="dynamic">Dynamic Pricing</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select value={filterStatus} onValueChange={setFilterStatus}>
                    <SelectTrigger className="w-40 border-gray-200">
                      <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="draft">Draft</SelectItem>
                      <SelectItem value="scheduled">Scheduled</SelectItem>
                      <SelectItem value="expired">Expired</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            {/* Tariffs List */}
            <div className="space-y-4">
              {filteredTariffs.map((tariff) => (
                <Card key={tariff.id} className="bg-white border-0 shadow-sm hover:shadow-md transition-all duration-200">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <h3 className="text-lg font-semibold text-gray-900">{tariff.name}</h3>
                          <Badge className={getStatusColor(tariff.status)}>
                            {tariff.status}
                          </Badge>
                          <Badge className={getTypeColor(tariff.type)}>
                            {tariff.type.replace('_', ' ')}
                          </Badge>
                          {tariff.dynamicPricing?.enabled && (
                            <Badge className="bg-red-50 text-red-700 border-red-200">
                              Dynamic
                            </Badge>
                          )}
                        </div>
                        <div className="flex items-center space-x-4 text-sm text-gray-600 mb-2">
                          <span className="flex items-center">
                            <Zap className="h-4 w-4 mr-1" />
                            {tariff.connectorType}
                          </span>
                          <span className="flex items-center">
                            <MapPin className="h-4 w-4 mr-1" />
                            {tariff.applicableStations.length === 1 && tariff.applicableStations[0] === 'All Stations' 
                              ? 'All Stations' 
                              : `${tariff.applicableStations.length} stations`}
                          </span>
                          <span className="flex items-center">
                            <Users className="h-4 w-4 mr-1" />
                            {tariff.usageCount} users
                          </span>
                        </div>
                        <p className="text-xs text-gray-500">
                          Created: {tariff.createdDate} • Modified: {tariff.lastModified}
                        </p>
                      </div>
                      
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0 hover:bg-gray-100">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-48">
                          <DropdownMenuItem onClick={() => {
                            setSelectedTariff(tariff)
                            setIsDetailsOpen(true)
                          }}>
                            <Eye className="h-4 w-4 mr-2" />
                            View Details
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleTariffAction(tariff.id, 'edit')}>
                            <Edit className="h-4 w-4 mr-2" />
                            Edit Tariff
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleTariffAction(tariff.id, 'duplicate')}>
                            <Copy className="h-4 w-4 mr-2" />
                            Duplicate
                          </DropdownMenuItem>
                          {tariff.status === 'active' ? (
                            <DropdownMenuItem onClick={() => handleTariffAction(tariff.id, 'deactivate')}>
                              <Pause className="h-4 w-4 mr-2" />
                              Deactivate
                            </DropdownMenuItem>
                          ) : (
                            <DropdownMenuItem onClick={() => handleTariffAction(tariff.id, 'activate')}>
                              <Play className="h-4 w-4 mr-2" />
                              Activate
                            </DropdownMenuItem>
                          )}
                          <DropdownMenuItem 
                            onClick={() => handleTariffAction(tariff.id, 'delete')}
                            className="text-red-600 focus:text-red-600"
                          >
                            <Trash2 className="h-4 w-4 mr-2" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                      <div className="bg-gray-50 rounded-lg p-4 text-center">
                        <div className="text-lg font-semibold text-gray-900">
                          ₹{tariff.baseRate}
                        </div>
                        <div className="text-sm text-gray-600">Base Rate/{tariff.unit}</div>
                      </div>
                      <div className="bg-gray-50 rounded-lg p-4 text-center">
                        <div className="text-lg font-semibold text-gray-900">
                          ₹{(tariff.totalRevenue / 100000).toFixed(1)}L
                        </div>
                        <div className="text-sm text-gray-600">Revenue</div>
                      </div>
                      <div className="bg-gray-50 rounded-lg p-4 text-center">
                        <div className="text-lg font-semibold text-gray-900">{tariff.usageCount}</div>
                        <div className="text-sm text-gray-600">Transactions</div>
                      </div>
                      <div className="bg-gray-50 rounded-lg p-4 text-center">
                        <div className="text-lg font-semibold text-gray-900">
                          ₹{tariff.usageCount > 0 ? (tariff.totalRevenue / tariff.usageCount).toFixed(2) : '0.00'}
                        </div>
                        <div className="text-sm text-gray-600">Avg Value</div>
                      </div>
                    </div>

                    {tariff.timeBasedRates && tariff.timeBasedRates.length > 1 && (
                      <div className="mb-4">
                        <h4 className="text-sm font-medium text-gray-900 mb-2">Time-based Rates:</h4>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                          {tariff.timeBasedRates.map((rate, index) => (
                            <div key={index} className="flex justify-between items-center p-3 bg-blue-50 rounded-lg text-sm">
                              <span className="text-blue-900 font-medium">{rate.period}</span>
                              <span className="text-blue-700 font-semibold">₹{rate.rate}/{tariff.unit}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {tariff.description && (
                      <p className="text-sm text-gray-600 mb-4 italic bg-gray-50 p-3 rounded-lg">{tariff.description}</p>
                    )}

                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4 text-sm text-gray-500">
                        {tariff.discountPercentage && (
                          <span className="flex items-center">
                            <Percent className="h-3 w-3 mr-1" />
                            {tariff.discountPercentage}% discount
                          </span>
                        )}
                        {tariff.validDays && (
                          <span className="flex items-center">
                            <Calendar className="h-3 w-3 mr-1" />
                            {tariff.validDays.join(', ')}
                          </span>
                        )}
                        {tariff.dynamicPricing?.enabled && (
                          <span className="flex items-center">
                            <TrendingUp className="h-3 w-3 mr-1" />
                            Dynamic pricing enabled
                          </span>
                        )}
                      </div>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => {
                          setSelectedTariff(tariff)
                          setIsDetailsOpen(true)
                        }}
                        className="bg-white hover:bg-gray-50 border-gray-200"
                      >
                        View Details
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="time_based" className="space-y-6">
            <Card className="bg-white border-0 shadow-sm">
              <CardHeader className="border-b border-gray-100">
                <CardTitle className="text-xl font-semibold text-gray-900">Peak Hours Configuration</CardTitle>
                <CardDescription className="text-gray-600">
                  Set different pricing for peak, off-peak, and standard hours across your network
                </CardDescription>
              </CardHeader>
              <CardContent className="p-6 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <Card className="border-red-200 bg-red-50/50">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-base text-red-700 flex items-center">
                        <Timer className="h-4 w-4 mr-2" />
                        Peak Hours
                      </CardTitle>
                      <CardDescription className="text-red-600">6:00 PM - 10:00 PM</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold text-red-700">₹15.00</div>
                      <div className="text-sm text-red-600">per kWh (+20% premium)</div>
                    </CardContent>
                  </Card>
                  
                  <Card className="border-blue-200 bg-blue-50/50">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-base text-blue-700 flex items-center">
                        <Clock className="h-4 w-4 mr-2" />
                        Standard Hours
                      </CardTitle>
                      <CardDescription className="text-blue-600">6:00 AM - 6:00 PM</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold text-blue-700">₹12.50</div>
                      <div className="text-sm text-blue-600">per kWh (base rate)</div>
                    </CardContent>
                  </Card>
                  
                  <Card className="border-green-200 bg-green-50/50">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-base text-green-700 flex items-center">
                        <Timer className="h-4 w-4 mr-2" />
                        Off-Peak Hours
                      </CardTitle>
                      <CardDescription className="text-green-600">10:00 PM - 6:00 AM</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold text-green-700">₹8.50</div>
                      <div className="text-sm text-green-600">per kWh (-32% discount)</div>
                    </CardContent>
                  </Card>
                </div>
                
                <div className="flex space-x-3">
                  <Button className="bg-blue-600 hover:bg-blue-700">
                    <Settings className="h-4 w-4 mr-2" />
                    Configure Time Slots
                  </Button>
                  <Button variant="outline" className="border-gray-200 hover:bg-gray-50">
                    <BarChart3 className="h-4 w-4 mr-2" />
                    View Analytics
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="promotions" className="space-y-6">
            <Card className="bg-white border-0 shadow-sm">
              <CardHeader className="border-b border-gray-100">
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle className="text-xl font-semibold text-gray-900">Promotional Campaigns</CardTitle>
                    <CardDescription className="text-gray-600">
                      Manage discount campaigns and special offers to boost usage
                    </CardDescription>
                  </div>
                  <Dialog open={isCreatePromoOpen} onOpenChange={setIsCreatePromoOpen}>
                    <DialogTrigger asChild>
                      <Button className="bg-blue-600 hover:bg-blue-700">
                        <Plus className="h-4 w-4 mr-2" />
                        New Campaign
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl">
                      <DialogHeader>
                        <DialogTitle className="text-xl font-semibold">Create Promotional Campaign</DialogTitle>
                        <DialogDescription className="text-gray-600">
                          Set up a new promotional campaign to attract and retain users
                        </DialogDescription>
                      </DialogHeader>
                      <CreatePromotionForm onClose={() => setIsCreatePromoOpen(false)} />
                    </DialogContent>
                  </Dialog>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <div className="divide-y divide-gray-100">
                  {promotionalCampaigns.map((promo) => (
                    <div key={promo.id} className="p-6 hover:bg-gray-50 transition-colors duration-150">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center">
                            <Tag className="h-6 w-6 text-white" />
                          </div>
                          <div>
                            <div className="flex items-center space-x-2 mb-1">
                              <h4 className="font-medium text-gray-900">{promo.name}</h4>
                              <Badge className={getStatusColor(promo.status)}>
                                {promo.status}
                              </Badge>
                            </div>
                            <p className="text-sm text-gray-600 mb-1">
                              {promo.type}: {promo.valueType === 'percentage' ? `${promo.value}%` : 
                                             promo.valueType === 'fixed' ? `₹${promo.value}` : 
                                             `${promo.value} ${promo.valueType}`}
                            </p>
                            <p className="text-xs text-gray-500">
                              {promo.startDate} - {promo.endDate} • Target: {promo.targetGroup.replace('_', ' ')}
                            </p>
                          </div>
                        </div>
                        
                        <div className="flex items-center space-x-4">
                          <div className="text-right">
                            <div className="text-sm font-medium text-gray-900">
                              {promo.currentUsage}/{promo.maxUsage}
                            </div>
                            <div className="text-xs text-gray-500">Usage</div>
                            <div className="w-20 bg-gray-200 rounded-full h-1.5 mt-1">
                              <div 
                                className="bg-blue-600 h-1.5 rounded-full" 
                                style={{ width: `${Math.min(100, (promo.currentUsage / promo.maxUsage) * 100)}%` }}
                              ></div>
                            </div>
                          </div>
                          
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem onClick={() => {
                                setSelectedPromo(promo)
                                setIsPromoDetailsOpen(true)
                              }}>
                                <Eye className="h-4 w-4 mr-2" />
                                View Details
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => handlePromoAction(promo.id, 'edit')}>
                                <Edit className="h-4 w-4 mr-2" />
                                Edit Campaign
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => handlePromoAction(promo.id, 'duplicate')}>
                                <Copy className="h-4 w-4 mr-2" />
                                Duplicate
                              </DropdownMenuItem>
                              {promo.status === 'active' ? (
                                <DropdownMenuItem onClick={() => handlePromoAction(promo.id, 'pause')}>
                                  <Pause className="h-4 w-4 mr-2" />
                                  Pause Campaign
                                </DropdownMenuItem>
                              ) : (
                                <DropdownMenuItem onClick={() => handlePromoAction(promo.id, 'activate')}>
                                  <Play className="h-4 w-4 mr-2" />
                                  Activate Campaign
                                </DropdownMenuItem>
                              )}
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="bg-white border-0 shadow-sm">
                <CardHeader>
                  <CardTitle className="text-base text-gray-900">Revenue Impact</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-green-600">+{analyticsData.revenueGrowth}%</div>
                    <div className="text-sm text-gray-600">vs last month</div>
                    <div className="text-xs text-gray-500 mt-2">
                      ₹{(analyticsData.totalRevenue / 100000).toFixed(1)}L total revenue
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="bg-white border-0 shadow-sm">
                <CardHeader>
                  <CardTitle className="text-base text-gray-900">Most Popular Tariff</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center">
                    <div className="text-lg font-bold text-gray-900">{analyticsData.mostPopular}</div>
                    <div className="text-sm text-gray-600">{tariffData[0].usageCount} uses</div>
                    <div className="text-xs text-gray-500 mt-2">
                      ₹{(tariffData[0].totalRevenue / 100000).toFixed(1)}L revenue
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="bg-white border-0 shadow-sm">
                <CardHeader>
                  <CardTitle className="text-base text-gray-900">Optimization Score</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-blue-600">87%</div>
                    <div className="text-sm text-gray-600">pricing efficiency</div>
                    <div className="text-xs text-green-600 mt-2">
                      +5% improvement this month
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>

        {/* Tariff Details Dialog */}
        {selectedTariff && (
          <Dialog open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
            <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle className="text-xl font-semibold">{selectedTariff.name}</DialogTitle>
                <DialogDescription className="text-gray-600">
                  Detailed view of tariff structure and performance metrics
                </DialogDescription>
              </DialogHeader>
              <TariffDetailsView tariff={selectedTariff} />
            </DialogContent>
          </Dialog>
        )}

        {/* Promotion Details Dialog */}
        {selectedPromo && (
          <Dialog open={isPromoDetailsOpen} onOpenChange={setIsPromoDetailsOpen}>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle className="text-xl font-semibold">{selectedPromo.name}</DialogTitle>
                <DialogDescription className="text-gray-600">
                  Detailed view of promotional campaign performance
                </DialogDescription>
              </DialogHeader>
              <PromotionDetailsView promotion={selectedPromo} />
            </DialogContent>
          </Dialog>
        )}
      </div>
    </div>
  )
}

// Create Tariff Form Component
function CreateTariffForm({ onClose }: { onClose: () => void }) {
  return (
    <div className="space-y-6">
      <div className="text-center py-8">
        <p className="text-gray-500">Tariff creation form will be implemented here...</p>
      </div>
      <div className="flex justify-end space-x-3">
        <Button variant="outline" onClick={onClose}>Cancel</Button>
        <Button onClick={onClose}>Create Tariff</Button>
      </div>
    </div>
  )
}

// Create Promotion Form Component  
function CreatePromotionForm({ onClose }: { onClose: () => void }) {
  return (
    <div className="space-y-6">
      <div className="text-center py-8">
        <p className="text-gray-500">Promotion creation form will be implemented here...</p>
      </div>
      <div className="flex justify-end space-x-3">
        <Button variant="outline" onClick={onClose}>Cancel</Button>
        <Button onClick={onClose}>Create Campaign</Button>
      </div>
    </div>
  )
}

// Tariff Details View Component
function TariffDetailsView({ tariff }: { tariff: TariffStructure }) {
  return (
    <div className="space-y-6">
      <div className="text-center py-8">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">{tariff.name}</h3>
        <p className="text-gray-500">Detailed tariff analysis and configuration options coming soon...</p>
      </div>
    </div>
  )
}

// Promotion Details View Component
function PromotionDetailsView({ promotion }: { promotion: PromotionalCampaign }) {
  return (
    <div className="space-y-6">
      <div className="text-center py-8">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">{promotion.name}</h3>
        <p className="text-gray-500">Detailed promotion analysis and performance metrics coming soon...</p>
      </div>
    </div>
  )
}