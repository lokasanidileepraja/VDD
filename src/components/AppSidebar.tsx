import { 
  BarChart3, 
  Zap, 
  Users, 
  Settings, 
  CreditCard, 
  LifeBuoy, 
  PieChart, 
  Building2, 
  Battery,
  DollarSign,
  Headphones,
  Sun,
  Moon,
  Calculator,
  Activity
} from 'lucide-react'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
} from './ui/sidebar'
import { Button } from './ui/button'
import { useState, useEffect } from 'react'

interface AppSidebarProps {
  activeView: string
  setActiveView: (view: string) => void
}

const menuItems = [
  {
    title: "Overview",
    items: [
      { id: 'dashboard', title: 'Dashboard', icon: BarChart3, color: 'text-blue-600' },
    ]
  },
  {
    title: "Operations",
    items: [
      { id: 'stations', title: 'Stations', icon: Zap, color: 'text-violet-600' },
      { id: 'chargers', title: 'Chargers', icon: Battery, color: 'text-green-600' },
      { id: 'users', title: 'Users', icon: Users, color: 'text-blue-600' },
    ]
  },
  {
    title: "Business",
    items: [
      { id: 'payments', title: 'Payments', icon: CreditCard, color: 'text-emerald-600' },
      { id: 'pricing', title: 'Pricing', icon: DollarSign, color: 'text-amber-600' },
      { id: 'platform-fees', title: 'Platform Fees', icon: Calculator, color: 'text-pink-600' },
      { id: 'cpo', title: 'CPO Integration', icon: Building2, color: 'text-orange-600' },
      { id: 'analytics', title: 'Analytics', icon: PieChart, color: 'text-indigo-600' },
    ]
  },
  {
    title: "Support",
    items: [
      { id: 'support', title: 'Customer Support', icon: Headphones, color: 'text-purple-600' },
      { id: 'settings', title: 'Settings', icon: Settings, color: 'text-gray-600' },
    ]
  }
]

export function AppSidebar({ activeView, setActiveView }: AppSidebarProps) {
  const [isDark, setIsDark] = useState(false)

  useEffect(() => {
    setIsDark(document.documentElement.classList.contains('dark'))
  }, [])

  const toggleTheme = () => {
    const newTheme = !isDark
    setIsDark(newTheme)
    
    if (newTheme) {
      document.documentElement.classList.add('dark')
      localStorage.setItem('theme', 'dark')
    } else {
      document.documentElement.classList.remove('dark')
      localStorage.setItem('theme', 'light')
    }
  }

  return (
    <Sidebar variant="inset" className="border-r-0 bg-sidebar">
      <SidebarHeader className="border-b border-sidebar-border bg-sidebar p-6">
        <SidebarMenu>
          <SidebarMenuItem>
            <div className="flex items-center gap-4">
              <div className="flex aspect-square size-12 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-lg">
                <Zap className="size-6" />
              </div>
              <div className="grid flex-1 text-left leading-tight">
                <span className="truncate text-xl font-semibold text-sidebar-foreground">EV Charge Pro</span>
                <span className="truncate text-sm text-muted-foreground">Admin Dashboard</span>
              </div>
            </div>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      
      <SidebarContent className="px-4 py-6 bg-sidebar">
        {menuItems.map((group) => (
          <SidebarGroup key={group.title} className="py-4">
            <SidebarGroupLabel className="px-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
              {group.title}
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu className="gap-2">
                {group.items.map((item) => (
                  <SidebarMenuItem key={item.id}>
                    <SidebarMenuButton 
                      tooltip={item.title}
                      isActive={activeView === item.id}
                      onClick={() => setActiveView(item.id)}
                      className={`h-12 rounded-2xl transition-all duration-200 hover:bg-sidebar-accent group ${
                        activeView === item.id 
                          ? 'bg-primary text-primary-foreground shadow-lg' 
                          : 'hover:shadow-sm text-sidebar-foreground'
                      }`}
                    >
                      <div className={`p-2 rounded-xl ${
                        activeView === item.id 
                          ? 'bg-white/20' 
                          : 'bg-sidebar-accent/50 group-hover:bg-sidebar-accent'
                      }`}>
                        <item.icon className={`size-4 ${
                          activeView === item.id ? 'text-white' : item.color
                        }`} />
                      </div>
                      <span className={`font-medium ${
                        activeView === item.id ? 'text-white' : 'text-sidebar-foreground'
                      }`}>
                        {item.title}
                      </span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
      
      <SidebarFooter className="border-t border-sidebar-border p-6 bg-sidebar">
        <div className="flex items-center justify-between mb-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={toggleTheme}
            className="h-10 w-10 p-0 rounded-xl hover:bg-sidebar-accent text-sidebar-foreground"
          >
            {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </Button>
          <SidebarTrigger className="h-10 w-10 p-0 rounded-xl hover:bg-sidebar-accent text-sidebar-foreground" />
        </div>
        
        {/* Status indicator */}
        <div className="flex items-center space-x-2 px-3 py-2 rounded-xl bg-success/10 border border-success/20">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
            <span className="text-xs font-medium text-success">All Systems Operational</span>
          </div>
        </div>
        
        <div className="text-xs text-center text-muted-foreground mt-3 font-medium">
          v2.1.4 • Live Production
        </div>
      </SidebarFooter>
    </Sidebar>
  )
}