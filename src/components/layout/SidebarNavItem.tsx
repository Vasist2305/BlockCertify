import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { LucideIcon } from 'lucide-react';

interface SidebarNavItemProps {
  to: string;
  icon: LucideIcon;
  label: string;
  badge?: string | number;
}

export function SidebarNavItem({ to, icon: Icon, label, badge }: SidebarNavItemProps) {
  const location = useLocation();
  const isActive = location.pathname === to;

  return (
    <Link
      to={to}
      className={cn(
        'flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200',
        isActive
          ? 'bg-sidebar-accent text-sidebar-accent-foreground'
          : 'text-sidebar-foreground/70 hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground'
      )}
    >
      <Icon className={cn('h-5 w-5', isActive && 'text-gold')} />
      <span className="flex-1">{label}</span>
      {badge !== undefined && (
        <span className="px-2 py-0.5 text-xs font-semibold rounded-full bg-gold text-gold-foreground">
          {badge}
        </span>
      )}
    </Link>
  );
}
