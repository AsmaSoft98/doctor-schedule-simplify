
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  CalendarClock, 
  Users, 
  UserCog, 
  Settings,
  FileText, 
  BarChart
} from 'lucide-react';
import { cn } from '@/lib/utils';

const AdminSidebar: React.FC = () => {
  const location = useLocation();
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };
  
  const menuItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/control-panel' },
    { icon: CalendarClock, label: 'Appointments', path: '/control-panel/appointments' },
    { icon: Users, label: 'Patients', path: '/control-panel/patients' },
    { icon: UserCog, label: 'Doctors', path: '/control-panel/doctors' },
    { icon: FileText, label: 'Reports', path: '/control-panel/reports' },
    { icon: BarChart, label: 'Analytics', path: '/control-panel/analytics' },
    { icon: Settings, label: 'Settings', path: '/control-panel/settings' },
  ];
  
  return (
    <div className="w-64 bg-white border-r h-[calc(100vh-4rem)] p-4 hidden md:block">
      <div className="space-y-1">
        {menuItems.map((item, index) => (
          <Link
            key={index}
            to={item.path}
            className={cn(
              "flex items-center gap-3 px-3 py-2 rounded-md transition-colors",
              isActive(item.path)
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:bg-muted"
            )}
          >
            <item.icon className="h-5 w-5" />
            <span>{item.label}</span>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default AdminSidebar;
