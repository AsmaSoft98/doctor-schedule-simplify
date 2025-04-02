
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, CalendarClock, User, LayoutDashboard, LogIn, UserPlus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetTrigger, SheetContent } from '@/components/ui/sheet';
import { cn } from '@/lib/utils';

interface HeaderProps {
  className?: string;
}

const Header: React.FC<HeaderProps> = ({ className }) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const location = useLocation();

  return (
    <header className={cn("w-full py-4 px-4 sm:px-6 lg:px-8 border-b", className)}>
      <div className="container mx-auto flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 text-primary">
          <CalendarClock className="h-6 w-6" />
          <span className="font-semibold text-xl">MedSchedule</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          <Link to="/" className={`transition-colors ${location.pathname === '/' ? 'text-primary font-medium' : 'text-foreground/80 hover:text-primary'}`}>
            Home
          </Link>
          <Link to="/patient-dashboard" className={`transition-colors ${location.pathname === '/patient-dashboard' ? 'text-primary font-medium' : 'text-foreground/80 hover:text-primary'}`}>
            Book Appointment
          </Link>
          <Link to="/appointments" className={`transition-colors ${location.pathname === '/appointments' ? 'text-primary font-medium' : 'text-foreground/80 hover:text-primary'}`}>
            My Appointments
          </Link>
          <Link to="/control-panel" className={`transition-colors ${location.pathname === '/control-panel' ? 'text-primary font-medium' : 'text-foreground/80 hover:text-primary'}`}>
            Doctor Panel
          </Link>
        </nav>

        <div className="hidden md:flex items-center gap-4">
          <Button variant="ghost" size="sm" asChild>
            <Link to="/login">
              <LogIn className="mr-2 h-4 w-4" />
              Log In
            </Link>
          </Button>
          <Button asChild>
            <Link to="/register">
              <UserPlus className="mr-2 h-4 w-4" />
              Register
            </Link>
          </Button>
        </div>

        {/* Mobile Navigation */}
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="icon">
              <Menu className="h-6 w-6" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="sm:max-w-sm">
            <div className="flex flex-col gap-6 mt-6">
              <Link 
                to="/" 
                className={`transition-colors text-lg ${location.pathname === '/' ? 'text-primary font-medium' : 'text-foreground hover:text-primary'}`}
                onClick={() => setIsOpen(false)}
              >
                Home
              </Link>
              <Link 
                to="/patient-dashboard" 
                className={`transition-colors text-lg ${location.pathname === '/patient-dashboard' ? 'text-primary font-medium' : 'text-foreground hover:text-primary'}`}
                onClick={() => setIsOpen(false)}
              >
                Book Appointment
              </Link>
              <Link 
                to="/appointments" 
                className={`transition-colors text-lg ${location.pathname === '/appointments' ? 'text-primary font-medium' : 'text-foreground hover:text-primary'}`}
                onClick={() => setIsOpen(false)}
              >
                My Appointments
              </Link>
              <Link 
                to="/control-panel" 
                className={`transition-colors text-lg ${location.pathname === '/control-panel' ? 'text-primary font-medium' : 'text-foreground hover:text-primary'}`}
                onClick={() => setIsOpen(false)}
              >
                <LayoutDashboard className="inline-block mr-2 h-4 w-4" />
                Doctor Panel
              </Link>
              
              <div className="flex flex-col gap-2 mt-4">
                <Button variant="outline" className="w-full justify-start" asChild>
                  <Link to="/login" onClick={() => setIsOpen(false)}>
                    <LogIn className="mr-2 h-4 w-4" />
                    Log In
                  </Link>
                </Button>
                <Button className="w-full justify-start" asChild>
                  <Link to="/register" onClick={() => setIsOpen(false)}>
                    <UserPlus className="mr-2 h-4 w-4" />
                    Register
                  </Link>
                </Button>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
};

export default Header;
