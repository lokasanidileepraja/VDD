import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Label } from './ui/label'
import { Badge } from './ui/badge'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog'
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs'
import { Switch } from './ui/switch'
import { Textarea } from './ui/textarea'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from './ui/dropdown-menu'
import { 
  DollarSign, 
  Plus, 
  Search,
  Edit,
  Trash2,
  MoreHorizontal,
  Building2,
  MapPin,
  Zap,
  TrendingUp,
  Calculator,
  Eye,
  Copy,
  Settings,
  Download,
  Upload,
  Filter,
  SortAsc
} from 'lucide-react'
import { ScrollArea } from './ui/scroll-area'
import { toast } from 'sonner@2.0.3'

interface FeeStructure {
  id: string
  name: string
  type: 'percentage' | 'fixed' | 'hybrid'
  percentage?: number
  fixedAmount?: number
  minimumFee?: number
  maximumFee?: number
  applicationType: 'global' | 'cpo' | 'station' | 'city' | 'connector'
  targetId?: string
  targetName?: string
  status: 'active' | 'draft' | 'scheduled' | 'expired'
  effectiveDate: string
  expiryDate?: string
  createdBy: string
  createdDate: string
  lastModified: string
  totalRevenue: number
  transactionCount: number
  description?: string
}

export function PlatformFeeManagement() {
  const [searchTerm, setSearchTerm] = useState('')
  const [filterType, setFilterType] = useState('all')
  const [filterStatus, setFilterStatus] = useState('all')
  const [selectedFee, setSelectedFee] = useState<FeeStructure | null>(null)
  const [isDetailsOpen, setIsDetailsOpen] = useState(false)
  const [isCreateOpen, setIsCreateOpen] = useState(false)
  const [isEditOpen, setIsEditOpen] = useState(false)

  const feeStructures: FeeStructure[] = [
    {
      id: 'FEE001',
      name: 'Standard Platform Fee',
      type: 'percentage',
      percentage: 3.5,
      minimumFee: 5,
      maximumFee: 500,
      applicationType: 'global',
      status: 'active',
      effectiveDate: '2024-01-01',
      createdBy: 'System Admin',
      createdDate: '2023-12-15',
      lastModified: '2024-01-20',
      totalRevenue: 2456780,
      transactionCount: 15432,
      description: 'Default platform fee applied to all transactions'
    },
    {
      id: 'FEE002',
      name: 'Premium CPO Rate - ChargePoint',
      type: 'percentage',
      percentage: 2.8,
      minimumFee: 3,
      maximumFee: 300,
      applicationType: 'cpo',
      targetId: 'CPO001',
      targetName: 'ChargePoint India',
      status: 'active',
      effectiveDate: '2024-01-01',
      expiryDate: '2024-12-31',
      createdBy: 'Business Manager',
      createdDate: '2023-12-20',
      lastModified: '2024-01-15',
      totalRevenue: 892340,
      transactionCount: 8934,
      description: 'Reduced rate for premium CPO partner'
    },
    {
      id: 'FEE003',
      name: 'Mumbai Metro Station Fee',
      type: 'fixed',
      fixedAmount: 15,
      applicationType: 'city',
      targetId: 'CITY001',
      targetName: 'Mumbai',
      status: 'active',
      effectiveDate: '2024-02-01',
      createdBy: 'Regional Manager',
      createdDate: '2024-01-25',
      lastModified: '2024-01-25',
      totalRevenue: 234560,
      transactionCount: 15637,
      description: 'Fixed fee for Mumbai metropolitan area'
    },
    {
      id: 'FEE004',
      name: 'High Volume Station Discount',
      type: 'hybrid',
      percentage: 2.0,
      fixedAmount: 8,
      minimumFee: 2,
      maximumFee: 200,
      applicationType: 'station',
      targetId: 'ST001',
      targetName: 'Phoenix Mall Station',
      status: 'active',
      effectiveDate: '2024-01-15',
      expiryDate: '2024-06-15',
      createdBy: 'Operations Lead',
      createdDate: '2024-01-10',
      lastModified: '2024-01-20',
      totalRevenue: 156780,
      transactionCount: 4562,
      description: 'Special pricing for high-volume charging station'
    },
    {
      id: 'FEE005',
      name: 'DC Fast Charger Premium',
      type: 'percentage',
      percentage: 4.2,
      minimumFee: 8,
      maximumFee: 600,
      applicationType: 'connector',
      targetId: 'CONN001',
      targetName: 'DC Fast Charger (150kW+)',
      status: 'scheduled',
      effectiveDate: '2024-03-01',
      createdBy: 'Product Manager',
      createdDate: '2024-02-01',
      lastModified: '2024-02-01',
      totalRevenue: 0,
      transactionCount: 0,
      description: 'Premium rate for ultra-fast DC charging'
    }
  ]

  const revenueStats = {
    totalRevenue: 3740460,
    monthlyGrowth: 15.3,
    avgFeePerTransaction: 24.50,
    topPerformer: 'Standard Platform Fee'
  }

  const filteredFees = feeStructures.filter(fee => {
    const matchesSearch = fee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         fee.targetName?.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesType = filterType === 'all' || fee.applicationType === filterType
    const matchesStatus = filterStatus === 'all' || fee.status === filterStatus
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
      case 'global': return 'bg-purple-50 text-purple-700 border-purple-200'
      case 'cpo': return 'bg-blue-50 text-blue-700 border-blue-200'
      case 'station': return 'bg-green-50 text-green-700 border-green-200'
      case 'city': return 'bg-orange-50 text-orange-700 border-orange-200'
      case 'connector': return 'bg-teal-50 text-teal-700 border-teal-200'
      default: return 'bg-gray-50 text-gray-700 border-gray-200'
    }
  }

  const formatFeeStructure = (fee: FeeStructure) => {
    if (fee.type === 'percentage') {
      return `${fee.percentage}%${fee.minimumFee ? ` (min ₹${fee.minimumFee})` : ''}${fee.maximumFee ? ` (max ₹${fee.maximumFee})` : ''}`
    } else if (fee.type === 'fixed') {
      return `₹${fee.fixedAmount} flat`
    } else {
      return `${fee.percentage}% + ₹${fee.fixedAmount}`
    }
  }

  const handleEdit = (fee: FeeStructure) => {
    setSelectedFee(fee)
    setIsEditOpen(true)
  }

  const handleDuplicate = (fee: FeeStructure) => {
    console.log('Duplicating fee structure:', fee.id)
    // Implementation for duplicating fee structure
  }

  const handleDelete = (fee: FeeStructure) => {
    console.log('Deleting fee structure:', fee.id)
    // Implementation for deleting fee structure
  }

  const handleExport = () => {
    console.log('Exporting fee structures')
    // Implementation for exporting data
  }

  const handleImport = () => {
    console.log('Importing fee structures')
    // Implementation for importing data
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="p-6 max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
          <div>
            <h1 className="text-2xl font-semibold text-foreground">Platform Fee Management</h1>
            <p className="text-muted-foreground mt-1">
              Configure and optimize platform fees across CPOs, stations, and cities
            </p>
          </div>
          <div className="flex items-center space-x-3">
            <Button variant="outline" onClick={handleImport} className="apple-focus">
              <Upload className="h-4 w-4 mr-2" />
              Import
            </Button>
            <Button variant="outline" onClick={handleExport} className="apple-focus">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
            <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
              <DialogTrigger asChild>
                <Button className="apple-focus">
                  <Plus className="h-4 w-4 mr-2" />
                  New Fee Structure
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto apple-animate-in">
                <DialogHeader>
                  <DialogTitle className="text-xl font-semibold">Create Platform Fee Structure</DialogTitle>
                  <DialogDescription className="text-muted-foreground">
                    Set up a new fee structure for specific CPOs, stations, cities, or globally
                  </DialogDescription>
                </DialogHeader>
                <CreateFeeStructureForm onClose={() => setIsCreateOpen(false)} />
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {/* Revenue Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="apple-card">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground mb-2">Total Revenue</p>
                  <p className="text-2xl font-semibold text-foreground">₹{(revenueStats.totalRevenue / 100000).toFixed(1)}L</p>
                  <p className="text-xs text-green-600 mt-1 flex items-center">
                    <TrendingUp className="h-3 w-3 mr-1" />
                    +{revenueStats.monthlyGrowth}% this month
                  </p>
                </div>
                <div className="w-10 h-10 bg-blue-50 rounded-full flex items-center justify-center">
                  <DollarSign className="h-5 w-5 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-white border-0 shadow-sm hover:shadow-md transition-shadow duration-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 mb-2">Avg Fee/Transaction</p>
                  <p className="text-2xl font-semibold text-gray-900">₹{revenueStats.avgFeePerTransaction}</p>
                  <p className="text-xs text-gray-500 mt-1">Across all structures</p>
                </div>
                <div className="w-12 h-12 bg-green-50 rounded-full flex items-center justify-center">
                  <Calculator className="h-6 w-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white border-0 shadow-sm hover:shadow-md transition-shadow duration-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 mb-2">Active Structures</p>
                  <p className="text-2xl font-semibold text-gray-900">{feeStructures.filter(f => f.status === 'active').length}</p>
                  <p className="text-xs text-gray-500 mt-1">Out of {feeStructures.length} total</p>
                </div>
                <div className="w-12 h-12 bg-orange-50 rounded-full flex items-center justify-center">
                  <Settings className="h-6 w-6 text-orange-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white border-0 shadow-sm hover:shadow-md transition-shadow duration-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 mb-2">Top Performer</p>
                  <p className="text-lg font-semibold text-gray-900 leading-tight">{revenueStats.topPerformer}</p>
                  <p className="text-xs text-gray-500 mt-1">Highest revenue</p>
                </div>
                <div className="w-12 h-12 bg-purple-50 rounded-full flex items-center justify-center">
                  <TrendingUp className="h-6 w-6 text-purple-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters and Search */}
        <Card className="bg-white border-0 shadow-sm">
          <CardContent className="p-6">
            <div className="flex flex-col space-y-4 md:flex-row md:items-center md:space-y-0 md:space-x-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    placeholder="Search fee structures, CPOs, stations..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
              </div>
              <Select value={filterType} onValueChange={setFilterType}>
                <SelectTrigger className="w-48 border-gray-200">
                  <SelectValue placeholder="Application Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="global">Global</SelectItem>
                  <SelectItem value="cpo">CPO Specific</SelectItem>
                  <SelectItem value="station">Station Specific</SelectItem>
                  <SelectItem value="city">City Specific</SelectItem>
                  <SelectItem value="connector">Connector Type</SelectItem>
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

        {/* Fee Structures List */}
        <div className="space-y-4">
          {filteredFees.map((fee) => (
            <Card key={fee.id} className="bg-white border-0 shadow-sm hover:shadow-md transition-all duration-200">
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="text-lg font-semibold text-gray-900">{fee.name}</h3>
                      <Badge className={`${getStatusColor(fee.status)} text-xs font-medium`}>
                        {fee.status}
                      </Badge>
                      <Badge className={`${getTypeColor(fee.applicationType)} text-xs font-medium`}>
                        {fee.applicationType}
                      </Badge>
                    </div>
                    {fee.targetName && (
                      <p className="text-sm text-gray-600 flex items-center mb-1">
                        {fee.applicationType === 'cpo' && <Building2 className="h-4 w-4 mr-1" />}
                        {fee.applicationType === 'station' && <Zap className="h-4 w-4 mr-1" />}
                        {fee.applicationType === 'city' && <MapPin className="h-4 w-4 mr-1" />}
                        {fee.targetName}
                      </p>
                    )}
                    <p className="text-xs text-gray-500">
                      Created: {fee.createdDate} • Modified: {fee.lastModified}
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
                        setSelectedFee(fee)
                        setIsDetailsOpen(true)
                      }}>
                        <Eye className="h-4 w-4 mr-2" />
                        View Details
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleEdit(fee)}>
                        <Edit className="h-4 w-4 mr-2" />
                        Edit Structure
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleDuplicate(fee)}>
                        <Copy className="h-4 w-4 mr-2" />
                        Duplicate
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleDelete(fee)} className="text-red-600 focus:text-red-600">
                        <Trash2 className="h-4 w-4 mr-2" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                  <div className="bg-gray-50 rounded-lg p-4 text-center">
                    <div className="text-lg font-semibold text-gray-900">
                      {formatFeeStructure(fee)}
                    </div>
                    <div className="text-sm text-gray-600">Fee Structure</div>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4 text-center">
                    <div className="text-lg font-semibold text-gray-900">
                      ₹{(fee.totalRevenue / 100000).toFixed(1)}L
                    </div>
                    <div className="text-sm text-gray-600">Total Revenue</div>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4 text-center">
                    <div className="text-lg font-semibold text-gray-900">
                      {fee.transactionCount.toLocaleString()}
                    </div>
                    <div className="text-sm text-gray-600">Transactions</div>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4 text-center">
                    <div className="text-lg font-semibold text-gray-900">
                      ₹{fee.transactionCount > 0 ? (fee.totalRevenue / fee.transactionCount).toFixed(2) : '0.00'}
                    </div>
                    <div className="text-sm text-gray-600">Avg Fee</div>
                  </div>
                </div>

                {fee.description && (
                  <p className="text-sm text-gray-600 mb-4 italic">{fee.description}</p>
                )}

                <div className="flex items-center justify-between">
                  <div className="text-sm text-gray-500">
                    Effective: {fee.effectiveDate} {fee.expiryDate && `- ${fee.expiryDate}`}
                  </div>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => {
                      setSelectedFee(fee)
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

        {/* Fee Details Dialog */}
        {selectedFee && (
          <Dialog open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
            <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle className="text-xl font-semibold">{selectedFee.name}</DialogTitle>
                <DialogDescription className="text-gray-600">
                  Detailed view of platform fee structure and performance
                </DialogDescription>
              </DialogHeader>
              <FeeDetailsView fee={selectedFee} onClose={() => setIsDetailsOpen(false)} />
            </DialogContent>
          </Dialog>
        )}
      </div>
    </div>
  )
}

// Create Fee Structure Form Component
function CreateFeeStructureForm({ onClose }: { onClose: () => void }) {
  const [formData, setFormData] = useState({
    name: '',
    type: 'percentage' as 'percentage' | 'fixed' | 'hybrid',
    percentage: '',
    fixedAmount: '',
    minimumFee: '',
    maximumFee: '',
    applicationType: 'global' as 'global' | 'cpo' | 'station' | 'city' | 'connector',
    targetId: '',
    effectiveDate: '',
    expiryDate: '',
    description: ''
  })

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="name">Fee Structure Name *</Label>
          <Input 
            id="name" 
            placeholder="Enter descriptive name"
            value={formData.name}
            onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
          />
        </div>
        <div>
          <Label htmlFor="type">Fee Type *</Label>
          <Select value={formData.type} onValueChange={(value) => setFormData(prev => ({ ...prev, type: value as any }))}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="percentage">Percentage Based</SelectItem>
              <SelectItem value="fixed">Fixed Amount</SelectItem>
              <SelectItem value="hybrid">Hybrid (Percentage + Fixed)</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {(formData.type === 'percentage' || formData.type === 'hybrid') && (
        <div className="grid grid-cols-3 gap-4">
          <div>
            <Label htmlFor="percentage">Percentage Rate *</Label>
            <Input 
              id="percentage" 
              type="number" 
              placeholder="3.5" 
              step="0.1"
              value={formData.percentage}
              onChange={(e) => setFormData(prev => ({ ...prev, percentage: e.target.value }))}
            />
          </div>
          <div>
            <Label htmlFor="min-fee">Minimum Fee (₹)</Label>
            <Input 
              id="min-fee" 
              type="number" 
              placeholder="5"
              value={formData.minimumFee}
              onChange={(e) => setFormData(prev => ({ ...prev, minimumFee: e.target.value }))}
            />
          </div>
          <div>
            <Label htmlFor="max-fee">Maximum Fee (₹)</Label>
            <Input 
              id="max-fee" 
              type="number" 
              placeholder="500"
              value={formData.maximumFee}
              onChange={(e) => setFormData(prev => ({ ...prev, maximumFee: e.target.value }))}
            />
          </div>
        </div>
      )}

      {(formData.type === 'fixed' || formData.type === 'hybrid') && (
        <div>
          <Label htmlFor="fixed-amount">Fixed Amount (₹) *</Label>
          <Input 
            id="fixed-amount" 
            type="number" 
            placeholder="15"
            value={formData.fixedAmount}
            onChange={(e) => setFormData(prev => ({ ...prev, fixedAmount: e.target.value }))}
          />
        </div>
      )}

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="application-type">Application Scope *</Label>
          <Select value={formData.applicationType} onValueChange={(value) => setFormData(prev => ({ ...prev, applicationType: value as any }))}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="global">Global (All Transactions)</SelectItem>
              <SelectItem value="cpo">CPO Specific</SelectItem>
              <SelectItem value="station">Station Specific</SelectItem>
              <SelectItem value="city">City Specific</SelectItem>
              <SelectItem value="connector">Connector Type</SelectItem>
            </SelectContent>
          </Select>
        </div>
        {formData.applicationType !== 'global' && (
          <div>
            <Label htmlFor="target">Select Target</Label>
            <Select value={formData.targetId} onValueChange={(value) => setFormData(prev => ({ ...prev, targetId: value }))}>
              <SelectTrigger>
                <SelectValue placeholder={`Select ${formData.applicationType}`} />
              </SelectTrigger>
              <SelectContent>
                {formData.applicationType === 'cpo' && (
                  <>
                    <SelectItem value="CPO001">ChargePoint India</SelectItem>
                    <SelectItem value="CPO002">Ather Energy</SelectItem>
                    <SelectItem value="CPO003">Tata Power</SelectItem>
                  </>
                )}
                {formData.applicationType === 'station' && (
                  <>
                    <SelectItem value="ST001">Phoenix Mall Station</SelectItem>
                    <SelectItem value="ST002">Tech Park Hub</SelectItem>
                    <SelectItem value="ST003">Airport Terminal</SelectItem>
                  </>
                )}
                {formData.applicationType === 'city' && (
                  <>
                    <SelectItem value="CITY001">Mumbai</SelectItem>
                    <SelectItem value="CITY002">Bangalore</SelectItem>
                    <SelectItem value="CITY003">Delhi</SelectItem>
                  </>
                )}
                {formData.applicationType === 'connector' && (
                  <>
                    <SelectItem value="CONN001">DC Fast Charger (150kW+)</SelectItem>
                    <SelectItem value="CONN002">AC Type 2</SelectItem>
                    <SelectItem value="CONN003">CHAdeMO</SelectItem>
                  </>
                )}
              </SelectContent>
            </Select>
          </div>
        )}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="effective-date">Effective Date *</Label>
          <Input 
            id="effective-date" 
            type="date"
            value={formData.effectiveDate}
            onChange={(e) => setFormData(prev => ({ ...prev, effectiveDate: e.target.value }))}
          />
        </div>
        <div>
          <Label htmlFor="expiry-date">Expiry Date (Optional)</Label>
          <Input 
            id="expiry-date" 
            type="date"
            value={formData.expiryDate}
            onChange={(e) => setFormData(prev => ({ ...prev, expiryDate: e.target.value }))}
          />
        </div>
      </div>

      <div>
        <Label htmlFor="description">Description</Label>
        <Textarea 
          id="description" 
          placeholder="Optional description for this fee structure"
          value={formData.description}
          onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
          rows={3}
        />
      </div>

      <div className="flex justify-end space-x-3 pt-4">
        <Button variant="outline" onClick={onClose}>Cancel</Button>
        <Button onClick={onClose} className="bg-blue-600 hover:bg-blue-700">
          Create Fee Structure
        </Button>
      </div>
    </div>
  )
}

// Fee Details View Component
function FeeDetailsView({ fee, onClose }: { fee: FeeStructure; onClose: () => void }) {
  return (
    <Tabs defaultValue="overview" className="w-full">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="overview">Overview</TabsTrigger>
        <TabsTrigger value="performance">Performance</TabsTrigger>
        <TabsTrigger value="transactions">Transactions</TabsTrigger>
      </TabsList>
      
      <TabsContent value="overview" className="space-y-6">
        <div className="grid grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Fee Configuration</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label className="text-sm font-medium text-gray-600">Structure Type</Label>
                <p className="text-sm mt-1">{fee.type.charAt(0).toUpperCase() + fee.type.slice(1)}</p>
              </div>
              <div>
                <Label className="text-sm font-medium text-gray-600">Rate Details</Label>
                <p className="text-sm mt-1">
                  {fee.type === 'percentage' && `${fee.percentage}%`}
                  {fee.type === 'fixed' && `₹${fee.fixedAmount}`}
                  {fee.type === 'hybrid' && `${fee.percentage}% + ₹${fee.fixedAmount}`}
                </p>
              </div>
              {(fee.minimumFee || fee.maximumFee) && (
                <div>
                  <Label className="text-sm font-medium text-gray-600">Fee Limits</Label>
                  <p className="text-sm mt-1">
                    {fee.minimumFee && `Min: ₹${fee.minimumFee}`}
                    {fee.minimumFee && fee.maximumFee && ' • '}
                    {fee.maximumFee && `Max: ₹${fee.maximumFee}`}
                  </p>
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">Application Scope</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label className="text-sm font-medium text-gray-600">Scope Type</Label>
                <p className="text-sm mt-1 capitalize">{fee.applicationType}</p>
              </div>
              {fee.targetName && (
                <div>
                  <Label className="text-sm font-medium text-gray-600">Target</Label>
                  <p className="text-sm mt-1">{fee.targetName}</p>
                </div>
              )}
              <div>
                <Label className="text-sm font-medium text-gray-600">Status</Label>
                <Badge className={`${getStatusColor(fee.status)} text-xs mt-1`}>
                  {fee.status}
                </Badge>
              </div>
            </CardContent>
          </Card>
        </div>

        {fee.description && (
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Description</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-700">{fee.description}</p>
            </CardContent>
          </Card>
        )}
      </TabsContent>
      
      <TabsContent value="performance" className="space-y-6">
        <div className="grid grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Total Revenue</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">₹{(fee.totalRevenue / 100000).toFixed(1)}L</div>
              <p className="text-sm text-gray-600">All time earnings</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Transaction Count</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{fee.transactionCount.toLocaleString()}</div>
              <p className="text-sm text-gray-600">Total transactions</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Average Fee</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                ₹{fee.transactionCount > 0 ? (fee.totalRevenue / fee.transactionCount).toFixed(2) : '0.00'}
              </div>
              <p className="text-sm text-gray-600">Per transaction</p>
            </CardContent>
          </Card>
        </div>
      </TabsContent>
      
      <TabsContent value="transactions" className="space-y-4">
        <div className="text-center py-12">
          <p className="text-gray-500">Transaction history and analytics coming soon...</p>
        </div>
      </TabsContent>
    </Tabs>
  )

  function getStatusColor(status: string) {
    switch (status) {
      case 'active': return 'bg-green-50 text-green-700 border-green-200'
      case 'draft': return 'bg-gray-50 text-gray-700 border-gray-200'
      case 'scheduled': return 'bg-blue-50 text-blue-700 border-blue-200'
      case 'expired': return 'bg-red-50 text-red-700 border-red-200'
      default: return 'bg-gray-50 text-gray-700 border-gray-200'
    }
  }
}