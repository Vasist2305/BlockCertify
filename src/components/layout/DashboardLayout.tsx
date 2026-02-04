import { ReactNode } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Home, 
  FileText, 
  Clock, 
  Bell, 
  Activity, 
  User, 
  Shield, 
  LogOut,
  ChevronLeft,
  Menu
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { useState } from 'react';

interface DashboardLayoutProps {
  children: ReactNode;
  role: 'student' | 'institute' | 'verifier';
  userName?: string;
}

interface NavItem {
  to: string;
  icon: typeof Home;
  label: string;
  badge?: number;
}

const studentNavItems: NavItem[] = [
  { to: '/student/dashboard', icon: Home, label: 'Dashboard' },
  { to: '/student/request', icon: FileText, label: 'Request Certificate' },
  { to: '/student/certificates', icon: Shield, label: 'My Certificates' },
  { to: '/student/history', icon: Clock, label: 'Request History' },
  { to: '/student/notifications', icon: Bell, label: 'Notifications', badge: 2 },
  { to: '/student/activity', icon: Activity, label: 'Activity Log' },
  { to: '/student/profile', icon: User, label: 'Profile' },
];

const instituteNavItems: NavItem[] = [
  { to: '/institute/dashboard', icon: Home, label: 'Dashboard' },
  { to: '/institute/pending', icon: Clock, label: 'Pending Requests', badge: 3 },
  { to: '/institute/issue', icon: FileText, label: 'Issue Certificate' },
  { to: '/institute/issued', icon: Shield, label: 'Issued Certificates' },
  { to: '/institute/students', icon: User, label: 'Student Management' },
  { to: '/institute/bulk', icon: FileText, label: 'Bulk Issue' },
  { to: '/institute/templates', icon: FileText, label: 'Templates' },
  { to: '/institute/analytics', icon: Activity, label: 'Analytics' },
  { to: '/institute/profile', icon: User, label: 'Institute Profile' },
];

const verifierNavItems: NavItem[] = [
  { to: '/verifier/verify', icon: Shield, label: 'Verify Certificate' },
  { to: '/verifier/history', icon: Clock, label: 'Verification History' },
];

export function DashboardLayout({ children, role, userName = 'User' }: DashboardLayoutProps) {
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);
  
  const navItems: NavItem[] = role === 'student' 
    ? studentNavItems 
    : role === 'institute' 
      ? instituteNavItems 
      : verifierNavItems;

  const roleTitle = role === 'student' 
    ? 'Student Portal' 
    : role === 'institute' 
      ? 'Institute Portal' 
      : 'Verifier Portal';

  return (
    <div className="min-h-screen flex w-full bg-background">
      {/* Sidebar */}
      <aside 
        className={cn(
          'fixed left-0 top-0 z-40 h-screen bg-sidebar transition-all duration-300 flex flex-col',
          collapsed ? 'w-20' : 'w-64'
        )}
      >
        {/* Logo */}
        <div className="p-4 border-b border-sidebar-border">
          <Link to="/" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-gold to-gold-light flex items-center justify-center">
              <Shield className="h-6 w-6 text-gold-foreground" />
            </div>
            {!collapsed && (
              <div>
                <h1 className="font-display font-bold text-sidebar-foreground text-sm">CertChain</h1>
                <p className="text-xs text-sidebar-foreground/60">{roleTitle}</p>
              </div>
            )}
          </Link>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-1 overflow-y-auto scrollbar-hide">
          {navItems.map((item) => {
            const isActive = location.pathname === item.to;
            return (
              <Link
                key={item.to}
                to={item.to}
                className={cn(
                  'flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200',
                  isActive
                    ? 'bg-sidebar-accent text-sidebar-accent-foreground'
                    : 'text-sidebar-foreground/70 hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground',
                  collapsed && 'justify-center px-3'
                )}
                title={collapsed ? item.label : undefined}
              >
                <item.icon className={cn('h-5 w-5 flex-shrink-0', isActive && 'text-gold')} />
                {!collapsed && (
                  <>
                    <span className="flex-1">{item.label}</span>
                    {item.badge !== undefined && (
                      <span className="px-2 py-0.5 text-xs font-semibold rounded-full bg-gold text-gold-foreground">
                        {item.badge}
                      </span>
                    )}
                  </>
                )}
              </Link>
            );
          })}
        </nav>

        {/* User & Logout */}
        <div className="p-4 border-t border-sidebar-border">
          {!collapsed && (
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-sidebar-accent flex items-center justify-center">
                <User className="h-5 w-5 text-sidebar-accent-foreground" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-sidebar-foreground truncate">{userName}</p>
                <p className="text-xs text-sidebar-foreground/60 capitalize">{role}</p>
              </div>
            </div>
          )}
          <Link
            to="/"
            className={cn(
              'flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-sidebar-foreground/70 hover:bg-destructive/10 hover:text-destructive transition-all duration-200',
              collapsed && 'justify-center px-3'
            )}
          >
            <LogOut className="h-5 w-5" />
            {!collapsed && <span>Logout</span>}
          </Link>
        </div>

        {/* Collapse Toggle */}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="absolute -right-3 top-20 w-6 h-6 rounded-full bg-sidebar border border-sidebar-border flex items-center justify-center text-sidebar-foreground hover:bg-sidebar-accent transition-colors"
        >
          {collapsed ? <Menu className="h-3 w-3" /> : <ChevronLeft className="h-3 w-3" />}
        </button>
      </aside>

      {/* Main Content */}
      <main className={cn(
        'flex-1 transition-all duration-300',
        collapsed ? 'ml-20' : 'ml-64'
      )}>
        {children}
      </main>
    </div>
  );
}
