import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Label } from './ui/label'
import { Switch } from './ui/switch'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select'
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs'
import { Separator } from './ui/separator'
import { Badge } from './ui/badge'
import { 
  Settings as SettingsIcon,
  User,
  Bell,
  Shield,
  Globe,
  CreditCard,
  Database,
  Mail,
  Smartphone,
  Key,
  Eye,
  EyeOff,
  Save,
  RefreshCw,
  Trash2,
  Download,
  Upload,
  AlertTriangle,
  CheckCircle,
  Lock
} from 'lucide-react'
import { toast } from 'sonner@2.0.3'

export function Settings() {
  const [notifications, setNotifications] = useState({
    email: true,
    sms: false,
    push: true,
    alerts: true
  })
  
  const [privacy, setPrivacy] = useState({
    analytics: true,
    marketing: false,
    dataSharing: false
  })

  const [showApiKey, setShowApiKey] = useState(false)
  const [saving, setSaving] = useState(false)

  const handleSave = async () => {
    setSaving(true)
    await new Promise(resolve => setTimeout(resolve, 1500))
    setSaving(false)
    toast.success('Settings saved successfully!')
  }

  const handleReset = () => {
    toast.info('Settings reset to defaults')
  }

  const handleExport = () => {
    toast.success('Exporting configuration...')
  }

  const handleImport = () => {
    toast.info('Configuration import started...')
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="p-8 max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex flex-col space-y-6 md:flex-row md:items-start md:justify-between md:space-y-0">
          <div className="space-y-2">
            <h1 className="text-3xl font-semibold text-foreground tracking-tight">System Settings</h1>
            <p className="text-muted-foreground text-lg">
              Configure your EV charging network platform preferences
            </p>
          </div>
          <div className="flex items-center space-x-4">
            <Button variant="outline" onClick={handleReset} className="modern-btn px-6 py-3 rounded-2xl">
              <RefreshCw className="h-4 w-4 mr-2" />
              Reset
            </Button>
            <Button onClick={handleSave} disabled={saving} className="modern-btn px-6 py-3 rounded-2xl">
              <Save className={`h-4 w-4 mr-2 ${saving ? 'animate-spin' : ''}`} />
              Save Changes
            </Button>
          </div>
        </div>

        {/* Settings Tabs */}
        <Tabs defaultValue="general" className="space-y-8">
          <TabsList className="grid w-full grid-cols-5 rounded-3xl p-2 bg-muted h-14">
            <TabsTrigger value="general" className="rounded-2xl font-medium">General</TabsTrigger>
            <TabsTrigger value="notifications" className="rounded-2xl font-medium">Notifications</TabsTrigger>
            <TabsTrigger value="security" className="rounded-2xl font-medium">Security</TabsTrigger>
            <TabsTrigger value="integrations" className="rounded-2xl font-medium">Integrations</TabsTrigger>
            <TabsTrigger value="advanced" className="rounded-2xl font-medium">Advanced</TabsTrigger>
          </TabsList>

          {/* General Settings */}
          <TabsContent value="general" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Organization Info */}
              <div className="modern-card p-8">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="w-10 h-10 bg-primary/10 rounded-2xl flex items-center justify-center">
                    <User className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-foreground">Organization Details</h3>
                    <p className="text-sm text-muted-foreground">Basic information about your organization</p>
                  </div>
                </div>
                
                <div className="space-y-6">
                  <div>
                    <Label htmlFor="org-name" className="text-sm font-medium text-foreground">Organization Name</Label>
                    <Input id="org-name" placeholder="EV Charge Pro" className="mt-2 h-12 rounded-2xl" />
                  </div>
                  <div>
                    <Label htmlFor="org-email" className="text-sm font-medium text-foreground">Contact Email</Label>
                    <Input id="org-email" type="email" placeholder="admin@evchargepro.com" className="mt-2 h-12 rounded-2xl" />
                  </div>
                  <div>
                    <Label htmlFor="org-phone" className="text-sm font-medium text-foreground">Phone Number</Label>
                    <Input id="org-phone" placeholder="+91 98765 43210" className="mt-2 h-12 rounded-2xl" />
                  </div>
                  <div>
                    <Label htmlFor="org-address" className="text-sm font-medium text-foreground">Address</Label>
                    <Input id="org-address" placeholder="Bangalore, Karnataka, India" className="mt-2 h-12 rounded-2xl" />
                  </div>
                </div>
              </div>

              {/* Platform Preferences */}
              <div className="modern-card p-8">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="w-10 h-10 bg-success/10 rounded-2xl flex items-center justify-center">
                    <SettingsIcon className="h-5 w-5 text-success" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-foreground">Platform Preferences</h3>
                    <p className="text-sm text-muted-foreground">Customize your dashboard experience</p>
                  </div>
                </div>
                
                <div className="space-y-6">
                  <div>
                    <Label htmlFor="timezone" className="text-sm font-medium text-foreground">Timezone</Label>
                    <Select>
                      <SelectTrigger className="mt-2 h-12 rounded-2xl">
                        <SelectValue placeholder="Select timezone" />
                      </SelectTrigger>
                      <SelectContent className="rounded-2xl border-0 shadow-lg">
                        <SelectItem value="ist">India Standard Time (IST)</SelectItem>
                        <SelectItem value="utc">UTC</SelectItem>
                        <SelectItem value="est">Eastern Standard Time</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="currency" className="text-sm font-medium text-foreground">Currency</Label>
                    <Select>
                      <SelectTrigger className="mt-2 h-12 rounded-2xl">
                        <SelectValue placeholder="Select currency" />
                      </SelectTrigger>
                      <SelectContent className="rounded-2xl border-0 shadow-lg">
                        <SelectItem value="inr">Indian Rupee (₹)</SelectItem>
                        <SelectItem value="usd">US Dollar ($)</SelectItem>
                        <SelectItem value="eur">Euro (€)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="language" className="text-sm font-medium text-foreground">Language</Label>
                    <Select>
                      <SelectTrigger className="mt-2 h-12 rounded-2xl">
                        <SelectValue placeholder="Select language" />
                      </SelectTrigger>
                      <SelectContent className="rounded-2xl border-0 shadow-lg">
                        <SelectItem value="en">English</SelectItem>
                        <SelectItem value="hi">Hindi</SelectItem>
                        <SelectItem value="te">Telugu</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          {/* Notifications */}
          <TabsContent value="notifications" className="space-y-6">
            <div className="modern-card p-8">
              <div className="flex items-center space-x-3 mb-8">
                <div className="w-10 h-10 bg-warning/10 rounded-2xl flex items-center justify-center">
                  <Bell className="h-5 w-5 text-warning" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-foreground">Notification Preferences</h3>
                  <p className="text-sm text-muted-foreground">Choose how you want to receive notifications</p>
                </div>
              </div>

              <div className="space-y-8">
                {/* Email Notifications */}
                <div className="space-y-4">
                  <h4 className="font-semibold text-foreground flex items-center">
                    <Mail className="h-4 w-4 mr-2 text-primary" />
                    Email Notifications
                  </h4>
                  <div className="space-y-4 pl-6">
                    <div className="flex items-center justify-between p-4 rounded-2xl bg-muted/30">
                      <div>
                        <p className="font-medium text-foreground">System Alerts</p>
                        <p className="text-sm text-muted-foreground">Critical system notifications and alerts</p>
                      </div>
                      <Switch 
                        checked={notifications.email} 
                        onCheckedChange={(checked) => setNotifications({...notifications, email: checked})} 
                      />
                    </div>
                    <div className="flex items-center justify-between p-4 rounded-2xl bg-muted/30">
                      <div>
                        <p className="font-medium text-foreground">Daily Reports</p>
                        <p className="text-sm text-muted-foreground">Daily usage and performance summaries</p>
                      </div>
                      <Switch />
                    </div>
                    <div className="flex items-center justify-between p-4 rounded-2xl bg-muted/30">
                      <div>
                        <p className="font-medium text-foreground">Marketing Updates</p>
                        <p className="text-sm text-muted-foreground">Product updates and feature announcements</p>
                      </div>
                      <Switch />
                    </div>
                  </div>
                </div>

                <Separator />

                {/* SMS Notifications */}
                <div className="space-y-4">
                  <h4 className="font-semibold text-foreground flex items-center">
                    <Smartphone className="h-4 w-4 mr-2 text-success" />
                    SMS Notifications
                  </h4>
                  <div className="space-y-4 pl-6">
                    <div className="flex items-center justify-between p-4 rounded-2xl bg-muted/30">
                      <div>
                        <p className="font-medium text-foreground">Emergency Alerts</p>
                        <p className="text-sm text-muted-foreground">Critical system failures and emergencies</p>
                      </div>
                      <Switch 
                        checked={notifications.alerts} 
                        onCheckedChange={(checked) => setNotifications({...notifications, alerts: checked})} 
                      />
                    </div>
                    <div className="flex items-center justify-between p-4 rounded-2xl bg-muted/30">
                      <div>
                        <p className="font-medium text-foreground">Revenue Milestones</p>
                        <p className="text-sm text-muted-foreground">Achievement and milestone notifications</p>
                      </div>
                      <Switch />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          {/* Security */}
          <TabsContent value="security" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Authentication */}
              <div className="modern-card p-8">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="w-10 h-10 bg-destructive/10 rounded-2xl flex items-center justify-center">
                    <Shield className="h-5 w-5 text-destructive" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-foreground">Authentication</h3>
                    <p className="text-sm text-muted-foreground">Secure your account access</p>
                  </div>
                </div>
                
                <div className="space-y-6">
                  <div>
                    <Label htmlFor="current-password" className="text-sm font-medium text-foreground">Current Password</Label>
                    <Input id="current-password" type="password" className="mt-2 h-12 rounded-2xl" />
                  </div>
                  <div>
                    <Label htmlFor="new-password" className="text-sm font-medium text-foreground">New Password</Label>
                    <Input id="new-password" type="password" className="mt-2 h-12 rounded-2xl" />
                  </div>
                  <div>
                    <Label htmlFor="confirm-password" className="text-sm font-medium text-foreground">Confirm New Password</Label>
                    <Input id="confirm-password" type="password" className="mt-2 h-12 rounded-2xl" />
                  </div>
                  <Button className="w-full rounded-2xl h-12">
                    <Lock className="h-4 w-4 mr-2" />
                    Update Password
                  </Button>
                </div>
              </div>

              {/* Two-Factor Authentication */}
              <div className="modern-card p-8">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="w-10 h-10 bg-info/10 rounded-2xl flex items-center justify-center">
                    <Key className="h-5 w-5 text-info" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-foreground">Two-Factor Authentication</h3>
                    <p className="text-sm text-muted-foreground">Add an extra layer of security</p>
                  </div>
                </div>
                
                <div className="space-y-6">
                  <div className="flex items-center justify-between p-4 rounded-2xl bg-success/5 border border-success/20">
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="h-5 w-5 text-success" />
                      <div>
                        <p className="font-medium text-foreground">Authenticator App</p>
                        <p className="text-sm text-muted-foreground">Enabled via Google Authenticator</p>
                      </div>
                    </div>
                    <Badge className="bg-success/20 text-success border-success/30">Active</Badge>
                  </div>
                  
                  <div className="flex items-center justify-between p-4 rounded-2xl bg-muted/30">
                    <div>
                      <p className="font-medium text-foreground">SMS Backup</p>
                      <p className="text-sm text-muted-foreground">Receive codes via SMS</p>
                    </div>
                    <Switch />
                  </div>
                  
                  <Button variant="outline" className="w-full rounded-2xl h-12">
                    Configure Backup Codes
                  </Button>
                </div>
              </div>
            </div>

            {/* API Keys */}
            <div className="modern-card p-8">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-10 h-10 bg-warning/10 rounded-2xl flex items-center justify-center">
                  <Key className="h-5 w-5 text-warning" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-foreground">API Keys</h3>
                  <p className="text-sm text-muted-foreground">Manage your API access credentials</p>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 rounded-2xl bg-muted/30">
                  <div>
                    <p className="font-medium text-foreground">Production API Key</p>
                    <div className="flex items-center space-x-2 mt-1">
                      <code className="text-sm font-mono text-muted-foreground">
                        {showApiKey ? 'pk_live_51H7...' : '••••••••••••••••'}
                      </code>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setShowApiKey(!showApiKey)}
                        className="h-6 w-6 p-0"
                      >
                        {showApiKey ? <EyeOff className="h-3 w-3" /> : <Eye className="h-3 w-3" />}
                      </Button>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm" className="rounded-xl">Rotate</Button>
                    <Button variant="outline" size="sm" className="rounded-xl">Copy</Button>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          {/* Integrations */}
          <TabsContent value="integrations" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="modern-card p-8">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="w-10 h-10 bg-info/10 rounded-2xl flex items-center justify-center">
                    <Globe className="h-5 w-5 text-info" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-foreground">Third-Party Services</h3>
                    <p className="text-sm text-muted-foreground">Connected external services</p>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 rounded-2xl bg-muted/30">
                    <div>
                      <p className="font-medium text-foreground">Google Analytics</p>
                      <p className="text-sm text-muted-foreground">Website traffic analysis</p>
                    </div>
                    <Badge className="bg-success/20 text-success border-success/30">Connected</Badge>
                  </div>
                  <div className="flex items-center justify-between p-4 rounded-2xl bg-muted/30">
                    <div>
                      <p className="font-medium text-foreground">Slack Notifications</p>
                      <p className="text-sm text-muted-foreground">Team communication alerts</p>
                    </div>
                    <Button variant="outline" size="sm" className="rounded-xl">Connect</Button>
                  </div>
                  <div className="flex items-center justify-between p-4 rounded-2xl bg-muted/30">
                    <div>
                      <p className="font-medium text-foreground">Payment Gateway</p>
                      <p className="text-sm text-muted-foreground">Razorpay integration</p>
                    </div>
                    <Badge className="bg-success/20 text-success border-success/30">Active</Badge>
                  </div>
                </div>
              </div>

              <div className="modern-card p-8">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="w-10 h-10 bg-primary/10 rounded-2xl flex items-center justify-center">
                    <Database className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-foreground">Data Export</h3>
                    <p className="text-sm text-muted-foreground">Export your platform data</p>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <Button variant="outline" className="w-full justify-start rounded-2xl p-4 h-auto">
                    <Download className="h-4 w-4 mr-3" />
                    <div className="text-left">
                      <p className="font-medium">Export User Data</p>
                      <p className="text-xs text-muted-foreground">Download all user information</p>
                    </div>
                  </Button>
                  <Button variant="outline" className="w-full justify-start rounded-2xl p-4 h-auto">
                    <Download className="h-4 w-4 mr-3" />
                    <div className="text-left">
                      <p className="font-medium">Export Session Data</p>
                      <p className="text-xs text-muted-foreground">Download charging session history</p>
                    </div>
                  </Button>
                  <Button variant="outline" className="w-full justify-start rounded-2xl p-4 h-auto">
                    <Upload className="h-4 w-4 mr-3" />
                    <div className="text-left">
                      <p className="font-medium">Import Configuration</p>
                      <p className="text-xs text-muted-foreground">Upload system settings backup</p>
                    </div>
                  </Button>
                </div>
              </div>
            </div>
          </TabsContent>

          {/* Advanced */}
          <TabsContent value="advanced" className="space-y-6">
            <div className="modern-card p-8">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-10 h-10 bg-destructive/10 rounded-2xl flex items-center justify-center">
                  <AlertTriangle className="h-5 w-5 text-destructive" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-foreground">Danger Zone</h3>
                  <p className="text-sm text-muted-foreground">Irreversible and destructive actions</p>
                </div>
              </div>
              
              <div className="space-y-6">
                <div className="p-6 rounded-2xl border border-destructive/20 bg-destructive/5">
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="font-semibold text-foreground mb-2">Reset All Settings</h4>
                      <p className="text-sm text-muted-foreground mb-4">
                        This will reset all platform settings to their default values. This action cannot be undone.
                      </p>
                    </div>
                    <Button variant="destructive" className="rounded-xl">
                      <RefreshCw className="h-4 w-4 mr-2" />
                      Reset
                    </Button>
                  </div>
                </div>
                
                <div className="p-6 rounded-2xl border border-destructive/20 bg-destructive/5">
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="font-semibold text-foreground mb-2">Delete All Data</h4>
                      <p className="text-sm text-muted-foreground mb-4">
                        Permanently delete all platform data including users, sessions, and analytics. This action cannot be undone.
                      </p>
                    </div>
                    <Button variant="destructive" className="rounded-xl">
                      <Trash2 className="h-4 w-4 mr-2" />
                      Delete
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}