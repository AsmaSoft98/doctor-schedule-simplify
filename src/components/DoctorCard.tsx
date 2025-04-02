
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Star, Calendar } from 'lucide-react';
import { Doctor } from '@/lib/types';
import { cn } from '@/lib/utils';

interface DoctorCardProps {
  doctor: Doctor;
  className?: string;
}

const DoctorCard: React.FC<DoctorCardProps> = ({ doctor, className }) => {
  const navigate = useNavigate();
  
  const handleBookAppointment = () => {
    navigate(`/booking/${doctor.id}`);
  };
  
  return (
    <Card className={cn("overflow-hidden transition-all hover:shadow-md", className)}>
      <CardContent className="p-0">
        <div className="aspect-square w-full overflow-hidden">
          <img 
            src={doctor.image} 
            alt={doctor.name} 
            className="h-full w-full object-cover transition-transform hover:scale-105"
          />
        </div>
        <div className="p-6">
          <h3 className="text-lg font-semibold">{doctor.name}</h3>
          <p className="text-sm text-muted-foreground mb-2">{doctor.specialty}</p>
          
          <div className="flex items-center mb-2">
            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400 mr-1" />
            <span className="text-sm font-medium">{doctor.rating}</span>
            <span className="mx-2 text-muted-foreground">•</span>
            <span className="text-sm text-muted-foreground">{doctor.experience} years exp</span>
          </div>
          
          <p className="text-sm line-clamp-3 text-muted-foreground">
            {doctor.about}
          </p>
        </div>
      </CardContent>
      <CardFooter className="px-6 pb-6 pt-0">
        <Button onClick={handleBookAppointment} className="w-full gap-2">
          <Calendar className="h-4 w-4" />
          Book Appointment
        </Button>
      </CardFooter>
    </Card>
  );
};

export default DoctorCard;
