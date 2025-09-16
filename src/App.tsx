import { useState, useEffect } from 'react'
import { SidebarProvider } from './components/ui/sidebar'
import { AppSidebar } from './components/AppSidebar'
import { DashboardOverview } from './components/DashboardOverview'
import { StationManagement } from './components/StationManagement'
import { ChargerManagement } from './components/ChargerManagement'
import { UserManagement } from './components/UserManagement'
import { Analytics } from './components/Analytics'
import { Settings } from './components/Settings'
import { PaymentsWallets } from './components/PaymentsWallets'
import { CPOIntegration } from './components/CPOIntegration'
import { PricingTariffs } from './components/PricingTariffs'
import { CustomerSupport } from './components/CustomerSupport'
import { PlatformFeeManagement } from './components/PlatformFeeManagement'
import { Toaster } from './components/ui/sonner'

export default function App() {
  const [activeView, setActiveView] = useState('dashboard')

  // Initialize with system preference
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme')
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    
    if (savedTheme === 'dark' || (!savedTheme && systemPrefersDark)) {
      document.documentElement.classList.add('dark')
    }
  }, [])

  const renderActiveView = () => {
    switch (activeView) {
      case 'dashboard':
        return <DashboardOverview />
      case 'stations':
        return <StationManagement />
      case 'chargers':
        return <ChargerManagement />
      case 'users':
        return <UserManagement />
      case 'analytics':
        return <Analytics />
      case 'payments':
        return <PaymentsWallets />
      case 'cpo':
        return <CPOIntegration />
      case 'pricing':
        return <PricingTariffs />
      case 'platform-fees':
        return <PlatformFeeManagement />
      case 'support':
        return <CustomerSupport />
      case 'settings':
        return <Settings />
      default:
        return <DashboardOverview />
    }
  }

  return (
    <SidebarProvider>
      <div className="flex h-screen w-full bg-background text-foreground">
        <AppSidebar activeView={activeView} setActiveView={setActiveView} />
        <main className="flex-1 overflow-auto bg-background">
          <div className="min-h-full bg-background">
            {renderActiveView()}
          </div>
        </main>
      </div>
      <Toaster />
    </SidebarProvider>
  )
}