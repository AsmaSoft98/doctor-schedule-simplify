
import React from 'react';
import { Link } from 'react-router-dom';
import { CalendarClock, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-50 border-t py-12 px-4 sm:px-6 lg:px-8 mt-auto">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-1">
            <Link to="/" className="flex items-center gap-2 text-primary">
              <CalendarClock className="h-6 w-6" />
              <span className="font-semibold text-xl">MedSchedule</span>
            </Link>
            <p className="mt-4 text-muted-foreground">
              Making healthcare accessible with simple online appointment booking.
            </p>
            <div className="flex mt-6 space-x-4">
              <a href="#" className="text-gray-500 hover:text-primary transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-500 hover:text-primary transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-500 hover:text-primary transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-500 hover:text-primary transition-colors">
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          <div className="col-span-1">
            <h3 className="font-medium text-lg mb-4">For Patients</h3>
            <ul className="space-y-3">
              <li><Link to="/" className="text-muted-foreground hover:text-primary transition-colors">Find Doctors</Link></li>
              <li><Link to="/appointments" className="text-muted-foreground hover:text-primary transition-colors">My Appointments</Link></li>
              <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Patient Reviews</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Insurance Info</a></li>
            </ul>
          </div>
          
          <div className="col-span-1">
            <h3 className="font-medium text-lg mb-4">For Doctors</h3>
            <ul className="space-y-3">
              <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Join Our Network</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Doctor Portal</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Resources</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Webinars</a></li>
            </ul>
          </div>
          
          <div className="col-span-1">
            <h3 className="font-medium text-lg mb-4">Company</h3>
            <ul className="space-y-3">
              <li><Link to="/about" className="text-muted-foreground hover:text-primary transition-colors">About Us</Link></li>
              <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Careers</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Contact</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Terms of Service</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t mt-12 pt-8 text-center text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} MedSchedule. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
