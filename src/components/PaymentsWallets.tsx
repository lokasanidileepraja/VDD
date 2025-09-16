import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Badge } from './ui/badge'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog'
import { Label } from './ui/label'
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs'
import { Progress } from './ui/progress'
import { 
  CreditCard, 
  Wallet, 
  TrendingUp, 
  TrendingDown,
  Search, 
  Filter,
  Download,
  RefreshCw,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Clock,
  Eye,
  FileText,
  Building2,
  Users,
  DollarSign,
  MoreHorizontal
} from 'lucide-react'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from './ui/dropdown-menu'

export function PaymentsWallets() {
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [selectedTransaction, setSelectedTransaction] = useState<any>(null)
  const [isDetailsOpen, setIsDetailsOpen] = useState(false)

  const transactionData = [
    {
      id: 'TXN001',
      type: 'payment',
      sessionId: 'SS001',
      user: 'Rahul Sharma',
      amount: 325,
      baseFare: 280,
      gst: 45,
      platformFee: 28,
      netToCPO: 252,
      paymentMethod: 'UPI',
      gatewayRef: 'UPI2024012845671',
      status: 'completed',
      timestamp: '2024-01-28 14:30:45',
      station: 'Phoenix Mall Station',
      cpo: 'PowerGrid CPO'
    },
    {
      id: 'TXN002', 
      type: 'wallet_recharge',
      user: 'Priya Patel',
      amount: 1000,
      paymentMethod: 'Credit Card',
      gatewayRef: 'CC2024012845672',
      status: 'completed',
      timestamp: '2024-01-28 16:15:30'
    },
    {
      id: 'TXN003',
      type: 'payment',
      sessionId: 'SS003',
      user: 'Amit Kumar',
      amount: 540,
      baseFare: 465,
      gst: 75,
      platformFee: 46.5,
      netToCPO: 418.5,
      paymentMethod: 'Wallet',
      status: 'completed',
      timestamp: '2024-01-28 12:45:22',
      station: 'City Center Mall',
      cpo: 'GreenVolt Energy'
    },
    {
      id: 'TXN004',
      type: 'refund',
      sessionId: 'SS004',
      user: 'Sneha Reddy',
      amount: 195,
      refundReason: 'Charger malfunction',
      status: 'processing',
      timestamp: '2024-01-28 09:20:15',
      station: 'Airport Terminal 3'
    },
    {
      id: 'TXN005',
      type: 'payout',
      cpo: 'PowerGrid CPO',
      amount: 45680,
      payoutPeriod: 'Weekly - Jan 22-28',
      bankAccount: 'HDFC Bank ***4567',
      status: 'completed',
      timestamp: '2024-01-28 18:00:00'
    }
  ]

  const walletData = [
    {
      userId: 'USR001',
      name: 'Rahul Sharma',
      currentBalance: 2450,
      totalRecharges: 15670,
      totalSpent: 13220,
      lastActivity: '2024-01-28 14:30',
      status: 'active'
    },
    {
      userId: 'USR002',
      name: 'Priya Patel', 
      currentBalance: 1200,
      totalRecharges: 8900,
      totalSpent: 7700,
      lastActivity: '2024-01-28 16:45',
      status: 'active'
    },
    {
      userId: 'USR003',
      name: 'GreenFleet Logistics',
      currentBalance: 25000,
      totalRecharges: 250000,
      totalSpent: 225000,
      lastActivity: '2024-01-28 18:00',
      status: 'active'
    }
  ]

  const cpoSettlementData = [
    {
      id: 'PAY001',
      cpo: 'PowerGrid CPO',
      amount: 45680,
      period: 'Jan 22-28, 2024',
      transactions: 287,
      bankAccount: 'HDFC Bank ***4567',
      kycStatus: 'verified',
      status: 'completed',
      processedAt: '2024-01-28 18:00:00'
    },
    {
      id: 'PAY002',
      cpo: 'ChargeTech Solutions',
      amount: 38920,
      period: 'Jan 22-28, 2024',
      transactions: 234,
      bankAccount: 'ICICI Bank ***8901',
      kycStatus: 'verified',
      status: 'pending',
      scheduledAt: '2024-01-29 18:00:00'
    },
    {
      id: 'PAY003',
      cpo: 'GreenVolt Energy',
      amount: 28450,
      period: 'Jan 22-28, 2024',
      transactions: 189,
      bankAccount: 'SBI ***2345',
      kycStatus: 'pending',
      status: 'hold',
      note: 'KYC verification required'
    }
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800'
      case 'processing': return 'bg-yellow-100 text-yellow-800'
      case 'pending': return 'bg-blue-100 text-blue-800'
      case 'failed': return 'bg-red-100 text-red-800'
      case 'hold': return 'bg-orange-100 text-orange-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return <CheckCircle className="h-4 w-4" />
      case 'processing': return <RefreshCw className="h-4 w-4" />
      case 'pending': return <Clock className="h-4 w-4" />
      case 'failed': return <XCircle className="h-4 w-4" />
      case 'hold': return <AlertTriangle className="h-4 w-4" />
      default: return <Clock className="h-4 w-4" />
    }
  }

  const processRefund = (transactionId: string) => {
    console.log(`Processing refund for transaction ${transactionId}`)
  }

  const processPayout = (payoutId: string) => {
    console.log(`Processing payout ${payoutId}`)
  }

  const generateInvoice = (transactionId: string) => {
    console.log(`Generating invoice for transaction ${transactionId}`)
  }

  const filteredTransactions = transactionData.filter(transaction => {
    const matchesSearch = transaction.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         transaction.user?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         transaction.cpo?.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === 'all' || transaction.status === statusFilter
    return matchesSearch && matchesStatus
  })

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1>Payments & Wallets</h1>
          <p className="text-muted-foreground">
            Financial management, transactions, and settlement tracking
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export Data
          </Button>
          <Button>
            <RefreshCw className="h-4 w-4 mr-2" />
            Reconcile
          </Button>
        </div>
      </div>

      {/* Financial KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Today's Revenue</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹2,45,670</div>
            <div className="text-xs text-muted-foreground flex items-center">
              <TrendingUp className="h-3 w-3 mr-1 text-green-600" />
              <span className="text-green-600">+12.3%</span>
              <span className="ml-1">vs yesterday</span>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Pending Payouts</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹1,23,450</div>
            <div className="text-xs text-muted-foreground">3 CPO partners</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Wallet Balance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹8,67,890</div>
            <div className="text-xs text-muted-foreground">Across all users</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Success Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">98.7%</div>
            <div className="text-xs text-muted-foreground">Payment success</div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Tabs */}
      <Tabs defaultValue="transactions" className="space-y-4">
        <TabsList>
          <TabsTrigger value="transactions">Transactions</TabsTrigger>
          <TabsTrigger value="wallets">User Wallets</TabsTrigger>
          <TabsTrigger value="settlements">CPO Settlements</TabsTrigger>
          <TabsTrigger value="reconciliation">Reconciliation</TabsTrigger>
        </TabsList>

        <TabsContent value="transactions" className="space-y-4">
          {/* Transaction Filters */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Transaction Management</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex gap-4 mb-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                    <Input 
                      placeholder="Search transactions, users, or CPO..."
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
                    <SelectItem value="completed">Completed</SelectItem>
                    <SelectItem value="processing">Processing</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="failed">Failed</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-4">
                {filteredTransactions.map((transaction) => (
                  <div key={transaction.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                        {transaction.type === 'payment' && <CreditCard className="h-5 w-5 text-primary" />}
                        {transaction.type === 'wallet_recharge' && <Wallet className="h-5 w-5 text-blue-600" />}
                        {transaction.type === 'refund' && <RefreshCw className="h-5 w-5 text-orange-600" />}
                        {transaction.type === 'payout' && <Building2 className="h-5 w-5 text-purple-600" />}
                      </div>
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-medium">{transaction.id}</span>
                          <Badge className={getStatusColor(transaction.status)}>
                            {getStatusIcon(transaction.status)}
                            <span className="ml-1">{transaction.status}</span>
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {transaction.user || transaction.cpo} • {transaction.timestamp}
                        </p>
                        {transaction.station && (
                          <p className="text-xs text-muted-foreground">{transaction.station}</p>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <div className="font-medium">₹{transaction.amount.toLocaleString()}</div>
                        <div className="text-sm text-muted-foreground capitalize">{transaction.type.replace('_', ' ')}</div>
                      </div>
                      
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => {
                            setSelectedTransaction(transaction)
                            setIsDetailsOpen(true)
                          }}>
                            <Eye className="h-4 w-4 mr-2" />
                            View Details
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => generateInvoice(transaction.id)}>
                            <FileText className="h-4 w-4 mr-2" />
                            Generate Invoice
                          </DropdownMenuItem>
                          {transaction.type === 'payment' && (
                            <DropdownMenuItem onClick={() => processRefund(transaction.id)}>
                              <RefreshCw className="h-4 w-4 mr-2" />
                              Process Refund
                            </DropdownMenuItem>
                          )}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="wallets" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>User Wallet Management</CardTitle>
              <CardDescription>Monitor and manage user wallet balances</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {walletData.map((wallet) => (
                  <div key={wallet.userId} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                        <Wallet className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-medium">{wallet.name}</h4>
                        <p className="text-sm text-muted-foreground">
                          Last activity: {wallet.lastActivity}
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-6">
                      <div className="text-center">
                        <div className="text-lg font-bold">₹{wallet.currentBalance.toLocaleString()}</div>
                        <div className="text-xs text-muted-foreground">Current Balance</div>
                      </div>
                      <div className="text-center">
                        <div className="text-lg font-bold text-green-600">₹{wallet.totalRecharges.toLocaleString()}</div>
                        <div className="text-xs text-muted-foreground">Total Recharges</div>
                      </div>
                      <div className="text-center">
                        <div className="text-lg font-bold text-blue-600">₹{wallet.totalSpent.toLocaleString()}</div>
                        <div className="text-xs text-muted-foreground">Total Spent</div>
                      </div>
                      <Button variant="outline" size="sm">
                        Adjust Balance
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settlements" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>CPO Settlement Management</CardTitle>
              <CardDescription>Manage payouts to Charge Point Operators</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {cpoSettlementData.map((settlement) => (
                  <div key={settlement.id} className="p-4 border rounded-lg">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="font-semibold">{settlement.cpo}</h4>
                          <Badge className={getStatusColor(settlement.status)}>
                            {settlement.status}
                          </Badge>
                          <Badge variant="outline" className={settlement.kycStatus === 'verified' ? 'text-green-600' : 'text-yellow-600'}>
                            KYC {settlement.kycStatus}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {settlement.period} • {settlement.transactions} transactions
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {settlement.bankAccount}
                        </p>
                      </div>
                      <div className="text-right">
                        <div className="text-xl font-bold">₹{settlement.amount.toLocaleString()}</div>
                        {settlement.status === 'pending' && (
                          <Button size="sm" onClick={() => processPayout(settlement.id)} className="mt-2">
                            Process Payout
                          </Button>
                        )}
                      </div>
                    </div>
                    
                    {settlement.note && (
                      <div className="flex items-center gap-2 mt-2 p-2 bg-yellow-50 rounded text-sm">
                        <AlertTriangle className="h-4 w-4 text-yellow-600" />
                        <span>{settlement.note}</span>
                      </div>
                    )}
                    
                    <div className="flex justify-between text-xs text-muted-foreground mt-3">
                      <span>
                        {settlement.status === 'completed' ? 'Processed' : 'Scheduled'}: 
                        {settlement.processedAt || settlement.scheduledAt}
                      </span>
                      <span>Settlement ID: {settlement.id}</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="reconciliation" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Auto Reconciliation Status</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm">Matched Transactions</span>
                      <span className="text-sm">98.7%</span>
                    </div>
                    <Progress value={98.7} />
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm">Pending Review</span>
                      <span className="text-sm">1.3%</span>
                    </div>
                    <Progress value={1.3} />
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Reconciliation Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Total Transactions</span>
                    <span className="font-medium">2,847</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Matched</span>
                    <span className="font-medium text-green-600">2,810</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Mismatched</span>
                    <span className="font-medium text-red-600">12</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Pending</span>
                    <span className="font-medium text-yellow-600">25</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle>Reconciliation Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex gap-2">
                <Button>
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Run Reconciliation
                </Button>
                <Button variant="outline">
                  <Download className="h-4 w-4 mr-2" />
                  Export Mismatches
                </Button>
                <Button variant="outline">
                  <Eye className="h-4 w-4 mr-2" />
                  Review Pending
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Transaction Details Dialog */}
      <Dialog open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Transaction Details - {selectedTransaction?.id}</DialogTitle>
          </DialogHeader>
          
          {selectedTransaction && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Transaction ID</Label>
                  <p className="text-sm font-mono">{selectedTransaction.id}</p>
                </div>
                <div>
                  <Label>Status</Label>
                  <Badge className={getStatusColor(selectedTransaction.status)}>
                    {selectedTransaction.status}
                  </Badge>
                </div>
                <div>
                  <Label>Amount</Label>
                  <p className="text-lg font-bold">₹{selectedTransaction.amount}</p>
                </div>
                <div>
                  <Label>Payment Method</Label>
                  <p>{selectedTransaction.paymentMethod}</p>
                </div>
              </div>
              
              {selectedTransaction.type === 'payment' && (
                <div>
                  <Label>Amount Breakdown</Label>
                  <div className="mt-2 space-y-1 text-sm">
                    <div className="flex justify-between">
                      <span>Base Fare</span>
                      <span>₹{selectedTransaction.baseFare}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>GST</span>
                      <span>₹{selectedTransaction.gst}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Platform Fee</span>
                      <span>₹{selectedTransaction.platformFee}</span>
                    </div>
                    <div className="flex justify-between font-medium border-t pt-1">
                      <span>Net to CPO</span>
                      <span>₹{selectedTransaction.netToCPO}</span>
                    </div>
                  </div>
                </div>
              )}
              
              <div>
                <Label>Gateway Reference</Label>
                <p className="text-sm font-mono">{selectedTransaction.gatewayRef}</p>
              </div>
              
              <div>
                <Label>Timestamp</Label>
                <p className="text-sm">{selectedTransaction.timestamp}</p>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}