import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Badge } from './ui/badge'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog'
import { Label } from './ui/label'
import { Textarea } from './ui/textarea'
import { Switch } from './ui/switch'
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs'
import { Progress } from './ui/progress'
import { 
  Building2, 
  Plus, 
  Search,
  Settings,
  CheckCircle,
  XCircle,
  AlertTriangle,
  RefreshCw,
  Eye,
  Edit,
  Trash2,
  TestTube,
  Key,
  Zap,
  TrendingUp,
  MoreHorizontal,
  Link,
  Unlink,
  Activity
} from 'lucide-react'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from './ui/dropdown-menu'

export function CPOIntegration() {
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [selectedCPO, setSelectedCPO] = useState<any>(null)
  const [isDetailsOpen, setIsDetailsOpen] = useState(false)
  const [isAddCPOOpen, setIsAddCPOOpen] = useState(false)

  const cpoData = [
    {
      id: 'CPO001',
      name: 'PowerGrid CPO',
      logo: null,
      contactPerson: 'Rajesh Kumar',
      email: 'rajesh.kumar@powergrid.com',
      phone: '+91 9876543210',
      status: 'connected',
      connectionHealth: 98.5,
      apiVersion: 'OCPP 2.0.1',
      authType: 'Bearer Token',
      baseUrl: 'https://api.powergrid.com/v2',
      stations: 87,
      activeStations: 85,
      totalRevenue: 456780,
      lastSync: '2 minutes ago',
      onboardedDate: '2023-06-15',
      contractStatus: 'active',
      settlementSchedule: 'weekly'
    },
    {
      id: 'CPO002',
      name: 'ChargeTech Solutions',
      logo: null,
      contactPerson: 'Priya Sharma',
      email: 'priya@chargetech.in',
      phone: '+91 8765432109',
      status: 'connected',
      connectionHealth: 95.2,
      apiVersion: 'OCPP 1.6',
      authType: 'Basic Auth',
      baseUrl: 'https://chargetech.in/api/v1',
      stations: 52,
      activeStations: 50,
      totalRevenue: 289450,
      lastSync: '5 minutes ago',
      onboardedDate: '2023-08-20',
      contractStatus: 'active',
      settlementSchedule: 'bi-weekly'
    },
    {
      id: 'CPO003',
      name: 'GreenVolt Energy',
      logo: null,
      contactPerson: 'Amit Patel',
      email: 'amit@greenvolt.com',
      phone: '+91 7654321098',
      status: 'error',
      connectionHealth: 65.8,
      apiVersion: 'OCPP 2.0.1',
      authType: 'Bearer Token',
      baseUrl: 'https://api.greenvolt.com/v3',
      stations: 34,
      activeStations: 22,
      totalRevenue: 156780,
      lastSync: '2 hours ago',
      onboardedDate: '2023-04-10',
      contractStatus: 'active',
      settlementSchedule: 'monthly',
      errorMessage: 'API authentication failed'
    },
    {
      id: 'CPO004',
      name: 'AeroCharge India',
      logo: null,
      contactPerson: 'Sneha Reddy',
      email: 'sneha@aerocharge.in',
      phone: '+91 6543210987',
      status: 'testing',
      connectionHealth: 89.3,
      apiVersion: 'OCPP 1.6',
      authType: 'API Key',
      baseUrl: 'https://aerocharge.in/openapi',
      stations: 28,
      activeStations: 28,
      totalRevenue: 234560,
      lastSync: '1 minute ago',
      onboardedDate: '2023-12-01',
      contractStatus: 'trial',
      settlementSchedule: 'weekly'
    }
  ]

  const integrationLogs = [
    {
      timestamp: '2024-01-28 14:30:45',
      cpo: 'PowerGrid CPO',
      action: 'Station Status Update',
      status: 'success',
      message: 'Updated status for 12 stations'
    },
    {
      timestamp: '2024-01-28 14:25:12',
      cpo: 'ChargeTech Solutions',
      action: 'Session Start',
      status: 'success',
      message: 'Session SS001 started successfully'
    },
    {
      timestamp: '2024-01-28 14:20:38',
      cpo: 'GreenVolt Energy',
      action: 'Authentication',
      status: 'error',
      message: 'Bearer token expired'
    },
    {
      timestamp: '2024-01-28 14:15:29',
      cpo: 'AeroCharge India',
      action: 'Health Check',
      status: 'success',
      message: 'API responding normally'
    }
  ]

  const filteredCPOs = cpoData.filter(cpo => {
    const matchesSearch = cpo.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         cpo.contactPerson.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         cpo.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === 'all' || cpo.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'connected': return 'bg-green-100 text-green-800'
      case 'error': return 'bg-red-100 text-red-800'
      case 'testing': return 'bg-yellow-100 text-yellow-800'
      case 'disconnected': return 'bg-gray-100 text-gray-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'connected': return <CheckCircle className="h-4 w-4" />
      case 'error': return <XCircle className="h-4 w-4" />
      case 'testing': return <TestTube className="h-4 w-4" />
      case 'disconnected': return <Unlink className="h-4 w-4" />
      default: return <Activity className="h-4 w-4" />
    }
  }

  const getHealthColor = (health: number) => {
    if (health >= 95) return 'text-green-600'
    if (health >= 80) return 'text-yellow-600'
    return 'text-red-600'
  }

  const testConnection = (cpoId: string) => {
    console.log(`Testing connection for CPO ${cpoId}`)
  }

  const syncData = (cpoId: string) => {
    console.log(`Syncing data for CPO ${cpoId}`)
  }

  const regenerateCredentials = (cpoId: string) => {
    console.log(`Regenerating credentials for CPO ${cpoId}`)
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1>CPO Integration Management</h1>
          <p className="text-muted-foreground">
            Manage Charge Point Operator partnerships and API integrations
          </p>
        </div>
        <Dialog open={isAddCPOOpen} onOpenChange={setIsAddCPOOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add CPO Partner
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Add New CPO Partner</DialogTitle>
              <DialogDescription>
                Onboard a new Charge Point Operator partner
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="cpo-name">Company Name</Label>
                  <Input id="cpo-name" placeholder="Enter company name" />
                </div>
                <div>
                  <Label htmlFor="contact-person">Contact Person</Label>
                  <Input id="contact-person" placeholder="Primary contact name" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="cpo-email">Email</Label>
                  <Input id="cpo-email" type="email" placeholder="contact@company.com" />
                </div>
                <div>
                  <Label htmlFor="cpo-phone">Phone</Label>
                  <Input id="cpo-phone" placeholder="+91 XXXXXXXXXX" />
                </div>
              </div>
              <div>
                <Label htmlFor="api-url">API Base URL</Label>
                <Input id="api-url" placeholder="https://api.partner.com/v1" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="api-version">API Version</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select API version" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ocpp1.6">OCPP 1.6</SelectItem>
                      <SelectItem value="ocpp2.0">OCPP 2.0</SelectItem>
                      <SelectItem value="ocpp2.0.1">OCPP 2.0.1</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="auth-type">Authentication Type</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select auth type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="bearer">Bearer Token</SelectItem>
                      <SelectItem value="basic">Basic Auth</SelectItem>
                      <SelectItem value="apikey">API Key</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div>
                <Label htmlFor="settlement">Settlement Schedule</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select schedule" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="daily">Daily</SelectItem>
                    <SelectItem value="weekly">Weekly</SelectItem>
                    <SelectItem value="bi-weekly">Bi-weekly</SelectItem>
                    <SelectItem value="monthly">Monthly</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setIsAddCPOOpen(false)}>Cancel</Button>
              <Button onClick={() => setIsAddCPOOpen(false)}>Add Partner</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total CPO Partners</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <div className="text-xs text-muted-foreground">+2 this month</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Active Connections</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">10</div>
            <div className="text-xs text-muted-foreground">83% success rate</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Stations</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">287</div>
            <div className="text-xs text-muted-foreground">Across all partners</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Avg Health Score</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">92.1%</div>
            <div className="text-xs text-muted-foreground">API performance</div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Search & Filter</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input 
                  placeholder="Search CPO partners..."
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
                <SelectItem value="connected">Connected</SelectItem>
                <SelectItem value="error">Error</SelectItem>
                <SelectItem value="testing">Testing</SelectItem>
                <SelectItem value="disconnected">Disconnected</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* CPO Partners List */}
      <div className="grid gap-4">
        {filteredCPOs.map((cpo) => (
          <Card key={cpo.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Building2 className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <div className="flex items-center gap-3 mb-1">
                      <h3 className="font-semibold text-lg">{cpo.name}</h3>
                      <Badge className={getStatusColor(cpo.status)}>
                        {getStatusIcon(cpo.status)}
                        <span className="ml-1">{cpo.status}</span>
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">{cpo.contactPerson} • {cpo.email}</p>
                    <p className="text-xs text-muted-foreground">API: {cpo.apiVersion} • Last sync: {cpo.lastSync}</p>
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
                      setSelectedCPO(cpo)
                      setIsDetailsOpen(true)
                    }}>
                      <Eye className="h-4 w-4 mr-2" />
                      View Details
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Edit className="h-4 w-4 mr-2" />
                      Edit Configuration
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => testConnection(cpo.id)}>
                      <TestTube className="h-4 w-4 mr-2" />
                      Test Connection
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => syncData(cpo.id)}>
                      <RefreshCw className="h-4 w-4 mr-2" />
                      Sync Data
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => regenerateCredentials(cpo.id)}>
                      <Key className="h-4 w-4 mr-2" />
                      Regenerate Keys
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                <div className="text-center p-3 bg-muted rounded-lg">
                  <div className="text-lg font-bold">{cpo.stations}</div>
                  <div className="text-sm text-muted-foreground">Total Stations</div>
                </div>
                <div className="text-center p-3 bg-muted rounded-lg">
                  <div className="text-lg font-bold text-green-600">{cpo.activeStations}</div>
                  <div className="text-sm text-muted-foreground">Active</div>
                </div>
                <div className="text-center p-3 bg-muted rounded-lg">
                  <div className="text-lg font-bold">₹{cpo.totalRevenue.toLocaleString()}</div>
                  <div className="text-sm text-muted-foreground">Total Revenue</div>
                </div>
                <div className="text-center p-3 bg-muted rounded-lg">
                  <div className={`text-lg font-bold ${getHealthColor(cpo.connectionHealth)}`}>
                    {cpo.connectionHealth}%
                  </div>
                  <div className="text-sm text-muted-foreground">Health Score</div>
                </div>
              </div>

              {cpo.status === 'error' && cpo.errorMessage && (
                <div className="flex items-center gap-2 p-3 bg-red-50 rounded-lg mb-4">
                  <AlertTriangle className="h-4 w-4 text-red-600" />
                  <span className="text-sm text-red-800">{cpo.errorMessage}</span>
                </div>
              )}

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <span>Onboarded: {cpo.onboardedDate}</span>
                  <span>Contract: {cpo.contractStatus}</span>
                  <span>Settlement: {cpo.settlementSchedule}</span>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" onClick={() => testConnection(cpo.id)}>
                    Test Connection
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => {
                    setSelectedCPO(cpo)
                    setIsDetailsOpen(true)
                  }}>
                    View Details
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Integration Logs */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Integration Activity</CardTitle>
          <CardDescription>Latest API calls and system events</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {integrationLogs.map((log, index) => (
              <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className={`w-2 h-2 rounded-full ${
                    log.status === 'success' ? 'bg-green-500' : 'bg-red-500'
                  }`} />
                  <div>
                    <div className="text-sm font-medium">{log.cpo} • {log.action}</div>
                    <div className="text-xs text-muted-foreground">{log.message}</div>
                  </div>
                </div>
                <div className="text-xs text-muted-foreground">{log.timestamp}</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* CPO Details Dialog */}
      <Dialog open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{selectedCPO?.name} - Integration Details</DialogTitle>
            <DialogDescription>
              Complete configuration and monitoring information
            </DialogDescription>
          </DialogHeader>
          
          {selectedCPO && (
            <Tabs defaultValue="overview" className="mt-4">
              <TabsList>
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="configuration">Configuration</TabsTrigger>
                <TabsTrigger value="monitoring">Monitoring</TabsTrigger>
                <TabsTrigger value="settlements">Settlements</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base">Partner Information</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      <div><strong>Company:</strong> {selectedCPO.name}</div>
                      <div><strong>Contact:</strong> {selectedCPO.contactPerson}</div>
                      <div><strong>Email:</strong> {selectedCPO.email}</div>
                      <div><strong>Phone:</strong> {selectedCPO.phone}</div>
                      <div><strong>Onboarded:</strong> {selectedCPO.onboardedDate}</div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base">Integration Status</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      <div className="flex items-center gap-2">
                        <strong>Status:</strong> 
                        <Badge className={getStatusColor(selectedCPO.status)}>
                          {selectedCPO.status}
                        </Badge>
                      </div>
                      <div><strong>Health Score:</strong> {selectedCPO.connectionHealth}%</div>
                      <div><strong>API Version:</strong> {selectedCPO.apiVersion}</div>
                      <div><strong>Last Sync:</strong> {selectedCPO.lastSync}</div>
                    </CardContent>
                  </Card>
                </div>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Performance Metrics</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-3 gap-4 text-center">
                      <div>
                        <div className="text-2xl font-bold">{selectedCPO.stations}</div>
                        <div className="text-sm text-muted-foreground">Total Stations</div>
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-green-600">{selectedCPO.activeStations}</div>
                        <div className="text-sm text-muted-foreground">Active Stations</div>
                      </div>
                      <div>
                        <div className="text-2xl font-bold">₹{selectedCPO.totalRevenue.toLocaleString()}</div>
                        <div className="text-sm text-muted-foreground">Total Revenue</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="configuration">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">API Configuration</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label>Base URL</Label>
                      <Input value={selectedCPO.baseUrl} readOnly />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label>API Version</Label>
                        <Input value={selectedCPO.apiVersion} readOnly />
                      </div>
                      <div>
                        <Label>Authentication</Label>
                        <Input value={selectedCPO.authType} readOnly />
                      </div>
                    </div>
                    <div>
                      <Label>Settlement Schedule</Label>
                      <Input value={selectedCPO.settlementSchedule} readOnly />
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline">
                        <Edit className="h-4 w-4 mr-2" />
                        Edit Configuration
                      </Button>
                      <Button variant="outline">
                        <TestTube className="h-4 w-4 mr-2" />
                        Test Connection
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="monitoring">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Connection Health</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between mb-1">
                          <span>Overall Health</span>
                          <span>{selectedCPO.connectionHealth}%</span>
                        </div>
                        <Progress value={selectedCPO.connectionHealth} />
                      </div>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <div><strong>Response Time:</strong> 245ms</div>
                          <div><strong>Success Rate:</strong> 98.2%</div>
                        </div>
                        <div>
                          <div><strong>Uptime:</strong> 99.7%</div>
                          <div><strong>Last Error:</strong> 2 days ago</div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="settlements">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Settlement Information</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div><strong>Schedule:</strong> {selectedCPO.settlementSchedule}</div>
                      <div><strong>Contract Status:</strong> {selectedCPO.contractStatus}</div>
                      <div><strong>Total Revenue:</strong> ₹{selectedCPO.totalRevenue.toLocaleString()}</div>
                      <div><strong>Last Payout:</strong> Jan 21, 2024</div>
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