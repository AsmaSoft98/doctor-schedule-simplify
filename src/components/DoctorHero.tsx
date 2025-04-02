
import React from 'react';
import { Button } from '@/components/ui/button';
import { Doctor } from '@/lib/types';
import { Star, MapPin, Calendar, Award } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface DoctorHeroProps {
  doctor: Doctor;
}

const DoctorHero: React.FC<DoctorHeroProps> = ({ doctor }) => {
  const navigate = useNavigate();
  
  return (
    <section className="bg-gradient-to-r from-medical-50 to-blue-50 py-16">
      <div className="container px-4 sm:px-6 lg:px-8 mx-auto">
        <div className="flex flex-col md:flex-row items-center gap-8">
          <div className="md:w-1/3">
            <div className="aspect-square w-full max-w-[350px] mx-auto overflow-hidden rounded-lg shadow-lg">
              <img 
                src={doctor.image} 
                alt={doctor.name} 
                className="h-full w-full object-cover"
              />
            </div>
          </div>
          
          <div className="md:w-2/3">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-gray-900 mb-2">
              Dr. {doctor.name}
            </h1>
            <div className="flex items-center mb-3">
              <span className="text-lg text-primary font-medium">{doctor.specialty}</span>
              <span className="mx-2 text-gray-400">•</span>
              <div className="flex items-center">
                <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                <span className="ml-1 font-medium">{doctor.rating}</span>
              </div>
            </div>
            
            <div className="flex items-center mb-4 text-muted-foreground">
              <MapPin className="h-5 w-5 mr-1" />
              <span>New York, NY</span>
              <span className="mx-2">•</span>
              <Award className="h-5 w-5 mr-1" />
              <span>{doctor.experience} years experience</span>
            </div>
            
            <p className="text-gray-600 mb-6 text-lg">
              {doctor.about}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                size="lg" 
                className="font-medium"
                onClick={() => navigate('/login')}
              >
                <Calendar className="mr-2 h-5 w-5" />
                Book Appointment
              </Button>
              <Button size="lg" variant="outline" className="font-medium">
                View Credentials
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DoctorHero;
