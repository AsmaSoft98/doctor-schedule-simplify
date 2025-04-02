
import React from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, CalendarClock, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetTrigger, SheetContent } from '@/components/ui/sheet';
import { cn } from '@/lib/utils';

interface HeaderProps {
  className?: string;
}

const Header: React.FC<HeaderProps> = ({ className }) => {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <header className={cn("w-full py-4 px-4 sm:px-6 lg:px-8 border-b", className)}>
      <div className="container mx-auto flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 text-primary">
          <CalendarClock className="h-6 w-6" />
          <span className="font-semibold text-xl">MedSchedule</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          <Link to="/" className="text-foreground/80 hover:text-primary transition-colors">
            Find Doctors
          </Link>
          <Link to="/appointments" className="text-foreground/80 hover:text-primary transition-colors">
            My Appointments
          </Link>
          <Link to="/about" className="text-foreground/80 hover:text-primary transition-colors">
            About Us
          </Link>
        </nav>

        <div className="hidden md:flex items-center gap-4">
          <Button variant="ghost" size="sm">
            Log In
          </Button>
          <Button>
            <User className="mr-2 h-4 w-4" />
            Sign Up
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
                className="text-foreground hover:text-primary transition-colors text-lg"
                onClick={() => setIsOpen(false)}
              >
                Find Doctors
              </Link>
              <Link 
                to="/appointments" 
                className="text-foreground hover:text-primary transition-colors text-lg"
                onClick={() => setIsOpen(false)}
              >
                My Appointments
              </Link>
              <Link 
                to="/about" 
                className="text-foreground hover:text-primary transition-colors text-lg"
                onClick={() => setIsOpen(false)}
              >
                About Us
              </Link>
              <div className="flex flex-col gap-2 mt-4">
                <Button variant="outline" className="w-full justify-start">
                  Log In
                </Button>
                <Button className="w-full justify-start">
                  <User className="mr-2 h-4 w-4" />
                  Sign Up
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
