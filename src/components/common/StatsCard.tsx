import { LucideIcon } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface StatsCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  description?: string;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  accentColor?: 'primary' | 'gold' | 'teal' | 'success' | 'warning' | 'destructive';
  className?: string;
}

const accentColorMap = {
  primary: 'border-l-primary bg-primary/5',
  gold: 'border-l-gold bg-gold/5',
  teal: 'border-l-teal bg-teal/5',
  success: 'border-l-success bg-success/5',
  warning: 'border-l-warning bg-warning/5',
  destructive: 'border-l-destructive bg-destructive/5',
};

const iconColorMap = {
  primary: 'bg-primary/10 text-primary',
  gold: 'bg-gold/10 text-gold',
  teal: 'bg-teal/10 text-teal',
  success: 'bg-success/10 text-success',
  warning: 'bg-warning/10 text-warning',
  destructive: 'bg-destructive/10 text-destructive',
};

export function StatsCard({
  title,
  value,
  icon: Icon,
  description,
  trend,
  accentColor = 'primary',
  className,
}: StatsCardProps) {
  return (
    <Card variant="stat" className={cn('border-l-4', accentColorMap[accentColor], className)}>
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div className="space-y-2">
            <p className="text-sm font-medium text-muted-foreground">{title}</p>
            <div className="flex items-baseline gap-2">
              <h3 className="text-3xl font-bold font-display tracking-tight">{value}</h3>
              {trend && (
                <span
                  className={cn(
                    'text-sm font-medium',
                    trend.isPositive ? 'text-success' : 'text-destructive'
                  )}
                >
                  {trend.isPositive ? '+' : ''}{trend.value}%
                </span>
              )}
            </div>
            {description && (
              <p className="text-xs text-muted-foreground">{description}</p>
            )}
          </div>
          <div className={cn('p-3 rounded-xl', iconColorMap[accentColor])}>
            <Icon className="h-6 w-6" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
